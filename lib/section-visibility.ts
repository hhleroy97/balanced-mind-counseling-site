import type { HomeNavSectionId } from "@/lib/home-section-nav";
import type { SiteSettings } from "@/lib/types";

/** Maps toggle fields on SiteSettings to the corresponding section id. */
const TOGGLE_MAP: { key: keyof SiteSettings; sectionId: HomeNavSectionId }[] = [
  { key: "showAbout", sectionId: "about" },
  { key: "showServices", sectionId: "services" },
  { key: "showRates", sectionId: "rates" },
  { key: "showGettingStarted", sectionId: "getting-started" },
  { key: "showBlog", sectionId: "blog" },
  { key: "showResources", sectionId: "resources" },
  { key: "showContact", sectionId: "contact" },
];

/** Returns section ids the user has toggled off in Sanity. */
export function getHiddenSections(settings: SiteSettings): HomeNavSectionId[] {
  return TOGGLE_MAP.filter(({ key }) => settings[key] === false).map(({ sectionId }) => sectionId);
}
