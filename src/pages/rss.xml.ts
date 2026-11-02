import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_CONFIG } from '@/utils/seo';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: context.site ?? SITE_CONFIG.url,
    stylesheet: '/rss-styles.xsl',
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      author: `${SITE_CONFIG.author.email} (${post.data.author})`,
      categories: post.data.tags,
    })),
    customData: `<language>${SITE_CONFIG.locale.replace('_', '-').toLowerCase()}</language>`,
  });
}
