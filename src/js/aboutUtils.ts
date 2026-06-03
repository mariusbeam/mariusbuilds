import { type CollectionEntry, getCollection } from "astro:content";

import { filterCollectionByLanguage } from "@/js/localeUtils";
import aboutFallback from "@/config/en/aboutData";
import { locales } from "@/config/siteSettings.json";

export interface AboutPageContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge: string;
    title: string;
    subhead: string;
  };
  story: {
    title: string;
    paragraphs: string[];
  };
  bottomCta: {
    leadIn: string;
    buttonText: string;
    buttonHref: string;
  };
}

type AboutEntry = CollectionEntry<"about">["data"];

function pick(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function mergeAbout(data?: AboutEntry): AboutPageContent {
  const fb = aboutFallback;

  const paragraphs =
    data?.story.paragraphs?.map((p) => p.trim()).filter(Boolean) ??
    [...fb.story.paragraphs];

  return {
    metaTitle: pick(data?.metaTitle, fb.metaTitle),
    metaDescription: pick(data?.metaDescription, fb.metaDescription),
    hero: {
      badge: pick(data?.hero.badge, fb.hero.badge),
      title: pick(data?.hero.title, fb.hero.title),
      subhead: pick(data?.hero.subhead, fb.hero.subhead),
    },
    story: {
      title: pick(data?.story.title, fb.story.title),
      paragraphs: paragraphs.length > 0 ? paragraphs : [...fb.story.paragraphs],
    },
    bottomCta: {
      leadIn: pick(data?.bottomCta.leadIn, fb.bottomCta.leadIn),
      buttonText: pick(data?.bottomCta.buttonText, fb.bottomCta.buttonText),
      buttonHref: pick(data?.bottomCta.buttonHref, fb.bottomCta.buttonHref),
    },
  };
}

/** About page copy from Keystatic (`src/data/about/{locale}/index.yaml`). */
export async function getAboutPageData(
  lang: (typeof locales)[number],
): Promise<AboutPageContent> {
  const entries = await getCollection("about");
  const filtered = filterCollectionByLanguage(entries, lang) as CollectionEntry<"about">[];
  return mergeAbout(filtered[0]?.data);
}
