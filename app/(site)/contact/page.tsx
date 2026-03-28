import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out with questions, availability requests, or next-step inquiries for therapy support.",
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Contact
        </p>
        <h1 className="max-w-2xl font-serif text-5xl tracking-tight text-foreground">
          Reach out with questions or book directly when you&apos;re ready.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Use the form for general inquiries, scheduling questions, or to share a
          little about what support you&apos;re looking for.
        </p>

        <Card className="space-y-5 p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Practice details
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
