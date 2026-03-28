import {
  mockPosts,
  mockResources,
  mockServices,
  mockSiteSettings,
  mockTestimonials,
} from "@/lib/mock-data";
import { uniqueValues } from "@/lib/utils";
import type {
  Post,
  Resource,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/types";
import { client, isSanityEnabled } from "@/sanity/lib/client";
import {
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  resourceBySlugQuery,
  resourceSlugsQuery,
  resourcesQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";

const BLOG_PAGE_SIZE = 6;
const envBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
const envClientPortalUrl = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL;

function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizePost(post: Post): Post {
  return {
    ...post,
    tags: normalizeTags(post.tags),
  };
}

async function safeFetch<T>(query: string, params?: Record<string, string>) {
  if (!client || !isSanityEnabled) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params ?? {});
  } catch {
    return null;
  }
}

function withSiteSettingsFallbacks(siteSettings: SiteSettings): SiteSettings {
  return {
    ...siteSettings,
    bookingUrl: envBookingUrl || siteSettings.bookingUrl || mockSiteSettings.bookingUrl,
    clientPortalUrl:
      envClientPortalUrl ||
      siteSettings.clientPortalUrl ||
      mockSiteSettings.clientPortalUrl,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const siteSettings = (await safeFetch<SiteSettings>(siteSettingsQuery)) ?? mockSiteSettings;
  return withSiteSettingsFallbacks(siteSettings);
}

export async function getServices(): Promise<Service[]> {
  const services = await safeFetch<Service[]>(servicesQuery);
  return services?.length ? services : mockServices;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await safeFetch<Testimonial[]>(testimonialsQuery);
  return testimonials?.length ? testimonials : mockTestimonials;
}

export async function getPosts(): Promise<Post[]> {
  const posts = await safeFetch<Post[]>(postsQuery);
  return posts?.length ? posts.map(normalizePost) : mockPosts.map(normalizePost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await safeFetch<Post>(postBySlugQuery, { slug });
  if (post) {
    return normalizePost(post);
  }

  const fallbackPost = mockPosts.find((entry) => entry.slug.current === slug) ?? null;
  return fallbackPost ? normalizePost(fallbackPost) : null;
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await safeFetch<string[]>(postSlugsQuery);
  if (slugs?.length) {
    return slugs;
  }

  return mockPosts.map((post) => post.slug.current);
}

export async function getResources(): Promise<Resource[]> {
  const resources = await safeFetch<Resource[]>(resourcesQuery);
  return resources?.length ? resources : mockResources;
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const resource = await safeFetch<Resource>(resourceBySlugQuery, { slug });
  if (resource) {
    return resource;
  }

  return mockResources.find((entry) => entry.slug.current === slug) ?? null;
}

export async function getResourceSlugs(): Promise<string[]> {
  const slugs = await safeFetch<string[]>(resourceSlugsQuery);
  if (slugs?.length) {
    return slugs;
  }

  return mockResources.map((resource) => resource.slug.current);
}

export async function getPostTags() {
  const posts = await getPosts();
  return uniqueValues(posts.flatMap((post) => normalizeTags(post.tags)));
}

export async function getResourceCategories() {
  const resources = await getResources();
  return uniqueValues(resources.map((resource) => resource.category));
}

export async function getBlogPageData(options?: {
  page?: number;
  tag?: string;
}) {
  const posts = await getPosts();
  const filteredPosts = options?.tag
    ? posts.filter((post) => normalizeTags(post.tags).includes(options.tag!))
    : posts;

  const page = Math.max(options?.page ?? 1, 1);
  const totalPages = Math.max(Math.ceil(filteredPosts.length / BLOG_PAGE_SIZE), 1);
  const start = (page - 1) * BLOG_PAGE_SIZE;
  const paginatedPosts = filteredPosts.slice(start, start + BLOG_PAGE_SIZE);

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: Math.min(page, totalPages),
    totalPosts: filteredPosts.length,
  };
}

export async function getFilteredResources(category?: string) {
  const resources = await getResources();
  if (!category) {
    return resources;
  }

  return resources.filter((resource) => resource.category === category);
}
