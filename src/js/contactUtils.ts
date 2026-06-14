import { type CollectionEntry, getCollection } from "astro:content";

import { filterCollectionByLanguage } from "@/js/localeUtils";
import contactFallback from "@/config/en/contactData";
import { locales } from "@/config/siteSettings.json";

export interface ContactPageContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    title: string;
    description: string;
  };
  tallyForm: {
    embedCode: string;
  };
}

type ContactEntry = CollectionEntry<"contact">["data"];

function pick(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function mergeContact(data?: ContactEntry): ContactPageContent {
  const fb = contactFallback;

  return {
    metaTitle: pick(data?.metaTitle, fb.metaTitle),
    metaDescription: pick(data?.metaDescription, fb.metaDescription),
    hero: {
      title: pick(data?.hero.title, fb.hero.title),
      description: pick(data?.hero.description, fb.hero.description),
    },
    tallyForm: {
      embedCode: pick(data?.tallyForm.embedCode, fb.tallyForm.embedCode),
    },
  };
}

/** Contact page copy from Keystatic (`src/data/contact/{locale}/index.yaml`). */
export async function getContactPageData(
  lang: (typeof locales)[number],
): Promise<ContactPageContent> {
  const entries = await getCollection("contact");
  const filtered = filterCollectionByLanguage(entries, lang) as CollectionEntry<"contact">[];
  return mergeContact(filtered[0]?.data);
}
