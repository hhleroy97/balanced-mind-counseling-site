"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { useHeroChrome } from "@/components/layout/useHeroChrome";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, delay },
    },
  };
}

export function Hero({ siteSettings }: { siteSettings: SiteSettings }) {
  const { isCompact } = useHeroChrome();
  const heroHighlights = [
    siteSettings.phone
      ? { value: siteSettings.phone, icon: Phone }
      : null,
    siteSettings.email
      ? { value: siteSettings.email, icon: Mail }
      : null,
  ].filter(Boolean) as Array<{ value: string; icon: typeof Phone }>;

  return (
    <section
      id="home"
      className="site-fold-section relative flex flex-col overflow-hidden bg-[#f6f1e7]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,168,110,0.13),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(51,82,68,0.08),_transparent_28%)]" />
      <div className="site-fold-inner site-page-x relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start gap-8 py-2 md:justify-center md:gap-10 md:py-0 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
        <motion.div
          id="hero-logo-trigger"
          {...fadeUp(0)}
          className={cn(
            "flex shrink-0 justify-center transition-all duration-500 lg:justify-start lg:self-center",
            isCompact ? "opacity-0 -translate-y-3" : "opacity-100",
          )}
        >
          <Image
            src="/logo.png"
            alt={`${siteSettings.practiceName} logo`}
            width={520}
            height={312}
            priority
            className="h-auto w-[min(88vw,16rem)] object-contain sm:w-[min(80vw,20rem)] lg:w-[min(42vw,24rem)] xl:w-[min(38vw,28rem)]"
          />
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col justify-center space-y-5">
          <motion.p
            {...fadeUp(0.1)}
            className="text-sm font-medium leading-6 tracking-[0.01em] text-[#8f7440] sm:text-base sm:leading-7 lg:text-lg lg:leading-8"
          >
            {siteSettings.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.16)} className="space-y-4">
            <h1 className="font-serif text-[clamp(2rem,8vw,3.75rem)] leading-[1.02] tracking-[-0.04em] text-[#1f352c]">
              {siteSettings.heroHeadline}
            </h1>
            <hr className="border-t border-[#cdbf9f]/60" />
            <p className="max-w-2xl text-base leading-7 text-[#345447] lg:text-[1.05rem] lg:leading-8">
              {siteSettings.heroSubheadline}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.22)} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                asChild
                size="lg"
                className="w-full bg-[#264136] text-[#fbf7ef] hover:bg-[#1f352c] sm:w-auto"
              >
                <a href={siteSettings.bookingUrl} target="_blank" rel="noreferrer">
                  Schedule Consultation
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Link
                href="/#contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#cdbf9f] px-5 text-sm font-medium text-[#335244] transition-colors hover:border-[#bda770] hover:bg-[#fbf8f2] sm:w-auto"
              >
                Ask a Question
              </Link>
            </div>
            <a
              href={siteSettings.clientPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-[#335244] underline-offset-4 hover:underline"
            >
              Existing client? Open the portal
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-2 pt-0.5">
            {heroHighlights.map((highlight) => (
              <span
                key={highlight.value}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#d8c7a4] bg-[#fbf8f2]/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#8f7440]"
              >
                <highlight.icon aria-hidden="true" className="size-3 shrink-0" />
                {highlight.value}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
