import type { MetadataRoute } from "next";

import { getPostSlugs, getResourceSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, resourceSlugs] = await Promise.all([
    getPostSlugs(),
    getResourceSlugs(),
  ]);

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/resources"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...postSlugs.map((slug) => ({
      url: absoluteUrl(`/blog/${slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...resourceSlugs.map((slug) => ({
      url: absoluteUrl(`/resources/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
