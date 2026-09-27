import { FolderKanban } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export const metadata: Metadata = { title: "Items" };

export default function ItemsPage() {
  return (
    <ModulePlaceholder
      title="Items"
      description="Review lost and found reports across campus from one operational workspace."
      icon={FolderKanban}
    />
  );
}
