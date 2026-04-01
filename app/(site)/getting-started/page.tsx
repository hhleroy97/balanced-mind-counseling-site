import type { Metadata } from "next";

import { GettingStarted } from "@/components/sections/GettingStarted";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: `${siteSettings.gettingStartedEyebrow} | ${siteSettings.practiceName}`,
    description: siteSettings.gettingStartedSteps[0]?.description ?? siteSettings.seoDescription,
  };
}

export default async function GettingStartedPage() {
  const siteSettings = await getSiteSettings();
  return <GettingStarted siteSettings={siteSettings} variant="page" />;
}
