# Balanced Mind Counseling Site

Production-ready scaffold for a modern therapy practice website built with Next.js App Router, Tailwind CSS, local shadcn-style UI primitives, Sanity, Resend, and Framer Motion.

## Stack

- `Next.js 16` with App Router and ISR
- `Tailwind CSS 4` for styling
- `Sanity` for structured content
- `Resend` + `React Email` for contact form delivery
- `Framer Motion` for subtle fade-in transitions
- `Vitest` for focused utility and validation tests

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.local.example .env.local
```

3. Fill in the required values in `.env.local`.

   Important for SEO: set `NEXT_PUBLIC_SITE_URL` to the deployed site origin in production so canonical tags, `robots.txt`, and `sitemap.xml` point at the live domain.

4. Start the dev server:

```bash
npm run dev
```

5. Run quality checks:

```bash
npm run lint
npm run test
npm run build
```

## Sanity Setup

1. Create or connect a Sanity project.
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN`.
3. Use the schema files in `sanity/schemas/` to create the following document types:
   - `siteSettings`
   - `service`
   - `post`
   - `resource`
   - `testimonial`
4. Configure CORS in Sanity for your local and production domains.
5. Add a publish webhook to your deployment platform for revalidation.

Note: the app includes graceful mock content fallbacks so the site can render before the CMS is fully connected.

## Content Model Overview

### `siteSettings`

Use this singleton-like document for:

- practice name and tagline
- hero headline and subheadline
- booking URL and client portal URL
- bio and contact details
- social links and global SEO description

### `service`

Each service entry controls:

- title
- slug
- icon name
- short and full descriptions
- manual sort order

### `post`

Each blog post supports:

- title, slug, and publish date
- excerpt
- tags
- Portable Text body
- SEO title, description, and OG image

### `resource`

Each resource supports:

- title and slug
- category
- description
- featured flag
- file upload or external `fileUrl`

## Client Editing Guide

For the practice owner:

1. Open Sanity Studio.
2. Update `Site Settings` for homepage text, contact details, and booking links.
3. In `Site Settings` → **Services** tab, edit **Service cards** to add or reorder offerings (same pattern as **Rates** → Rate cards).
4. Publish `Posts` for new blog articles.
5. Add `Resources` to publish downloadable worksheets.
6. Use `Testimonials` only for anonymized quotes.

## Homepage Placeholders

- The homepage is now a single scrollable landing page with header anchors for `Home`, `About`, `Services`, `Rates`, `Getting Started`, `Blog`, `Resources`, and `Contact`, plus a `Client Portal` item that opens `clientPortalUrl` from site settings in a new tab. Each section uses `site-fold-section` in `app/globals.css` so it fills one viewport with top padding for the fixed header, plus mandatory vertical scroll-snap to each section fold (`home-fold-scroll` on the document; `proximity` when `prefers-reduced-motion`) on `/` only. The document does not use global smooth scrolling.
- The hero lives in `components/sections/Hero.tsx` and pulls visible content from `siteSettings`, including the logo lockup, `tagline`, `heroHeadline`, `heroSubheadline`, booking link, client portal link, and top-line contact chips.
- The about section in `components/sections/About.tsx` surfaces the practice portrait from `profilePhoto`, falling back to `heroImage` or a static image, plus the practice name, SEO description, bio, contact details, and social links.
- Blog and resource sections on the homepage are preview sections that link onward to the full `/blog` and `/resources` archives.
- `Rates` and `Getting Started` are intentionally lightweight editorial sections for homepage flow and can be promoted into Sanity fields later if you want those blocks to become CMS-managed too.

## Deployment Checklist

- Enable Web Analytics in the Vercel project dashboard after the first deploy so `@vercel/analytics` can start collecting data
- Add all environment variables in Vercel
- Point Cloudflare DNS to Vercel
- Add your production domain to Sanity CORS settings
- Configure Sanity publish webhook for revalidation
- Test the contact form end-to-end
- Verify booking and client portal links
- Submit the generated sitemap to Google Search Console

## Vercel Analytics

1. Open the project in Vercel.
2. Go to `Analytics`.
3. Enable `Web Analytics` for the project.
4. Redeploy if Vercel prompts you to do so.

The app already mounts Vercel's `Analytics` component in `app/layout.tsx`, so no additional environment variables are required for the basic integration.

## Google Analytics 4

The site also loads the Google tag (`gtag.js`) globally from `app/layout.tsx` using measurement ID `G-D1TCWT3SNJ`, so pageview tracking can start once the property is configured in Google Analytics.

If the practice ever needs to switch to a different GA4 property, update the `GOOGLE_ANALYTICS_ID` constant in `app/layout.tsx`.

## SEO Metadata

The app now adds canonical metadata on the main site routes and includes JSON-LD structured data for the organization, website, homepage, blog pages, and resource detail pages.

For production deployments, make sure `NEXT_PUBLIC_SITE_URL` matches the public domain exactly, including protocol and preferred host, so search engines see the correct canonical URLs.

The app also serves `robots.txt` from `app/robots.ts` and `llms.txt` from `app/llms.txt/route.ts`.

## Notes

- The contact form intentionally includes a hidden honeypot field.
- Blog and resource routes support filtering from query params.
- `app/sitemap.ts` and `app/robots.ts` generate SEO metadata routes automatically.
- Current local Node version on this machine is slightly below the latest package engine recommendations, so package installs emit warnings even though the scaffold completes.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load **Inter** for UI body text and **Lora** for headings and serif moments.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
