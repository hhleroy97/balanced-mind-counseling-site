import { describe, expect, it } from "vitest";

import { HOME_NAV_SECTION_IDS } from "@/lib/home-section-nav";

describe("HOME_NAV_SECTION_IDS", () => {
  it("lists every in-page fold anchor used by the header", () => {
    expect(HOME_NAV_SECTION_IDS).toEqual([
      "home",
      "about",
      "services",
      "rates",
      "getting-started",
      "blog",
      "resources",
      "contact",
    ]);
  });
});
