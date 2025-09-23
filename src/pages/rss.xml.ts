import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/utils/seo';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  // Get all published blog posts
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  // Sort posts by publication date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: context.site?.toString() || SITE_CONFIG.url,
    
    // RSS feed configuration
    language: SITE_CONFIG.language,
    
    // Items from blog posts
    items: sortedPosts.map((post) => {
      const postUrl = new URL(`/blog/${post.slug}/`, context.site || SITE_CONFIG.url).toString();
      
      return {
        title: post.data.metaTitle || post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        author: `${post.data.author} <${SITE_CONFIG.author.email}>`,
        link: postUrl,
        guid: postUrl,
        
        // Categories and tags
        categories: [
          ...(post.data.category ? [post.data.category] : []),
          ...post.data.tags,
        ],
        
        // Custom namespaces for enhanced metadata
        customData: [
          // Dublin Core metadata
          `<dc:creator>${post.data.author}</dc:creator>`,
          post.data.updatedDate && `<dc:modified>${post.data.updatedDate.toISOString()}</dc:modified>`,
          
          // Content namespace for full content
          `<content:encoded><![CDATA[${post.body}]]></content:encoded>`,
          
          // Media namespace for images
          post.data.heroImage && `<media:thumbnail url="${new URL(post.data.heroImage, context.site || SITE_CONFIG.url).toString()}" />`,
          
          // Additional metadata
          post.data.keywords.length > 0 && `<keywords>${post.data.keywords.join(', ')}</keywords>`,
          post.data.readingTime && `<readingTime>${post.data.readingTime}</readingTime>`,
        ].filter(Boolean).join('\n'),
      };
    }),
    
    // Custom XML namespaces
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
      media: 'http://search.yahoo.com/mrss/',
    },
    
    // Additional feed metadata
    customData: [
      `<language>${SITE_CONFIG.language}</language>`,
      `<managingEditor>${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})</managingEditor>`,
      `<webMaster>${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})</webMaster>`,
      `<category>Technology</category>`,
      `<category>Web Development</category>`,
      `<generator>Astro</generator>`,
      `<docs>https://www.rssboard.org/rss-specification</docs>`,
      `<atom:link href="${new URL('/rss.xml', context.site || SITE_CONFIG.url).toString()}" rel="self" type="application/rss+xml" />`,
      `<image>`,
      `  <url>${new URL('/logo.png', context.site || SITE_CONFIG.url).toString()}</url>`,
      `  <title>${SITE_CONFIG.name}</title>`,
      `  <link>${context.site?.toString() || SITE_CONFIG.url}</link>`,
      `  <description>${SITE_CONFIG.description}</description>`,
      `</image>`,
    ].join('\n'),
    
    // Stylesheet for browser viewing
    stylesheet: '/rss-styles.xsl',
  });
};