/**
 * Fallback homepage copy (EN) when Keystatic files are missing.
 *
 * Live copy: **Homepage (EN)** singleton in /keystatic (`src/data/homepage/en/index.yaml`).
 * Card rows: **Homepage — How I work** and **How can I help you?** (show on homepage).
 */

export interface HomepageCard {
  icon: string;
  title: string;
  text: string;
}

export const homepageData = {
  hero: {
    badge: "Hi, I'm Marius",
    title: "AI Automation Consultant and Web Developer for Small Businesses",
    description:
      "I help business owners find the right tool for the job, and when it doesn't exist yet, I build it. We start with how you actually work, then pick what fits: an existing tool, an automation, or something custom.",
    cta: "Let's talk",
    ctaHref: "/contact",
  },
  mainServices: {
    title: "How can I help you?",
    description: "",
    items: [
      {
        icon: "tabler/script",
        title: "Custom tools and web apps",
        text: "Configurators, dashboards, client portals, booking systems, internal tools. If the software you need doesn't exist, or every off-the-shelf option forces you to change how you work, I'll build the thing that fits.",
        href: "/services/custom-tools/",
      },
      {
        icon: "tabler/bulb",
        title: "AI consultancy and automation",
        text: "You want to use AI, but there are a hundred tools and no obvious place to begin. I help you cut through that. We look at your business, pick one process, and figure out what actually helps.",
        href: "/services/ai-consultancy/",
      },
      {
        icon: "tabler/home-heart",
        title: "Custom websites you actually own",
        text: "A fast, clean website that's genuinely yours. No monthly platform fee, no renting your own site. Built so it loads fast, you can edit your own content, and then it's yours to keep.",
        href: "/services/custom-websites/",
      },
    ],
    buttonText: "Book a call",
    buttonHref: "/contact",
  },
  faq: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
  },
  howIWork: {
    title: "How I work",
    description:
      "I'm a one-person shop, so I take on a limited number of projects. I keep 2 active projects at the time. When those are gone, you go on a waitlist, and I'll tell you when a slot opens up.",
    items: [
      {
        icon: "tabler/mail",
        title: "1. We talk",
        text: "Tell me what you're trying to do, why, and how you handle it today. This is the part that matters most, so we go deep. My job is asking the right questions and turning a fuzzy idea into a concrete plan.",
      },
      {
        icon: "tabler/list-check",
        title: "2. We get clarity: build or buy",
        text: "I look at it straight. Is a custom tool actually worth it here, or does an existing one do the job better and cheaper? Either way you walk out with a clear spec, and you decide: build it with me, or take it elsewhere.",
      },
      {
        icon: "tabler/circle-arrow-up",
        title: "3. I build it, you use it",
        text: "If building makes sense, I build it, hand it over, and show you how it works. Want it maintained after? I can do that too.",
      },
    ] satisfies HomepageCard[],
  },
  blog: {
    title: "Latest from the blog",
    description:
      "I build things and write down how. Real walkthroughs, setup guides, and the odd strong opinion. No fluff, nothing written by a robot.",
    cta: "Read the blog",
    href: "/blog",
  },
  bottomCta: {
    title: "My favourite tools",
    description:
      "Testing and building tools is what I do for fun. I lean on AI heavily in my own work, and I'm always poking at the newest stuff. So I keep a directory of the software I actually use. Take a look, some of it might help you too.",
    cta: "See my favourite tools",
    href: "/tools",
  },
} as const;

export default homepageData;
