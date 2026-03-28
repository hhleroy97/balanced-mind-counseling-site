import Link from "next/link";

import { FadeIn } from "@/components/shared/FadeIn";
import { Card } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

export function Rates({ siteSettings }: { siteSettings: SiteSettings }) {
  const items = siteSettings.ratesItems;

  return (
    <section className="site-fold-section flex flex-col bg-[#f6f1e7]">
      <div
        id="rates"
        className="site-fold-inner mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-8 overflow-y-auto px-6 lg:space-y-10 lg:px-8 scroll-mt-header"
      >
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.ratesEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            {siteSettings.ratesHeading}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{siteSettings.ratesIntro}</p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((detail, index) => (
            <FadeIn key={`${detail.title}-${index}`} delay={index * 0.06}>
              <Card className="h-full rounded-[1.75rem] bg-white/85 p-8 shadow-none">
                <h3 className="font-serif text-2xl text-[#1f352c]">{detail.title}</h3>
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
