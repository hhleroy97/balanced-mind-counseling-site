"use client";

import { useState } from "react";

import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/lib/types";

export function ServiceCardsGrid({ services }: { services: ServiceItem[] }) {
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {services.map((service, index) => (
          <button
            key={`${service.title}-${index}`}
            type="button"
            onClick={() => setSelected(service)}
            className={cn(
              "group flex min-h-[9.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-border bg-card p-5 text-center shadow-[0_20px_60px_rgba(18,38,32,0.08)] transition-all duration-200 ease-out sm:min-h-[10.5rem] sm:p-6",
              "hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/[0.06] hover:shadow-[0_28px_80px_rgba(18,38,32,0.14)]",
              "active:translate-y-0 active:scale-[0.99] active:shadow-[0_16px_48px_rgba(18,38,32,0.1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-haspopup="dialog"
          >
            <span className="line-clamp-3 max-w-full font-serif text-lg leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-xl md:text-2xl">
              {service.title}
            </span>
          </button>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="flex max-h-[min(85dvh,56rem)] w-[calc(100%-1rem)] max-w-4xl flex-col gap-0 overflow-hidden sm:w-[calc(100%-2rem)] sm:max-w-5xl">
          {selected ? (
            <>
              <div className="shrink-0 px-5 pb-0 pt-5 pr-14 sm:px-6 sm:pt-6">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl">{selected.title}</DialogTitle>
                <hr className="mt-3 border-t border-border" />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5">
                {selected.shortDescription ? (
                  <DialogDescription className="mb-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                    {selected.shortDescription}
                  </DialogDescription>
                ) : (
                  <DialogDescription className="sr-only">
                    Full description for {selected.title}
                  </DialogDescription>
                )}
                <PortableTextRenderer
                  value={selected.fullDescription}
                  compact={false}
                  prominent
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
