import type { Metadata } from "next";

import { Services } from "@/components/sections/Services";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: `${siteSettings.servicesEyebrow} | ${siteSettings.practiceName}`,
    description: siteSettings.servicesIntro,
  };
}

export default async function ServicesPage() {
  const siteSettings = await getSiteSettings();
  return <Services siteSettings={siteSettings} variant="page" />;
}
