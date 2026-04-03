export type RichTextBlock = {
  _key?: string;
  _type: string;
  children?: Array<{
    _key?: string;
    _type: string;
    marks?: string[];
    text?: string;
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: string;
  listItem?: string;
  level?: number;
};

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
};

/** Title + body used for rates cards, getting-started steps, etc. */
export type CopyCard = {
  title: string;
  description: string;
  /** Lucide icon name from Studio picker; ignored if `image` is set */
  icon?: string;
  image?: unknown;
};

export type SiteSettings = {
  practiceName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage?: unknown;
  bookingUrl: string;
  clientPortalUrl: string;
  bio: RichTextBlock[];
  profilePhoto?: unknown;
  email: string;
  phone: string;
  address: string;
  socialLinks: SocialLinks;
  seoDescription: string;

  /** Section visibility toggles (default to true when unset in CMS). */
  showAbout: boolean;
  showServices: boolean;
  showRates: boolean;
  showGettingStarted: boolean;
  showBlog: boolean;
  showResources: boolean;
  showContact: boolean;

  aboutEyebrow: string;
  aboutHeading: string;
  aboutLead: string;
  aboutSupporting: string;
  /** Text on the About portrait overlay; falls back to practice name when empty in CMS */
  aboutPortraitTitle: string;
  /** Optional second line on the portrait overlay; empty string hides it */
  aboutPortraitSubtitle: string;
  connectHeading: string;
  contactDetailsLabel: string;

  servicesEyebrow: string;
  servicesHeading: string;
  servicesIntro: string;
  servicesItems: ServiceItem[];

  ratesEyebrow: string;
  ratesHeading: string;
  ratesIntro: string;
  ratesItems: CopyCard[];

  gettingStartedEyebrow: string;
  gettingStartedHeading: string;
  gettingStartedSteps: CopyCard[];

  blogEyebrow: string;
  blogHeading: string;
  blogIntro: string;

  resourcesEyebrow: string;
  resourcesHeading: string;
  resourcesIntro: string;

  contactEyebrow: string;
  contactHeading: string;
  contactIntro: string;

  /** Resource detail page — download panel (single resource view) */
  resourceDetailDownloadHeading: string;
  resourceDetailDownloadBody: string;
  resourceDetailNoFileMessage: string;

  footerBlurb: string;
};

/** Service card on the home page (from Site Settings). */
export type ServiceItem = {
  title: string;
  shortDescription: string;
  fullDescription: RichTextBlock[];
  icon: string;
  /** Optional card image; when set, replaces the icon */
  image?: unknown;
};

export type PostSeo = {
  title?: string;
  description?: string;
  ogImage?: unknown;
};

export type Post = {
  _id?: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage?: unknown;
  tags: string[];
  body: RichTextBlock[];
  seo?: PostSeo;
};

export type Resource = {
  _id?: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  thumbnail?: unknown;
  file?: unknown;
  fileUrl?: string;
  featured?: boolean;
  publishedAt: string;
};

export type Testimonial = {
  _id?: string;
  quote: string;
  attribution: string;
  featured: boolean;
};

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  _trap?: string;
};
