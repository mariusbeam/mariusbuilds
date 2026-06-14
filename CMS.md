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
| **Contact (EN)** | Contact page hero, Tally form embed code, SEO title & description. | `/contact/` |
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
- `src/data/contact/` — contact page singleton (`en/index.yaml`)
- `src/data/blog/`
- `src/data/work/`
- `src/data/tools/` (YAML)
- `src/data/services/`

If you change a collection schema, update both `keystatic.config.tsx` / `Collections.tsx` and `src/content.config.ts`.

## Production (Keystatic Cloud)

The **website** on Netlify already works from GitHub — no Cloud account required.

You need Keystatic Cloud only if you want to open **`https://your-site.netlify.app/keystatic`** and edit content in the browser (changes save back to GitHub).

Pushing code to GitHub does **not** create a Cloud project. You add it once in the Keystatic dashboard, then wire the ID into Netlify.

### 1. Create the project (one-time)

1. Sign in at [keystatic.cloud](https://keystatic.cloud) with the same GitHub account that owns the repo (**mariusbeam** on GitHub).
2. **Create a team** (e.g. `mariusbuilds`). The team **slug** becomes the first part of your project ID (it may differ from your GitHub username).
3. **Create a project** inside that team:
   - Connect GitHub repository: **`mariusbeam/mariusbuilds`**
   - If the repo does not appear, click to **configure GitHub app access** and allow Keystatic for that repo (or all repos).
   - Name the project something clear (e.g. `mariusbuilds`). That name becomes the second part of the ID.
4. Open the project → **Settings**. Copy the **project** string. It looks like:

   ```text
   mariusbuilds/mariusbuilds
   ```

   (your team slug + `/` + your project slug — Keystatic shows the exact string to paste.)

### 2. Tell the site which project to use

**On Netlify** (recommended):

1. Site → **Site configuration** → **Environment variables**
2. Add variable:
   - **Key:** `KEYSTATIC_CLOUD_PROJECT`
   - **Value:** the string from step 1 (e.g. `mariusbuilds/mariusbuilds`)
3. **Deploys** → **Trigger deploy** → **Deploy site** (so the new variable is picked up).

**Locally** (only if you want to test Cloud mode on your machine):

```bash
cp .env.example .env
# Edit .env and set KEYSTATIC_CLOUD_PROJECT=mariusbuilds/mariusbuilds
```

Then run `npm run build && npm run preview` — note: Netlify adapter preview is limited; Cloud editing is mainly tested on the deployed site.

### 3. How it fits together

| Where | Storage | CMS URL |
|-------|---------|---------|
| Your Mac (`npm run dev`) | Files in `src/data/` (local) | http://127.0.0.1:4321/keystatic |
| Netlify (live site) | Keystatic Cloud → commits to GitHub | https://YOUR-SITE/keystatic |

After you save in Cloud, Keystatic commits to GitHub → Netlify rebuilds → the public site updates.

### 4. If the project still does not show in your account

- You are signed into Keystatic with a **different GitHub user** than the one on the team.
- **`KEYSTATIC_CLOUD_PROJECT` uses the wrong team slug** — e.g. `mariusbeam/mariusbuilds` when your Keystatic team is `mariusbuilds` → use `mariusbuilds/mariusbuilds` (copy the exact string from project Settings).
- The GitHub app was not granted access to **mariusbuilds** (fix under GitHub → Settings → Applications → Keystatic).
- You created a project on a **different team** — check the team switcher at the top of [keystatic.cloud](https://keystatic.cloud).

### 5. Config in this repo

`keystatic.config.tsx` reads `KEYSTATIC_CLOUD_PROJECT` in production. The default fallback is `mariusbuilds/mariusbuilds` — set your own project ID on Netlify if it differs.

See also `.env.example`.
