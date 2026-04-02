import { LucideByName } from "@/components/shared/LucideByName";
import { SanityImage } from "@/components/shared/SanityImage";
import { cn } from "@/lib/utils";

export function SectionCardMedia({
  label,
  icon,
  image,
  iconFrameClassName,
  className,
}: {
  /** Accessibility / alt text when using an image */
  label: string;
  icon?: string | null;
  image?: unknown;
  iconFrameClassName?: string;
  /** Merged onto the outer frame (e.g. `mb-0` when sitting inline with a title). */
  className?: string;
}) {
  if (image) {
    return (
      <div
        className={cn(
          "mb-4 size-12 shrink-0 overflow-hidden rounded-2xl bg-muted/40 ring-1 ring-border/60",
          className,
        )}
      >
        <SanityImage
          source={image}
          alt={label}
          width={96}
          height={96}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-4 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary",
        iconFrameClassName,
        className,
      )}
    >
      <LucideByName name={icon} className="size-5" />
    </div>
  );
}
