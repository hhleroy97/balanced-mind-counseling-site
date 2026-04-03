import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { GettingStarted } from "@/components/sections/GettingStarted";
import { Hero } from "@/components/sections/Hero";
import { Rates } from "@/components/sections/Rates";
import { ResourcesPreview } from "@/components/sections/ResourcesPreview";
import { Services } from "@/components/sections/Services";
import { HomeFoldRoot } from "@/components/layout/HomeFoldRoot";
import { getPosts, getResources, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return {
    title: siteSettings.practiceName,
    description: siteSettings.seoDescription,
    openGraph: {
      title: siteSettings.practiceName,
      description: siteSettings.seoDescription,
    },
    twitter: {
      title: siteSettings.practiceName,
      description: siteSettings.seoDescription,
    },
  };
}

export default async function Home() {
  const [siteSettings, posts, resources] = await Promise.all([
    getSiteSettings(),
    getPosts(),
    getResources(),
  ]);

  return (
    <HomeFoldRoot>
      <Hero siteSettings={siteSettings} />
      {siteSettings.showAbout && <About siteSettings={siteSettings} />}
      {siteSettings.showServices && <Services siteSettings={siteSettings} />}
      {siteSettings.showRates && <Rates siteSettings={siteSettings} />}
      {siteSettings.showGettingStarted && <GettingStarted siteSettings={siteSettings} />}
      {siteSettings.showBlog && <BlogPreview siteSettings={siteSettings} posts={posts.slice(0, 3)} />}
      {siteSettings.showResources && <ResourcesPreview siteSettings={siteSettings} resources={resources.slice(0, 3)} />}
      {siteSettings.showContact && <ContactSection siteSettings={siteSettings} />}
    </HomeFoldRoot>
  );
}
