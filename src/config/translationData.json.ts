/**
 * Configuration of i18n system data files and text translations.
 */

/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */
import siteDataEn from "./en/siteData.json";
import navDataEn from "./en/navData.json";
import faqDataEn from "./en/faqData.json";

export const dataTranslations = {
  en: {
    siteData: siteDataEn,
    navData: navDataEn,
    faqData: faqDataEn,
  },
} as const;

/**
 * * Text translations are used with the `useTranslation` function from src/js/i18nUtils.ts to translate various strings on your site.
 *
 * ## Example
 *
 * ```ts
 * import { getLocaleFromUrl } from "@js/localeUtils";
 * import { useTranslations } from "@js/translationUtils";
 * const currLocale = getLocaleFromUrl(Astro.url);
 * const t = useTranslations(currLocale);
 * t("back_to_all_posts");
 * ```
 */
export const textTranslations = {
  en: {
    // Hero on `/` comes from Keystatic → Homepage (EN).
    hero_badge: "Hi, I'm Marius",
    hero_text: "AI Automation Consultant and Web Developer for Small Businesses",
    hero_description:
      "I help business owners find the right tool for the job, and when it doesn't exist yet, I build it. We start with how you actually work, then pick what fits: an existing tool, an automation, or something custom.",
    hero_visitor_line: "",
    hero_cta: "Let's talk",
    back_to_all_posts: "Back to all posts",
    updated: "Updated",
  },
} as const;

/**
 * * Route translations are used to translate route names for the language switcher component
 * This can be useful for SEO reasons. The key does not matter, it just needs to match between languages
 *
 * ## Notes
 *
 * - These routes must be everything after the base domain. So if this is "atlas.com/blog", the route would be "blog"
 *   - Or if this is "atlas.com/legal/privacy", the route would be "legal/privacy"
 * - This also supports wildcards for language switcher and SEO purposes, and works in conjunction with the localizedCollections object below
 *   - For example, "categories/*" would match "categories/1" or "categories/2" etc for that language.
 */
export const routeTranslations = {
  en: {
    aboutKey: "about",
    categoryKey: "categories",
    categoryKey2: "categories/*",
    categoryKey3: "categories",
    blogKey: "blog",
    servicesKey: "services",
  },
} as const;

/**
 * * Content collection translations used by the language switcher and hreflang generator
 *
 * Per-collection, per-locale route base mapping (collections to localize are the keys)
 *
 * If you have a key of "blog" then the blog content collection will be localized. This will look
 * for a "mappingKey" in the entry metadata, and use that to map the entry to the correct locale
 *
 * You can use the locale value to map the collection to a different route if desired
 *
 * Note: this does NOT affect the getLocalizedRoute() function. To translate the base routes use the routeTranslations object
 */
export const localizedCollections = {
  blog: {
    en: "blog",
  },
  services: {
    en: "services",
  },
  work: {
    en: "work",
  },
} as const;
