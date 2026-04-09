import { afterEach, describe, expect, it, vi } from "vitest";

import { mockPosts, mockResources, mockSiteSettings } from "@/lib/mock-data";
import {
  buildBlogPostingJsonLd,
  buildBlogMetaDescription,
  buildCanonicalPath,
  buildCompositeTitle,
  buildHomeMetaDescription,
  buildOrganizationJsonLd,
  buildPostMetaDescription,
  buildResourceJsonLd,
  buildResourceMetaDescription,
  buildResourcesMetaDescription,
  buildSiteKeywords,
  extractAddressFragment,
} from "@/lib/seo";

describe("seo helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds stable canonical paths from search params", () => {
    expect(
      buildCanonicalPath("/blog", {
        tag: "anxiety",
        page: "2",
        empty: "",
        ignore: undefined,
      }),
    ).toBe("/blog?page=2&tag=anxiety");
  });

  it("builds composite titles without overlong suffixes", () => {
    expect(buildCompositeTitle("Balanced Mind Counseling", "Warm, modern therapy services")).toBe(
      "Balanced Mind Counseling | Warm, modern therapy services",
    );

    expect(
      buildCompositeTitle(
        "Balanced Mind Counseling",
        "A much longer supporting phrase that should be compacted for cleaner metadata titles",
      ),
    ).toBe("Balanced Mind Counseling | A much longer supporting phrase that...");
  });

  it("includes site url and contact data in organization schema", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://balancedmindcounseling.com");

    expect(buildOrganizationJsonLd(mockSiteSettings)).toMatchObject({
      "@type": "Organization",
      name: mockSiteSettings.practiceName,
      url: "https://balancedmindcounseling.com/",
      email: mockSiteSettings.email,
      telephone: mockSiteSettings.phone,
    });
  });

  it("builds keywords from current site fields", () => {
    expect(buildSiteKeywords(mockSiteSettings)).toEqual(
      expect.arrayContaining([
        "therapy",
        "counseling",
        mockSiteSettings.practiceName,
        mockSiteSettings.heroHeadline,
      ]),
    );
  });

  it("builds focused meta descriptions from brand and location data", () => {
    expect(extractAddressFragment("19901 W Catawba Ave, Suite 102B, Cornelius, NC")).toBe(
      "19901 W Catawba Ave, Suite 102B",
    );

    expect(buildHomeMetaDescription({
      ...mockSiteSettings,
      address: "19435 Torrence Chapel Rd, Suite 102B, Cornelius, NC 28031",
    })).toContain("Serving clients from 19435 Torrence Chapel Rd, Suite 102B.");

    expect(buildBlogMetaDescription(mockSiteSettings)).toContain("therapy skills");
    expect(buildResourcesMetaDescription(mockSiteSettings)).toContain("intake tools");
    expect(buildPostMetaDescription(mockPosts[0], mockSiteSettings.practiceName)).toContain(
      "therapy insights",
    );
    expect(
      buildResourceMetaDescription(mockResources[0], mockSiteSettings.practiceName),
    ).toContain("intake support");
  });

  it("builds article and resource json-ld with canonical urls", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://balancedmindcounseling.com");

    expect(buildBlogPostingJsonLd(mockPosts[0], mockSiteSettings.practiceName)).toMatchObject({
      "@type": "BlogPosting",
      description: buildPostMetaDescription(mockPosts[0], mockSiteSettings.practiceName),
      url: "https://balancedmindcounseling.com/blog/lorem-grounding",
    });

    expect(buildResourceJsonLd(mockResources[0], mockSiteSettings.practiceName)).toMatchObject({
      "@type": "CreativeWork",
      description: buildResourceMetaDescription(
        mockResources[0],
        mockSiteSettings.practiceName,
      ),
      url: "https://balancedmindcounseling.com/resources/lorem-worksheet-alpha",
    });
  });
});
