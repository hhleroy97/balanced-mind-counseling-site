import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { FadeIn } from "@/components/shared/FadeIn";
import { BotanicalAccent } from "@/components/shared/BotanicalAccent";
import { SanityImage } from "@/components/shared/SanityImage";
import { SocialBrandIcon } from "@/components/shared/SocialBrandIcon";
import { Card } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

export function About({ siteSettings }: { siteSettings: SiteSettings }) {
  const phoneDigits = siteSettings.phone.replace(/\D/g, "");
  const contactDetails = [
    { label: "Email", value: siteSettings.email, icon: Mail, href: `mailto:${siteSettings.email}` },
    {
      label: "Phone",
      value: siteSettings.phone,
      icon: Phone,
      ...(phoneDigits ? { href: `tel:${phoneDigits}` as const } : {}),
    },
    { label: "Location", value: siteSettings.address, icon: MapPin },
  ] as const;
  const socialLabels: Record<string, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    youtube: "YouTube",
  };
  const socials = Object.entries(siteSettings.socialLinks).filter(([, value]) => Boolean(value));
  const portraitSource = siteSettings.profilePhoto ?? siteSettings.heroImage;

  return (
    <section id="about" className="site-fold-section flex flex-col bg-[#fbf8f2]">
      <div className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center overflow-y-auto">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10">
        <FadeIn className="order-1 min-w-0 space-y-5 lg:order-2 lg:space-y-6">
          <header className="space-y-2 lg:space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b18d4a]">
              {siteSettings.aboutEyebrow}
            </p>
            <h2 className="max-w-[28rem] font-serif text-[clamp(1.6rem,2.85vw,2.4rem)] leading-[1.08] tracking-[-0.035em] text-[#1f352c]">
              {siteSettings.aboutHeading}
            </h2>
          </header>

          <div className="max-w-2xl border-t border-[#e2d9ca] pt-5 text-base leading-7 text-[#345447] lg:pt-6 lg:text-[1.05rem] lg:leading-7">
            <p className="font-medium text-[#1f352c]/90">{siteSettings.aboutLead}</p>
          </div>

          <div className="rounded-2xl border border-[#e2d9ca] bg-white/70 p-4 shadow-[0_8px_30px_rgba(38,65,54,0.06)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f7440]">
              {siteSettings.connectHeading}
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={siteSettings.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#264136] px-5 text-sm font-medium text-[#fbf7ef] transition-colors hover:bg-[#1f352c]"
              >
                Schedule Consultation
              </a>
              <Link
                href="/#contact"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#cdbf9f] bg-white/80 px-5 text-sm font-medium text-[#335244] transition-colors hover:border-[#bda770]"
              >
                Contact the practice
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="order-2 min-w-0 lg:order-1">
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-[2.25rem] border border-[#dbe2d8] shadow-[0_20px_55px_rgba(38,65,54,0.1)]">
              <div className="relative h-[min(28rem,calc(100svh-var(--site-header-height)-5rem))] min-h-[16rem] w-full overflow-hidden rounded-none border-0 bg-[linear-gradient(180deg,_#f7f1e7_0%,_#eef1ea_55%,_#fdfbf7_100%)]">
                <BotanicalAccent className="absolute right-4 top-4 z-[1] h-24 w-24 text-[#335244]/8 lg:right-5 lg:top-5 lg:h-28 lg:w-28" />
                <SanityImage
                  source={portraitSource}
                  fallbackSrc="/prof-pic-megan.jpeg"
                  alt={`${siteSettings.aboutPortraitTitle} practitioner portrait`}
                  width={1400}
                  height={1800}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
                />
                <div className="absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-[#1f352c]/85 via-[#1f352c]/35 to-transparent px-5 pb-5 pt-10 text-[#fbf7ef] lg:px-6 lg:pb-6 lg:pt-12">
                  <div
                    className={
                      socials.length
                        ? "flex flex-col gap-1 pr-[min(12rem,42%)]"
                        : "flex flex-col gap-1"
                    }
                  >
                    <p className="font-serif text-xl tracking-tight sm:text-2xl">{siteSettings.aboutPortraitTitle}</p>
                    {siteSettings.aboutPortraitSubtitle ? (
                      <p className="text-[13px] font-medium leading-snug tracking-wide text-[#fbf7ef]/90 sm:text-sm">
                        {siteSettings.aboutPortraitSubtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
                {socials.length ? (
                  <div className="absolute bottom-3 right-3 z-[2] flex max-w-[calc(100%-1.25rem)] flex-row flex-wrap items-center justify-end gap-2 sm:bottom-4 sm:right-4 lg:bottom-5 lg:right-5">
                    {socials.map(([name, value]) => (
                      <a
                        key={name}
                        href={value}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={socialLabels[name] ?? name}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 bg-[#1f352c]/55 text-[#fbf7ef] shadow-[0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-[#1f352c]/75"
                      >
                        <SocialBrandIcon platform={name} className="h-[1.125rem] w-[1.125rem]" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <Card className="min-w-0 divide-y divide-[#e2d9ca] rounded-none border-0 border-t border-[#e2d9ca] bg-white/90 p-0 shadow-none">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  const valueClass =
                    "min-w-0 break-words text-sm font-medium leading-relaxed text-[#1f352c] sm:text-[0.9375rem]";
                  const valueNode =
                    "href" in detail && detail.href ? (
                      <a
                        href={detail.href}
                        className={`${valueClass} transition-colors hover:text-[#264136] hover:underline`}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className={valueClass}>{detail.value}</p>
                    );
                  return (
                    <div
                      key={detail.label}
                      className="flex gap-3 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4"
                    >
                      <span className="mt-0.5 shrink-0 text-[#b18d4a]" aria-hidden>
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7440] sm:w-24">
                          {detail.label}
                        </p>
                        {valueNode}
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
