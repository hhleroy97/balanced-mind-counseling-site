/* eslint-disable @next/next/no-img-element */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { About } from "@/components/sections/About";
import { mockSiteSettings } from "@/lib/mock-data";

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

vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

vi.mock("@/components/shared/BotanicalAccent", () => ({
  BotanicalAccent: ({ className }: { className?: string }) => (
    <div aria-hidden="true" className={className} />
  ),
}));

vi.mock("@/components/shared/SanityImage", () => ({
  SanityImage: ({ alt, className }: { alt: string; className?: string }) => (
    <img alt={alt} className={className} />
  ),
}));

describe("About", () => {
  it("renders CMS-managed practice, contact, and social details", () => {
    const html = renderToStaticMarkup(<About siteSettings={mockSiteSettings} />);

    expect(html).toContain(mockSiteSettings.practiceName);
    expect(html).toContain(mockSiteSettings.tagline);
    expect(html).toContain(mockSiteSettings.seoDescription);
    expect(html).toContain(mockSiteSettings.email);
    expect(html).toContain(mockSiteSettings.phone);
    expect(html).toContain(mockSiteSettings.address);
    expect(html).toContain(`href="${mockSiteSettings.bookingUrl}"`);
    expect(html).toContain(`href="${mockSiteSettings.clientPortalUrl}"`);
    expect(html).toContain('href="/#contact"');
    expect(html).toContain('href="https://instagram.com"');
    expect(html).toContain('href="https://linkedin.com"');
    expect(html).toContain(
      "I offer warm, evidence-informed therapy for adults navigating anxiety, grief, stress, and relationship challenges.",
    );
  });
});
