import type { APIContext } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { markdownResponse, renderPostMarkdown } from '@/utils/markdown';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props }: APIContext<{ post: CollectionEntry<'blog'> }>) {
  return markdownResponse(await renderPostMarkdown(props.post));
}
