"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Enables gentle scroll snapping on `/` so each homepage section reads like its own page.
 */
export function HomeFoldRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    document.documentElement.classList.add("home-fold-scroll");
    return () => {
      document.documentElement.classList.remove("home-fold-scroll");
    };
  }, [pathname]);

  return <>{children}</>;
}
