import type {
  Post,
  Resource,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

export const mockSiteSettings: SiteSettings = {
  practiceName: "Balanced Mind Counseling",
  tagline: "Compassionate therapy for meaningful, lasting change.",
  heroHeadline: "Support for anxiety, burnout, and life transitions.",
  heroSubheadline:
    "A calm, relational therapy practice helping adults build steadier lives with practical tools and thoughtful care.",
  bookingUrl: "https://www.simplepractice.com",
  clientPortalUrl: "https://www.simplepractice.com/client-portal",
  bio: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "I offer warm, evidence-informed therapy for adults navigating anxiety, grief, stress, and relationship challenges. Sessions blend insight, practical coping strategies, and a pace that respects your story.",
        },
      ],
    },
  ],
  email: "hello@exampletherapy.com",
  phone: "(555) 123-4567",
  address: "Telehealth across California",
  socialLinks: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  seoDescription:
    "Balanced Mind Counseling offers warm, modern therapy services, articles, and mental health resources for adults.",
};

export const mockServices: Service[] = [
  {
    title: "Anxiety Therapy",
    slug: { current: "anxiety-therapy" },
    icon: "Leaf",
    shortDescription:
      "Build steadier routines, reduce overwhelm, and respond to anxiety with more clarity.",
    fullDescription: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We focus on understanding anxiety patterns, nervous system regulation, and realistic coping skills you can apply between sessions.",
          },
        ],
      },
    ],
    order: 1,
  },
  {
    title: "Burnout Recovery",
    slug: { current: "burnout-recovery" },
    icon: "Sparkles",
    shortDescription:
      "Create room for rest, boundaries, and a healthier relationship with work and caregiving.",
    fullDescription: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Together we explore what exhaustion is signaling and build sustainable rhythms that support your values, not just your obligations.",
          },
        ],
      },
    ],
    order: 2,
  },
  {
    title: "Relationship Support",
    slug: { current: "relationship-support" },
    icon: "HeartHandshake",
    shortDescription:
      "Strengthen communication, boundaries, and connection in your closest relationships.",
    fullDescription: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Therapy can help you identify patterns, clarify needs, and practice more grounded ways of relating to partners, family, and friends.",
          },
        ],
      },
    ],
    order: 3,
  },
];

export const mockPosts: Post[] = [
  {
    title: "What Grounding Actually Looks Like in Daily Life",
    slug: { current: "what-grounding-looks-like" },
    publishedAt: "2026-02-12T09:00:00.000Z",
    excerpt:
      "Grounding skills are more than crisis tools. Here are practical ways to use them during ordinary moments of stress.",
    tags: ["Anxiety", "Coping Skills"],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Grounding can be gentle and ordinary. It might mean feeling your feet on the floor before a meeting, naming three things you can see, or taking one slower exhale before responding.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Start small and repeat often" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Short, repeated moments of regulation usually work better than waiting until you feel completely flooded.",
          },
        ],
      },
    ],
    seo: {
      title: "What Grounding Looks Like in Daily Life",
      description:
        "Learn approachable grounding strategies for anxiety and everyday stress.",
    },
  },
  {
    title: "Signs You Might Be Running on Empty",
    slug: { current: "signs-you-might-be-running-on-empty" },
    publishedAt: "2026-01-20T09:00:00.000Z",
    excerpt:
      "Burnout is not just being busy. These common signals can help you notice when your system needs support.",
    tags: ["Burnout", "Stress"],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Burnout often shows up as irritability, numbness, loss of motivation, and the feeling that even small tasks take too much effort.",
          },
        ],
      },
    ],
    seo: {
      title: "Signs You Might Be Running on Empty",
      description:
        "Common burnout signals and how therapy can support nervous system recovery.",
    },
  },
  {
    title: "A Gentle Way to Prepare for Hard Conversations",
    slug: { current: "prepare-for-hard-conversations" },
    publishedAt: "2025-12-15T09:00:00.000Z",
    excerpt:
      "A simple framework to help you approach difficult conversations with more steadiness and less reactivity.",
    tags: ["Relationships", "Communication"],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Preparation can lower anxiety before difficult conversations. Clarify your intention, name your needs, and stay connected to what you want the relationship to feel like after the conversation.",
          },
        ],
      },
    ],
    seo: {
      title: "Prepare for Hard Conversations",
      description:
        "A therapist-informed approach to difficult conversations and healthy communication.",
    },
  },
];

export const mockResources: Resource[] = [
  {
    title: "Anxiety Check-In Worksheet",
    slug: { current: "anxiety-check-in-worksheet" },
    description:
      "A one-page worksheet for noticing triggers, body cues, and supportive next steps.",
    category: "Anxiety",
    fileUrl: "https://example.com/anxiety-check-in.pdf",
    featured: true,
    publishedAt: "2026-02-01T09:00:00.000Z",
  },
  {
    title: "CBT Thought Reframe Guide",
    slug: { current: "cbt-thought-reframe-guide" },
    description:
      "A practical prompt sheet for slowing down automatic thoughts and testing alternatives.",
    category: "CBT",
    fileUrl: "https://example.com/cbt-thought-reframe.pdf",
    featured: true,
    publishedAt: "2026-01-10T09:00:00.000Z",
  },
  {
    title: "DBT Distress Tolerance Menu",
    slug: { current: "dbt-distress-tolerance-menu" },
    description:
      "A curated list of grounding and distress tolerance ideas for moments of overwhelm.",
    category: "DBT",
    fileUrl: "https://example.com/dbt-distress-tolerance.pdf",
    publishedAt: "2025-12-01T09:00:00.000Z",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    quote:
      "Therapy helped me feel more equipped to manage anxiety without feeling ashamed of it.",
    attribution: "Former Client",
    featured: true,
  },
  {
    quote:
      "I felt understood and challenged in a way that was steady, thoughtful, and practical.",
    attribution: "Former Client",
    featured: true,
  },
];
