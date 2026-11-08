// Markdown versions of site content for agents and feeds. Post files can't be
// served raw: local image paths only resolve at build time, and some posts use
// <figure> HTML. Everything here produces absolute URLs.
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_CONFIG } from '@/utils/seo';

type Post = CollectionEntry<'blog'>;

const localImages = import.meta.glob<ImageMetadata>('/src/assets/images/*', {
  eager: true,
  import: 'default',
});

const POST_DIRECTORY = 'file:///src/content/blog/';

export function absoluteURL(path: string): string {
  return new URL(path, SITE_CONFIG.url).toString();
}

export function markdownResponse(markdown: string): Response {
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

/** Drafts and noindex posts stay out of the Markdown versions and llms.txt. */
export function hasMarkdownVersion(post: Post): boolean {
  return !post.data.draft && !post.data.noindex;
}

/** Published posts with a Markdown version, newest first. */
export async function getMarkdownPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', hasMarkdownVersion);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function postMarkdownURL(post: Post): string {
  return absoluteURL(`/blog/${post.id}.md`);
}

export function frontmatter(fields: Record<string, unknown>): string {
  // JSON strings and arrays are valid YAML, so values need no extra escaping.
  const lines = Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
  return `---\n${lines.join('\n')}\n---`;
}

function escapeAlt(alt: string): string {
  return alt.replace(/[[\]]/g, '\\$&');
}

function attribute(attributes: string, name: string): string | undefined {
  return attributes.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

/** Replace `<figure>` blocks with a Markdown image and an italic caption. */
function convertFigures(text: string, postId: string): string {
  return text.replace(
    /<figure>\s*<img\b([^>]*)>\s*(?:<figcaption>([\s\S]*?)<\/figcaption>\s*)?<\/figure>/g,
    (_match, attributes: string, caption?: string) => {
      const src = attribute(attributes, 'src');
      if (!src) throw new Error(`markdown: <figure> without an image src in post "${postId}"`);
      const image = `![${escapeAlt(attribute(attributes, 'alt') ?? '')}](${src})`;
      return caption ? `${image}\n\n*${caption.trim()}*` : image;
    },
  );
}

/** Serve the same optimized file the HTML page uses. */
async function resolveLocalImage(path: string, postId: string): Promise<string> {
  const key = new URL(path, POST_DIRECTORY).pathname;
  const image = localImages[key];
  if (!image) throw new Error(`markdown: image "${path}" in post "${postId}" was not found`);
  return absoluteURL((await getImage({ src: image })).src);
}

async function convertProse(text: string, postId: string): Promise<string> {
  const converted = convertFigures(text, postId);

  const relativeImages = [...converted.matchAll(/!\[[^\]]*\]\((\.{1,2}\/[^)\s]+)\)/g)];
  const resolved = new Map<string, string>();
  for (const [, path] of relativeImages) {
    if (!resolved.has(path)) resolved.set(path, await resolveLocalImage(path, postId));
  }

  return converted
    .replace(/(!\[[^\]]*\]\()(\.{1,2}\/[^)\s]+)\)/g, (_m, open: string, path: string) => {
      return `${open}${resolved.get(path)})`;
    })
    .replace(/(\]\()(\/[^)\s]*)\)/g, (_m, open: string, path: string) => {
      return `${open}${absoluteURL(path)})`;
    });
}

/** Normalize a post body, leaving fenced code blocks untouched. */
export async function normalizePostBody(post: Post): Promise<string> {
  if (post.filePath?.endsWith('.mdx')) {
    throw new Error(
      `markdown: "${post.id}" is MDX, which has no Markdown export yet. Render its components in src/utils/markdown.ts.`,
    );
  }

  const output: string[] = [];
  let prose: string[] = [];
  let fence: string | undefined;

  const flushProse = async () => {
    if (prose.length > 0) output.push(await convertProse(prose.join('\n'), post.id));
    prose = [];
  };

  for (const line of (post.body ?? '').split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/)?.[1];
    if (fence) {
      output.push(line);
      if (marker?.startsWith(fence)) fence = undefined;
    } else if (marker) {
      await flushProse();
      output.push(line);
      fence = marker;
    } else {
      prose.push(line);
    }
  }
  await flushProse();

  return output.join('\n').trim();
}

export async function renderPostMarkdown(post: Post): Promise<string> {
  const { title, description, author, pubDate, updatedDate, tags } = post.data;
  const header = frontmatter({
    title,
    description,
    author,
    published: pubDate.toISOString(),
    updated: updatedDate?.toISOString(),
    url: absoluteURL(`/blog/${post.id}/`),
    tags,
  });
  return `${header}\n\n# ${title}\n\n${await normalizePostBody(post)}\n`;
}
