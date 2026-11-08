import { SITE_CONFIG } from '@/utils/seo';
import {
  absoluteURL,
  frontmatter,
  getMarkdownPosts,
  markdownResponse,
  postListMarkdown,
} from '@/utils/markdown';

export async function GET() {
  const posts = await getMarkdownPosts();
  return markdownResponse(`${frontmatter({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: absoluteURL('/'),
  })}

# ${SITE_CONFIG.name}

${SITE_CONFIG.description}

## Pages

- [About](${absoluteURL('/about.md')}): Background, skills, and work experience
- [Blog](${absoluteURL('/blog.md')}): All blog posts
- [RSS feed](${absoluteURL('/rss.xml')}): Full-text blog feed

## Blog posts

${postListMarkdown(posts)}

## Contact

- Email: ${SITE_CONFIG.author.email}
- GitHub: ${SITE_CONFIG.social.github}
- LinkedIn: ${SITE_CONFIG.social.linkedin}
- X: ${SITE_CONFIG.social.twitter}
`);
}
