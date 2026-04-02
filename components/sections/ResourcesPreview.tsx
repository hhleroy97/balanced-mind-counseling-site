import Link from "next/link";

import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { FadeIn } from "@/components/shared/FadeIn";
import type { Resource, SiteSettings } from "@/lib/types";

export function ResourcesPreview({
  siteSettings,
  resources,
}: {
  siteSettings: SiteSettings;
  resources: Resource[];
}) {
  return (
    <section id="resources" className="site-fold-section flex flex-col bg-[#f6f1e7]">
      <div className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-6 overflow-y-auto lg:space-y-8">
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.resourcesEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            {siteSettings.resourcesHeading}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {siteSettings.resourcesIntro}
          </p>
        </FadeIn>

        <ResourceGrid resources={resources} />

        <FadeIn delay={0.12}>
          <Link
            href="/resources"
            className="inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
          >
            Explore all resources
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
