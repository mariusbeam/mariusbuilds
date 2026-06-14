# mariusbuilds.com

Personal site for Marius Rusulet — built with Astro, Keystatic, and Tailwind.

## Setup

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build
```

Copy `.env.example` to `.env` and set `KEYSTATIC_CLOUD_PROJECT` for production CMS. See [CMS.md](./CMS.md) for Keystatic Cloud setup on Netlify.

## Content

Edit content at `/keystatic` in dev, or push changes through Keystatic Cloud in production. Source files live in `src/data/`.

## Deploy

Configured for Netlify (`netlify.toml`). Production site: [mariusbuilds.com](https://mariusbuilds.com).
