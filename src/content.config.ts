import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Type-check frontmatter using a schema
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // reference the authors collection https://docs.astro.build/en/guides/content-collections/#defining-collection-references
      authors: z.array(reference("authors")),
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      heroImage: image(),
      categories: z.array(z.string()),
      // mappingKey allows you to match entries across languages for SEO purposes
      mappingKey: z.string().optional(),
      // blog posts will be excluded from build if draft is "true"
      draft: z.boolean().optional(),
    }),
});

// authors
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      about: z.string(),
      email: z.string(),
      authorLink: z.string(), // author page link. Could be a personal website, github, twitter, whatever you want
    }),
});

// case studies / work (same shape as blog, separate collection)
const workCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      authors: z.array(reference("authors")),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      heroImage: image(),
      categories: z.array(z.string()),
      mappingKey: z.string().optional(),
      draft: z.boolean().optional(),
    }),
});

// favourite tools directory (YAML entries, no article body)
const toolsCollection = defineCollection({
  loader: glob({ pattern: "**/index.{yaml,yml}", base: "./src/data/tools" }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    tagline: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    sortOrder: z.number().default(0),
    draft: z.boolean().optional(),
  }),
});

const homepageTextBlockSchema = z.object({
  title: z.string(),
  description: z.string(),
  cta: z.string(),
  href: z.string(),
});

// contact page copy and Tally form embed — one YAML file per locale
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/index.{yaml,yml}", base: "./src/data/contact" }),
  schema: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    tallyForm: z.object({
      embedCode: z.string(),
    }),
  }),
});

// about page copy — one YAML file per locale
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/index.{yaml,yml}", base: "./src/data/about" }),
  schema: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string(),
    hero: z.object({
      badge: z.string().optional(),
      title: z.string(),
      subhead: z.string(),
    }),
    story: z.object({
      title: z.string(),
      paragraphs: z.array(z.string()),
    }),
    bottomCta: z.object({
      leadIn: z.string(),
      buttonText: z.string(),
      buttonHref: z.string(),
    }),
  }),
});

// homepage copy (hero, section titles, CTAs) — one YAML file per locale
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/index.{yaml,yml}", base: "./src/data/homepage" }),
  schema: z.object({
    hero: z.object({
      badge: z.string().optional(),
      title: z.string(),
      description: z.string(),
      cta: z.string(),
      ctaHref: z.string(),
    }),
    howIWork: z.object({
      title: z.string(),
      description: z.string(),
    }),
    mainServices: z.object({
      badge: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      buttonText: z.string(),
      buttonHref: z.string().optional(),
    }),
    faq: z
      .object({
        badge: z.string().optional(),
        title: z.string(),
      })
      .optional(),
    blog: homepageTextBlockSchema,
    bottomCta: homepageTextBlockSchema,
  }),
});

// homepage belief cards
const beliefsCollection = defineCollection({
  loader: glob({ pattern: "**/index.{yaml,yml}", base: "./src/data/beliefs" }),
  schema: z.object({
    title: z.string(),
    text: z.string(),
    icon: z.string(),
    sortOrder: z.number().default(0),
    mappingKey: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// homepage how-i-work step cards
const howIWorkCollection = defineCollection({
  loader: glob({ pattern: "**/index.{yaml,yml}", base: "./src/data/how-i-work" }),
  schema: z.object({
    title: z.string(),
    text: z.string(),
    icon: z.string(),
    sortOrder: z.number().default(0),
    mappingKey: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// homepage FAQ items
const faqCollection = defineCollection({
  loader: glob({ pattern: "**/index.{yaml,yml}", base: "./src/data/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    sortOrder: z.number().default(0),
    mappingKey: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// services
const servicesCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/services" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      homepageBlurb: z.string().optional(),
      homepageIcon: z.string().optional(),
      showOnHomepage: z.boolean().optional(),
      homepageOrder: z.number().default(0),
      mappingKey: z.string().optional(),
      draft: z.boolean().optional(),
    }),
});

// other pages
const otherPagesCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/otherPages" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      // mappingKey allows you to match entries across languages for SEO purposes
      mappingKey: z.string().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
  work: workCollection,
  tools: toolsCollection,
  homepage: homepageCollection,
  contact: contactCollection,
  about: aboutCollection,
  beliefs: beliefsCollection,
  howIWork: howIWorkCollection,
  faq: faqCollection,
  authors: authorsCollection,
  services: servicesCollection,
  otherPages: otherPagesCollection,
};
