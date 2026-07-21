# chriscolborne.com - Astro rebuild

Freelance lead-gen landing page + ported blog (all 17 posts at their original URLs).

## Run locally

    npm install
    npm run dev

## Deploy to Netlify

Push this repo to GitHub, then in Netlify: "Add new site → Import from Git".
`netlify.toml` already sets build command (`npm run build`) and publish dir (`dist`).
Point the existing chriscolborne.com site at this repo, or create a new site and
swap the domain over once you're happy.

## Before launch (TODOs)

- **Booking link**: set `BOOKING_URL` in `src/layouts/Base.astro` to your real
  Cal.com / Calendly URL (currently a placeholder).
- **Day job wording**: `src/pages/index.astro` About section says "a major tech
  company" - swap for "Microsoft" if you're comfortable naming it.
- **Testimonials**: ask Shen / Anthony for a named quote; drop it into the
  Recent work section.
- Original URLs, `/rss.xml`, and sitemap are preserved - no redirects needed.

## Structure

- `src/pages/index.astro` - landing page (all copy lives here)
- `src/layouts/Base.astro` - head, nav, footer, booking URL
- `src/styles/global.css` - design tokens (paper/ink/spruce/amber)
- `src/content/blog/` - posts as markdown, images co-located
