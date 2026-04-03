import Link from "next/link";

import { getSiteSettings } from "@/lib/content";
import { getHiddenSections } from "@/lib/section-visibility";

const footerLinks = [
  { href: "/#home", sectionId: "home" as const, label: "Home" },
  { href: "/#about", sectionId: "about" as const, label: "About" },
  { href: "/#services", sectionId: "services" as const, label: "Services" },
  { href: "/#rates", sectionId: "rates" as const, label: "Rates" },
  { href: "/#getting-started", sectionId: "getting-started" as const, label: "Getting started" },
  { href: "/#blog", sectionId: "blog" as const, label: "Blog" },
  { href: "/#resources", sectionId: "resources" as const, label: "Resources" },
  { href: "/#contact", sectionId: "contact" as const, label: "Contact" },
] as const;

export async function Footer() {
  const siteSettings = await getSiteSettings();
  const socials = Object.entries(siteSettings.socialLinks).filter(([, value]) =>
    Boolean(value),
  );
  const hidden = new Set(getHiddenSections(siteSettings));

  return (
    <footer className="border-t border-border bg-card">
      <div className="site-page-x mx-auto grid w-full max-w-7xl gap-10 py-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl">{siteSettings.practiceName}</h2>
          <p className="max-w-lg text-sm leading-7 text-muted-foreground">
            {siteSettings.footerBlurb}
          </p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>{siteSettings.email}</p>
            <p>{siteSettings.phone}</p>
            <p>{siteSettings.address}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Navigation
          </h3>
          <div className="space-y-3 text-sm">
            {footerLinks
              .filter((link) => !hidden.has(link.sectionId))
              .map((link) => (
                <Link key={link.href} className="block hover:text-primary" href={link.href}>
                  {link.label}
                </Link>
              ))}
          </div>
        </nav>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Links
          </h3>
          <div className="space-y-3 text-sm">
            <a
              href={siteSettings.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-primary"
            >
              Schedule an appointment
            </a>
            <a
              href={siteSettings.clientPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-primary"
            >
              Client Portal
            </a>
            {socials.map(([name, value]) => (
              <a
                key={name}
                href={value}
                target="_blank"
                rel="noreferrer"
                className="block capitalize hover:text-primary"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
