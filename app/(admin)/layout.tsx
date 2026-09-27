import { AdminShell } from "@/components/layout/admin-shell";

export default function AdminLayout({ children }: LayoutProps<"/">) {
  return <AdminShell>{children}</AdminShell>;
}
