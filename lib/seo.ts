import type { Metadata } from "next";

import type { Post, Resource, SiteSettings } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

type SearchParamValue = string | string[] | null | undefined;

const DEFAULT_SEO_TERMS = [
  "therapy",
  "counseling",
  "mental health",
  "wellness",
  "blog",
  "resources",
];

function normalizeKeyword(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function compactText(value: string, maxLength: number) {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const compact = normalized.slice(0, maxLength + 1);
  const boundary = compact.lastIndexOf(" ");
  const truncated = boundary > 0 ? compact.slice(0, boundary) : compact.slice(0, maxLength);
  return `${truncated.trim()}...`;
}

function compactDescription(...parts: Array<string | undefined>) {
  const value = parts
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");

  return compactText(value, 160);
}

export function extractAddressFragment(address?: string) {
  if (!address) {
    return "";
  }

  return address
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");
}

export function buildCompositeTitle(primary: string, secondary?: string) {
  const left = primary.trim();
  const right = secondary?.trim();

  if (!left) {
    return right ?? "";
  }

  if (!right) {
    return left;
  }

  return `${left} | ${compactText(right, 42)}`;
}

export function buildKeywords(...groups: Array<string | string[] | undefined>) {
  const values = groups.flatMap((group) => {
    if (!group) {
      return [];
    }

    return Array.isArray(group) ? group : [group];
  });

  return Array.from(
    new Set(
      values
        .map((value) => normalizeKeyword(value))
        .filter(Boolean),
    ),
  );
}

export function buildSiteKeywords(siteSettings: SiteSettings) {
  return buildKeywords(
    DEFAULT_SEO_TERMS,
    siteSettings.practiceName,
    siteSettings.tagline,
    siteSettings.heroHeadline,
    siteSettings.servicesHeading,
    siteSettings.blogHeading,
    siteSettings.resourcesHeading,
  );
}

export function buildHomeMetaDescription(siteSettings: SiteSettings) {
  const location = extractAddressFragment(siteSettings.address);

  return compactDescription(
    `${siteSettings.practiceName} offers therapy support for adults with intake, session, and schedule guidance.`,
    location ? `Serving clients from ${location}.` : undefined,
  );
}

export function buildBlogMetaDescription(siteSettings: SiteSettings) {
  return compactDescription(
    `${siteSettings.practiceName} shares therapy skills, session support, and practical mental health articles for adults.`,
    "Browse the blog and schedule your next step when you're ready.",
  );
}

export function buildResourcesMetaDescription(siteSettings: SiteSettings) {
  return compactDescription(
    `Explore therapy skills, intake tools, and session support resources for adults from ${siteSettings.practiceName}.`,
    "Find practical downloads and guidance you can use between sessions.",
  );
}

export function buildPostMetaDescription(post: Post, practiceName: string) {
  return compactDescription(
    post.seo?.description ?? post.excerpt,
    `${practiceName} shares therapy insights, session support, and practical skills for adults.`,
  );
}

export function buildResourceMetaDescription(resource: Resource, practiceName: string) {
  return compactDescription(
    resource.description,
    `Download therapy skills, intake support, and practical resources for adults from ${practiceName}.`,
  );
}

export function buildCanonicalPath(
  path: string,
  searchParams?: Record<string, SearchParamValue>,
) {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const params = new URLSearchParams();

  if (searchParams) {
    const entries = Object.entries(searchParams).sort(([left], [right]) =>
      left.localeCompare(right),
    );

    for (const [key, rawValue] of entries) {
      const values = Array.isArray(rawValue) ? rawValue : [rawValue];

      for (const value of values) {
        if (typeof value !== "string") {
          continue;
        }

        const normalized = value.trim();
        if (!normalized) {
          continue;
        }

        params.append(key, normalized);
      }
    }
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function buildOrganizationJsonLd(siteSettings: SiteSettings) {
  const sameAs = Object.values(siteSettings.socialLinks ?? {}).filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.practiceName,
    url: absoluteUrl(),
    description: siteSettings.seoDescription,
    email: siteSettings.email || undefined,
    telephone: siteSettings.phone || undefined,
    address: siteSettings.address || undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

export function buildWebsiteJsonLd(siteSettings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings.practiceName,
    url: absoluteUrl(),
    description: siteSettings.seoDescription,
  };
}

export function buildWebPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
  };
}

export function buildCollectionPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
  };
}

export function buildBlogPostingJsonLd(post: Post, practiceName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: buildPostMetaDescription(post, practiceName),
    url: absoluteUrl(`/blog/${post.slug.current}`),
    datePublished: post.publishedAt,
    keywords: buildKeywords(post.tags),
    author: {
      "@type": "Organization",
      name: practiceName,
    },
    publisher: {
      "@type": "Organization",
      name: practiceName,
    },
  };
}

export function buildResourceJsonLd(resource: Resource, practiceName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: resource.title,
    description: buildResourceMetaDescription(resource, practiceName),
    url: absoluteUrl(`/resources/${resource.slug.current}`),
    datePublished: resource.publishedAt,
    about: resource.category,
    keywords: buildKeywords(resource.category, resource.title, "resource"),
    author: {
      "@type": "Organization",
      name: practiceName,
    },
  };
}
