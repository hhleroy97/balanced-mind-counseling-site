import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Lora: () => ({ variable: "--font-lora" }),
}));

vi.mock("next/script", () => ({
  default: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <script {...props}>{children}</script>
  ),
}));

vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("renders children and both analytics integrations", async () => {
    const markup = renderToStaticMarkup(
      await RootLayout({
        children: <div>Page content</div>,
      }),
    );

    expect(markup).toContain("Page content");
    expect(markup).toContain('data-testid="vercel-analytics"');
    expect(markup).toContain(
      "https://www.googletagmanager.com/gtag/js?id=G-D1TCWT3SNJ",
    );
    expect(markup).toContain("gtag('config', 'G-D1TCWT3SNJ');");
  });
});
