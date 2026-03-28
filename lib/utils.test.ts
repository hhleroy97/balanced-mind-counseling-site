import { describe, expect, it } from "vitest";

import { absoluteUrl, formatDate, uniqueValues } from "@/lib/utils";

describe("utils", () => {
  it("formats dates for marketing pages", () => {
    expect(formatDate("2026-01-10T00:00:00.000Z")).toBe("January 10, 2026");
  });

  it("deduplicates and sorts filter values", () => {
    expect(uniqueValues(["DBT", "Anxiety", "DBT"])).toEqual([
      "Anxiety",
      "DBT",
    ]);
  });

  it("builds absolute URLs with a fallback localhost origin", () => {
    expect(absoluteUrl("/blog")).toBe("http://localhost:3000/blog");
  });
});
