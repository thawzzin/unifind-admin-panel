import { UsersRound } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export const metadata: Metadata = { title: "Users" };

export default function UsersPage() {
  return (
    <ModulePlaceholder
      title="Users"
      description="Find the students, staff, and administrators who participate in UniFind."
      icon={UsersRound}
    />
  );
}
