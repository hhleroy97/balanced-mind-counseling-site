import { blockContentType } from "@/sanity/schemas/blockContent";
import { postType } from "@/sanity/schemas/post";
import { resourceType } from "@/sanity/schemas/resource";
import { siteSettingsType } from "@/sanity/schemas/siteSettings";
import { testimonialType } from "@/sanity/schemas/testimonial";

export const schemaTypes = [
  blockContentType,
  siteSettingsType,
  postType,
  resourceType,
  testimonialType,
];
