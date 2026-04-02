import Link from "next/link";

import { PostGrid } from "@/components/blog/PostGrid";
import { FadeIn } from "@/components/shared/FadeIn";
import type { Post, SiteSettings } from "@/lib/types";

export function BlogPreview({
  siteSettings,
  posts,
}: {
  siteSettings: SiteSettings;
  posts: Post[];
}) {
  return (
    <section id="blog" className="site-fold-section flex flex-col bg-card">
      <div className="site-fold-inner site-page-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center space-y-6 overflow-y-auto lg:space-y-8">
        <FadeIn className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {siteSettings.blogEyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            {siteSettings.blogHeading}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{siteSettings.blogIntro}</p>
        </FadeIn>

        <PostGrid posts={posts} />

        <FadeIn delay={0.12}>
          <Link
            href="/blog"
            className="inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
          >
            View all blog posts
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
