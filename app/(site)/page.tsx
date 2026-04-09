import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
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
import {
  buildHomeMetaDescription,
  buildSiteKeywords,
  buildWebPageJsonLd,
} from "@/lib/seo";

const HOME_TITLE = "BALANCED MIND COUNSELING | Megan Ashley Smith";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return {
    title: {
      absolute: HOME_TITLE,
    },
    description: buildHomeMetaDescription(siteSettings),
    alternates: {
      canonical: "/",
    },
    keywords: buildSiteKeywords(siteSettings),
    openGraph: {
      title: HOME_TITLE,
      description: buildHomeMetaDescription(siteSettings),
      url: "/",
    },
    twitter: {
      title: HOME_TITLE,
      description: buildHomeMetaDescription(siteSettings),
    },
  };
}

export default async function Home() {
  const [siteSettings, posts, resources] = await Promise.all([
    getSiteSettings(),
    getPosts(),
    getResources(),
  ]);
  const description = buildHomeMetaDescription(siteSettings);

  return (
    <HomeFoldRoot>
      <JsonLd
        data={buildWebPageJsonLd({
          name: siteSettings.practiceName,
          description,
          path: "/",
        })}
      />
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
