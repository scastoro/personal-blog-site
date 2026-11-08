import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Real last-modified dates for the sitemap, read from post frontmatter.
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);
const postDates = new Map();
for (const file of readdirSync(BLOG_DIR)) {
  const source = readFileSync(new URL(file, BLOG_DIR), 'utf8');
  const front = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  if (/^draft:\s*true/m.test(front)) continue;
  const date = front.match(/^updatedDate:\s*(.+)$/m) ?? front.match(/^pubDate:\s*(.+)$/m);
  if (date) postDates.set(file.replace(/\.mdx?$/, ''), new Date(date[1].trim().replace(/['"]/g, '')));
}
const latestPostDate = new Date(Math.max(...[...postDates.values()].map(Number)));

// https://astro.build/config
export default defineConfig({
  site: 'https://salcastoro.com',
  compressHTML: true,
  integrations: [
    mdx(),
    sitemap({
      // Every route uses a trailing slash, so match on the exact pathname.
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
          item.lastmod = latestPostDate.toISOString();
        } else if (path === '/blog/') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
          item.lastmod = latestPostDate.toISOString();
        } else if (path.startsWith('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
          item.lastmod = postDates.get(path.split('/')[2])?.toISOString();
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
