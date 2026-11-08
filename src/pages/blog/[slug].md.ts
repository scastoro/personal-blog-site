import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getMarkdownPosts, markdownResponse, renderPostMarkdown } from '@/utils/markdown';

export async function getStaticPaths() {
  const posts = await getMarkdownPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props }: APIContext<{ post: CollectionEntry<'blog'> }>) {
  return markdownResponse(await renderPostMarkdown(props.post));
}
