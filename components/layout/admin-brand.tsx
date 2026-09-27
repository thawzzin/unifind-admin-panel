import { SearchCheck } from "lucide-react";
import Link from "next/link";

export function AdminBrand() {
  return (
    <Link
      href="/dashboard"
      className="inline-flex cursor-pointer items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      aria-label="UniFind Admin dashboard"
    >
      <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <SearchCheck className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-[0.9375rem] font-semibold tracking-tight text-foreground">
          UniFind
        </span>
        <span className="block text-xs font-medium text-muted">Admin panel</span>
      </span>
    </Link>
  );
}
