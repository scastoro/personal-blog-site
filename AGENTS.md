# AGENTS.md

Guidance for coding agents (Claude Code, Codex, and others) working in this repository. `CLAUDE.md` imports this file.

## What this is

Sal Castoro's personal site and blog, https://salcastoro.com. It's a static Astro 7 site styled with Tailwind CSS 4 and served from a Cloudflare Worker with static assets. Pages: home, about, blog index, blog posts, 404, plus `/rss.xml` and `/sitemap-index.xml`.

## Commands

Use Node 24 (`nvm use`, from `.nvmrc`) and npm.

```bash
npm ci            # install
npm run dev       # dev server
npm run check     # astro check (type-check)
npm run build     # astro check && astro build -> dist/
npm run preview   # serve dist/
npm run deploy    # build + wrangler deploy (CI normally does this)
```

There is no lint, unit-test, or e2e setup. `npm run build` is the gate: it must pass with 0 errors before you push.

## Layout

- `src/pages/`: routes. `about.astro` holds the bio, skill groups, and work-experience data inline; `rss.xml.ts` builds the feed.
- `src/layouts/BaseLayout.astro`: `<head>`, SEO/Open Graph/Twitter tags, JSON-LD, and the theme bootstrap script. `PageLayout` wraps it with header/footer; `BlogLayout` adds post chrome.
- `src/utils/seo.ts`: `SITE_CONFIG`, the single source for site name, description, contact email (`sal@salcastoro.com`), social links, and the default OG image, plus JSON-LD helpers.
- `src/content.config.ts`: blog collection schema. Posts live in `src/content/blog/*.md(x)`; the filename is the URL slug.
- `src/components/mdx/`: components available to `.mdx` posts (current posts are plain `.md`).
- `public/`: static files copied verbatim, including `_headers`, `.assetsignore`, `og-image.jpg`, and the icons.

## Conventions

- Tailwind 4 via `@tailwindcss/vite`; `global.css` loads the legacy `tailwind.config.mjs` tokens with `@config`. Component `<style>` blocks that use `@apply` need `@reference "../../styles/global.css"`.
- Dark mode is class-based (`.dark` on `<html>`). `ThemeToggle` renders twice in the header (desktop and mobile), so select it with `[data-theme-toggle]`, never by element ID.
- Keep site-wide text consistent with `SITE_CONFIG` and the about page. Work history follows Sal's current resume; Great American Insurance Group is described as React + Node.js/Express.
- Every route has a trailing slash (`/about/`); internal links and RSS links use that form.
- Don't commit `dist/`, `.astro/`, or `.DS_Store` (all gitignored).

## Deployment

- Cloudflare Worker `personal-blog-site`, configured in `wrangler.jsonc` (assets from `./dist`, `404-page` not-found handling, custom domain `salcastoro.com`).
- **Workers Builds** is connected to GitHub: pushes to `main` deploy to production (`npx wrangler deploy`); other branches create a Preview (`npx wrangler preview`) with a URL commented on the PR.
- `www.salcastoro.com` 301-redirects to the apex using a zone Redirect Rule (not in this repo).
- Use Wrangler for build and deploy here. The `cf` CLI can't build Astro 6 or later during its beta; `cf` is fine for account resources (DNS, zones).
- Pushing to `main` publishes to the live site. Push to a branch first if you want a Preview.

## Subagents

`.claude/agents/` contains optional Claude Code subagent prompts (Astro developer, UI designer, accessibility, SEO, performance, docs, e2e). Their example commands are illustrative, and many of those npm scripts don't exist in this repo.
