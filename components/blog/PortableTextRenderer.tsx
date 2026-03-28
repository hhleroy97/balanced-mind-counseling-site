import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { cn } from "@/lib/utils";
import type { RichTextBlock } from "@/lib/types";

function portableComponents(compact: boolean): PortableTextComponents {
  const body = compact ? "text-sm leading-6 text-[#345447]/95" : "leading-8 text-muted-foreground";
  const h2 = compact ? "font-serif text-xl text-[#1f352c]" : "font-serif text-3xl text-foreground";
  const h3 = compact ? "font-serif text-lg text-[#1f352c]" : "font-serif text-2xl text-foreground";
  const list = compact ? "space-y-1.5 pl-5 text-sm text-[#345447]/95" : "space-y-2 pl-6 text-muted-foreground";

  return {
    block: {
      h2: ({ children }) => <h2 className={h2}>{children}</h2>,
      h3: ({ children }) => <h3 className={h3}>{children}</h3>,
      blockquote: ({ children }) => (
        <blockquote
          className={cn(
            "border-l-4 border-primary pl-4 italic text-[#345447]/90",
            compact && "text-sm leading-6",
          )}
        >
          {children}
        </blockquote>
      ),
      normal: ({ children }) => <p className={body}>{children}</p>,
    },
    list: {
      bullet: ({ children }) => <ul className={cn("list-disc", list)}>{children}</ul>,
      number: ({ children }) => <ol className={cn("list-decimal", list)}>{children}</ol>,
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
}

export function PortableTextRenderer({
  value,
  className,
  compact = false,
}: {
  value: RichTextBlock[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn(compact ? "space-y-3" : "space-y-5", className)}>
      <PortableText value={value} components={portableComponents(compact)} />
    </div>
  );
}
