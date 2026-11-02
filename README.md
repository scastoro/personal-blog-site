# Personal Blog Site

A modern personal website built with Astro, TypeScript, and Tailwind CSS.

## 🚀 Project Overview

This is a performance-first personal blog site built using Astro's partial hydration architecture. The site features a clean, responsive design with dark mode support and is optimized for excellent SEO and accessibility.

## ✨ Features

- **Astro Framework**: Static site generation with partial hydration
- **TypeScript**: Type-safe development with strict configuration
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **MDX Support**: Rich content creation with component embedding
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, and sitemap generation
- **Content Collections**: Type-safe blog posts and author management

## 🛠️ Tech Stack

- **Framework**: Astro 7.4+
- **Styling**: Tailwind CSS 4.3+ with the Vite plugin and existing design-token configuration
- **Content**: Markdown/MDX with glob-loaded content collections and the Unified Markdown processor
- **TypeScript**: Strict mode enabled
- **Fonts**: Inter + JetBrains Mono
- **Icons**: Heroicons (SVG)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   ├── blog/            # Blog-specific components
│   ├── ui/              # Reusable UI components
│   └── mdx/             # Custom MDX components
├── content/
│   ├── blog/            # Blog posts (MDX)
│   └── authors/         # Author information
├── content.config.ts    # Content collection loaders and schemas
├── layouts/
│   ├── BaseLayout.astro # Base HTML template
│   └── PageLayout.astro # Page wrapper with header/footer
├── pages/
│   ├── index.astro      # Homepage
│   └── 404.astro        # Error page
├── styles/
│   └── global.css       # Global styles and Tailwind imports
└── utils/               # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 24 (v24.22.1 specified in `.nvmrc`)
- npm (use the committed `package-lock.json` for reproducible installs)

### Installation

```bash
# Select the project runtime
nvm install
nvm use

# Install dependencies
npm ci

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Run Astro type checking
npm run sync         # Sync content collections
```

## 📝 Content Management

### Creating Blog Posts

Create new blog posts in `src/content/blog/` using Markdown (`.md`) or MDX (`.mdx`). The filename becomes the post ID and URL; preserve filenames when updating existing posts.

```mdx
---
title: "Your Post Title"
description: "Brief description"
pubDate: 2024-01-01
tags: ["web-dev", "astro"]
---

Your content here...
```

### Adding Authors

Add author information in `src/content/authors/` as JSON files:

```json
{
  "name": "Your Name",
  "bio": "Brief bio",
  "avatar": "/images/avatar.jpg",
  "social": {
    "twitter": "username",
    "github": "username"
  }
}
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.mjs` to customize the color scheme and design tokens.
The config is loaded explicitly from `src/styles/global.css`; dark variants follow the `.dark` class used by the theme toggle. Component styles using Tailwind directives reference the global stylesheet with `@reference`.
Tailwind 4 targets modern browsers: Safari 16.4+, Chromium 111+, and Firefox 128+.

The typography plugin currently pins an older selector parser. A scoped npm override selects the patched, same-major `postcss-selector-parser` 6.1.5; reassess it when upgrading the plugin. TypeScript stays on 5.9.x for compatibility with the Astro checker.

### Typography

The site uses Inter for body text and JetBrains Mono for code. Update font imports in `src/styles/global.css`.

### Site Configuration

Update site metadata in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://your-domain.com',
  // ... other config
});
```

## 🔧 Configuration Files

- `astro.config.mjs` - Astro configuration and integrations
- `tailwind.config.mjs` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration with path aliases
- `src/content.config.ts` - Content collection loaders and schemas

## 📈 Performance

The site is optimized for performance with:

- Static site generation
- Minimal JavaScript bundle
- Optimized images and fonts
- Critical CSS inlining
- Lazy loading where appropriate

## 🌐 Deployment

This site is deployed on **Cloudflare Pages** with automatic deployments from the main branch.

### Production Deployment
- **Live Site**: https://salcastoro.com
- **Platform**: Cloudflare Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: v24.22.1 (specified in `.nvmrc`; keep any Cloudflare `NODE_VERSION` override aligned when changing runtimes)

### Deployment Features
- ✅ **Automatic deployments** from GitHub main branch
- ✅ **Preview deployments** for pull requests
- ✅ **Global CDN** with 200+ edge locations
- ✅ **Free SSL certificate** and HTTPS
- ✅ **Fast builds** (typically under 2 minutes)
- ✅ **Built-in analytics** (privacy-focused)

### Manual Deployment Steps

1. **Connect Repository to Cloudflare Pages**
   - Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Click "Create a project" → "Connect to Git"
   - Select this repository: `scastoro/personal-blog-site`

2. **Configure Build Settings**
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

3. **Add Custom Domain**
   - Go to Custom domains tab
   - Add `salcastoro.com`
   - Configure DNS as directed

### Alternative Hosting Options
- **Netlify**: Connect your Git repository
- **Vercel**: Import your project
- **GitHub Pages**: Use GitHub Actions workflow

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

This is a personal project, but feel free to fork and adapt for your own use!
