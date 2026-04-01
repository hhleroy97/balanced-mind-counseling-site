import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionCardMedia } from "@/components/shared/SectionCardMedia";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

export function Services({ siteSettings }: { siteSettings: SiteSettings }) {
  const { servicesItems: services } = siteSettings;
  return (
    <section className="site-fold-section flex flex-col bg-card">
      <div
        id="services"
        className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-8 overflow-y-auto lg:space-y-10 scroll-mt-header"
      >
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.servicesEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            {siteSettings.servicesHeading}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {siteSettings.servicesIntro}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={`${service.title}-${index}`} delay={index * 0.08}>
              <Card className="h-full">
                <CardHeader className="space-y-4">
                  <SectionCardMedia
                    label={service.title}
                    icon={service.icon}
                    image={service.image}
                  />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <PortableTextRenderer
                    value={service.fullDescription}
                    className="text-sm"
                  />
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
