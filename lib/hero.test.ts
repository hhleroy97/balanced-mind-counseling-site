import { describe, expect, it } from "vitest";

import { getHeroLogoThreshold, splitPracticeName } from "@/lib/hero";

describe("hero helpers", () => {
  it("splits the practice name for two-line display", () => {
    expect(splitPracticeName("Balanced Mind Counseling")).toEqual({
      firstLine: "Balanced Mind",
      secondLine: "Counseling",
    });
  });

  it("computes the scroll threshold after the hero logo", () => {
    expect(getHeroLogoThreshold(120, 88)).toBe(232);
  });
});
