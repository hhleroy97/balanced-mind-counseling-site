"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { HOME_NAV_SECTION_IDS, type HomeNavSectionId } from "@/lib/home-section-nav";

function readHeaderActivationOffsetPx(): number {
  if (typeof document === "undefined") return 88;
  const header = document.querySelector("header");
  if (header) return header.getBoundingClientRect().height;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--site-header-height");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 88;
}

function computeActiveSectionId(): HomeNavSectionId {
  const offset = readHeaderActivationOffsetPx();
  const marker = window.scrollY + offset + 16;
  let active: HomeNavSectionId = HOME_NAV_SECTION_IDS[0];
  for (const id of HOME_NAV_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= marker) active = id;
  }
  return active;
}

/**
 * Which `#section` on the homepage is aligned with the header band; `null` off `/`.
 */
export function useHomeSectionSpy(): HomeNavSectionId | null {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSectionId, setActiveSectionId] = useState<HomeNavSectionId | null>(null);

  const refresh = useCallback(() => {
    if (!isHome) {
      setActiveSectionId(null);
      return;
    }
    setActiveSectionId(computeActiveSectionId());
  }, [isHome]);

  useLayoutEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!isHome) return;

    refresh();
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [isHome, refresh]);

  return activeSectionId;
}
