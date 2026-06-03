import { type CollectionEntry, getCollection } from "astro:content";

import { filterCollectionByLanguage } from "@/js/localeUtils";
import { slugify } from "@/js/textUtils";
import { locales } from "@/config/siteSettings.json";

/** All published tools for a locale, sorted by sortOrder then name. */
export async function getAllTools(
  lang?: (typeof locales)[number],
): Promise<CollectionEntry<"tools">[]> {
  const entries = await getCollection("tools", ({ data }) => data.draft !== true);

  const filtered = lang
    ? (filterCollectionByLanguage(entries, lang) as CollectionEntry<"tools">[])
    : entries;

  return filtered
    .map((entry) => {
      const parts = entry.id.split("/");
      entry.id = parts.length > 1 ? parts.slice(1).join("/") : entry.id;
      return entry;
    })
    .sort((a, b) => {
      const order = a.data.sortOrder - b.data.sortOrder;
      if (order !== 0) return order;
      return a.data.name.localeCompare(b.data.name);
    });
}

/** Filter tools that include a tag (slug match, case-insensitive). */
export function filterToolsByTag(
  tools: CollectionEntry<"tools">[],
  tagSlug: string,
): CollectionEntry<"tools">[] {
  const slug = slugify(tagSlug);
  return tools.filter((tool) =>
    (tool.data.tags ?? []).some((tag) => slugify(tag) === slug),
  );
}
