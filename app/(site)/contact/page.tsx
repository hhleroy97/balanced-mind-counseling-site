import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: siteSettings.contactPageEyebrow,
    description: siteSettings.contactPageIntro,
  };
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <section className="site-page-x mx-auto grid w-full max-w-7xl gap-8 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {siteSettings.contactPageEyebrow}
        </p>
        <h1 className="max-w-2xl font-serif text-5xl tracking-tight text-foreground">
          {siteSettings.contactPageHeading}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{siteSettings.contactPageIntro}</p>

        <Card className="space-y-5 p-8">
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
          <Button asChild size="lg">
            <a href={siteSettings.bookingUrl} target="_blank" rel="noreferrer">
              Book through SimplePractice
            </a>
          </Button>
        </Card>
      </div>

      <Card className="p-8">
        <ContactForm />
      </Card>
    </section>
  );
}
