import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { SITE_CONFIG } from '@/utils/seo';
import { hasMarkdownVersion, normalizePostBody } from '@/utils/markdown';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  const processor = await createMarkdownProcessor({ syntaxHighlight: false });
  const items = await Promise.all(
    posts.map(async (post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      author: `${SITE_CONFIG.author.email} (${post.data.author})`,
      categories: post.data.tags,
      // noindex posts keep their summary-only entry.
      content: hasMarkdownVersion(post)
        ? (await processor.render(await normalizePostBody(post))).code
        : undefined,
    })),
  );

  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: context.site ?? SITE_CONFIG.url,
    stylesheet: '/rss-styles.xsl',
    trailingSlash: true,
    items,
    customData: `<language>${SITE_CONFIG.locale.replace('_', '-').toLowerCase()}</language>`,
  });
}
