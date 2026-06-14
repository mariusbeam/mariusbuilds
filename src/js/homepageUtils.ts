import { type CollectionEntry, getCollection } from "astro:content";

import { filterCollectionByLanguage } from "@/js/localeUtils";
import homepageFallback from "@/config/en/homepageData";
import faqFallback from "@config/en/faqData.json";
import { type FaqItem } from "@/config/types/configDataTypes";
import { locales } from "@/config/siteSettings.json";

export interface HomepageCardItem {
  icon: string;
  illustration?: string;
  title: string;
  text: string;
}

export interface HomepageServiceItem {
  icon: string;
  illustration?: string;
  title: string;
  text: string;
  href: string;
}

export interface HomepageHeroContent {
  badge: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
}

export interface HomepageTextBlock {
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface HomepageContent {
  hero: HomepageHeroContent;
  howIWork: {
    title: string;
    description: string;
    items: HomepageCardItem[];
  };
  mainServices: {
    badge?: string;
    title: string;
    description: string;
    items: HomepageServiceItem[];
    buttonText: string;
    buttonHref: string;
  };
  faq: {
    badge?: string;
    title: string;
    items: FaqItem[];
  };
  blog: HomepageTextBlock;
  bottomCta: HomepageTextBlock;
}

type HomepageCopyEntry = CollectionEntry<"homepage">["data"];

function sortByOrder<T extends { data: { sortOrder?: number; title?: string; name?: string } }>(
  entries: T[],
): T[] {
  return [...entries].sort((a, b) => {
    const order = (a.data.sortOrder ?? 0) - (b.data.sortOrder ?? 0);
    if (order !== 0) return order;
    const labelA = a.data.title ?? a.data.name ?? "";
    const labelB = b.data.title ?? b.data.name ?? "";
    return labelA.localeCompare(labelB);
  });
}

function stripLocaleFromId(id: string): string {
  const parts = id.split("/");
  return parts.length > 1 ? parts.slice(1).join("/") : id;
}

function pick(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function mergeHomepageCopy(data?: HomepageCopyEntry) {
  const fb = homepageFallback;

  return {
    hero: {
      badge: pick(data?.hero.badge, fb.hero.badge),
      title: pick(data?.hero.title, fb.hero.title),
      description: pick(data?.hero.description, fb.hero.description),
      cta: pick(data?.hero.cta, fb.hero.cta),
      ctaHref: pick(data?.hero.ctaHref, fb.hero.ctaHref),
    },
    howIWork: {
      title: pick(data?.howIWork.title, fb.howIWork.title),
      description: pick(data?.howIWork.description, fb.howIWork.description),
    },
    mainServices: {
      badge: pick(data?.mainServices.badge, fb.mainServices.badge ?? ""),
      title: pick(data?.mainServices.title, fb.mainServices.title),
      description: pick(data?.mainServices.description, fb.mainServices.description ?? ""),
      buttonText: pick(data?.mainServices.buttonText, fb.mainServices.buttonText),
      buttonHref: pick(data?.mainServices.buttonHref, fb.mainServices.buttonHref),
    },
    faq: {
      badge: pick(data?.faq?.badge, fb.faq.badge ?? ""),
      title: pick(data?.faq?.title, fb.faq.title),
    },
    blog: {
      title: pick(data?.blog.title, fb.blog.title),
      description: pick(data?.blog.description, fb.blog.description),
      cta: pick(data?.blog.cta, fb.blog.cta),
      href: pick(data?.blog.href, fb.blog.href),
    },
    bottomCta: {
      title: pick(data?.bottomCta.title, fb.bottomCta.title),
      description: pick(data?.bottomCta.description, fb.bottomCta.description),
      cta: pick(data?.bottomCta.cta, fb.bottomCta.cta),
      href: pick(data?.bottomCta.href, fb.bottomCta.href),
    },
  };
}

async function loadHomepageCopyEntry(
  lang: (typeof locales)[number],
): Promise<HomepageCopyEntry | undefined> {
  const entries = await getCollection("homepage");
  const filtered = filterCollectionByLanguage(entries, lang) as CollectionEntry<"homepage">[];
  return filtered[0]?.data;
}

/** Full homepage data: CMS singleton + card collections, with file fallbacks. */
export async function getHomepagePageData(
  lang: (typeof locales)[number],
): Promise<HomepageContent> {
  const fb = homepageFallback;
  const [cmsCopy, howIWorkItems, homepageServices, faqItems] = await Promise.all([
    loadHomepageCopyEntry(lang),
    getHowIWorkCards(lang),
    getHomepageServices(lang),
    getFaqItems(lang),
  ]);

  const copy = mergeHomepageCopy(cmsCopy);

  return {
    hero: copy.hero,
    howIWork: {
      ...copy.howIWork,
      items: howIWorkItems.length > 0 ? howIWorkItems : [...fb.howIWork.items],
    },
    mainServices: {
      ...copy.mainServices,
      badge: copy.mainServices.badge || undefined,
      items: homepageServices.length > 0 ? homepageServices : [...fb.mainServices.items],
    },
    faq: {
      ...copy.faq,
      badge: copy.faq.badge || undefined,
      items: faqItems.length > 0 ? faqItems : [...faqFallback],
    },
    blog: copy.blog,
    bottomCta: copy.bottomCta,
  };
}

/** “How I work” step cards from Keystatic. */
export async function getHowIWorkCards(
  lang: (typeof locales)[number],
): Promise<HomepageCardItem[]> {
  const entries = await getCollection("howIWork", ({ data }) => data.draft !== true);
  const filtered = filterCollectionByLanguage(entries, lang) as CollectionEntry<"howIWork">[];

  return sortByOrder(filtered).map((entry) => ({
    icon: entry.data.icon,
    title: entry.data.title,
    text: entry.data.text,
  }));
}

/** Services flagged “Show on homepage” in Keystatic. */
export async function getHomepageServices(
  lang: (typeof locales)[number],
): Promise<HomepageServiceItem[]> {
  const fb = homepageFallback;
  const entries = await getCollection(
    "services",
    ({ data }) => data.draft !== true && data.showOnHomepage === true,
  );
  const filtered = filterCollectionByLanguage(entries, lang) as CollectionEntry<"services">[];

  return [...filtered]
    .sort((a, b) => {
      const order = (a.data.homepageOrder ?? 0) - (b.data.homepageOrder ?? 0);
      if (order !== 0) return order;
      return a.data.title.localeCompare(b.data.title);
    })
    .map((entry) => {
      const slug = stripLocaleFromId(entry.id);
      const fallbackIcon =
        fb.mainServices.items.find((item) => item.href === `/services/${slug}/`)?.icon ??
        "tabler/script";

      return {
        icon: entry.data.homepageIcon?.trim() || fallbackIcon,
        title: entry.data.title,
        text: entry.data.homepageBlurb?.trim() || entry.data.description,
        href: `/services/${slug}/`,
      };
    });
}

/** Homepage FAQ items from Keystatic. */
export async function getFaqItems(lang: (typeof locales)[number]): Promise<FaqItem[]> {
  const entries = await getCollection("faq", ({ data }) => data.draft !== true);
  const filtered = filterCollectionByLanguage(entries, lang) as CollectionEntry<"faq">[];

  return sortByOrder(filtered).map((entry) => ({
    question: entry.data.question,
    answer: entry.data.answer,
  }));
}
