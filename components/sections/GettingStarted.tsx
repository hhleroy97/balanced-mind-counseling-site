import { FadeIn } from "@/components/shared/FadeIn";
import { Card } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Reach Out",
    description:
      "Use the contact form to share a little about what brings you in and any questions you want answered first.",
  },
  {
    step: "02",
    title: "Schedule",
    description:
      "Choose a consultation or first appointment time that feels workable and grounded for your routine.",
  },
  {
    step: "03",
    title: "Begin Therapy",
    description:
      "Start with a collaborative first session focused on goals, fit, and the pace that feels sustainable.",
  },
];

export function GettingStarted() {
  return (
    <section className="site-fold-section flex flex-col bg-[#fbf8f2]">
      <div
        id="getting-started"
        className="site-fold-inner mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-8 overflow-y-auto px-6 lg:space-y-10 lg:px-8 scroll-mt-header"
      >
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Getting Started
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            A simple path from first question to first session.
          </h2>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <FadeIn key={step.step} delay={index * 0.06}>
              <Card className="h-full rounded-[1.75rem] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Step {step.step}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-foreground">{step.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{step.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
