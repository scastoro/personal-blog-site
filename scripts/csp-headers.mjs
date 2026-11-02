// Post-build step: build a Content-Security-Policy from the inline scripts Astro
// emitted and append it to dist/_headers (served by Workers Static Assets).
//
// Inline scripts (the theme bootstrap and Astro's small bundled modules) are
// allowed by SHA-256 hash, so 'unsafe-inline' is never needed for scripts.
// Styles keep 'unsafe-inline' because Shiki code blocks use style="" attributes.
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const path = join(dir, e.name);
      if (e.isDirectory()) return htmlFiles(path);
      return e.name.endsWith('.html') ? [path] : [];
    }),
  );
  return nested.flat();
}

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
const hashes = new Set();

for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(INLINE_SCRIPT)) {
    // JSON-LD and other data blocks are never executed, so CSP ignores them.
    if (/type=["']?application\/(ld\+)?json/i.test(attrs)) continue;
    if (!body.trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  }
}

const directives = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(' ')} https://static.cloudflareinsights.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
];

// Add the CSP to the existing catch-all `/*` rule from public/_headers.
const headersPath = join(DIST, '_headers');
const headers = await readFile(headersPath, 'utf8');
const catchAll = /^\/\*[ \t]*$/m;
if (!catchAll.test(headers)) {
  throw new Error('csp-headers: public/_headers needs a "/*" rule to attach the CSP to');
}
await writeFile(
  headersPath,
  headers.replace(catchAll, `/*\n  Content-Security-Policy: ${directives.join('; ')}`),
);
console.log(`csp-headers: ${hashes.size} inline script hash(es) added to dist/_headers`);
