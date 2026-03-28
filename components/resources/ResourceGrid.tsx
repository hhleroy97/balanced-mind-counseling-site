import { FadeIn } from "@/components/shared/FadeIn";
import { ResourceCard } from "@/components/resources/ResourceCard";
import type { Resource } from "@/lib/types";

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  if (!resources.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card px-8 py-12 text-center text-muted-foreground">
        No resources match the selected category yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource, index) => (
        <FadeIn key={resource.slug.current} delay={index * 0.05}>
          <ResourceCard resource={resource} />
        </FadeIn>
      ))}
    </div>
  );
}
