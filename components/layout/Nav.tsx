import Link from "next/link";

import { cn } from "@/lib/utils";

const scrollLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#rates", label: "Rates" },
  { href: "/#getting-started", label: "Getting Started" },
  { href: "/#blog", label: "Blog" },
  { href: "/#resources", label: "Resources" },
];

const linkClass = (compact: boolean) =>
  cn(
    "shrink-0 whitespace-nowrap text-[11px] uppercase tracking-[0.18em] transition-colors",
    compact
      ? "text-muted-foreground hover:text-foreground"
      : "text-[#345447] hover:text-[#1f352c]",
  );

export function Nav({
  clientPortalUrl,
  compact = false,
  className,
}: {
  clientPortalUrl: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <nav className={cn("flex min-w-0 items-center", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto pb-1 md:justify-center md:overflow-visible md:pb-0">
        {scrollLinks.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass(compact)}>
            {link.label}
          </Link>
        ))}
        <a
          href={clientPortalUrl}
          target="_blank"
          rel="noreferrer"
          className={linkClass(compact)}
        >
          Client Portal
        </a>
        <Link href="/#contact" className={linkClass(compact)}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
