/**
 * Fallback homepage copy (EN) when Keystatic files are missing.
 *
 * Live copy: **Homepage (EN)** singleton in /keystatic (`src/data/homepage/en/index.yaml`).
 * Card rows: **Homepage — What I believe**, **Homepage — How I work**, and **Services** (show on homepage).
 */

export interface HomepageCard {
  icon: string;
  title: string;
  text: string;
}

export interface HomepageCaseStudy {
  title: string;
  details: string;
  href: string;
}

export const homepageData = {
  hero: {
    badge: "Hi, I'm Marius",
    title: "I build custom tools for small businesses.",
    description:
      "Tools, web apps, and AI things for small businesses that need something specific. 10 years in engineering and 3 in agency work means I understand both how things get built and how they sell. Got a project in mind, or just a rough idea of what you want? That's where I come in.",
    cta: "Let's talk",
    ctaHref: "/contact",
  },
  mainServices: {
    title: "My main services",
    description: "",
    items: [
      {
        title: "Custom tools and web apps, built around how your business actually works.",
        details:
          "Configurators, dashboards, client portals, booking systems, internal tools. If the software you need doesn't exist, or every off-the-shelf option forces you to change how you work, I'll build the thing that fits.",
        href: "/contact",
      },
      {
        title: "AI consultancy and automation",
        details:
          "You want to use AI, but there are a hundred tools and no obvious place to begin. I help you cut through that. We look at your business, pick one process, and figure out what actually helps, whether that's an automation I build or a tool you already have. Clarity first, building second.",
        href: "/contact",
      },
      {
        title: "Custom websites you actually own",
        details:
          "A fast, clean website that's genuinely yours. No monthly platform fee, no renting your own site, no hitting a wall when you want to change something. Built so it loads fast, you can edit your own content, and then it's yours to keep.",
        href: "/contact",
      },
    ] satisfies HomepageCaseStudy[],
    buttonText: "Book a call",
  },
  beliefs: {
    title: "What I believe",
    description: "My actual opinions, in my words. This is what working with me is like.",
    items: [
      {
        icon: "tabler/map-pin",
        title: "Clarity on what to build",
        text: "Most business owners know what they want. They just don't know how to get there. Web app or existing tool? Build from scratch or plug into what you already have? Helping you see that clearly is half the job.",
      },
      {
        icon: "tabler/wand",
        title: "When custom makes sense",
        text: "Sometimes the thing you need just doesn't exist the way you need it. That's when a custom tool makes sense: you want it exactly like that, and you can't find it anywhere.",
      },
      {
        icon: "tabler/bulb",
        title: "Hard problems welcome",
        text: "I genuinely enjoy cracking problems that don't have an obvious answer. Across 10 years and a whole agency of projects, I've yet to meet one I couldn't find a way through.",
      },
      {
        icon: "tabler/info-circle",
        title: "No black boxes",
        text: "You should always understand what I'm building for you. No black boxes, no jargon. If I can't explain it simply, I haven't done my job.",
      },
      {
        icon: "tabler/star",
        title: "Up to date",
        text: "I follow the new tools closely. Honestly, it's what I do in my free time. So you get someone who knows what's good right now, not what was good last year.",
      },
    ] satisfies HomepageCard[],
  },
  howIWork: {
    title: "How I work",
    description:
      "I'm a one-person shop, so I take on a limited number of projects. I'd rather build a handful of things properly than juggle 10 and do them all halfway. I keep 2 active prokects at the time. When those are gone, you go on a short waitlist, and I'll tell you  when a slot opens up.",
    items: [
      {
        icon: "tabler/mail",
        title: "1. We talk",
        text: "Tell me your project and your goal: what you want to do, why you're doing it, and how your current setup works today. This part matters most, so we go deep. I'm good at this, asking the right questions and turning a fuzzy idea into something concrete.",
      },
      {
        icon: "tabler/list-check",
        title: "2. We get clarity: build or buy",
        text: "I look at it critically. Is a custom tool actually worth it here, or is there an existing tool that does the job better and cheaper? Either way you walk away with a clear spec you can use, and you decide whether to build it with me or take it elsewhere.",
      },
      {
        icon: "tabler/circle-arrow-up",
        title: "3. I build it, you use it",
        text: "If building makes sense, I build it, hand it over, and show you how it works. If you want, I'll keep maintaining it afterwards too.",
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
  tools: {
    title: "My favourite tools",
    description:
      "Honestly, building and trying tools is what I do for fun. I build little custom tools for myself, I lean on AI heavily in my own work, and I'm always testing the newest things. So I keep a short, honest list of the software I actually use, and what I really think of each.",
    cta: "See my favourite tools",
    href: "/tools",
  },
  bottomCta: {
    title: "Too many AI tools and no idea which one you actually need?",
    description:
      "That's as good a reason to talk as any. Maybe you've got a clear project in mind, maybe you're just stuck between 10 tools that all promise the same thing. Either way, we'll figure out what you actually need, and what's genuinely best for you, even if that turns out not to be me.",
    cta: "Let's talk",
    href: "/contact",
  },
} as const;

export default homepageData;
