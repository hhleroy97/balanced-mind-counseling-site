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
    <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-16 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Resources
        </p>
        <h1 className="max-w-3xl font-serif text-5xl tracking-tight text-foreground">
          Practical worksheets and supportive tools clients can use between
          sessions.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Explore free downloads for grounding, CBT reframing, DBT skills, and
          mental health reflection.
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
