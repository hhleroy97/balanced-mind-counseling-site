import { FadeIn } from "@/components/shared/FadeIn";
import { ServiceCardsGrid } from "@/components/sections/ServiceCardsGrid";
import type { SiteSettings } from "@/lib/types";

export function Services({ siteSettings }: { siteSettings: SiteSettings }) {
  const { servicesItems: services } = siteSettings;
  return (
    <section id="services" className="site-fold-section flex flex-col bg-card">
      <div className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start space-y-6 md:justify-center md:space-y-8 md:overflow-y-auto lg:space-y-10">
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.servicesEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {siteSettings.servicesHeading}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {siteSettings.servicesIntro}
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="space-y-4">
          <p className="text-sm text-muted-foreground">Click a card to learn more.</p>
          <ServiceCardsGrid services={services} />
        </FadeIn>
      </div>
    </section>
  );
}
