import { describe, expect, it } from "vitest";

import { sectionInnerClass, sectionOuterClass } from "@/lib/section-layout";

describe("section-layout", () => {
  it("uses full-viewport fold classes by default", () => {
    expect(sectionOuterClass(undefined)).toContain("site-fold-section");
    expect(sectionInnerClass(undefined)).toContain("site-fold-inner");
  });

  it("uses page stacking when variant is page", () => {
    expect(sectionOuterClass("page")).toContain("pt-24");
    expect(sectionInnerClass("page")).toBe("site-page-x");
    expect(sectionInnerClass("page")).not.toContain("site-fold-inner");
  });
});
