import Link from "next/link";
import type { Metadata } from "next";

import { PostGrid } from "@/components/blog/PostGrid";
import { CategoryFilter } from "@/components/resources/CategoryFilter";
import { Button } from "@/components/ui/button";
import { getBlogPageData, getPostTags } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Therapist-written articles on anxiety, burnout, relationships, and practical emotional wellness.",
};

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    tag?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, tag } = await searchParams;
  const currentPage = Number(page ?? "1") || 1;
  const [tags, pageData] = await Promise.all([
    getPostTags(),
    getBlogPageData({
      page: currentPage,
      tag,
    }),
  ]);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-16 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Blog
        </p>
        <h1 className="max-w-3xl font-serif text-5xl tracking-tight text-foreground">
          Articles that make therapy concepts feel practical and approachable.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Browse therapist-written reflections on coping skills, boundaries,
          burnout, and emotional wellness.
        </p>
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
                  : `/blog?page=${pageData.currentPage - 1}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`
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
                  : `/blog?page=${pageData.currentPage + 1}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`
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
