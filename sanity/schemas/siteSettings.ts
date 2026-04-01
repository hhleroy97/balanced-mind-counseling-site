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
    { name: "sections", title: "Sections (home & routes)" },
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
      title: "Services — eyebrow",
      description: "Home services fold.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "servicesHeading",
      title: "Services — heading",
      description: "Home services fold.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "servicesIntro",
      title: "Services — intro paragraph",
      description: "Home services fold.",
      type: "text",
      rows: 3,
      group: "sections",
    }),
    defineField({
      name: "servicesItems",
      title: "Services — cards",
      type: "array",
      group: "sections",
      description: "Service offerings for the home page (managed here, not as separate documents).",
      of: [{ type: "object", fields: serviceItemFields }],
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
      of: [{ type: "object", fields: sectionCardFields }],
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
      of: [{ type: "object", fields: sectionCardFields }],
    }),

    defineField({
      name: "blogEyebrow",
      title: "Blog — eyebrow",
      description: "Home preview and /blog page.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "blogHeading",
      title: "Blog — heading",
      description: "Home preview and /blog page.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "blogIntro",
      title: "Blog — intro",
      description: "Home preview and /blog page.",
      type: "text",
      rows: 3,
      group: "sections",
    }),

    defineField({
      name: "resourcesEyebrow",
      title: "Resources — eyebrow",
      description: "Home preview and /resources page.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "resourcesHeading",
      title: "Resources — heading",
      description: "Home preview and /resources page.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "resourcesIntro",
      title: "Resources — intro",
      description: "Home preview and /resources page.",
      type: "text",
      rows: 3,
      group: "sections",
    }),

    defineField({
      name: "contactEyebrow",
      title: "Contact — eyebrow",
      description: "Home fold and /contact page.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactHeading",
      title: "Contact — heading",
      description: "Home fold and /contact page.",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactIntro",
      title: "Contact — intro",
      description: "Home fold and /contact page.",
      type: "text",
      rows: 3,
      group: "sections",
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
