/**
 * Fallback About page copy when Keystatic YAML is missing.
 * Live copy: About (EN) in /keystatic → src/data/about/en/index.yaml
 */

export const aboutData = {
  metaTitle: "About",
  metaDescription:
    "Mechatronics engineer with 10 years in complex systems. Now building custom tools, automations, and websites for small businesses.",
  hero: {
    badge: "",
    title: "Hi, I'm Marius.",
    subhead:
      "Mechatronics engineer. 10 years making complex systems work. Now I build custom tools, automations, and websites for small businesses.",
  },
  story: {
    title: "The longer version",
    paragraphs: [
      "I spent a decade in industrial robotics, logistics automation, and high-tech integration at one of Europe's most advanced technology companies. Places where systems have to work and downtime costs real money. I learned to think in systems, design for the edge cases, and build things that hold up under pressure.",
      "Now I point that same thinking at small businesses. Usually it's one specific thing they want built: a tool that fits their process, an automation that just works, a website they actually own. That's the work I like best.",
      "When you work with me, you work with me. I'm the person on the call and the person writing the code. No sales team, no junior dev, no handoffs. One engineer, start to finish.",
      "I also build in public. I use custom tools and AI heavily in my own work, I publish how I build things, and I keep a short, honest list of the tools I actually use. If you want to see how I think before you hire me, read the blog.",
    ],
  },
  bottomCta: {
    leadIn: "Got something that needs building?",
    buttonText: "Book a call",
    buttonHref: "/contact",
  },
} as const;

export default aboutData;
