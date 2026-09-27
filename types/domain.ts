export const roles = ["STUDENT", "STAFF", "ADMIN"] as const;
export type Role = (typeof roles)[number];

export const itemTypes = ["LOST", "FOUND"] as const;
export type ItemType = (typeof itemTypes)[number];

export const lostItemStatuses = ["ACTIVE", "RECOVERED"] as const;
export type LostItemStatus = (typeof lostItemStatuses)[number];

export const foundItemStatuses = ["AVAILABLE", "RETURNED"] as const;
export type FoundItemStatus = (typeof foundItemStatuses)[number];

export type ItemStatus = LostItemStatus | FoundItemStatus;

export const claimStatuses = ["PENDING", "APPROVED", "REJECTED"] as const;
export type ClaimStatus = (typeof claimStatuses)[number];

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  joinedAt: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

type BaseItem = {
  id: string;
  title: string;
  description: string;
  categoryId: Category["id"];
  location: string;
  itemDate: string;
  reporterId: User["id"];
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
};

export type LostItem = BaseItem & {
  type: "LOST";
  status: LostItemStatus;
  color?: string;
  brand?: string;
  reward?: string;
};

export type FoundItem = BaseItem & {
  type: "FOUND";
  status: FoundItemStatus;
  storedAt?: string;
  hiddenIdentifyingDetails?: string;
};

export type Item = LostItem | FoundItem;

export type Claim = {
  id: string;
  itemId: FoundItem["id"];
  claimerId: User["id"];
  status: ClaimStatus;
  ownershipEvidence: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedById?: User["id"];
};

export type ItemWithRelations = Item & {
  category: Category;
  reporter: User;
};

export type ClaimWithRelations = Claim & {
  item: FoundItem;
  claimer: User;
};

export type CategorySummary = Category & {
  itemCount: number;
};

export type PaginatedResult<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ItemFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: ItemType;
  status?: ItemStatus;
  categoryId?: Category["id"];
};

export type ClaimFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ClaimStatus;
};

export type UserFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: Role;
};

export type AdminOverview = {
  activeLostItems: number;
  availableFoundItems: number;
  pendingClaims: number;
  recentlyReturnedItems: number;
  recentItems: ItemWithRelations[];
  pendingClaimItems: ClaimWithRelations[];
};
