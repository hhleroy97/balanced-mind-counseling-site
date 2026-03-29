import Link from "next/link";

import { SanityImage } from "@/components/shared/SanityImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const slug = post.slug?.current?.trim() ?? "";

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <SanityImage
        source={post.coverImage}
        alt={post.title}
        width={1200}
        height={750}
        sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 45vw, 100vw"
        className="h-44 w-full bg-muted/40 object-cover object-left-bottom"
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
          <CardTitle className="line-clamp-2 text-2xl leading-tight">
            {slug ? (
              <Link href={`/blog/${slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            ) : (
              <span>{post.title}</span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-5 pt-0">
        <p className="line-clamp-2 leading-6 text-muted-foreground">{post.excerpt}</p>
        {slug ? (
          <Link
            href={`/blog/${slug}`}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Read article
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
