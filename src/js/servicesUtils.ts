import { type CollectionEntry, getCollection } from "astro:content";

import { filterCollectionByLanguage, removeLocaleFromSlug } from "@/js/localeUtils";
import { defaultLocale } from "@/config/siteSettings.json";

/** Published services for the current site language. */
export async function getAllServices(): Promise<CollectionEntry<"services">[]> {
  const entries = await getCollection("services", ({ data }) => data.draft !== true);
  const filtered = filterCollectionByLanguage(
    entries,
    defaultLocale,
  ) as CollectionEntry<"services">[];

  return filtered
    .map((entry) => {
      entry.id = removeLocaleFromSlug(entry.id);
      return entry;
    })
    .sort((a, b) => {
      const order = (a.data.homepageOrder ?? 0) - (b.data.homepageOrder ?? 0);
      if (order !== 0) return order;
      return a.data.title.localeCompare(b.data.title);
    });
}
