import type { Metadata } from "next";

import { CategoryFilter } from "@/components/resources/CategoryFilter";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { getFilteredResources, getResourceCategories } from "@/lib/content";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Downloadable worksheets and therapy-informed resources for anxiety, CBT, DBT, and emotional wellness.",
};

type ResourcesPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const { category } = await searchParams;
  const [categories, resources] = await Promise.all([
    getResourceCategories(),
    getFilteredResources(category),
  ]);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-6 pb-14 pt-24 lg:px-8 lg:pb-16 lg:pt-24">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          Resources
        </p>
        <h1 className="max-w-3xl font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
          Practical worksheets and supportive tools for between sessions.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Free downloads for grounding, CBT reframing, DBT skills, and reflection.
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={category}
        basePath="/resources"
      />
      <ResourceGrid resources={resources} />
    </section>
  );
}
