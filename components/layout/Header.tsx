import Image from "next/image";
import Link from "next/link";

import { Nav } from "@/components/layout/Nav";
import { getSiteSettings } from "@/lib/content";

export async function Header() {
  const siteSettings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8e3dc] bg-[#f8f5ef]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={`${siteSettings.practiceName} logo`}
            width={72}
            height={72}
            priority
            className="h-14 w-14 object-contain"
          />
          <span className="space-y-1">
            <span className="block font-serif text-2xl text-foreground">
              {siteSettings.practiceName}
            </span>
            <span className="block text-sm text-muted-foreground">
              {siteSettings.tagline}
            </span>
          </span>
        </Link>
        <Nav clientPortalUrl={siteSettings.clientPortalUrl} />
      </div>
    </header>
  );
}
