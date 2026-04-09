import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

/** Fresh Sanity content on every request (no ISR / redeploy). Studio stays under /studio. */
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <JsonLd data={buildOrganizationJsonLd(siteSettings)} />
      <JsonLd data={buildWebsiteJsonLd(siteSettings)} />
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
