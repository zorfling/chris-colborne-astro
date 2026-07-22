# Copilot instructions

Personal site + blog for Chris Colborne, built with **Astro 7** and deployed to **Netlify** as a static site.

## Commands

Use **yarn** (there is a `yarn.lock`; Netlify runs `yarn build`). Node 22 is required (`.nvmrc`, Astro 7 needs >=22.12.0).

- `yarn install` — install dependencies
- `yarn dev` — local dev server
- `yarn build` — production build to `dist/`
- `yarn preview` — serve the built `dist/`
- `node scripts/generate-og-card.mjs` — regenerate `public/og-card.png` (the default OG share card) after palette/copy changes

There is no test or lint setup — do not invent one.

## Architecture

- **Content collection** (`src/content.config.ts`): blog posts are a glob collection loading `src/content/blog/**/index.md`. Each post lives in its own folder with co-located images. The Zod schema requires `title`, `path`, `date` and supports optional `description`, `featuredImage` (via `image()`), `attribution`, and `status` (`PUBLISHED` | `DRAFT`, default `PUBLISHED`).
- **URL preservation is critical**: `src/pages/[...slug].astro` builds each post's route from the frontmatter `path` field (stripping leading/trailing slashes), **not** from the folder name. These are the original Gatsby URLs (e.g. `/php-74-arrow-functions/`) and must not change. The folder name and `path` frequently differ.
- **Publish filter**: every query filters `data.status === 'PUBLISHED'` — apply the same filter in any new page or feed that lists posts.
- **Pages**: `src/pages/index.astro` is the landing page (all landing copy lives inline here), `src/pages/blog/index.astro` is the post list, `src/pages/[...slug].astro` renders individual posts, `src/pages/rss.xml.js` is the feed.
- **Layout**: `src/layouts/Base.astro` owns `<head>` (SEO/OG/Twitter meta, Google Fonts), header nav, and footer. It accepts `title`, `description`, optional `image` (defaults to `/og-card.png`), and `type` (`website` | `article`). Use `type="article"` for blog posts. The booking CTA URL is the exported `BOOKING_URL` constant.

## Conventions

- Always use Astro's `<Image />` from `astro:assets` for post/thumbnail images (never raw `<img>`) so responsive `widths` are generated.
- Styling is a single global stylesheet, `src/styles/global.css`, driven by CSS custom properties — the palette (paper/ink/spruce/amber) and fonts (Bricolage Grotesque display, Figtree body) are design tokens under `:root`. Reuse tokens (`var(--amber)` etc.) rather than hard-coding colors. There is no CSS framework or component-scoped styling.
- Dates in frontmatter are ISO strings; render them with `Intl.DateTimeFormat('en-AU', …)` as the existing pages do.
- Redirects (e.g. `/about` → `/#about`) live in `netlify.toml`, not in Astro.
- Locale is `en-AU`; keep Australian spelling and Brisbane/AU context in copy.
