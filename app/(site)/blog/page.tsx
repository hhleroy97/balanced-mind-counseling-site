import Link from "next/link";
import type { Metadata } from "next";

import { PostGrid } from "@/components/blog/PostGrid";
import { CategoryFilter } from "@/components/resources/CategoryFilter";
import { Button } from "@/components/ui/button";
import { getBlogPageData, getPostTags, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: siteSettings.blogHeading,
    description: siteSettings.blogIntro,
  };
}

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    tag?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, tag } = await searchParams;
  const currentPage = Number(page ?? "1") || 1;
  const [siteSettings, tags, pageData] = await Promise.all([
    getSiteSettings(),
    getPostTags(),
    getBlogPageData({
      page: currentPage,
      tag,
    }),
  ]);

  return (
    <section
      id="top"
      className="site-page-x mx-auto w-full max-w-7xl space-y-8 pb-14 pt-24 lg:pb-16 lg:pt-24"
      style={{ scrollMarginTop: "var(--site-header-height)" }}
    >
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          {siteSettings.blogEyebrow}
        </p>
        <h1 className="max-w-3xl font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
          {siteSettings.blogHeading}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{siteSettings.blogIntro}</p>
      </div>

      <CategoryFilter categories={tags} activeCategory={tag} basePath="/blog" queryKey="tag" />
      <PostGrid posts={pageData.posts} />

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">
          Page {pageData.currentPage} of {pageData.totalPages}
        </p>
        <div className="flex gap-3">
          <Button asChild variant="outline" size="sm" disabled={pageData.currentPage <= 1}>
            <Link
              href={
                pageData.currentPage <= 1
                  ? "#"
                  : `/blog?page=${pageData.currentPage - 1}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}#top`
              }
            >
              Previous
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            disabled={pageData.currentPage >= pageData.totalPages}
          >
            <Link
              href={
                pageData.currentPage >= pageData.totalPages
                  ? "#"
                  : `/blog?page=${pageData.currentPage + 1}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}#top`
              }
            >
              Next
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
