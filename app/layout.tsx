import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "Balanced Mind Counseling",
    template: "%s | Balanced Mind Counseling",
  },
  description:
    "Warm, modern therapy services with blog content, practical resources, and a clear path to scheduling.",
  openGraph: {
    title: "Balanced Mind Counseling",
    description:
      "Warm, modern therapy services with blog content, practical resources, and a clear path to scheduling.",
    url: absoluteUrl(),
    siteName: "Balanced Mind Counseling",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balanced Mind Counseling",
    description:
      "Warm, modern therapy services with blog content, practical resources, and a clear path to scheduling.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
