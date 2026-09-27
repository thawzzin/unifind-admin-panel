import { Tags } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <ModulePlaceholder
      title="Categories"
      description="Maintain the shared categories used to organize campus item reports."
      icon={Tags}
    />
  );
}
