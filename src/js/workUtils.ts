import { type CollectionEntry, getCollection } from "astro:content";

import { removeLocaleFromSlug, filterCollectionByLanguage } from "@/js/localeUtils";
import { formatPosts } from "@/js/blogUtils";
import { locales } from "@/config/siteSettings.json";

/** All published case studies for a locale, newest first. */
export async function getAllWork(
  lang?: (typeof locales)[number],
): Promise<CollectionEntry<"work">[]> {
  const entries = await getCollection("work", ({ data }) => data.draft !== true);

  const filtered = lang
    ? (filterCollectionByLanguage(entries, lang) as CollectionEntry<"work">[])
    : entries;

  return formatPosts(filtered, {
    filterOutFuturePosts: true,
    sortByDate: true,
    limit: undefined,
    removeLocale: true,
  }) as CollectionEntry<"work">[];
}
