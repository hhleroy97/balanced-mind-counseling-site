import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { isRevalidateAuthorized } from "@/lib/revalidate-auth";

/**
 * On-demand ISR: Sanity document webhooks call this route after publish.
 *
 * Auth (use one approach):
 *
 * 1) **Sanity "Secret" field (recommended)** — Put the same string in the webhook's
 *    Secret box (sanity.io/manage → API → Webhooks) and in Vercel
 *    `SANITY_REVALIDATE_SECRET`. Sanity signs the body; we verify with
 *    `sanity-webhook-signature` (no custom headers needed).
 *
 * 2) **Manual header** — Leave Sanity Secret empty and send
 *    `x-sanity-revalidate-secret` or `Authorization: Bearer …` matching
 *    `SANITY_REVALIDATE_SECRET` (min length in `lib/revalidate-auth.ts`).
 */

async function isAuthorized(request: NextRequest, rawBody: string, secret: string | undefined) {
  if (!secret) {
    return false;
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (signature) {
    return isValidSignature(rawBody, signature, secret);
  }

  return isRevalidateAuthorized(request, secret);
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  const rawBody = await request.text();

  if (!(await isAuthorized(request, rawBody, secret))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePath("/", "page");
    revalidatePath("/blog", "layout");
    revalidatePath("/resources", "layout");
    revalidatePath("/contact", "page");

    return NextResponse.json({ revalidated: true, at: Date.now() });
  } catch {
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }
}
