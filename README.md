# salcastoro.com

Personal site and blog for Sal Castoro, built with Astro and Tailwind CSS and served from a Cloudflare Worker.

Live at **https://salcastoro.com**.

## Features

- Static Astro site: home, about, blog index, blog posts, and a 404 page
- Markdown/MDX blog posts in a typed content collection
- Light, dark, and system themes with a manual toggle
- Open Graph and Twitter cards with a default social image, JSON-LD structured data, sitemap, and RSS feed
- Hashed assets cached for a year at the edge

## Tech stack

- **Framework**: Astro 7
- **Styling**: Tailwind CSS 4 (Vite plugin) with `@tailwindcss/typography`
- **Content**: Markdown/MDX, glob-loaded content collections
- **Language**: TypeScript (strict)
- **Fonts**: Inter and JetBrains Mono from Google Fonts
- **Hosting**: Cloudflare Workers Static Assets, deployed by Workers Builds

## Project structure

```
public/                  # Copied to dist/ as-is
├── _headers             # Cache headers for /_astro/* (Workers Static Assets)
├── .assetsignore        # Files never uploaded to Cloudflare
├── og-image.jpg         # Default 1200x630 social preview image
├── favicon*, icon-*.png, apple-touch-icon.png, site.webmanifest
├── robots.txt
├── rss-styles.xsl       # Browser styling for /rss.xml
└── images/              # Static images referenced by posts
src/
├── assets/images/       # Images processed by Astro (profile photo, post images)
├── components/
│   ├── blog/PostCard.astro
│   ├── layout/          # Header, Footer, Navigation
│   ├── mdx/             # Callout, CodeBlock, Image, Quote (for .mdx posts)
│   └── ui/ThemeToggle.astro
├── content/blog/        # Blog posts (.md / .mdx)
├── content.config.ts    # Blog collection schema
├── layouts/             # BaseLayout (head/SEO), PageLayout, BlogLayout
├── pages/
│   ├── index.astro      # Home
│   ├── about.astro      # About, skills, and work experience
│   ├── blog/            # Blog index and [slug] post pages
│   ├── rss.xml.ts       # RSS feed
│   └── 404.astro
├── styles/global.css    # Tailwind entry point and design tokens
└── utils/seo.ts         # SITE_CONFIG (name, description, email, socials) and JSON-LD helpers
```

## Getting started

Requires Node.js 24 (`.nvmrc`) and npm.

```bash
nvm install && nvm use
npm ci
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Astro dev server |
| `npm run check` | Type-check with `astro check` |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run deploy` | Build and deploy with Wrangler (normally CI does this) |

## Writing posts

Add a `.md` or `.mdx` file to `src/content/blog/`. The filename becomes the URL (`/blog/<filename>/`), so don't rename published posts.

```md
---
title: 'Post title'
description: 'Under 160 characters; used for SEO, cards, and RSS'
pubDate: 2026-11-01
tags: ['Astro', 'Cloudflare']
draft: false
# Optional:
# heroImage: '/images/my-post/hero.webp'
# heroImageAlt: 'Description'
# ogImage: '/images/my-post/social.jpg'   # 1200x630; defaults to heroImage, then /og-image.jpg
# ogImageAlt: 'Description'
---
```

Drafts (`draft: true`) are excluded from the blog, RSS, and the sitemap. The full schema is in `src/content.config.ts`.

## Updating site content

- **Name, description, email, social links, structured data**: `src/utils/seo.ts`
- **Home page text**: `src/pages/index.astro`
- **About page bio, skills, and experience**: `src/pages/about.astro`
- **Footer social links**: `src/components/layout/Footer.astro`
- **Default social image**: replace `public/og-image.jpg` (1200x630)

## Styling notes

`src/styles/global.css` loads Tailwind and the legacy `tailwind.config.mjs` design tokens. Dark mode uses the `.dark` class that the theme toggle sets on `<html>`. Tailwind 4 targets Safari 16.4+, Chromium 111+, and Firefox 128+.

`package.json` overrides `postcss-selector-parser` to 6.1.5 for `@tailwindcss/typography`; revisit it when upgrading that plugin. TypeScript stays on 5.9.x for compatibility with `@astrojs/check`.

## Deployment

The site is a Cloudflare Worker with static assets (migrated from Cloudflare Pages in November 2026). There is no Worker script; `wrangler.jsonc` points the Worker at `dist/`.

- **Worker**: `personal-blog-site`, custom domain `salcastoro.com` (also https://personal-blog-site.salcastoro.workers.dev)
- **www**: `www.salcastoro.com` 301-redirects to the apex using a zone Redirect Rule
- **Production**: every push to `main` runs Workers Builds: `npm run build`, then `npx wrangler deploy`
- **Previews**: pushes to other branches run `npx wrangler preview`, which creates a Preview URL for that branch and comments it on the pull request
- **Node.js**: Workers Builds uses the version in `.nvmrc`

To deploy by hand (for example, if CI is down): `npm run deploy`. Wrangler needs to be logged in (`npx wrangler login`).

Use Wrangler for this project. The `cf` CLI can't build Astro 6 or later yet.
