import { AdminHeader } from "@/components/layout/admin-header";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>
      <AdminSidebar />
      <div className="min-w-0 lg:pl-68">
        <AdminHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-[100rem] px-4 py-6 outline-none sm:px-6 sm:py-8 lg:px-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
