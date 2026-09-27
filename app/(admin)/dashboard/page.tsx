import { LayoutDashboard } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function DashboardPage() {
  return (
    <ModulePlaceholder
      title="Dashboard"
      description="A focused view of reports, claims, and returns that need administrative attention."
      icon={LayoutDashboard}
    />
  );
}
