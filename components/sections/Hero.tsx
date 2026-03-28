import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/shared/FadeIn";
import { SanityImage } from "@/components/shared/SanityImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/lib/types";

export function Hero({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(142,173,150,0.26),_transparent_35%),linear-gradient(180deg,_rgba(251,248,242,1)_0%,_rgba(255,255,255,1)_100%)]">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
        <FadeIn className="space-y-8">
          <Badge>Now welcoming new clients</Badge>
          <div className="space-y-6">
            <h1 className="max-w-3xl font-serif text-5xl leading-tight tracking-tight text-foreground md:text-6xl">
              {siteSettings.heroHeadline}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteSettings.heroSubheadline}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href={siteSettings.bookingUrl} target="_blank" rel="noreferrer">
                Book a Consultation
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_rgba(40,64,53,0.12)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.5rem] bg-[linear-gradient(140deg,_rgba(142,173,150,0.24),_rgba(227,168,144,0.18))]">
              <SanityImage
                source={siteSettings.heroImage}
                alt={`${siteSettings.practiceName} hero image`}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 38vw, 100vw"
                priority
                className="aspect-[4/3]"
              />
              <div className="p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Calm, modern care
              </p>
              <div className="mt-6 grid gap-5 text-sm text-muted-foreground">
                <p>
                  Thoughtful therapy for anxiety, stress, grief, and relationship
                  patterns.
                </p>
                <p>
                  Available virtually with a gentle, practical approach that
                  honors both insight and action.
                </p>
                <div className="grid gap-3 rounded-[1.25rem] bg-background/80 p-6">
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    SimplePractice
                  </span>
                  <span className="font-serif text-3xl text-foreground">
                    Secure scheduling, portal access, and telehealth support
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
