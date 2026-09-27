"use client";

import { useQuery } from "@tanstack/react-query";

import { adminQueryKeys } from "@/lib/query-keys";
import {
  getAdminOverview,
  getCategories,
  getClaimById,
  getClaims,
  getItemById,
  getItems,
  getUsers,
} from "@/services/mock-admin-service";
import type {
  ClaimFilters,
  ItemFilters,
  UserFilters,
} from "@/types/domain";

export function useAdminOverview() {
  return useQuery({
    queryKey: adminQueryKeys.overview(),
    queryFn: ({ signal }) => getAdminOverview({ signal }),
  });
}

export function useItems(filters: ItemFilters = {}) {
  return useQuery({
    queryKey: adminQueryKeys.itemList(filters),
    queryFn: ({ signal }) => getItems(filters, { signal }),
  });
}

export function useItem(itemId: string) {
  return useQuery({
    queryKey: adminQueryKeys.itemDetail(itemId),
    queryFn: ({ signal }) => getItemById(itemId, { signal }),
    enabled: Boolean(itemId),
  });
}

export function useClaims(filters: ClaimFilters = {}) {
  return useQuery({
    queryKey: adminQueryKeys.claimList(filters),
    queryFn: ({ signal }) => getClaims(filters, { signal }),
  });
}

export function useClaim(claimId: string) {
  return useQuery({
    queryKey: adminQueryKeys.claimDetail(claimId),
    queryFn: ({ signal }) => getClaimById(claimId, { signal }),
    enabled: Boolean(claimId),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: adminQueryKeys.categories(),
    queryFn: ({ signal }) => getCategories({ signal }),
  });
}

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: adminQueryKeys.userList(filters),
    queryFn: ({ signal }) => getUsers(filters, { signal }),
  });
}
