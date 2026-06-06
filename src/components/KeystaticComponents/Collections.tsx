/**
 * * Keystatic Collection definitions that can take in languages and return the correct content
 * This makes it much cleaner to work with content in different languages
 */

import {
  collection,
  fields,
  // singleton,
} from "@keystatic/core";

// components
import ComponentBlocks from "@components/KeystaticComponents/ComponentBlocks";

// utils
import { locales } from "@config/siteSettings.json";

/**
 * * Blog posts collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Blog = (locale: (typeof locales)[number]) =>
  collection({
    label: `Blog (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/data/blog/${locale}/*/`,
    columns: ["title", "pubDate"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Description",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this post as draft to prevent it from being published.",
      }),

      authors: fields.array(
        fields.relationship({
          label: "Post author",
          collection: `authors`,
          // authors field in keystatic.config.tsx must match the collection name here (like "authorsEN" or "authorsFR")
          // collection: `authors${locale.toUpperCase()}`,
        }),
        {
          label: "Authors",
          validation: { length: { min: 1 } },
          itemLabel: (props) => props.value || "Please select an author",
        },
      ),
      pubDate: fields.date({ label: "Publish Date" }),
      updatedDate: fields.date({
        label: "Updated Date",
        description: "If you update this post at a later date, put that date here.",
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "This is used to map entries between languages.",
      }),
      heroImage: fields.image({
        label: "Hero Image",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      categories: fields.array(fields.text({ label: "Category" }), {
        label: "Categories",
        description: "This is NOT case sensitive.",
        itemLabel: (props) => props.value,
        validation: { length: { min: 1 } },
      }),
      content: fields.mdx({
        label: "Content",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: true,
          heading: [2, 3, 4, 5, 6],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/data/blog/${locale}/`,
            publicPath: "../",
            // schema: {
            //   title: fields.text({
            //     label: "Caption",
            //     description:
            //       "The text to display under the image in a caption.",
            //   }),
            // },
          },
          divider: true,
          codeBlock: true,
        },
        components: {
          Admonition: ComponentBlocks.Admonition,
        },
      }),
    },
  });

/**
 * * Authors collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Authors = (locale: (typeof locales)[number] | "") =>
  collection({
    label: `Authors ${locale === "" ? "" : `(${locale.toUpperCase()})`} `,
    slugField: "name",
    path: `src/data/authors/${locale}/*/`,
    columns: ["name"],
    entryLayout: "content",
    format: { contentField: "bio" },
    schema: {
      name: fields.slug({
        name: {
          label: "Name",
          validation: {
            isRequired: true,
          },
        },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once this file is published!",
        },
      }),
      avatar: fields.image({
        label: "Author avatar",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      about: fields.text({
        label: "About",
        description: "A short bio about the author",
        validation: { isRequired: true },
      }),
      email: fields.text({
        label: "The author's email",
        description: "This must look something like `you@email.com`",
        validation: { isRequired: true },
      }),
      authorLink: fields.url({
        label: "Author Website or Social Media Link",
        validation: { isRequired: true },
      }),
      bio: fields.mdx({
        label: "Full Bio",
        description: "The author's full bio",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: true,
          heading: [2, 3, 4],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: false,
          link: true,
          image: {
            directory: "src/data/authors/",
            publicPath: "../",
          },
          divider: true,
          codeBlock: false,
        },
      }),
    },
  });

/**
 * * Case studies / work collection (blog-like layout, separate from blog in the CMS)
 */
const Work = (locale: (typeof locales)[number]) =>
  collection({
    label: `Case studies (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/data/work/${locale}/*/`,
    columns: ["title", "pubDate"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Short summary",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this case study as draft to prevent it from being published.",
      }),
      authors: fields.array(
        fields.relationship({
          label: "Author",
          collection: `authors`,
        }),
        {
          label: "Authors",
          validation: { length: { min: 1 } },
          itemLabel: (props) => props.value || "Please select an author",
        },
      ),
      pubDate: fields.date({ label: "Publish Date" }),
      updatedDate: fields.date({
        label: "Updated Date",
        description: "If you update this case study later, put that date here.",
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "Used to link this entry to the French/English version.",
      }),
      heroImage: fields.image({
        label: "Hero Image",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      categories: fields.array(fields.text({ label: "Category" }), {
        label: "Categories",
        description: "e.g. solar, psychology, saas — used for filtering on /work",
        itemLabel: (props) => props.value,
        validation: { length: { min: 1 } },
      }),
      content: fields.mdx({
        label: "Case study content",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: true,
          heading: [2, 3, 4, 5, 6],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/data/work/${locale}/`,
            publicPath: "../",
          },
          divider: true,
          codeBlock: true,
        },
        components: {
          Admonition: ComponentBlocks.Admonition,
        },
      }),
    },
  });

/**
 * * Favourite tools directory (link cards only — not blog posts)
 */
const Tools = (locale: (typeof locales)[number]) =>
  collection({
    label: `Favourite tools (${locale.toUpperCase()})`,
    slugField: "name",
    path: `src/data/tools/${locale}/*/`,
    format: { data: "yaml" },
    columns: ["name", "url", "category"],
    schema: {
      name: fields.slug({
        name: { label: "Tool name" },
        slug: {
          label: "Slug",
          description: "Never change the slug once published.",
        },
      }),
      url: fields.url({
        label: "Website URL",
        validation: { isRequired: true },
      }),
      tagline: fields.text({
        label: "One-line description",
        validation: { length: { max: 140 } },
      }),
      category: fields.text({
        label: "Category",
        description: "e.g. AI, Design, Hosting — optional grouping on /tools",
      }),
      tags: fields.array(fields.text({ label: "Tag" }), {
        label: "Tags",
        description: "e.g. free, indie, ai — filter chips on the /tools page",
        itemLabel: (props) => props.value,
      }),
      sortOrder: fields.integer({
        label: "Sort order",
        description: "Lower numbers appear first.",
        defaultValue: 0,
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Hide this tool from the public directory.",
      }),
    },
  });

/**
 * * Services collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Services = (locale: (typeof locales)[number]) =>
  collection({
    label: `How can I help you? (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/data/services/${locale}/*/`,
    columns: ["title", "homepageOrder"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Description",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      image: fields.image({
        label: "Main Image",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      homepageBlurb: fields.text({
        label: "Homepage summary",
        description:
          "Card text for the “How can I help you?” icon cards on the homepage. Falls back to the short description if empty.",
        multiline: true,
      }),
      homepageIcon: fields.text({
        label: "Homepage icon",
        description: 'Tabler icon id for the homepage card, e.g. "tabler/script" (must exist in src/icons/tabler/)',
      }),
      showOnHomepage: fields.checkbox({
        label: "Show on homepage",
        description: "Include in the “How can I help you?” icon cards on the homepage.",
        defaultValue: false,
      }),
      homepageOrder: fields.integer({
        label: "Sort order",
        description:
          "Lower numbers appear first on the services page and in the homepage “How can I help you?” grid.",
        defaultValue: 0,
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this page as draft to prevent it from being published.",
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "This is used to map entries between languages.",
      }),
      content: fields.mdx({
        label: "Page Contents",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: false,
          heading: [2, 3, 4],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/data/services/${locale}/`,
            publicPath: "../",
          },
          divider: true,
          codeBlock: false,
        },
        // components: {
        //   Admonition: ComponentBlocks.Admonition,
        // },
      }),
    },
  });

/** Homepage “What I believe” cards */
const Beliefs = (locale: (typeof locales)[number]) =>
  collection({
    label: `Homepage — Belief cards (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/data/beliefs/${locale}/*/`,
    format: { data: "yaml" },
    columns: ["title", "sortOrder"],
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: { label: "Slug" },
      }),
      text: fields.text({
        label: "Card text",
        multiline: true,
        validation: { isRequired: true },
      }),
      icon: fields.text({
        label: "Icon",
        description: 'Tabler icon id, e.g. "tabler/bulb"',
        validation: { isRequired: true },
      }),
      sortOrder: fields.integer({
        label: "Sort order",
        defaultValue: 0,
      }),
      draft: fields.checkbox({ label: "Draft" }),
      mappingKey: fields.text({ label: "Mapping Key" }),
    },
  });

/** Homepage FAQ items */
const Faq = (locale: (typeof locales)[number]) =>
  collection({
    label: `Homepage — FAQ (${locale.toUpperCase()})`,
    slugField: "question",
    path: `src/data/faq/${locale}/*/`,
    format: { data: "yaml" },
    columns: ["question", "sortOrder"],
    schema: {
      question: fields.slug({
        name: { label: "Question" },
        slug: { label: "Slug" },
      }),
      answer: fields.text({
        label: "Answer",
        description: "Supports basic HTML (links, emphasis).",
        multiline: true,
        validation: { isRequired: true },
      }),
      sortOrder: fields.integer({
        label: "Sort order",
        defaultValue: 0,
      }),
      draft: fields.checkbox({ label: "Draft" }),
      mappingKey: fields.text({ label: "Mapping Key" }),
    },
  });

/** Homepage “How I work” step cards */
const HowIWorkSteps = (locale: (typeof locales)[number]) =>
  collection({
    label: `Homepage — How I work cards (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/data/how-i-work/${locale}/*/`,
    format: { data: "yaml" },
    columns: ["title", "sortOrder"],
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: { label: "Slug" },
      }),
      text: fields.text({
        label: "Card text",
        multiline: true,
        validation: { isRequired: true },
      }),
      icon: fields.text({
        label: "Icon",
        description: 'Tabler icon id, e.g. "tabler/mail"',
        validation: { isRequired: true },
      }),
      sortOrder: fields.integer({
        label: "Sort order",
        defaultValue: 0,
      }),
      draft: fields.checkbox({ label: "Draft" }),
      mappingKey: fields.text({ label: "Mapping Key" }),
    },
  });

/**
 * * Other Pages collection
 * For items like legal pages, about pages, etc.
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const OtherPages = (locale: (typeof locales)[number]) =>
  collection({
    label: `Other Pages (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/data/otherPages/${locale}/*/`,
    columns: ["title"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Description",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this page as draft to prevent it from being published.",
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "This is used to map entries between languages.",
      }),
      content: fields.mdx({
        label: "Page Contents",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: true,
          heading: [2, 3, 4, 5, 6],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/data/otherPages/${locale}/`,
            publicPath: "../",
          },
          divider: true,
          codeBlock: true,
        },
        components: {
          Admonition: ComponentBlocks.Admonition,
        },
      }),
    },
  });

export default {
  Blog,
  Work,
  Tools,
  Beliefs,
  HowIWorkSteps,
  Faq,
  Authors,
  Services,
  OtherPages,
};
