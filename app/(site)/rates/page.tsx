import type { Metadata } from "next";

import { Rates } from "@/components/sections/Rates";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: `${siteSettings.ratesEyebrow} | ${siteSettings.practiceName}`,
    description: siteSettings.ratesIntro,
  };
}

export default async function RatesPage() {
  const siteSettings = await getSiteSettings();
  return <Rates siteSettings={siteSettings} variant="page" />;
}
