import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { cn } from "@/lib/utils";
import type { RichTextBlock } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl text-foreground">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-5 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="leading-8 text-muted-foreground">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={typeof value?.href === "string" ? value.href : "#"}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export function PortableTextRenderer({
  value,
  className,
}: {
  value: RichTextBlock[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
