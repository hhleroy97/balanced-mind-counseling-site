import { defineField, defineType } from "sanity";

import { lucideIconSelectOptions } from "@/lib/lucide-icons";

const sectionCardFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "icon",
    title: "Icon",
    type: "string",
    description: "Used when no image is set.",
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
    description: "Replaces the icon in this card when uploaded.",
    options: { hotspot: true },
  }),
];

const serviceItemFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({
    name: "shortDescription",
    title: "Short description",
    type: "text",
    rows: 3,
    description: "Shown under the title on the card.",
  }),
  defineField({
    name: "fullDescription",
    title: "Full description",
    type: "blockContent",
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
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Practice & SEO", default: true },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About (home)" },
    { name: "services", title: "Services" },
    { name: "rates", title: "Rates" },
    { name: "gettingStarted", title: "Getting Started" },
    { name: "blog", title: "Blog" },
    { name: "resources", title: "Resources" },
    { name: "contact", title: "Contact" },
    { name: "pages", title: "Resource detail" },
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
      name: "aboutPortraitTitle",
      title: "About — portrait overlay title",
      type: "string",
      description:
        "Name shown on the bottom of the About profile photo. Leave empty to use Practice Name.",
      group: "about",
    }),
    defineField({
      name: "aboutPortraitSubtitle",
      title: "About — portrait overlay subtitle",
      type: "string",
      description:
        "Optional second line under the portrait title (e.g. credentials or role). Leave empty to hide.",
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
      title: "Eyebrow",
      description: "Home /services page and services fold on the homepage.",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesHeading",
      title: "Heading",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesIntro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      group: "services",
    }),
    defineField({
      name: "servicesItems",
      title: "Service cards",
      type: "array",
      group: "services",
      description: "Cards on the home services fold and /services (not separate documents).",
      of: [{ type: "object", fields: serviceItemFields }],
    }),

    defineField({
      name: "ratesEyebrow",
      title: "Eyebrow",
      description: "Home /rates page and rates fold on the homepage.",
      type: "string",
      group: "rates",
    }),
    defineField({
      name: "ratesHeading",
      title: "Heading",
      type: "string",
      group: "rates",
    }),
    defineField({
      name: "ratesIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      group: "rates",
    }),
    defineField({
      name: "ratesItems",
      title: "Rate cards",
      type: "array",
      group: "rates",
      of: [{ type: "object", fields: sectionCardFields }],
    }),

    defineField({
      name: "gettingStartedEyebrow",
      title: "Eyebrow",
      description: "Home /getting-started page and fold on the homepage.",
      type: "string",
      group: "gettingStarted",
    }),
    defineField({
      name: "gettingStartedHeading",
      title: "Heading",
      type: "string",
      group: "gettingStarted",
    }),
    defineField({
      name: "gettingStartedSteps",
      title: "Steps",
      type: "array",
      group: "gettingStarted",
      of: [{ type: "object", fields: sectionCardFields }],
    }),

    defineField({
      name: "blogEyebrow",
      title: "Eyebrow",
      description: "Home blog preview and /blog archive.",
      type: "string",
      group: "blog",
    }),
    defineField({
      name: "blogHeading",
      title: "Heading",
      type: "string",
      group: "blog",
    }),
    defineField({
      name: "blogIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      group: "blog",
    }),

    defineField({
      name: "resourcesEyebrow",
      title: "Eyebrow",
      description: "Home resources preview and /resources archive.",
      type: "string",
      group: "resources",
    }),
    defineField({
      name: "resourcesHeading",
      title: "Heading",
      type: "string",
      group: "resources",
    }),
    defineField({
      name: "resourcesIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      group: "resources",
    }),

    defineField({
      name: "contactEyebrow",
      title: "Eyebrow",
      description: "Home contact fold and /contact page.",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactHeading",
      title: "Heading",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactIntro",
      title: "Intro",
      type: "text",
      rows: 3,
      group: "contact",
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
