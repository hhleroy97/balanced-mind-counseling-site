import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { isRevalidateAuthorized } from "@/lib/revalidate-auth";

/**
 * On-demand ISR: call from a Sanity document webhook so Vercel serves fresh
 * content without waiting for `revalidate` timers or redeploying.
 *
 * Sanity (sanity.io/manage → API → Webhooks):
 * - URL: https://<your-domain>/api/revalidate
 * - Method: POST
 * - Dataset: production (or your public dataset)
 * - Trigger: create / update / delete on published docs (disable "include drafts" unless you want previews to purge cache)
 * - Headers: add `x-sanity-revalidate-secret` = same value as SANITY_REVALIDATE_SECRET on Vercel
 *
 * Vercel: set SANITY_REVALIDATE_SECRET (long random string; Production + Preview if needed).
 */

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!isRevalidateAuthorized(request, secret)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await request.json().catch(() => ({}));

    revalidatePath("/", "page");
    revalidatePath("/blog", "layout");
    revalidatePath("/resources", "layout");
    revalidatePath("/contact", "page");

    return NextResponse.json({ revalidated: true, at: Date.now() });
  } catch {
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }
}
