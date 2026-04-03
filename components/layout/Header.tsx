import { HeaderClient } from "@/components/layout/HeaderClient";
import { getSiteSettings } from "@/lib/content";
import { getHiddenSections } from "@/lib/section-visibility";

export async function Header() {
  const siteSettings = await getSiteSettings();

  return (
    <HeaderClient
      practiceName={siteSettings.practiceName}
      bookingUrl={siteSettings.bookingUrl}
      clientPortalUrl={siteSettings.clientPortalUrl}
      hiddenSections={getHiddenSections(siteSettings)}
    />
  );
}
