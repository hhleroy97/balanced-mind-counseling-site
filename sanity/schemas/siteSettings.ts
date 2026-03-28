import { defineField, defineType } from "sanity";

const copyCardFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 3,
  }),
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Practice & SEO", default: true },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About (home)" },
    { name: "sections", title: "Home sections" },
    { name: "pages", title: "Inner pages" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "practiceName",
      title: "Practice Name",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short line; also used in the hero.",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking URL",
      type: "url",
      group: "identity",
    }),
    defineField({
      name: "clientPortalUrl",
      title: "Client Portal URL",
      type: "url",
      group: "identity",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
      group: "about",
    }),
    defineField({
      name: "profilePhoto",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({ name: "email", title: "Email", type: "string", group: "identity" }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "identity" }),
    defineField({ name: "address", title: "Address", type: "string", group: "identity" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      group: "identity",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Default meta description sitewide.",
      group: "identity",
    }),

    defineField({
      name: "aboutEyebrow",
      title: "About — eyebrow",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutHeading",
      title: "About — main heading",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutLead",
      title: "About — first paragraph",
      type: "text",
      rows: 2,
      group: "about",
    }),
    defineField({
      name: "aboutSupporting",
      title: "About — second paragraph",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "connectHeading",
      title: "About — connect panel heading",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "contactDetailsLabel",
      title: "Contact details card label",
      type: "string",
      group: "about",
    }),

    defineField({
      name: "servicesEyebrow",
      title: "Services — eyebrow",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "servicesHeading",
      title: "Services — heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "servicesIntro",
      title: "Services — intro paragraph",
      type: "text",
      rows: 3,
      group: "sections",
    }),

    defineField({
      name: "ratesEyebrow",
      title: "Rates — eyebrow",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "ratesHeading",
      title: "Rates — heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "ratesIntro",
      title: "Rates — intro",
      type: "text",
      rows: 3,
      group: "sections",
    }),
    defineField({
      name: "ratesItems",
      title: "Rates — cards",
      type: "array",
      group: "sections",
      of: [{ type: "object", fields: copyCardFields }],
    }),

    defineField({
      name: "gettingStartedEyebrow",
      title: "Getting Started — eyebrow",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "gettingStartedHeading",
      title: "Getting Started — heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "gettingStartedSteps",
      title: "Getting Started — steps",
      type: "array",
      group: "sections",
      of: [{ type: "object", fields: copyCardFields }],
    }),

    defineField({
      name: "blogEyebrow",
      title: "Blog preview — eyebrow",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "blogHeading",
      title: "Blog preview — heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "blogIntro",
      title: "Blog preview — intro",
      type: "text",
      rows: 3,
      group: "sections",
    }),

    defineField({
      name: "resourcesEyebrow",
      title: "Resources preview — eyebrow",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "resourcesHeading",
      title: "Resources preview — heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "resourcesIntro",
      title: "Resources preview — intro",
      type: "text",
      rows: 3,
      group: "sections",
    }),

    defineField({
      name: "contactEyebrow",
      title: "Contact fold — eyebrow",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactHeading",
      title: "Contact fold — heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactIntro",
      title: "Contact fold — intro",
      type: "text",
      rows: 3,
      group: "sections",
    }),

    defineField({
      name: "blogPageEyebrow",
      title: "Blog page — eyebrow",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "blogPageHeading",
      title: "Blog page — heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "blogPageIntro",
      title: "Blog page — intro",
      type: "text",
      rows: 3,
      group: "pages",
    }),

    defineField({
      name: "resourcesPageEyebrow",
      title: "Resources page — eyebrow",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "resourcesPageHeading",
      title: "Resources page — heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "resourcesPageIntro",
      title: "Resources page — intro",
      type: "text",
      rows: 3,
      group: "pages",
    }),

    defineField({
      name: "contactPageEyebrow",
      title: "Contact page — eyebrow",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "contactPageHeading",
      title: "Contact page — heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "contactPageIntro",
      title: "Contact page — intro",
      type: "text",
      rows: 3,
      group: "pages",
    }),

    defineField({
      name: "resourceDetailDownloadHeading",
      title: "Resource detail — download panel heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "resourceDetailDownloadBody",
      title: "Resource detail — download panel body",
      type: "text",
      rows: 4,
      group: "pages",
    }),
    defineField({
      name: "resourceDetailNoFileMessage",
      title: "Resource detail — message when no file is set",
      type: "text",
      rows: 2,
      group: "pages",
    }),

    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 3,
      group: "footer",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
