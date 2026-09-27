import type {
  ClaimFilters,
  ItemFilters,
  UserFilters,
} from "@/types/domain";

export const adminQueryKeys = {
  all: ["admin"] as const,
  overview: () => [...adminQueryKeys.all, "overview"] as const,
  items: () => [...adminQueryKeys.all, "items"] as const,
  itemList: (filters: ItemFilters) =>
    [...adminQueryKeys.items(), "list", filters] as const,
  itemDetail: (itemId: string) =>
    [...adminQueryKeys.items(), "detail", itemId] as const,
  claims: () => [...adminQueryKeys.all, "claims"] as const,
  claimList: (filters: ClaimFilters) =>
    [...adminQueryKeys.claims(), "list", filters] as const,
  claimDetail: (claimId: string) =>
    [...adminQueryKeys.claims(), "detail", claimId] as const,
  categories: () => [...adminQueryKeys.all, "categories"] as const,
  users: () => [...adminQueryKeys.all, "users"] as const,
  userList: (filters: UserFilters) =>
    [...adminQueryKeys.users(), "list", filters] as const,
};
