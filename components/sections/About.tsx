import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { FadeIn } from "@/components/shared/FadeIn";
import { SanityImage } from "@/components/shared/SanityImage";
import { Card } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/types";

export function About({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <FadeIn>
          <Card className="overflow-hidden border-none bg-[linear-gradient(180deg,_rgba(142,173,150,0.14),_rgba(255,255,255,0.96))] p-8">
            <SanityImage
              source={siteSettings.profilePhoto}
              fallbackSrc="/prof-pic-megan.jpeg"
              alt={`${siteSettings.practiceName} profile`}
              width={900}
              height={1125}
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="aspect-[4/5] rounded-[2rem]"
            />
          </Card>
        </FadeIn>

        <FadeIn delay={0.08} className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            About the Practice
          </p>
          <h2 className="max-w-2xl font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            Therapy that feels grounded, collaborative, and deeply human.
          </h2>
          <PortableTextRenderer value={siteSettings.bio} />
        </FadeIn>
      </div>
    </section>
  );
}
