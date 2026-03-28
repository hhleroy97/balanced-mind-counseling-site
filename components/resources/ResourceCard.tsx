import Link from "next/link";
import { Download, FileText } from "lucide-react";

import { SanityImage } from "@/components/shared/SanityImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Resource } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {resource.thumbnail ? (
        <SanityImage
          source={resource.thumbnail}
          alt={resource.title}
          width={1200}
          height={750}
          sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 45vw, 100vw"
          className="h-56 w-full bg-muted/40 object-cover object-left-bottom"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center bg-[linear-gradient(135deg,_rgba(227,168,144,0.18),_rgba(142,173,150,0.18))]">
          <FileText className="size-10 text-primary" />
        </div>
      )}
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge>{resource.category}</Badge>
          {resource.featured ? (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Featured
            </span>
          ) : null}
        </div>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {formatDate(resource.publishedAt)}
          </p>
          <CardTitle className="text-3xl">
            <Link
              href={`/resources/${resource.slug.current}`}
              className="hover:text-primary"
            >
              {resource.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between space-y-5">
        <p className="line-clamp-3 leading-7 text-muted-foreground">
          {resource.description}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={`/resources/${resource.slug.current}`}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View details
          </Link>
          {resource.fileUrl ? (
            <Button asChild size="sm">
              <a href={resource.fileUrl} target="_blank" rel="noreferrer" download>
                <Download className="size-4" />
                Download Resource
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
