import type { LucideIcon } from "lucide-react";

export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <section aria-labelledby="page-title">
      <div className="border-b pb-5">
        <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-accent uppercase">
          UniFind operations
        </p>
        <h1
          id="page-title"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          {description}
        </p>
      </div>

      <div className="mt-6 flex min-h-72 items-center justify-center border border-dashed bg-surface px-6 py-12 text-center sm:min-h-80">
        <div className="max-w-sm">
          <span className="mx-auto grid size-11 place-items-center rounded-md bg-accent-subtle text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-base font-semibold text-foreground">
            {title} workspace
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            This area is ready for its dedicated MVP phase. No feature data or
            workflows have been added yet.
          </p>
        </div>
      </div>
    </section>
  );
}
