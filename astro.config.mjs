import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://salcastoro.com',
  compressHTML: true,
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
      // Every route uses a trailing slash, so match on the exact pathname.
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (path === '/blog/') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  markdown: {
    processor: unified(),
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
