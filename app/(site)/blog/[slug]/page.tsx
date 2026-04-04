import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { SanityImage } from "@/components/shared/SanityImage";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getPostSlugs } from "@/lib/content";
import { absoluteUrl, formatDate } from "@/lib/utils";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    openGraph: {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      url: absoluteUrl(`/blog/${slug}`),
      type: "article",
    },
    twitter: {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <article
      className="site-page-x mx-auto w-full max-w-4xl space-y-8 pb-14 pt-[calc(var(--site-header-height)+1.5rem)] md:pb-16 md:pt-[calc(var(--site-header-height)+1.75rem)]"
      style={{ scrollMarginTop: "var(--site-header-height)" }}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {formatDate(post.publishedAt)}
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {post.excerpt}
        </p>
      </div>

      <SanityImage
        source={post.coverImage}
        alt={post.title}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 896px, 100vw"
        className="aspect-[16/8] rounded-[2rem]"
      />

      <PortableTextRenderer value={post.body} className="space-y-6 text-lg" />
    </article>
  );
}
