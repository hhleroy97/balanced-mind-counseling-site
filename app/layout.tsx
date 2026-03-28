import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
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
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
