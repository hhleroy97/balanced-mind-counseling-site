import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { isRevalidateAuthorized } from "@/lib/revalidate-auth";

/** Node runtime: @sanity/webhook uses Web Crypto; avoid Edge quirks. */
export const runtime = "nodejs";

function resolveSecret(): string | undefined {
  return (
    process.env.SANITY_REVALIDATE_SECRET?.trim() || process.env.SANITY_WEBHOOK_SECRET?.trim() || undefined
  );
}

/**
 * On-demand ISR: Sanity document webhooks call this route after publish.
 *
 * Auth (use one approach):
 *
 * 1) **Sanity "Secret" field** — Same string in the webhook Secret box (Manage → API → Webhooks)
 *    and in Vercel `SANITY_REVALIDATE_SECRET` (or `SANITY_WEBHOOK_SECRET`). Sanity sends
 *    `sanity-webhook-signature`; no custom headers needed.
 *
 * 2) **Manual** — Leave Sanity Secret empty; send `x-sanity-revalidate-secret` or
 *    `Authorization: Bearer …` (see `lib/revalidate-auth.ts`).
 */
async function isAuthorized(request: NextRequest, rawBody: string, secret: string | undefined) {
  if (!secret) {
    console.warn(
      "[api/revalidate] Reject: no SANITY_REVALIDATE_SECRET (or SANITY_WEBHOOK_SECRET) on server.",
    );
    return false;
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (signature) {
    const ok = await isValidSignature(rawBody, signature, secret);
    if (!ok) {
      console.warn(
        "[api/revalidate] Reject: sanity-webhook-signature present but verification failed. Use the exact same Secret string in Sanity webhook settings and Vercel env.",
      );
    }
    return ok;
  }

  const manual = isRevalidateAuthorized(request, secret);
  if (!manual) {
    console.warn(
      "[api/revalidate] Reject: no sanity-webhook-signature header and manual auth failed. Either set the webhook Secret in Sanity (and matching env on Vercel) or send x-sanity-revalidate-secret / Bearer / ?secret=.",
    );
  }
  return manual;
}

export async function POST(request: NextRequest) {
  const secret = resolveSecret();
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
