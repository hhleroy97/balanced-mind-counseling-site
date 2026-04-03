"use client";

import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { cn } from "@/lib/utils";
import type { RichTextBlock } from "@/lib/types";

function portableComponents(compact: boolean, prominent: boolean): PortableTextComponents {
  const body = compact
    ? "text-sm leading-6 text-[#345447]/95"
    : prominent
      ? "text-lg leading-8 text-muted-foreground md:text-xl md:leading-9"
      : "text-base leading-8 text-muted-foreground";
  const h2 = compact
    ? "font-serif text-xl text-[#1f352c]"
    : prominent
      ? "font-serif text-3xl text-foreground md:text-4xl"
      : "font-serif text-3xl text-foreground";
  const h3 = compact
    ? "font-serif text-lg text-[#1f352c]"
    : prominent
      ? "font-serif text-2xl text-foreground md:text-3xl"
      : "font-serif text-2xl text-foreground";
  const list = compact
    ? "space-y-1.5 pl-5 text-sm text-[#345447]/95"
    : prominent
      ? "space-y-2.5 pl-6 text-lg text-muted-foreground md:text-xl md:pl-7"
      : "space-y-2 pl-6 text-base text-muted-foreground";

  return {
    block: {
      h2: ({ children }) => <h2 className={h2}>{children}</h2>,
      h3: ({ children }) => <h3 className={h3}>{children}</h3>,
      blockquote: ({ children }) => (
        <blockquote
          className={cn(
            "border-l-4 border-primary pl-4 italic text-[#345447]/90",
            compact && "text-sm leading-6",
            !compact && prominent && "text-lg leading-8 md:text-xl",
            !compact && !prominent && "text-base leading-7",
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
  /** Larger type scale (e.g. modals); ignored when `compact` is true. */
  prominent = false,
}: {
  value: RichTextBlock[];
  className?: string;
  compact?: boolean;
  prominent?: boolean;
}) {
  const useProminent = prominent && !compact;
  return (
    <div
      className={cn(
        compact ? "space-y-3" : useProminent ? "space-y-6" : "space-y-5",
        className,
      )}
    >
      <PortableText value={value} components={portableComponents(compact, useProminent)} />
    </div>
  );
}
