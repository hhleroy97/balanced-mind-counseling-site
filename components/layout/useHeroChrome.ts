"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getHeroLogoThreshold } from "@/lib/hero";

export function useHeroChrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isCompact, setIsCompact] = useState(!isHome);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateState = () => {
      if (!isHome) {
        setIsCompact(true);
        setHasScrolled(true);
        return;
      }

      const scrollY = window.scrollY;
      const trigger = document.getElementById("hero-logo-trigger");
      const threshold = trigger
        ? getHeroLogoThreshold(trigger.offsetTop, trigger.offsetHeight)
        : 140;

      setHasScrolled(scrollY > 10);
      setIsCompact(scrollY >= threshold);
    };

    updateState();
    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [isHome]);

  return { isHome, isCompact, hasScrolled };
}
