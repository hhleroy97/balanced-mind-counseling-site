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
import {
  type SectionLayoutVariant,
  sectionFoldGrowClass,
  sectionInnerClass,
  sectionOuterClass,
} from "@/lib/section-layout";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function Services({
  siteSettings,
  variant = "fold",
}: {
  siteSettings: SiteSettings;
  variant?: SectionLayoutVariant;
}) {
  const { servicesItems: services } = siteSettings;
  return (
    <section className={cn(sectionOuterClass(variant), "bg-card")}>
      <div
        id="services"
        className={cn(
          sectionInnerClass(variant),
          "mx-auto flex w-full max-w-7xl flex-col space-y-8 scroll-mt-header lg:space-y-10",
          sectionFoldGrowClass(variant),
        )}
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
