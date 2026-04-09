import { afterEach, describe, expect, it, vi } from "vitest";

import { buildLlmsText, buildRobots } from "@/lib/discovery";
import { mockSiteSettings } from "@/lib/mock-data";

describe("site discovery helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds robots with sitemap and crawler exclusions", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://balancedmindcounseling.com");

    expect(buildRobots()).toEqual({
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/studio", "/api/revalidate"],
        },
      ],
      sitemap: "https://balancedmindcounseling.com/sitemap.xml",
      host: "https://balancedmindcounseling.com/",
    });
  });

  it("builds llms.txt content from current site data", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://balancedmindcounseling.com");

    const text = buildLlmsText(mockSiteSettings);

    expect(text).toContain(`# ${mockSiteSettings.practiceName}`);
    expect(text).toContain("## Practice Overview");
    expect(text).toContain("## Services");
    expect(text).toContain("## Scheduling");
    expect(text).toContain("https://balancedmindcounseling.com/blog");
    expect(text).toContain(mockSiteSettings.bookingUrl);
    expect(text).toContain(mockSiteSettings.servicesItems[0].title);
  });
});
