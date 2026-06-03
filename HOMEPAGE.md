# Homepage content (CMS)

All homepage text is editable in **Keystatic** at http://127.0.0.1:4321/keystatic (with `npm run dev` running).

## Where to edit what

| Keystatic section | What you can change |
|-------------------|---------------------|
| **Homepage (EN)** | Hero (badge, headline, intro, button), section titles & descriptions, blog/tools blocks, bottom CTA |
| **Homepage — Belief cards (EN)** | The five “What I believe” cards |
| **Homepage — How I work cards (EN)** | The three “How I work” step cards |
| **Services (EN)** | Service pages; tick **Show on homepage** + **Homepage summary** for “My main services” rows |

## File on disk

Singleton copy lives at:

`src/data/homepage/en/index.yaml`

Card collections live under `src/data/beliefs/en/`, `src/data/how-i-work/en/`, and `src/data/services/en/`.

## Fallback

If the homepage YAML is missing, the site uses `src/config/en/homepageData.ts` plus any CMS cards that exist.

## Run locally

```bash
cd atlas-main
npm run dev
```

Open http://127.0.0.1:4321/ and edit in Keystatic. Save, then hard-refresh the homepage if needed.
