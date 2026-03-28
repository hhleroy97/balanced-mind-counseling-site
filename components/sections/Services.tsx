import {
  HeartHandshake,
  Leaf,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { FadeIn } from "@/components/shared/FadeIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  Sparkles,
  HeartHandshake,
};

export function Services({ services }: { services: Service[] }) {
  return (
    <section className="site-fold-section flex flex-col bg-card">
      <div
        id="services"
        className="site-fold-inner mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-8 overflow-y-auto px-6 lg:space-y-10 lg:px-8 scroll-mt-header"
      >
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Services
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            Support tailored to the concerns clients most often bring into the
            room.
          </h2>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Leaf;

            return (
              <FadeIn key={service.slug.current} delay={index * 0.08}>
                <Card className="h-full">
                  <CardHeader className="space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
