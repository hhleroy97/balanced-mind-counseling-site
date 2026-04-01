import { Quote } from "lucide-react";

import { FadeIn } from "@/components/shared/FadeIn";
import { Card } from "@/components/ui/card";
import type { Testimonial } from "@/lib/types";

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="bg-card py-20">
      <div className="site-page-x mx-auto w-full max-w-7xl space-y-10">
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Testimonials
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            Gentle, anonymized reflections from past client experiences.
          </h2>
        </FadeIn>
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={`${testimonial.attribution}-${index}`} delay={index * 0.08}>
              <Card className="h-full p-8">
                <Quote className="size-8 text-primary" />
                <blockquote className="mt-5 text-lg leading-8 text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {testimonial.attribution}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
