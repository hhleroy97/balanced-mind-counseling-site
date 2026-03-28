import Link from "next/link";

import { FadeIn } from "@/components/shared/FadeIn";
import { Card } from "@/components/ui/card";

const rateDetails = [
  {
    title: "Consultation",
    description:
      "Start with a brief conversation about fit, scheduling, and what kind of support you are looking for.",
  },
  {
    title: "Ongoing Sessions",
    description:
      "Therapy is typically offered in 50-minute sessions with a steady cadence that supports meaningful progress.",
  },
  {
    title: "Payment Questions",
    description:
      "Fees, billing logistics, and any practical questions can be reviewed clearly before you begin.",
  },
];

export function Rates() {
  return (
    <section className="site-fold-section flex flex-col bg-[#f6f1e7]">
      <div
        id="rates"
        className="site-fold-inner mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-8 overflow-y-auto px-6 lg:space-y-10 lg:px-8 scroll-mt-header"
      >
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Rates
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            Clear information about the practical side of getting started.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            The first step is understanding fit, availability, and what care could look
            like. Questions about fees are welcome and can be reviewed directly.
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {rateDetails.map((detail, index) => (
            <FadeIn key={detail.title} delay={index * 0.06}>
              <Card className="h-full rounded-[1.75rem] bg-white/85 p-8 shadow-none">
                <h3 className="font-serif text-2xl text-[#1f352c]">{detail.title}</h3>
                <p className="mt-4 leading-7 text-[#345447]">{detail.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <Link
            href="/#contact"
            className="inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
          >
            Ask about fees and availability
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
