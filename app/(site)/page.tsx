import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import {
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";

export const revalidate = 3600;

export default async function Home() {
  const [siteSettings, services, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <Highlights />
      <About siteSettings={siteSettings} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
