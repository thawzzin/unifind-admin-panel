import { AdminBrand } from "@/components/layout/admin-brand";
import { AdminNavigation } from "@/components/layout/admin-navigation";

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-68 border-r bg-surface lg:flex lg:flex-col">
      <div className="flex h-18 items-center border-b px-6">
        <AdminBrand />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-2 px-3 text-[0.6875rem] font-semibold tracking-[0.14em] text-muted uppercase">
          Operations
        </p>
        <AdminNavigation />
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            MT
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-medium text-foreground">
              Maya Thompson
            </span>
            <span className="block truncate text-xs text-muted">
              Campus administrator
            </span>
          </span>
        </div>
      </div>
    </aside>
  );
}
