import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { CategoryFilter } from "@/components/resources/CategoryFilter";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { getFilteredResources, getResourceCategories, getSiteSettings } from "@/lib/content";
import {
  buildCanonicalPath,
  buildCollectionPageJsonLd,
  buildKeywords,
  buildResourcesMetaDescription,
} from "@/lib/seo";

type ResourcesPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: ResourcesPageProps): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const { category } = await searchParams;
  const canonicalPath = buildCanonicalPath("/resources", {
    ...(category ? { category } : {}),
  });
  const title = category
    ? `${siteSettings.resourcesHeading} - ${category}`
    : siteSettings.resourcesHeading;
  const description = buildResourcesMetaDescription(siteSettings);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    keywords: buildKeywords(
      siteSettings.practiceName,
      siteSettings.resourcesHeading,
      siteSettings.resourcesIntro,
      category,
      "resources",
    ),
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "website",
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const { category } = await searchParams;
  const [siteSettings, categories, resources] = await Promise.all([
    getSiteSettings(),
    getResourceCategories(),
    getFilteredResources(category),
  ]);
  const description = buildResourcesMetaDescription(siteSettings);

  return (
    <section className="site-page-x mx-auto w-full max-w-7xl space-y-8 pb-14 pt-[calc(var(--site-header-height)+1.5rem)] lg:pb-16 lg:pt-24">
      <JsonLd
        data={buildCollectionPageJsonLd({
          name: siteSettings.resourcesHeading,
          description,
          path: buildCanonicalPath("/resources", {
            ...(category ? { category } : {}),
          }),
        })}
      />
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
