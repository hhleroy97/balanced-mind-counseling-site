"use client";

import Image from "next/image";
import Link from "next/link";

import { Nav } from "@/components/layout/Nav";
import { useHeroChrome } from "@/components/layout/useHeroChrome";
import { cn } from "@/lib/utils";

export function HeaderClient({
  practiceName,
  clientPortalUrl,
}: {
  practiceName: string;
  clientPortalUrl: string;
}) {
  const { isHome, isCompact } = useHeroChrome();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        !isHome || isCompact
          ? "border-b border-[#d7dfd8] bg-[#f6f1e7]/82 shadow-[0_10px_35px_rgba(38,65,54,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="site-page-x mx-auto grid w-full max-w-7xl grid-cols-[11rem_minmax(0,1fr)] items-center gap-4 py-4 md:grid-cols-[13.5rem_minmax(0,1fr)_13.5rem]">
        <div className="flex min-h-12 items-center justify-start sm:min-h-14">
          <Link
            href="/"
            className={cn(
              "inline-flex transition-opacity duration-500",
              !isHome || isCompact ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Image
              src="/logo.png"
              alt={`${practiceName} logo`}
              width={240}
              height={80}
              priority
              className="h-12 w-auto max-w-[10.5rem] object-contain object-left sm:h-14 sm:max-w-[12.5rem]"
            />
          </Link>
        </div>
        <Nav
          clientPortalUrl={clientPortalUrl}
          compact={!isHome || isCompact}
          className="justify-self-stretch md:justify-self-center"
        />
        <div className="hidden md:block" aria-hidden="true" />
      </div>
    </header>
  );
}
