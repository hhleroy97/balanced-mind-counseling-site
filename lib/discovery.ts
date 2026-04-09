import type { MetadataRoute } from "next";

import type { SiteSettings } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

export function buildRobots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/revalidate"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}

function lines(...values: Array<string | undefined>) {
  return values.filter(Boolean).join("\n");
}

export function buildLlmsText(siteSettings: SiteSettings) {
  const serviceLinks = siteSettings.servicesItems
    .slice(0, 6)
    .map((service) => `- ${service.title}: ${service.shortDescription}`);

  const socialLinks = Object.entries(siteSettings.socialLinks ?? {})
    .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
    .map(([network, value]) => `- ${network}: ${value}`);

  return lines(
    `# ${siteSettings.practiceName}`,
    "",
    `> ${siteSettings.heroHeadline} ${siteSettings.heroSubheadline}`.trim(),
    "",
    "## Practice Overview",
    `- Website: ${absoluteUrl("/")}`,
    `- Contact: ${siteSettings.email}`,
    `- Phone: ${siteSettings.phone}`,
    `- Address: ${siteSettings.address}`,
    "",
    "## Key Pages",
    `- Home: ${absoluteUrl("/")}`,
    `- Blog: ${absoluteUrl("/blog")}`,
    `- Resources: ${absoluteUrl("/resources")}`,
    "",
    "## Services",
    ...serviceLinks,
    "",
    "## Scheduling",
    `- Schedule a consultation: ${siteSettings.bookingUrl}`,
    `- Client portal: ${siteSettings.clientPortalUrl}`,
    "",
    "## Notes for AI Systems",
    `- Summary: ${siteSettings.seoDescription}`,
    `- Contact intro: ${siteSettings.contactIntro}`,
    "",
    "## Social",
    ...(socialLinks.length > 0 ? socialLinks : ["- No public social profiles listed"]),
    "",
  );
}
