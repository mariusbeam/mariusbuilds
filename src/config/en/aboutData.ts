/**
 * Fallback About page copy when Keystatic YAML is missing.
 * Live copy: About (EN) in /keystatic → src/data/about/en/index.yaml
 */

export const aboutData = {
  metaTitle: "About",
  metaDescription:
    "I build custom tools and automations for small businesses. 10 years of engineering behind it, learned web development on the side to work from anywhere.",
  hero: {
    badge: "",
    title: "Hi, I'm Marius.",
    subhead:
      "I build custom tools and automations for small businesses. Before this, I spent 10 years as a mechatronics engineer making industrial systems work. I learned web development on the side because I wanted to be able to work from anywhere.",
  },
  story: {
    title: "The longer version",
    paragraphs: [
      "I started in industrial automation, then moved to integrating complex lithography machines. Along the way I started learning web development on my own time. That mix of hardware, software, high-stakes systems, and the web gave me a pretty wide lens. It means when a business owner tells me their process, I can usually see where it's breaking and what would actually fix it.",
      "So I taught myself web development and started building things on my own time. First for fun, then for friends, then for paying clients. The engineering background stuck: I still think about failure modes, still design for the person who'll use the thing, still prefer straightforward tools over shiny ones. But now I do it from my own setup, for people who actually need it.",
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
