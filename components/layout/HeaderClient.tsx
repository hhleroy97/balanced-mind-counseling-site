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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-center gap-4 px-6 py-4 lg:px-8">
        <div className="justify-self-start">
          <Link href="/#home" className="flex items-center gap-3">
            <div
              className={cn(
                "overflow-hidden transition-all duration-500",
                !isHome || isCompact
                  ? "max-w-sm opacity-100"
                  : "pointer-events-none max-w-0 opacity-0",
              )}
            >
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt={`${practiceName} logo`}
                  width={240}
                  height={80}
                  priority
                  className="h-12 w-auto object-contain sm:h-14"
                />
              </div>
            </div>
          </Link>
        </div>
        <Nav
          clientPortalUrl={clientPortalUrl}
          compact={!isHome || isCompact}
          className="justify-self-stretch"
        />
      </div>
    </header>
  );
}
