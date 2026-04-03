import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { Nav } from "@/components/layout/Nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
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

describe("Nav", () => {
  it("renders scroll anchors and segmented schedule + client portal links", () => {
    const book = "https://example.com/book";
    const portal = "https://example.com/portal";
    const html = renderToStaticMarkup(
      <Nav bookingUrl={book} clientPortalUrl={portal} compact={false} />,
    );

    expect(html).toContain('href="/#home"');
    expect(html).toContain('href="/#about"');
    expect(html).toContain('href="/#services"');
    expect(html).toContain('href="/#rates"');
    expect(html).toContain('href="/#getting-started"');
    expect(html).toContain('href="/#blog"');
    expect(html).toContain('href="/#resources"');
    expect(html).toContain(`href="${book}"`);
    expect(html).toContain(`href="${portal}"`);
    expect(html).toContain('href="/#contact"');
    expect(html).toContain("target=\"_blank\"");
    expect(html).toContain('rel="noreferrer"');
  });
});
