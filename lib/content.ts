import {
  mockPosts,
  mockResources,
  mockServices,
  mockSiteSettings,
  mockTestimonials,
} from "@/lib/mock-data";
import { uniqueValues } from "@/lib/utils";
import type {
  CopyCard,
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

function postSlugCurrent(post: Post): string | null {
  const raw = post.slug?.current;
  const current = typeof raw === "string" ? raw.trim() : "";
  return current.length > 0 ? current : null;
}

function normalizePost(post: Post): Post | null {
  const current = postSlugCurrent(post);
  if (!current) {
    return null;
  }

  return {
    ...post,
    slug: { current },
    tags: normalizeTags(post.tags),
  };
}

function normalizeResource(resource: Resource): Resource | null {
  const raw = resource.slug?.current;
  const current = typeof raw === "string" ? raw.trim() : "";
  if (!current) {
    return null;
  }

  return { ...resource, slug: { current } };
}

function normalizeService(service: Service): Service | null {
  const raw = service.slug?.current;
  const current = typeof raw === "string" ? raw.trim() : "";
  if (!current) {
    return null;
  }

  const icon =
    typeof service.icon === "string" && service.icon.trim() ? service.icon.trim() : "Leaf";

  return { ...service, slug: { current }, icon };
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

function mergeCopyCards(value: unknown, fallback: CopyCard[]): CopyCard[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((raw) => {
    const item = raw as {
      title?: string;
      description?: string;
      icon?: string;
      image?: unknown;
    };
    const icon = typeof item.icon === "string" && item.icon.trim() ? item.icon.trim() : undefined;
    return {
      title: typeof item.title === "string" ? item.title : "",
      description: typeof item.description === "string" ? item.description : "",
      ...(icon ? { icon } : {}),
      ...(item.image ? { image: item.image } : {}),
    };
  });
}

function withSiteSettingsFallbacks(siteSettings: SiteSettings): SiteSettings {
  const s = siteSettings;
  const m = mockSiteSettings;

  return {
    ...m,
    ...s,
    practiceName: s.practiceName || m.practiceName,
    tagline: s.tagline || m.tagline,
    heroHeadline: s.heroHeadline || m.heroHeadline,
    heroSubheadline: s.heroSubheadline || m.heroSubheadline,
    bio: s.bio?.length ? s.bio : m.bio,
    email: s.email || m.email,
    phone: s.phone || m.phone,
    address: s.address || m.address,
    seoDescription: s.seoDescription || m.seoDescription,
    bookingUrl: envBookingUrl || s.bookingUrl || m.bookingUrl,
    clientPortalUrl: envClientPortalUrl || s.clientPortalUrl || m.clientPortalUrl,
    socialLinks: {
      ...m.socialLinks,
      ...(s.socialLinks ?? {}),
    },

    aboutEyebrow: s.aboutEyebrow || m.aboutEyebrow,
    aboutHeading: s.aboutHeading || m.aboutHeading,
    aboutLead: s.aboutLead || m.aboutLead,
    aboutSupporting: s.aboutSupporting || m.aboutSupporting,
    aboutPortraitTitle:
      typeof s.aboutPortraitTitle === "string" && s.aboutPortraitTitle.trim()
        ? s.aboutPortraitTitle.trim()
        : s.practiceName || m.practiceName,
    aboutPortraitSubtitle:
      typeof s.aboutPortraitSubtitle === "string" ? s.aboutPortraitSubtitle.trim() : "",
    connectHeading: s.connectHeading || m.connectHeading,
    contactDetailsLabel: s.contactDetailsLabel || m.contactDetailsLabel,

    servicesEyebrow: s.servicesEyebrow || m.servicesEyebrow,
    servicesHeading: s.servicesHeading || m.servicesHeading,
    servicesIntro: s.servicesIntro || m.servicesIntro,

    ratesEyebrow: s.ratesEyebrow || m.ratesEyebrow,
    ratesHeading: s.ratesHeading || m.ratesHeading,
    ratesIntro: s.ratesIntro || m.ratesIntro,
    ratesItems: mergeCopyCards(s.ratesItems, m.ratesItems),

    gettingStartedEyebrow: s.gettingStartedEyebrow || m.gettingStartedEyebrow,
    gettingStartedHeading: s.gettingStartedHeading || m.gettingStartedHeading,
    gettingStartedSteps: mergeCopyCards(s.gettingStartedSteps, m.gettingStartedSteps),

    blogEyebrow: s.blogEyebrow || m.blogEyebrow,
    blogHeading: s.blogHeading || m.blogHeading,
    blogIntro: s.blogIntro || m.blogIntro,

    resourcesEyebrow: s.resourcesEyebrow || m.resourcesEyebrow,
    resourcesHeading: s.resourcesHeading || m.resourcesHeading,
    resourcesIntro: s.resourcesIntro || m.resourcesIntro,

    contactEyebrow: s.contactEyebrow || m.contactEyebrow,
    contactHeading: s.contactHeading || m.contactHeading,
    contactIntro: s.contactIntro || m.contactIntro,

    blogPageEyebrow: s.blogPageEyebrow || m.blogPageEyebrow,
    blogPageHeading: s.blogPageHeading || m.blogPageHeading,
    blogPageIntro: s.blogPageIntro || m.blogPageIntro,

    resourcesPageEyebrow: s.resourcesPageEyebrow || m.resourcesPageEyebrow,
    resourcesPageHeading: s.resourcesPageHeading || m.resourcesPageHeading,
    resourcesPageIntro: s.resourcesPageIntro || m.resourcesPageIntro,

    contactPageEyebrow: s.contactPageEyebrow || m.contactPageEyebrow,
    contactPageHeading: s.contactPageHeading || m.contactPageHeading,
    contactPageIntro: s.contactPageIntro || m.contactPageIntro,

    resourceDetailDownloadHeading:
      s.resourceDetailDownloadHeading || m.resourceDetailDownloadHeading,
    resourceDetailDownloadBody: s.resourceDetailDownloadBody || m.resourceDetailDownloadBody,
    resourceDetailNoFileMessage: s.resourceDetailNoFileMessage || m.resourceDetailNoFileMessage,

    footerBlurb: s.footerBlurb || m.footerBlurb,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const siteSettings = (await safeFetch<SiteSettings>(siteSettingsQuery)) ?? mockSiteSettings;
  return withSiteSettingsFallbacks(siteSettings);
}

export async function getServices(): Promise<Service[]> {
  const services = await safeFetch<Service[]>(servicesQuery);
  const list = services?.length ? services : mockServices;
  return list.map(normalizeService).filter((s): s is Service => s !== null);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await safeFetch<Testimonial[]>(testimonialsQuery);
  return testimonials?.length ? testimonials : mockTestimonials;
}

export async function getPosts(): Promise<Post[]> {
  const posts = await safeFetch<Post[]>(postsQuery);
  const list = posts?.length ? posts : mockPosts;
  return list.map(normalizePost).filter((p): p is Post => p !== null);
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
  const list = resources?.length ? resources : mockResources;
  return list.map(normalizeResource).filter((r): r is Resource => r !== null);
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const resource = await safeFetch<Resource>(resourceBySlugQuery, { slug });
  if (resource) {
    return normalizeResource(resource);
  }

  const fallback = mockResources.find((entry) => entry.slug.current === slug) ?? null;
  return fallback ? normalizeResource(fallback) : null;
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
