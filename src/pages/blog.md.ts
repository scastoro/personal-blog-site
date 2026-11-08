import {
  absoluteURL,
  frontmatter,
  getMarkdownPosts,
  markdownResponse,
  postListMarkdown,
} from '@/utils/markdown';

const DESCRIPTION = 'Thoughts, tutorials, and insights on web development, technology, and creative projects.';

export async function GET() {
  const posts = await getMarkdownPosts();

  return markdownResponse(`${frontmatter({
    title: 'Blog',
    description: DESCRIPTION,
    url: absoluteURL('/blog/'),
  })}

# Blog

${DESCRIPTION}

${postListMarkdown(posts)}
`);
}
