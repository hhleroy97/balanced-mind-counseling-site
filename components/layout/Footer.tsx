import Link from "next/link";

import { getSiteSettings } from "@/lib/content";

export async function Footer() {
  const siteSettings = await getSiteSettings();
  const socials = Object.entries(siteSettings.socialLinks).filter(([, value]) =>
    Boolean(value),
  );

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

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Navigation
          </h3>
          <div className="space-y-3 text-sm">
            <Link className="block hover:text-primary" href="/#home">
              Home
            </Link>
            <Link className="block hover:text-primary" href="/#about">
              About
            </Link>
            <Link className="block hover:text-primary" href="/#services">
              Services
            </Link>
            <Link className="block hover:text-primary" href="/#rates">
              Rates
            </Link>
            <Link className="block hover:text-primary" href="/#getting-started">
              Getting started
            </Link>
            <Link className="block hover:text-primary" href="/#blog">
              Blog
            </Link>
            <Link className="block hover:text-primary" href="/#resources">
              Resources
            </Link>
            <Link className="block hover:text-primary" href="/#contact">
              Contact
            </Link>
          </div>
        </div>

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
