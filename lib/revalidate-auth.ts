import type { NextRequest } from "next/server";

const MIN_SECRET_LENGTH = 16;

export type RevalidateRequest = Pick<NextRequest, "nextUrl" | "headers">;

/**
 * Validates requests to /api/revalidate. Supports:
 * - Query: ?secret=...
 * - Header: Authorization: Bearer <secret>
 * - Header: x-sanity-revalidate-secret: <secret>
 *
 * In Sanity → API → Webhooks, add the same value as a custom header
 * (recommended) or append ?secret= to the URL (visible in logs).
 */
export function isRevalidateAuthorized(request: RevalidateRequest, secret: string | undefined): boolean {
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    return false;
  }

  const query = request.nextUrl.searchParams.get("secret");
  if (query === secret) {
    return true;
  }

  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ") && bearer.slice("Bearer ".length) === secret) {
    return true;
  }

  return request.headers.get("x-sanity-revalidate-secret") === secret;
}
