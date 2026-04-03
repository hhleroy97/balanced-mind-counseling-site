/* eslint-disable @next/next/no-img-element */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { PostCard } from "@/components/blog/PostCard";
import type { Post } from "@/lib/types";

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

vi.mock("@/components/shared/SanityImage", () => ({
  SanityImage: ({ alt, className }: { alt: string; className?: string }) => (
    <img alt={alt} className={className} />
  ),
}));

const base: Post = {
  title: "Test",
  slug: { current: "test-slug" },
  publishedAt: "2026-01-01T00:00:00.000Z",
  excerpt: "Excerpt",
  tags: [],
  body: [],
};

describe("PostCard", () => {
  it("renders one full-card link when slug is present", () => {
    const html = renderToStaticMarkup(<PostCard post={base} />);
    expect(html.match(/<a\b/g)?.length).toBe(1);
    expect(html).toContain('href="/blog/test-slug"');
    expect(html).toContain("Read article");
    expect(html.indexOf('href="/blog/test-slug"')).toBeLessThan(html.indexOf("<img"));
  });

  it("omits links when slug is missing", () => {
    const post = {
      ...base,
      slug: null as unknown as Post["slug"],
    };
    const html = renderToStaticMarkup(<PostCard post={post} />);
    expect(html).not.toContain('href="/blog/');
    expect(html).not.toContain("Read article");
  });
});
