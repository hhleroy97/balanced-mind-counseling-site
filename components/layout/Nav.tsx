import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Nav({
  clientPortalUrl,
  className,
}: {
  clientPortalUrl: string;
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-2", className)}>
      <div className="hidden items-center gap-6 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Button asChild size="sm">
        <a href={clientPortalUrl} target="_blank" rel="noreferrer">
          Client Portal
        </a>
      </Button>
    </nav>
  );
}
