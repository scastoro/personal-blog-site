import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-domain.com', // Update with your actual domain
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      // Customize sitemap generation
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Filter out draft posts and admin pages
      filter: (page) => {
        // Exclude draft posts (they should have /draft/ in the URL when drafts are implemented)
        if (page.includes('/draft/')) return false;
        // Exclude admin or private pages
        if (page.includes('/admin/')) return false;
        if (page.includes('/private/')) return false;
        // Include all other pages
        return true;
      },
      // Customize entries for different page types
      serialize(item) {
        // Higher priority for important pages
        if (item.url.endsWith('/')) {
          // Homepage
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
          // Individual blog posts
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/blog/')) {
          // Blog index page
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/about/') || item.url.includes('/contact/') || item.url.includes('/uses/')) {
          // Static pages
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});