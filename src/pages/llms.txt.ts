import { SITE_CONFIG } from '@/utils/seo';
import { absoluteURL, getMarkdownPosts, postMarkdownURL } from '@/utils/markdown';

export async function GET() {
  const posts = await getMarkdownPosts();
  const postLines = posts.map(
    (post) => `- [${post.data.title}](${postMarkdownURL(post)}): ${post.data.description}`,
  );

  const body = `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

Blog posts are first-hand notes on AI coding tools and side projects. Every link below is a Markdown version of a page on ${SITE_CONFIG.url}.

## Blog posts

${postLines.join('\n')}

## About

- [About ${SITE_CONFIG.name}](${absoluteURL('/about.md')}): Background, skills, and work experience

## Optional

- [Home](${absoluteURL('/index.md')}): Site overview and contact details
- [RSS feed](${absoluteURL('/rss.xml')}): Full-text blog feed
- [GitHub](${SITE_CONFIG.social.github}): Open source projects
- [Claude Code Subagents: From Basics to Advanced Workflows](https://www.youtube.com/watch?v=HI8PBSPr6Qk): Meetup talk on custom subagents
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
