import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card } from "@/components/ui/card";
import { SOCIAL_LABELS } from "@/lib/social-labels";
import type { SiteSettings } from "@/lib/types";

/** Shown in About / footer; omitted here so contact focuses on direct channels. */
const CONTACT_HIDDEN_SOCIAL_KEYS = new Set(["instagram", "linkedin"]);

export function ContactSection({
  siteSettings,
}: {
  siteSettings: SiteSettings;
}) {
  const socials = Object.entries(siteSettings.socialLinks).filter(
    ([name, value]) => Boolean(value) && !CONTACT_HIDDEN_SOCIAL_KEYS.has(name),
  );

  return (
    <section id="contact" className="site-fold-section flex flex-col bg-card">
      <div className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start md:justify-center md:overflow-y-auto">
        <div className="grid w-full gap-6 md:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <FadeIn className="h-full space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {siteSettings.contactEyebrow}
            </p>
            <h2 className="max-w-2xl font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {siteSettings.contactHeading}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {siteSettings.contactIntro}
            </p>

            <Card className="space-y-5 rounded-[1.75rem] p-6 shadow-none sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {siteSettings.contactDetailsLabel}
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <a href={`mailto:${siteSettings.email}`} className="block hover:text-foreground">
                    {siteSettings.email}
                  </a>
                  <a href={`tel:${siteSettings.phone.replace(/\D/g, "")}`} className="block hover:text-foreground">
                    {siteSettings.phone}
                  </a>
                  <p>{siteSettings.address}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={siteSettings.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto"
                >
                  Schedule Consultation
                </a>
                <a
                  href={siteSettings.clientPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:w-auto"
                >
                  Client Portal
                </a>
              </div>

              {socials.length ? (
                <div className="flex flex-wrap gap-2">
                  {socials.map(([name, value]) => (
                    <a
                      key={name}
                      href={value}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-accent"
                    >
                      {SOCIAL_LABELS[name] ?? name}
                    </a>
                  ))}
                </div>
              ) : null}
            </Card>
          </FadeIn>

          <FadeIn delay={0.08} className="flex h-full min-h-0 flex-col">
            <Card className="flex h-full min-h-0 flex-col rounded-[1.75rem] p-6 sm:p-8">
              <ContactForm />
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
