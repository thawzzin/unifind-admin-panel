import type { Category } from "@/types/domain";

export const mockCategories = [
  { id: "cat-electronics", name: "Electronics", createdAt: "2026-01-08T09:00:00Z" },
  { id: "cat-documents", name: "Documents", createdAt: "2026-01-08T09:05:00Z" },
  { id: "cat-clothing", name: "Clothing", createdAt: "2026-01-08T09:10:00Z" },
  { id: "cat-accessories", name: "Accessories", createdAt: "2026-01-08T09:15:00Z" },
  { id: "cat-keys", name: "Keys", createdAt: "2026-01-08T09:20:00Z" },
  { id: "cat-bags", name: "Bags", createdAt: "2026-01-08T09:25:00Z" },
  { id: "cat-wallets", name: "Wallets", createdAt: "2026-01-08T09:30:00Z" },
  { id: "cat-other", name: "Other", createdAt: "2026-01-08T09:35:00Z" },
] satisfies Category[];
