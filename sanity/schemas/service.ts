import { defineField, defineType } from "sanity";

import { lucideIconSelectOptions } from "@/lib/lucide-icons";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Shown in the card header unless Image is set.",
      options: {
        list: lucideIconSelectOptions,
        layout: "dropdown",
      },
      initialValue: "Leaf",
    }),
    defineField({
      name: "image",
      title: "Image (optional)",
      type: "image",
      description: "Replaces the icon when uploaded.",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "blockContent",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Manual Order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
