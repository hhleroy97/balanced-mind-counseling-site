"use client";

import Link from "next/link";

import { useHomeSectionSpy } from "@/components/layout/useHomeSectionSpy";
import { cn } from "@/lib/utils";

const scrollLinks = [
  { href: "/#home", sectionId: "home", label: "Home" },
  { href: "/#about", sectionId: "about", label: "About" },
  { href: "/#services", sectionId: "services", label: "Services" },
  { href: "/#rates", sectionId: "rates", label: "Rates" },
  { href: "/#getting-started", sectionId: "getting-started", label: "Getting Started" },
  { href: "/#blog", sectionId: "blog", label: "Blog" },
  { href: "/#resources", sectionId: "resources", label: "Resources" },
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

export function Nav({
  clientPortalUrl,
  compact = false,
  className,
}: {
  clientPortalUrl: string;
  compact?: boolean;
  className?: string;
}) {
  const activeSectionId = useHomeSectionSpy();

  return (
    <nav className={cn("flex min-w-0 items-center", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto pb-1 md:justify-center md:overflow-visible md:pb-0">
        {scrollLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={navItemClass(compact, activeSectionId === link.sectionId)}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={clientPortalUrl}
          target="_blank"
          rel="noreferrer"
          className={navItemClass(compact, false)}
        >
          Client Portal
        </a>
        <Link
          href="/#contact"
          className={navItemClass(compact, activeSectionId === "contact")}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
