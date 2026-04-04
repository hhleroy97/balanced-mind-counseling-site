import Link from "next/link";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";

import { SanityImage } from "@/components/shared/SanityImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getResourceBySlug, getResourceSlugs, getSiteSettings } from "@/lib/content";
import { absoluteUrl, formatDate } from "@/lib/utils";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getResourceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return {};
  }

  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      url: absoluteUrl(`/resources/${slug}`),
      type: "article",
    },
    twitter: {
      title: resource.title,
      description: resource.description,
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const [resource, siteSettings] = await Promise.all([
    getResourceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!resource) {
    notFound();
  }

  return (
    <section
      className="site-page-x mx-auto w-full max-w-4xl space-y-8 pb-14 pt-[calc(var(--site-header-height)+1.5rem)] md:pb-16 md:pt-[calc(var(--site-header-height)+1.75rem)]"
      style={{ scrollMarginTop: "var(--site-header-height)" }}
    >
      <Link
        href="/resources"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Back to resources
      </Link>

      <div className="space-y-5">
        <Badge>{resource.category}</Badge>
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {resource.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {resource.description}
        </p>
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
          Published {formatDate(resource.publishedAt)}
        </p>
      </div>

      <SanityImage
        source={resource.thumbnail}
        alt={resource.title}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 896px, 100vw"
        className="aspect-[16/8] rounded-[2rem]"
      />

      <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8">
        <div className="space-y-5">
          <h2 className="font-serif text-2xl sm:text-3xl">
            {siteSettings.resourceDetailDownloadHeading}
          </h2>
          <p className="leading-7 text-muted-foreground">{siteSettings.resourceDetailDownloadBody}</p>
          {resource.fileUrl ? (
            <Button asChild size="lg">
              <a href={resource.fileUrl} target="_blank" rel="noreferrer">
                <Download className="size-4" />
                Download PDF
              </a>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">{siteSettings.resourceDetailNoFileMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
