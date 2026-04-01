import { FadeIn } from "@/components/shared/FadeIn";
import { SectionCardMedia } from "@/components/shared/SectionCardMedia";
import { Card } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

export function GettingStarted({ siteSettings }: { siteSettings: SiteSettings }) {
  const steps = siteSettings.gettingStartedSteps;

  return (
    <section className="site-fold-section flex flex-col bg-[#fbf8f2]">
      <div
        id="getting-started"
        className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-8 overflow-y-auto lg:space-y-10 scroll-mt-header"
      >
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.gettingStartedEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            {siteSettings.gettingStartedHeading}
          </h2>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const stepLabel = String(index + 1).padStart(2, "0");
            return (
              <FadeIn key={`${step.title}-${index}`} delay={index * 0.06}>
                <Card className="h-full rounded-[1.75rem] p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Step {stepLabel}
                  </p>
                  <div className="mt-4">
                    <SectionCardMedia
                      label={step.title}
                      icon={step.icon}
                      image={step.image}
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">{step.title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{step.description}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
