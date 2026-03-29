import { describe, expect, it } from "vitest";

import type { RevalidateRequest } from "@/lib/revalidate-auth";
import { isRevalidateAuthorized } from "@/lib/revalidate-auth";

function mockRequest(
  init: { searchParams?: Record<string, string>; headers?: Record<string, string> } = {},
): RevalidateRequest {
  const url = new URL("https://example.com/api/revalidate");
  if (init.searchParams) {
    for (const [k, v] of Object.entries(init.searchParams)) {
      url.searchParams.set(k, v);
    }
  }
  const headers = new Headers(init.headers ?? {});
  return { nextUrl: url, headers } as RevalidateRequest;
}

describe("isRevalidateAuthorized", () => {
  const secret = "a".repeat(16);

  it("rejects missing or short secret config", () => {
    const req = mockRequest({ searchParams: { secret } });
    expect(isRevalidateAuthorized(req, undefined)).toBe(false);
    expect(isRevalidateAuthorized(req, "short")).toBe(false);
  });

  it("accepts matching query secret", () => {
    const req = mockRequest({ searchParams: { secret } });
    expect(isRevalidateAuthorized(req, secret)).toBe(true);
  });

  it("accepts Bearer token", () => {
    const req = mockRequest({
      headers: { authorization: `Bearer ${secret}` },
    });
    expect(isRevalidateAuthorized(req, secret)).toBe(true);
  });

  it("accepts x-sanity-revalidate-secret header", () => {
    const req = mockRequest({
      headers: { "x-sanity-revalidate-secret": secret },
    });
    expect(isRevalidateAuthorized(req, secret)).toBe(true);
  });

  it("rejects wrong secret", () => {
    const req = mockRequest({ searchParams: { secret: "wrong-wrong-wrong" } });
    expect(isRevalidateAuthorized(req, secret)).toBe(false);
  });
});
