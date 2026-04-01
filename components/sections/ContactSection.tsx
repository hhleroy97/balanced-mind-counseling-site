import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

export function ContactSection({
  siteSettings,
}: {
  siteSettings: SiteSettings;
}) {
  const socials = Object.entries(siteSettings.socialLinks).filter(([, value]) => Boolean(value));

  return (
    <section className="site-fold-section flex flex-col bg-card">
      <div
        id="contact"
        className="site-fold-inner site-page-x mx-auto grid w-full max-w-7xl flex-1 gap-8 overflow-y-auto lg:grid-cols-[1.05fr_0.95fr] lg:items-center scroll-mt-header"
      >
        <FadeIn className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.contactEyebrow}
          </p>
          <h2 className="max-w-2xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            {siteSettings.contactHeading}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{siteSettings.contactIntro}</p>

          <Card className="space-y-5 rounded-[1.75rem] p-8 shadow-none">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {siteSettings.contactDetailsLabel}
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>{siteSettings.email}</p>
                <p>{siteSettings.phone}</p>
                <p>{siteSettings.address}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={siteSettings.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Schedule Consultation
              </a>
              <a
                href={siteSettings.clientPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
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
                    {socialLabels[name] ?? name}
                  </a>
                ))}
              </div>
            ) : null}
          </Card>
        </FadeIn>

        <FadeIn delay={0.08}>
          <Card className="rounded-[1.75rem] p-8">
            <ContactForm />
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
