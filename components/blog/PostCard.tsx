import Link from "next/link";

import { SanityImage } from "@/components/shared/SanityImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const slug = post.slug?.current?.trim() ?? "";
  const href = slug ? `/blog/${slug}` : null;

  const card = (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden",
        href &&
          "transition-[border-color,box-shadow] group-hover:border-primary/40 group-hover:shadow-[0_24px_70px_rgba(18,38,32,0.12)]",
      )}
    >
      <SanityImage
        source={post.coverImage}
        alt={href ? "" : post.title}
        width={1200}
        height={750}
        sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 45vw, 100vw"
        className="h-40 w-full bg-muted/40 object-cover object-left-bottom transition-[filter] group-hover:brightness-[1.02] sm:h-44"
      />
      <CardHeader className="space-y-3 p-5">
        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
          <CardTitle
            className={cn(
              "line-clamp-2 text-xl leading-tight sm:text-2xl",
              href && "text-foreground transition-colors group-hover:text-primary",
            )}
          >
            {post.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-5 pt-0">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground sm:text-base">
          {post.excerpt}
        </p>
        {href ? (
          <span className="text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
            Read article
          </span>
        ) : null}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex h-full min-h-0 flex-col rounded-3xl no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Read article: ${post.title}`}
      >
        {card}
      </Link>
    );
  }

  return card;
}
