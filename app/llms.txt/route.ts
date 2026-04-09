import { getSiteSettings } from "@/lib/content";
import { buildLlmsText } from "@/lib/discovery";

export const dynamic = "force-dynamic";

export async function GET() {
  const siteSettings = await getSiteSettings();
  const body = buildLlmsText(siteSettings);

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
