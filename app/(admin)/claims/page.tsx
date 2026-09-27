import { ListChecks } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export const metadata: Metadata = { title: "Claims" };

export default function ClaimsPage() {
  return (
    <ModulePlaceholder
      title="Claims"
      description="Review ownership claims and keep verification decisions clear and accountable."
      icon={ListChecks}
    />
  );
}
