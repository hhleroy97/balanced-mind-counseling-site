import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contact";

describe("contactSchema", () => {
  it("accepts a valid inquiry", () => {
    const result = contactSchema.safeParse({
      name: "Jordan",
      email: "jordan@example.com",
      message: "I would like to ask about availability next month.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects short messages", () => {
    const result = contactSchema.safeParse({
      name: "Jordan",
      email: "jordan@example.com",
      message: "Hi",
    });

    expect(result.success).toBe(false);
  });
});
