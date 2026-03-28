import Link from "next/link";

import { cn, uniqueValues } from "@/lib/utils";

export function CategoryFilter({
  categories,
  activeCategory,
  basePath,
  queryKey = "category",
}: {
  categories: string[];
  activeCategory?: string;
  basePath: string;
  queryKey?: string;
}) {
  const allHref = basePath;
  const safeCategories = uniqueValues(categories);

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={allHref}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          !activeCategory
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground hover:text-foreground",
        )}
      >
        All
      </Link>
      {safeCategories.map((category) => (
        <Link
          key={category}
          href={`${basePath}?${queryKey}=${encodeURIComponent(category)}`}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:text-foreground",
          )}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
