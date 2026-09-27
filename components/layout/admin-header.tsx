"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AdminBrand } from "@/components/layout/admin-brand";
import {
  AdminNavigation,
  getSectionName,
} from "@/components/layout/admin-navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AdminHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-surface/95 px-4 backdrop-blur-sm sm:px-6 lg:h-18 lg:px-8">
      <div className="flex w-full items-center gap-3">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="-ml-2 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="border-b px-5 py-4 pr-14">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate between UniFind administration areas.
              </SheetDescription>
              <AdminBrand />
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <p className="mb-2 px-3 text-[0.6875rem] font-semibold tracking-[0.14em] text-muted uppercase">
                Operations
              </p>
              <AdminNavigation onNavigate={() => setMobileMenuOpen(false)} />
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-3 rounded-md px-2 py-2">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  MT
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-sm font-medium">
                    Maya Thompson
                  </span>
                  <span className="block truncate text-xs text-muted">
                    Campus administrator
                  </span>
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground sm:text-base">
            {getSectionName(pathname)}
          </p>
          <p className="hidden text-xs text-muted sm:block">
            University lost and found operations
          </p>
        </div>

        <div className="flex items-center gap-2 border-l pl-3 sm:gap-3 sm:pl-4">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground lg:hidden">
            MT
          </span>
          <span className="hidden min-w-0 leading-tight md:block lg:hidden">
            <span className="block text-sm font-medium">Maya Thompson</span>
            <span className="block text-xs text-muted">Administrator</span>
          </span>
          <span className="hidden text-right leading-tight lg:block">
            <span className="block text-sm font-medium">Maya Thompson</span>
            <span className="block text-xs text-muted">Campus administrator</span>
          </span>
          <span className="hidden size-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground lg:grid">
            MT
          </span>
        </div>
      </div>
    </header>
  );
}
