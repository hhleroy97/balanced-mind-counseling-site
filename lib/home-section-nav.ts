/** Section `id`s on `/` (must match each fold’s root element). */
export const HOME_NAV_SECTION_IDS = [
  "home",
  "about",
  "services",
  "rates",
  "getting-started",
  "blog",
  "resources",
  "contact",
] as const;

export type HomeNavSectionId = (typeof HOME_NAV_SECTION_IDS)[number];
