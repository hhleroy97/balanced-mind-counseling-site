import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: `${siteSettings.aboutEyebrow} | ${siteSettings.practiceName}`,
    description: siteSettings.aboutLead,
  };
}

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  return <About siteSettings={siteSettings} variant="page" />;
}
