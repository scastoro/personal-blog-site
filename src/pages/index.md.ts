import { SITE_CONFIG } from '@/utils/seo';
import {
  absoluteURL,
  frontmatter,
  getMarkdownPosts,
  markdownResponse,
  postMarkdownURL,
} from '@/utils/markdown';

export async function GET() {
  const posts = await getMarkdownPosts();
  const postLines = posts.map((post) => {
    const date = post.data.pubDate.toISOString().slice(0, 10);
    return `- [${post.data.title}](${postMarkdownURL(post)}) (${date}): ${post.data.description}`;
  });

  return markdownResponse(`${frontmatter({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: absoluteURL('/'),
  })}

# ${SITE_CONFIG.name}

${SITE_CONFIG.description}

## Pages

- [About](${absoluteURL('/about.md')}): Background, skills, and work experience
- [RSS feed](${absoluteURL('/rss.xml')}): Full-text blog feed

## Blog posts

${postLines.join('\n')}

## Contact

- Email: ${SITE_CONFIG.author.email}
- GitHub: ${SITE_CONFIG.social.github}
- LinkedIn: ${SITE_CONFIG.social.linkedin}
- X: ${SITE_CONFIG.social.twitter}
`);
}
