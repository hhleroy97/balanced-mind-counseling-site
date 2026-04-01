import { CreditCard, MonitorSmartphone, UserRoundPlus } from "lucide-react";

import { FadeIn } from "@/components/shared/FadeIn";
import { Card } from "@/components/ui/card";

const highlights = [
  {
    title: "Telehealth Available",
    description: "Secure virtual sessions designed to feel grounded and accessible.",
    icon: MonitorSmartphone,
  },
  {
    title: "Insurance Friendly",
    description: "Easy-to-understand billing support and out-of-network documentation.",
    icon: CreditCard,
  },
  {
    title: "New Clients Welcome",
    description: "A clear first step for clients ready to explore therapy support.",
    icon: UserRoundPlus,
  },
];

export function Highlights() {
  return (
    <section className="py-12">
      <div className="site-page-x mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-3">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <FadeIn key={item.title} delay={index * 0.06}>
              <Card className="h-full rounded-[1.75rem] bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
