"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useNavActiveSection } from "@/components/layout/useHomeSectionSpy";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

function mobileCtaClass(kind: "primary" | "secondary") {
  return cn(
    "inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-center text-sm font-semibold leading-none transition-colors",
    kind === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-border bg-background text-foreground hover:bg-accent",
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const visibleLinks = navLinks.filter((link) => !hidden.has(link.sectionId));

  return (
    <nav aria-label="Main" className={cn("flex min-w-0 items-center", className)}>
      <div className="flex w-full items-center justify-end gap-2 md:hidden">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-[#264136] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#fbf7ef] transition-colors hover:bg-[#1f352c]"
        >
          Book
        </a>
        <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-background/90 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Open navigation menu"
            >
              <Menu className="size-4" aria-hidden="true" />
              Menu
            </button>
          </DialogTrigger>
          <DialogContent className="left-auto right-4 top-[calc(var(--site-header-height)+0.25rem)] bottom-3 flex max-h-none w-[calc(100%-2rem)] max-w-sm translate-x-0 translate-y-0 flex-col rounded-[1.75rem] sm:w-[calc(100%-2rem)]">
            <div className="flex h-full min-h-0 flex-1 flex-col gap-4 px-5 pt-5">
              <div className="space-y-1.5 pr-10">
                <DialogTitle className="text-lg sm:text-2xl">Explore the site</DialogTitle>
                <DialogDescription className="text-xs leading-5 sm:text-sm sm:leading-6">
                  Browse sections, schedule a consultation, or open the client portal.
                </DialogDescription>
              </div>

              <div className="grid min-h-0 flex-1 gap-2 overflow-y-auto overscroll-contain pr-1">
                {visibleLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-2xl border border-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-accent/70 sm:py-3 sm:text-base",
                      activeSectionId === link.sectionId && "border-border bg-accent/60",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="grid shrink-0 gap-2 border-t border-border pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-4">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={mobileCtaClass("primary")}
                >
                  Schedule Consultation
                </a>
                <a
                  href={clientPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={mobileCtaClass("secondary")}
                >
                  Client Portal
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-5 overflow-x-auto pb-1 md:flex md:justify-center md:overflow-visible md:pb-0">
        {visibleLinks.map((link) => (
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
