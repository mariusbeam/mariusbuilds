/**
 * Keystatic singletons — one-off site content (homepage copy, etc.)
 */

import { fields, singleton } from "@keystatic/core";

import { locales } from "@config/siteSettings.json";

const linkField = (label: string, defaultValue = "/contact") =>
  fields.text({
    label,
    description: "Internal path (e.g. /contact) or full URL.",
    defaultValue,
  });

const textBlock = (label: string) =>
  fields.object(
    {
      title: fields.text({ label: "Title", validation: { isRequired: true } }),
      description: fields.text({
        label: "Description",
        multiline: true,
        validation: { isRequired: true },
      }),
      cta: fields.text({ label: "Button text", validation: { isRequired: true } }),
      href: linkField("Button link"),
    },
    { label },
  );

/** All homepage section titles, hero, buttons, and bottom CTA (EN). Card content stays in Beliefs / How I work / Services collections. */
const Homepage = (locale: (typeof locales)[number]) =>
  singleton({
    label: `Homepage (${locale.toUpperCase()})`,
    path: `src/data/homepage/${locale}/`,
    format: { data: "yaml" },
    schema: {
      hero: fields.object(
        {
          badge: fields.text({ label: "Badge (small label above headline)" }),
          title: fields.text({
            label: "Headline",
            validation: { isRequired: true },
          }),
          description: fields.text({
            label: "Intro paragraph",
            multiline: true,
            validation: { isRequired: true },
          }),
          cta: fields.text({
            label: "Primary button text",
            validation: { isRequired: true },
          }),
          ctaHref: linkField("Primary button link", "/contact"),
        },
        { label: "Hero" },
      ),
      beliefs: fields.object(
        {
          title: fields.text({ label: "Section title", validation: { isRequired: true } }),
          description: fields.text({
            label: "Section description",
            multiline: true,
            validation: { isRequired: true },
          }),
        },
        { label: "What I believe (section header)" },
      ),
      howIWork: fields.object(
        {
          title: fields.text({ label: "Section title", validation: { isRequired: true } }),
          description: fields.text({
            label: "Section description",
            multiline: true,
            validation: { isRequired: true },
          }),
        },
        { label: "How I work (section header)" },
      ),
      mainServices: fields.object(
        {
          badge: fields.text({
            label: "Badge (optional, above title)",
            description: 'e.g. "Services"',
          }),
          title: fields.text({ label: "Section title", validation: { isRequired: true } }),
          description: fields.text({
            label: "Section description (optional)",
            multiline: true,
          }),
          buttonText: fields.text({
            label: "Card button text",
            description: 'Shown on each service card, e.g. "Book a call"',
            validation: { isRequired: true },
          }),
          buttonHref: linkField("Bottom button link", "/contact"),
        },
        { label: "My main services (section header)" },
      ),
      faq: fields.object(
        {
          badge: fields.text({
            label: "Badge (optional, above title)",
            description: 'e.g. "FAQ"',
          }),
          title: fields.text({
            label: "Section title",
            validation: { isRequired: true },
          }),
        },
        { label: "FAQ (section header)" },
      ),
      blog: textBlock("Blog block"),
      tools: textBlock("Tools block"),
      bottomCta: textBlock("Bottom CTA"),
    },
  });

/** About page copy (EN). */
const About = (locale: (typeof locales)[number]) =>
  singleton({
    label: `About (${locale.toUpperCase()})`,
    path: `src/data/about/${locale}/`,
    format: { data: "yaml" },
    schema: {
      metaTitle: fields.text({
        label: "Page title (browser tab)",
        description: 'e.g. "About | mariusbuilds.com". Leave blank to use the default.',
      }),
      metaDescription: fields.text({
        label: "Meta description (SEO)",
        multiline: true,
        validation: { isRequired: true },
      }),
      hero: fields.object(
        {
          badge: fields.text({ label: "Badge (optional, above headline)" }),
          title: fields.text({
            label: "Headline (H1)",
            validation: { isRequired: true },
          }),
          subhead: fields.text({
            label: "Subhead",
            multiline: true,
            validation: { isRequired: true },
          }),
        },
        { label: "Hero" },
      ),
      story: fields.object(
        {
          title: fields.text({
            label: "Section heading",
            defaultValue: "The longer version",
            validation: { isRequired: true },
          }),
          paragraphs: fields.array(
            fields.text({
              label: "Paragraph",
              multiline: true,
              validation: { isRequired: true },
            }),
            {
              label: "Body paragraphs",
              itemLabel: (props) => {
                const text = props.value ?? "";
                return text.length > 48 ? `${text.slice(0, 48)}…` : text || "Paragraph";
              },
            },
          ),
        },
        { label: "Main story" },
      ),
      bottomCta: fields.object(
        {
          leadIn: fields.text({
            label: "Text before the button",
            multiline: true,
            validation: { isRequired: true },
          }),
          buttonText: fields.text({
            label: "Button text",
            validation: { isRequired: true },
          }),
          buttonHref: linkField("Button link", "/contact"),
        },
        { label: "Bottom CTA" },
      ),
    },
  });

export default {
  Homepage,
  About,
};
