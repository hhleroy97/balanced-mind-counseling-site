import Link from "next/link";

import { SanityImage } from "@/components/shared/SanityImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <SanityImage
        source={post.coverImage}
        alt={post.title}
        width={1200}
        height={750}
        sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 45vw, 100vw"
        className="h-56 w-full bg-muted/40 object-cover object-left-bottom"
      />
      <CardHeader className="space-y-4">
        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
          <CardTitle className="text-3xl">
            <Link href={`/blog/${post.slug.current}`} className="hover:text-primary">
              {post.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between space-y-5">
        <p className="line-clamp-3 leading-7 text-muted-foreground">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug.current}`}
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Read article
        </Link>
      </CardContent>
    </Card>
  );
}
