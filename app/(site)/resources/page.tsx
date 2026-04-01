import type { Metadata } from "next";

import { CategoryFilter } from "@/components/resources/CategoryFilter";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { getFilteredResources, getResourceCategories, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: siteSettings.resourcesHeading,
    description: siteSettings.resourcesIntro,
  };
}

type ResourcesPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const { category } = await searchParams;
  const [siteSettings, categories, resources] = await Promise.all([
    getSiteSettings(),
    getResourceCategories(),
    getFilteredResources(category),
  ]);

  return (
    <section className="site-page-x mx-auto w-full max-w-7xl space-y-8 pb-14 pt-24 lg:pb-16 lg:pt-24">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          {siteSettings.resourcesEyebrow}
        </p>
        <h1 className="max-w-3xl font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
          {siteSettings.resourcesHeading}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {siteSettings.resourcesIntro}
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
