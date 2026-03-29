import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/** Fresh Sanity content on every request (no ISR / redeploy). Studio stays under /studio. */
export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
