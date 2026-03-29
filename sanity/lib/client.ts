import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const isSanityEnabled = Boolean(projectId && dataset);

/** Production defaults to API origin (not CDN) so published edits show up immediately. Set SANITY_API_USE_CDN=true to use the CDN and reduce API load. */
const useCdn =
  process.env.NODE_ENV !== "production"
    ? false
    : process.env.SANITY_API_USE_CDN === "true";

export const client = isSanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion: "2024-01-01",
      useCdn,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;
