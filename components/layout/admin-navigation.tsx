"use client";

import {
  FolderKanban,
  LayoutDashboard,
  ListChecks,
  Tags,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Items", href: "/items", icon: FolderKanban },
  { label: "Claims", href: "/claims", icon: ListChecks },
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Users", href: "/users", icon: UsersRound },
];

export function AdminNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="space-y-1">
      {navigationItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "group relative flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              isActive
                ? "bg-accent-subtle text-primary"
                : "text-slate-600 hover:bg-surface-subtle hover:text-foreground active:bg-border",
            )}
          >
            <span
              className={cn(
                "absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent transition-opacity",
                isActive ? "opacity-100" : "opacity-0",
              )}
              aria-hidden="true"
            />
            <Icon className="size-[1.125rem] shrink-0" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function getSectionName(pathname: string) {
  return (
    navigationItems.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.label ?? "Admin"
  );
}
