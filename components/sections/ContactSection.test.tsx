import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ContactSection } from "@/components/sections/ContactSection";
import { mockSiteSettings } from "@/lib/mock-data";

vi.mock("@/components/contact/ContactForm", () => ({
  ContactForm: () => <form data-testid="contact-form" />,
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

describe("ContactSection", () => {
  it("omits Instagram and LinkedIn from social pills while keeping other networks", () => {
    const siteSettings = {
      ...mockSiteSettings,
      socialLinks: {
        instagram: "https://instagram.com/example",
        linkedin: "https://linkedin.com/in/example",
        facebook: "https://facebook.com/example",
      },
    };

    const html = renderToStaticMarkup(<ContactSection siteSettings={siteSettings} />);

    expect(html).not.toContain("instagram.com");
    expect(html).not.toContain("linkedin.com");
    expect(html).toContain('href="https://facebook.com/example"');
  });
});
