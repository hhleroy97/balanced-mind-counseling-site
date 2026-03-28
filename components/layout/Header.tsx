import { HeaderClient } from "@/components/layout/HeaderClient";
import { getSiteSettings } from "@/lib/content";

export async function Header() {
  const siteSettings = await getSiteSettings();

  return (
    <HeaderClient
      practiceName={siteSettings.practiceName}
      clientPortalUrl={siteSettings.clientPortalUrl}
    />
  );
}
