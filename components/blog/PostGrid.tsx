import { PostCard } from "@/components/blog/PostCard";
import { FadeIn } from "@/components/shared/FadeIn";
import type { Post } from "@/lib/types";

export function PostGrid({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card px-8 py-12 text-center text-muted-foreground">
        No posts match the current filters yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <FadeIn key={post.slug?.current ?? post._id ?? index} delay={index * 0.06}>
          <PostCard post={post} />
        </FadeIn>
      ))}
    </div>
  );
}
