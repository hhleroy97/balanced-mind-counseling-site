/* eslint-disable @next/next/no-img-element */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/sections/Hero";
import { mockSiteSettings } from "@/lib/mock-data";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, tag) =>
        ({ children, ...props }: React.HTMLAttributes<HTMLElement>) =>
          React.createElement(tag as string, props, children),
    },
  ),
}));

vi.mock("@/components/layout/useHeroChrome", () => ({
  useHeroChrome: () => ({
    isCompact: false,
  }),
}));

describe("Hero", () => {
  it("renders the CMS-managed headline hierarchy and landing actions", () => {
    const html = renderToStaticMarkup(<Hero siteSettings={mockSiteSettings} />);

    expect(html).toContain(mockSiteSettings.heroHeadline);
    expect(html).toContain(mockSiteSettings.heroSubheadline);
    expect(html).toContain(mockSiteSettings.tagline);
    expect(html).toContain(`${mockSiteSettings.practiceName} logo`);
    expect(html).toContain(`href="${mockSiteSettings.bookingUrl}"`);
    expect(html).toContain(`href="${mockSiteSettings.clientPortalUrl}"`);
    expect(html).toContain(mockSiteSettings.phone);
    expect(html).toContain(mockSiteSettings.email);
    expect(html).toContain('href="/#contact"');
  });
});
