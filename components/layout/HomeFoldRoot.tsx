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

  useEffect(() => {
    if (pathname !== "/") return;

    function scrollToHash() {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return <>{children}</>;
}
