import { mockCategories } from "@/mocks/categories";
import { mockClaims } from "@/mocks/claims";
import { mockItems } from "@/mocks/items";
import { mockUsers } from "@/mocks/users";
import type {
  AdminOverview,
  CategorySummary,
  Claim,
  ClaimFilters,
  ClaimWithRelations,
  FoundItem,
  Item,
  ItemFilters,
  ItemWithRelations,
  PaginatedResult,
  UserFilters,
} from "@/types/domain";

type MockRequestOptions = {
  signal?: AbortSignal;
};

const DEFAULT_PAGE_SIZE = 10;
const MOCK_LATENCY_MS = 180;

function waitForMockResponse(signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason ?? new DOMException("Request aborted", "AbortError"));
      return;
    }

    const handleAbort = () => {
      globalThis.clearTimeout(timeoutId);
      reject(signal?.reason ?? new DOMException("Request aborted", "AbortError"));
    };
    const timeoutId = globalThis.setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);
      resolve();
    }, MOCK_LATENCY_MS);

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}

function getUser(userId: string) {
  const user = mockUsers.find((candidate) => candidate.id === userId);

  if (!user) {
    throw new Error(`Mock fixture is missing user ${userId}.`);
  }

  return user;
}

function getCategory(categoryId: string) {
  const category = mockCategories.find(
    (candidate) => candidate.id === categoryId,
  );

  if (!category) {
    throw new Error(`Mock fixture is missing category ${categoryId}.`);
  }

  return category;
}

function getFoundItem(itemId: string) {
  const item = mockItems.find(
    (candidate): candidate is FoundItem =>
      candidate.id === itemId && candidate.type === "FOUND",
  );

  if (!item) {
    throw new Error(`Mock fixture is missing found item ${itemId}.`);
  }

  return item;
}

function withItemRelations(item: Item): ItemWithRelations {
  return {
    ...item,
    category: getCategory(item.categoryId),
    reporter: getUser(item.reporterId),
  };
}

function withClaimRelations(claim: Claim): ClaimWithRelations {
  return {
    ...claim,
    item: getFoundItem(claim.itemId),
    claimer: getUser(claim.claimerId),
  };
}

function paginate<T>(
  data: T[],
  requestedPage = 1,
  requestedPageSize = DEFAULT_PAGE_SIZE,
): PaginatedResult<T> {
  const pageSize = Math.max(1, requestedPageSize);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (page - 1) * pageSize;

  return {
    data: data.slice(start, start + pageSize),
    page,
    pageSize,
    total: data.length,
    totalPages,
  };
}

function includesSearch(value: string, search: string) {
  return value.toLocaleLowerCase("en").includes(search);
}

export async function getItems(
  filters: ItemFilters = {},
  options: MockRequestOptions = {},
) {
  await waitForMockResponse(options.signal);
  const search = filters.search?.trim().toLocaleLowerCase("en") ?? "";

  const items = mockItems
    .filter((item) => !filters.type || item.type === filters.type)
    .filter((item) => !filters.status || item.status === filters.status)
    .filter(
      (item) =>
        !filters.categoryId || item.categoryId === filters.categoryId,
    )
    .filter((item) => {
      if (!search) return true;

      const reporter = getUser(item.reporterId);
      const category = getCategory(item.categoryId);

      return [item.title, item.description, item.location, reporter.name, category.name].some(
        (value) => includesSearch(value, search),
      );
    })
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .map(withItemRelations);

  return paginate(items, filters.page, filters.pageSize);
}

export async function getItemById(
  itemId: Item["id"],
  options: MockRequestOptions = {},
) {
  await waitForMockResponse(options.signal);
  const item = mockItems.find((candidate) => candidate.id === itemId);

  return item ? withItemRelations(item) : null;
}

export async function getClaims(
  filters: ClaimFilters = {},
  options: MockRequestOptions = {},
) {
  await waitForMockResponse(options.signal);
  const search = filters.search?.trim().toLocaleLowerCase("en") ?? "";

  const claims = mockClaims
    .filter((claim) => !filters.status || claim.status === filters.status)
    .map(withClaimRelations)
    .filter((claim) => {
      if (!search) return true;

      return [claim.item.title, claim.claimer.name, claim.claimer.email].some(
        (value) => includesSearch(value, search),
      );
    })
    .sort((left, right) => right.submittedAt.localeCompare(left.submittedAt));

  return paginate(claims, filters.page, filters.pageSize);
}

export async function getClaimById(
  claimId: Claim["id"],
  options: MockRequestOptions = {},
) {
  await waitForMockResponse(options.signal);
  const claim = mockClaims.find((candidate) => candidate.id === claimId);

  return claim ? withClaimRelations(claim) : null;
}

export async function getCategories(
  options: MockRequestOptions = {},
): Promise<CategorySummary[]> {
  await waitForMockResponse(options.signal);

  return mockCategories.map((category) => ({
    ...category,
    itemCount: mockItems.filter((item) => item.categoryId === category.id).length,
  }));
}

export async function getUsers(
  filters: UserFilters = {},
  options: MockRequestOptions = {},
) {
  await waitForMockResponse(options.signal);
  const search = filters.search?.trim().toLocaleLowerCase("en") ?? "";

  const users = mockUsers
    .filter((user) => !filters.role || user.role === filters.role)
    .filter((user) => {
      if (!search) return true;

      return [user.name, user.email, user.department].some((value) =>
        includesSearch(value, search),
      );
    })
    .sort((left, right) => left.name.localeCompare(right.name));

  return paginate(users, filters.page, filters.pageSize);
}

export async function getAdminOverview(
  options: MockRequestOptions = {},
): Promise<AdminOverview> {
  await waitForMockResponse(options.signal);

  const recentItems = [...mockItems]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, 5)
    .map(withItemRelations);
  const pendingClaimItems = mockClaims
    .filter((claim) => claim.status === "PENDING")
    .sort((left, right) => right.submittedAt.localeCompare(left.submittedAt))
    .slice(0, 5)
    .map(withClaimRelations);

  return {
    activeLostItems: mockItems.filter(
      (item) => item.type === "LOST" && item.status === "ACTIVE",
    ).length,
    availableFoundItems: mockItems.filter(
      (item) => item.type === "FOUND" && item.status === "AVAILABLE",
    ).length,
    pendingClaims: mockClaims.filter((claim) => claim.status === "PENDING")
      .length,
    recentlyReturnedItems: mockItems.filter(
      (item) => item.type === "FOUND" && item.status === "RETURNED",
    ).length,
    recentItems,
    pendingClaimItems,
  };
}

export type { MockRequestOptions };
