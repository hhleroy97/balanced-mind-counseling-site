"use client";

import Link from "next/link";

import { useNavActiveSection } from "@/components/layout/useHomeSectionSpy";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#home", sectionId: "home" as const, label: "Home" },
  { href: "/#about", sectionId: "about" as const, label: "About" },
  { href: "/#services", sectionId: "services" as const, label: "Services" },
  { href: "/#rates", sectionId: "rates" as const, label: "Rates" },
  { href: "/#getting-started", sectionId: "getting-started" as const, label: "Getting Started" },
  { href: "/#blog", sectionId: "blog" as const, label: "Blog" },
  { href: "/#resources", sectionId: "resources" as const, label: "Resources" },
  { href: "/#contact", sectionId: "contact" as const, label: "Contact" },
] as const;

function navItemClass(compact: boolean, isActive: boolean) {
  return cn(
    "shrink-0 whitespace-nowrap border-b-2 pb-0.5 text-[11px] uppercase tracking-[0.18em] transition-colors",
    compact
      ? isActive
        ? "border-foreground text-foreground"
        : "border-transparent text-muted-foreground hover:text-foreground"
      : isActive
        ? "border-[#1f352c] text-[#1f352c]"
        : "border-transparent text-[#345447] hover:text-[#1f352c]",
  );
}

function scheduleConsultClass(compact: boolean) {
  return cn(
    "relative z-[1] shrink-0 inline-flex items-center justify-center rounded-l-full rounded-r-none border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
    compact
      ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
      : "border-[#cdbf9f] bg-[#264136] text-[#fbf7ef] hover:border-[#bda770] hover:bg-[#1f352c]",
  );
}

function clientPortalClass(compact: boolean) {
  return cn(
    "-ml-px shrink-0 inline-flex items-center justify-center rounded-l-none rounded-r-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
    compact
      ? "border border-primary/25 border-l-primary-foreground/20 bg-primary text-primary-foreground hover:bg-primary/90"
      : "border-[#cdbf9f] text-[#335244] hover:bg-white/50",
  );
}

export function Nav({
  bookingUrl,
  clientPortalUrl,
  compact = false,
  hiddenSections = [],
  className,
}: {
  bookingUrl: string;
  clientPortalUrl: string;
  compact?: boolean;
  hiddenSections?: string[];
  className?: string;
}) {
  const activeSectionId = useNavActiveSection();
  const hidden = new Set(hiddenSections);

  return (
    <nav aria-label="Main" className={cn("flex min-w-0 items-center", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto pb-1 md:justify-center md:overflow-visible md:pb-0">
        {navLinks
          .filter((link) => !hidden.has(link.sectionId))
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navItemClass(compact, activeSectionId === link.sectionId)}
            >
              {link.label}
            </Link>
          ))}
        <span className="inline-flex shrink-0">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className={scheduleConsultClass(compact)}
          >
            Schedule consultation
          </a>
          <a
            href={clientPortalUrl}
            target="_blank"
            rel="noreferrer"
            className={clientPortalClass(compact)}
          >
            Client Portal
          </a>
        </span>
      </div>
    </nav>
  );
}
