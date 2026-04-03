"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * On `/`, enables mandatory vertical scroll-snap to each fold (`.site-fold-section` start)
 * and handles hash targets without animated scroll. Softer proximity snap when reduced motion
 * is preferred.
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
          el.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return <>{children}</>;
}
