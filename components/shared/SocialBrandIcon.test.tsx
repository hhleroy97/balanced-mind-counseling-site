import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SocialBrandIcon } from "@/components/shared/SocialBrandIcon";

describe("SocialBrandIcon", () => {
  it("renders svg for known platforms", () => {
    const ig = renderToStaticMarkup(<SocialBrandIcon platform="instagram" />);
    expect(ig).toContain("<svg");
    expect(ig).toContain("viewBox=\"0 0 24 24\"");

    const fb = renderToStaticMarkup(<SocialBrandIcon platform="facebook" />);
    expect(fb).toContain("<svg");

    const li = renderToStaticMarkup(<SocialBrandIcon platform="linkedin" />);
    expect(li).toContain("<svg");

    const yt = renderToStaticMarkup(<SocialBrandIcon platform="youtube" />);
    expect(yt).toContain("<svg");
  });

  it("falls back to ExternalLink for unknown keys", () => {
    const html = renderToStaticMarkup(<SocialBrandIcon platform="unknown" />);
    expect(html).toContain("<svg");
  });
});
