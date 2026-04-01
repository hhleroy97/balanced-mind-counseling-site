export type SectionLayoutVariant = "fold" | "page";

/** Outer `<section>`: full-viewport fold on home vs stacked page. */
export function sectionOuterClass(variant: SectionLayoutVariant | undefined): string {
  return variant === "page"
    ? "flex flex-col scroll-mt-header pb-16 pt-24 lg:pb-20 lg:pt-28"
    : "site-fold-section flex flex-col";
}

/** Inner wrapper: keeps horizontal gutters; fold adds min-height band. */
export function sectionInnerClass(variant: SectionLayoutVariant | undefined): string {
  return variant === "page" ? "site-page-x" : "site-fold-inner site-page-x";
}

/** Flex growth + scroll only for homepage folds. */
export function sectionFoldGrowClass(variant: SectionLayoutVariant | undefined): string {
  return variant === "page" ? "" : "flex-1 justify-center overflow-y-auto";
}
