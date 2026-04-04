import Link from "next/link";

import { FadeIn } from "@/components/shared/FadeIn";
import { SectionCardMedia } from "@/components/shared/SectionCardMedia";
import { Card } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

export function Rates({ siteSettings }: { siteSettings: SiteSettings }) {
  const items = siteSettings.ratesItems;

  return (
    <section id="rates" className="site-fold-section flex flex-col bg-[#f6f1e7]">
      <div className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start space-y-6 md:justify-center md:space-y-8 md:overflow-y-auto lg:space-y-10">
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.ratesEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {siteSettings.ratesHeading}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {siteSettings.ratesIntro}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((detail, index) => (
            <FadeIn
              key={`${detail.title}-${index}`}
              delay={index * 0.06}
              className={index === 0 ? "lg:col-span-2" : undefined}
            >
              <Card className="h-full rounded-[1.75rem] bg-white/85 p-6 shadow-none sm:p-8">
                <div className="flex items-center gap-3">
                  <SectionCardMedia
                    label={detail.title}
                    icon={detail.icon}
                    image={detail.image}
                    iconFrameClassName="bg-primary/10 text-primary"
                    className="mb-0"
                  />
                  <h3 className="min-w-0 flex-1 font-serif text-2xl leading-snug text-[#1f352c]">
                    {detail.title}
                  </h3>
                </div>
                <p className="mt-4 leading-7 text-[#345447]">{detail.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <Link
            href="/#contact"
            className="inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
          >
            Ask about fees and availability
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
