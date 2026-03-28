import Image from "next/image";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

export function SanityImage({
  source,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  sizes = "100vw",
  priority = false,
}: {
  source?: unknown;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const imageUrl = urlFor(source)?.width(width).height(height).fit("crop").url();

  if (!imageUrl && fallbackSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  if (!imageUrl) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "bg-[linear-gradient(135deg,_rgba(142,173,150,0.2),_rgba(227,168,144,0.18))]",
          className,
        )}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
