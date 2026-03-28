import Link from "next/link";

import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { FadeIn } from "@/components/shared/FadeIn";
import { BotanicalAccent } from "@/components/shared/BotanicalAccent";
import { SanityImage } from "@/components/shared/SanityImage";
import { Card } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

export function About({ siteSettings }: { siteSettings: SiteSettings }) {
  const contactDetails = [
    { label: "Email", value: siteSettings.email },
    { label: "Phone", value: siteSettings.phone },
    { label: "Location", value: siteSettings.address },
  ];
  const socialLabels: Record<string, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    youtube: "YouTube",
  };
  const socials = Object.entries(siteSettings.socialLinks).filter(([, value]) => Boolean(value));
  const portraitSource = siteSettings.profilePhoto ?? siteSettings.heroImage;

  return (
    <section className="site-fold-section flex flex-col bg-[#fbf8f2]">
      <div
        id="about"
        className="site-fold-inner mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center overflow-y-auto px-6 lg:px-8 scroll-mt-header"
      >
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10">
        <FadeIn className="min-w-0 space-y-5 lg:space-y-6">
          <header className="space-y-2 lg:space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b18d4a]">
              About the Practice
            </p>
            <h2 className="max-w-[28rem] font-serif text-[clamp(1.75rem,3.2vw,2.65rem)] leading-[1.08] tracking-[-0.035em] text-[#1f352c]">
              Care shaped by the values and pace of {siteSettings.practiceName}.
            </h2>
          </header>

          <div className="max-w-2xl space-y-3 text-base leading-7 text-[#345447] lg:text-[1.05rem] lg:leading-7">
            <p className="font-medium text-[#1f352c]/90">{siteSettings.tagline}</p>
            <p className="text-[#345447]/95">{siteSettings.seoDescription}</p>
          </div>

          <PortableTextRenderer
            value={siteSettings.bio}
            compact
            className="max-w-2xl border-t border-[#dcc9a3]/90 pt-4"
          />

          <div className="grid min-w-0 gap-3 sm:grid-cols-3 sm:gap-3">
            {contactDetails.map((detail) => (
              <Card
                key={detail.label}
                className="flex min-h-0 min-w-0 flex-col justify-between rounded-2xl border-[#e2d9ca] bg-white/90 p-4 shadow-none"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7440]">
                  {detail.label}
                </p>
                <p className="mt-2 break-words text-sm font-medium leading-snug text-[#1f352c] sm:text-[0.9375rem]">
                  {detail.value}
                </p>
              </Card>
            ))}
          </div>

          <div className="rounded-2xl border border-[#e2d9ca] bg-white/70 p-4 shadow-[0_8px_30px_rgba(38,65,54,0.06)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f7440]">
              Connect
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
              <a
                href={siteSettings.clientPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#cdbf9f] bg-white/80 px-5 text-sm font-medium text-[#335244] transition-colors hover:border-[#bda770]"
              >
                Client Portal
              </a>
              {socials.length ? (
                <div className="flex min-w-0 flex-wrap gap-2 sm:ml-1">
                  {socials.map(([name, value]) => (
                    <a
                      key={name}
                      href={value}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[#d8c7a4] bg-[#fbf8f2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#6b5a3a] transition-colors hover:bg-white"
                    >
                      {socialLabels[name] ?? name}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <Link
              href="/#contact"
              className="mt-3 inline-flex text-sm font-medium text-[#335244] underline-offset-4 hover:underline"
            >
              Contact the practice
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="min-w-0">
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div
              className="absolute inset-y-4 -left-3 right-3 rounded-[2rem] border border-[#dcc9a3] bg-[#f7f1e7] lg:-left-4 lg:right-4"
              aria-hidden
            />
            <div className="relative h-[min(28rem,calc(100svh-var(--site-header-height)-5rem))] min-h-[16rem] w-full overflow-hidden rounded-[2.25rem] border border-[#dbe2d8] bg-[linear-gradient(180deg,_#f7f1e7_0%,_#eef1ea_55%,_#fdfbf7_100%)] shadow-[0_20px_55px_rgba(38,65,54,0.1)]">
              <BotanicalAccent className="absolute right-4 top-4 z-[1] h-24 w-24 text-[#335244]/8 lg:right-5 lg:top-5 lg:h-28 lg:w-28" />
              <SanityImage
                source={portraitSource}
                fallbackSrc="/prof-pic-megan.jpeg"
                alt={`${siteSettings.practiceName} practitioner portrait`}
                width={1400}
                height={1800}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
              />
              <div className="absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-[#1f352c]/85 via-[#1f352c]/35 to-transparent px-5 pb-5 pt-12 text-[#fbf7ef] lg:px-6 lg:pb-6 lg:pt-14">
                <p className="font-serif text-xl tracking-tight sm:text-2xl">{siteSettings.practiceName}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#e7d9b7] sm:text-[11px]">
                  {siteSettings.address}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
