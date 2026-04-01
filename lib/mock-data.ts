import type {
  CopyCard,
  Post,
  Resource,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

const LP =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";
const LP_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.";
const LP_LINE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const mockRatesItems: CopyCard[] = [
  {
    title: "Lorem consultum",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    icon: "DollarSign",
  },
  {
    title: "Excepteur sessions",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: "Clock",
  },
  {
    title: "Ullamco pricing",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.",
    icon: "Wallet",
  },
];

const mockGettingStartedSteps: CopyCard[] = [
  {
    title: "Lorem reach out",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    icon: "Mail",
  },
  {
    title: "Consectetur schedule",
    description:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.",
    icon: "CalendarCheck",
  },
  {
    title: "Adipiscing begin",
    description:
      "Nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate.",
    icon: "Heart",
  },
];

function blockParagraph(text: string) {
  return [
    {
      _type: "block" as const,
      style: "normal" as const,
      children: [{ _type: "span" as const, text }],
    },
  ];
}

export const mockSiteSettings: SiteSettings = {
  practiceName: "Lorem Ipsum Counseling",
  tagline: LP_LINE,
  heroHeadline: "Dolor sit amet consectetur adipiscing elit sed do eiusmod.",
  heroSubheadline: LP_SHORT,
  bookingUrl: "https://www.simplepractice.com",
  clientPortalUrl: "https://www.simplepractice.com/client-portal",
  bio: blockParagraph(LP),
  email: "lorem@ipsum.example",
  phone: "(555) 010-2030",
  address: "123 Lorem Street, Dolor Suite 400, Ipsum State 00000",
  socialLinks: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  seoDescription: LP_SHORT,

  aboutEyebrow: "About the practice",
  aboutHeading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit praesent commodo.",
  aboutLead: LP_LINE,
  aboutSupporting: LP_SHORT,
  connectHeading: "Connect",
  contactDetailsLabel: "Practice details",

  servicesEyebrow: "Services",
  servicesHeading: "Lorem ipsum dolor sit amet support tailored to client needs.",
  servicesIntro: LP_SHORT,

  ratesEyebrow: "Rates",
  ratesHeading: "Lorem ipsum practical information about fees and getting started.",
  ratesIntro: LP_SHORT,
  ratesItems: mockRatesItems,

  gettingStartedEyebrow: "Getting started",
  gettingStartedHeading: "Lorem ipsum path from first question to first session.",
  gettingStartedSteps: mockGettingStartedSteps,

  blogEyebrow: "Blog",
  blogHeading: "Lorem ipsum recent writing and placeholder articles.",
  blogIntro: LP_SHORT,

  resourcesEyebrow: "Resources",
  resourcesHeading: "Lorem ipsum downloadable tools and worksheets.",
  resourcesIntro: LP_SHORT,

  contactEyebrow: "Contact",
  contactHeading: "Lorem ipsum reach out with questions or scheduling needs.",
  contactIntro: LP_SHORT,

  blogPageEyebrow: "Blog",
  blogPageHeading: "Lorem ipsum articles and reflections placeholder archive.",
  blogPageIntro: LP_SHORT,

  resourcesPageEyebrow: "Resources",
  resourcesPageHeading: "Lorem ipsum worksheets and supportive tools placeholder library.",
  resourcesPageIntro: LP_SHORT,

  contactPageEyebrow: "Contact",
  contactPageHeading: "Lorem ipsum questions or book directly when ready.",
  contactPageIntro: LP_SHORT,

  resourceDetailDownloadHeading: "Lorem ipsum download this resource",
  resourceDetailDownloadBody: LP_SHORT,
  resourceDetailNoFileMessage:
    "Lorem ipsum add a file or external URL in the CMS to enable downloads.",

  footerBlurb: LP_SHORT,
};

export const mockServices: Service[] = [
  {
    title: "Lorem anxiety support",
    slug: { current: "lorem-anxiety" },
    icon: "Leaf",
    shortDescription:
      "Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    fullDescription: blockParagraph(LP),
    order: 1,
  },
  {
    title: "Ipsum burnout care",
    slug: { current: "ipsum-burnout" },
    icon: "Sparkles",
    shortDescription:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    fullDescription: blockParagraph(LP_SHORT),
    order: 2,
  },
  {
    title: "Dolor relationship focus",
    slug: { current: "dolor-relationships" },
    icon: "HeartHandshake",
    shortDescription:
      "Ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit.",
    fullDescription: blockParagraph(LP_SHORT),
    order: 3,
  },
];

export const mockPosts: Post[] = [
  {
    title: "Lorem ipsum dolor sit amet grounding exercises",
    slug: { current: "lorem-grounding" },
    publishedAt: "2026-02-12T09:00:00.000Z",
    excerpt: LP_SHORT,
    tags: ["Lorem", "Ipsum"],
    body: [
      ...blockParagraph(LP),
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Dolor sit amet heading" }],
      },
      ...blockParagraph(LP_SHORT),
    ],
    seo: {
      title: "Lorem grounding",
      description: LP_LINE,
    },
  },
  {
    title: "Consectetur adipiscing elit burnout signals",
    slug: { current: "ipsum-burnout-post" },
    publishedAt: "2026-01-20T09:00:00.000Z",
    excerpt: LP_SHORT,
    tags: ["Dolor", "Sit"],
    body: blockParagraph(LP),
    seo: {
      title: "Ipsum burnout",
      description: LP_LINE,
    },
  },
  {
    title: "Sed do eiusmod tempor conversations",
    slug: { current: "dolor-conversations" },
    publishedAt: "2025-12-15T09:00:00.000Z",
    excerpt: LP_SHORT,
    tags: ["Amet", "Consectetur"],
    body: blockParagraph(LP_SHORT),
    seo: {
      title: "Amet conversations",
      description: LP_LINE,
    },
  },
];

export const mockResources: Resource[] = [
  {
    title: "Lorem worksheet alpha",
    slug: { current: "lorem-worksheet-alpha" },
    description: LP_SHORT,
    category: "Lorem",
    fileUrl: "https://example.com/lorem.pdf",
    featured: true,
    publishedAt: "2026-02-01T09:00:00.000Z",
  },
  {
    title: "Ipsum guide beta",
    slug: { current: "ipsum-guide-beta" },
    description: LP_SHORT,
    category: "Ipsum",
    fileUrl: "https://example.com/ipsum.pdf",
    featured: true,
    publishedAt: "2026-01-10T09:00:00.000Z",
  },
  {
    title: "Dolor menu gamma",
    slug: { current: "dolor-menu-gamma" },
    description: LP_SHORT,
    category: "Dolor",
    fileUrl: "https://example.com/dolor.pdf",
    publishedAt: "2025-12-01T09:00:00.000Z",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    quote: LP_SHORT,
    attribution: "Lorem Client",
    featured: true,
  },
  {
    quote: LP_SHORT,
    attribution: "Ipsum Client",
    featured: true,
  },
];
