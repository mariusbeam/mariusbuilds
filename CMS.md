# CMS guide (Keystatic)

## Open the editor (local)

1. In a terminal, from the `atlas-main` folder:

```bash
npm run dev
```

2. Wait until you see `Local http://127.0.0.1:4321/` in the output.

3. Open **http://127.0.0.1:4321/keystatic** or **http://127.0.0.1:4321/admin** in your browser.

Keystatic only runs with the **dev server** (`npm run dev`). It does not work on a static `npm run preview` build unless you set up [Keystatic Cloud](https://keystatic.cloud/) for production.

### Tool tags

Each tool can have **Tags** (e.g. `free`, `indie`, `ai`). They appear as filter chips on `/tools` and as labels on each card. Category is still used to group sections (AI, Design, etc.).

### New CMS entry not showing on the site

1. In Keystatic, use **Favourite tools (EN)** (not a removed French collection).
2. Make sure **Draft** is unchecked.
3. After saving, the file should appear under `src/data/tools/en/your-slug/index.yaml`.
4. If the page does not update, restart the dev server (`Ctrl+C`, then `npm run dev`) and hard-refresh the browser.

### If `/keystatic` won’t load

- **Connection refused** — the dev server is not running. Run `npm run dev` from `atlas-main`.
- **Port in use** — another app is on 4321. Stop it (`pkill -f "astro dev"`) and run `npm run dev` again. The site is pinned to port **4321**.
- **Blank page** — hard refresh (Cmd+Shift+R). Check the terminal for red errors when you load `/keystatic`.
- Use **127.0.0.1** instead of `localhost` if your browser treats them differently.

## Content types

| CMS section | What it's for | Public URL |
|-------------|---------------|------------|
| **Blog** | Tutorials, opinions, how-I-built-this articles. Uses **categories** (tags). | `/blog/` |
| **Case studies** | Client work / portfolio write-ups. Separate from blog; same article layout. | `/work/` |
| **Services** | Long-form service pages. Tick **Show on homepage** to appear in “My main services”. | `/services/[slug]/` |
| **Homepage (EN)** | Hero, all section titles/descriptions, blog & tools blurbs, bottom CTA button. | `/` |
| **About (EN)** | About page hero, story paragraphs, bottom CTA, SEO title & description. | `/about/` |
| **Homepage — Belief cards (EN)** | Icon cards in “What I believe”. | `/` |
| **Homepage — How I work cards (EN)** | Step cards in “How I work”. | `/` |
| **Favourite tools** | Mini directory: name, URL, one-line blurb, optional category. **Not** blog posts. | `/tools/` |
| **Other pages** | Legal, elements, etc. | varies |
| **Authors** | Used by blog and case studies. | — |

## Favourite tools

- Add a row under **Favourite tools (EN)**.
- Fields: tool name, website URL, short description, category (optional), sort order (lower = higher on the page).
- No article body — each entry is a small card with an external link.

## Case studies vs blog

- **Blog** → learning content, tutorials, tagged with categories on `/categories/…`.
- **Case studies** → project stories on `/work/`, filtered on `/work/categories/…`.
- Same rich editor (MDX), but they live in different CMS folders and never mix on listing pages.

## Homepage

1. **Homepage (EN)** — one screen with grouped fields: Hero, section headers, blog/tools blocks, bottom CTA. File: `src/data/homepage/en/index.yaml`.
2. **Homepage — Belief cards** / **How I work cards** — repeatable cards (title, text, icon, sort order).
3. **Services** — enable **Show on homepage** and **Homepage summary** for the “My main services” block.

If card collections are empty, the site falls back to `src/config/en/homepageData.ts`.

## Services (detail pages)

**Services (EN/FR)** in the CMS map to `src/data/services/`. Each service has its own page plus optional homepage placement.

## Files on disk

Keystatic writes to:

- `src/data/homepage/` — homepage singleton (`en/index.yaml`)
- `src/data/about/` — about page singleton (`en/index.yaml`)
- `src/data/blog/`
- `src/data/work/`
- `src/data/tools/` (YAML)
- `src/data/services/`

If you change a collection schema, update both `keystatic.config.tsx` / `Collections.tsx` and `src/content.config.ts`.

## Production

Keystatic Cloud is configured in `keystatic.config.tsx` (`cloud.project`). Point that to your own Keystatic Cloud project before going live.
