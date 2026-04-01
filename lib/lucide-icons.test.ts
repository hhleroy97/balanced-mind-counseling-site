import { describe, expect, it } from "vitest";

import { getLucideIcon, lucideIconSelectOptions } from "@/lib/lucide-icons";

describe("lucide-icons", () => {
  it("returns Leaf for unknown or empty names", () => {
    expect(getLucideIcon("")).toBe(getLucideIcon("Leaf"));
    expect(getLucideIcon("NotARealIcon")).toBe(getLucideIcon("Leaf"));
    expect(getLucideIcon(undefined)).toBe(getLucideIcon("Leaf"));
  });

  it("resolves known icons", () => {
    expect(getLucideIcon("Brain")).toBe(getLucideIcon("Brain"));
    expect(getLucideIcon("  Sparkles  ")).toBe(getLucideIcon("Sparkles"));
  });

  it("exposes a sorted option list for Sanity", () => {
    expect(lucideIconSelectOptions.length).toBeGreaterThan(10);
    const titles = lucideIconSelectOptions.map((o) => o.title);
    expect([...titles].sort((a, b) => a.localeCompare(b))).toEqual(titles);
  });
});
