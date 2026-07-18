import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteOrigin = 'https://ieeeufjf.com.br';
const ptTemplate = await readFile(join(root, 'index.html'), 'utf8');
const enTemplate = await readFile(join(root, 'en.html'), 'utf8');

function stripLanguagePrefix(path) {
  if (path === '/en') return '/';
  if (path.startsWith('/en/')) return path.slice(3) || '/';
  return path || '/';
}

function absoluteUrl(path) {
  return `${siteOrigin}${path === '/' ? '/' : path}`;
}

function replaceSingle(source, pattern, replacement) {
  const output = source.replace(pattern, replacement);
  if (output === source) {
    throw new Error(`Could not apply SEO replacement: ${pattern}`);
  }
  return output;
}

function htmlForRoute(route) {
  const isEnglish = route === '/en' || route.startsWith('/en/');
  const contentPath = stripLanguagePrefix(route);
  const ptPath = contentPath;
  const enPath = contentPath === '/' ? '/en' : `/en${contentPath}`;
  let html = isEnglish ? enTemplate : ptTemplate;

  html = replaceSingle(
    html,
    /<link rel="canonical" href="[^"]+" \/>/,
    `<link rel="canonical" href="${absoluteUrl(route)}" />`,
  );
  html = replaceSingle(
    html,
    /<link rel="alternate" href="[^"]+" hreflang="pt-BR" \/>/,
    `<link rel="alternate" href="${absoluteUrl(ptPath)}" hreflang="pt-BR" />`,
  );
  html = replaceSingle(
    html,
    /<link rel="alternate" href="[^"]+" hreflang="en" \/>/,
    `<link rel="alternate" href="${absoluteUrl(enPath)}" hreflang="en" />`,
  );
  html = replaceSingle(
    html,
    /<link rel="alternate" href="[^"]+" hreflang="x-default" \/>/,
    `<link rel="alternate" href="${absoluteUrl(ptPath)}" hreflang="x-default" />`,
  );
  html = replaceSingle(
    html,
    /<meta property="og:url" content="[^"]+" \/>/,
    `<meta property="og:url" content="${absoluteUrl(route)}" />`,
  );
  html = replaceSingle(
    html,
    /"url": "https:\/\/ieeeufjf\.com\.br\/?(?:en)?"/,
    `"url": "${absoluteUrl(route)}"`,
  );

  return html;
}

await Promise.all(seoRoutes.map(async (route) => {
  const outputPath = join(root, route.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, htmlForRoute(route));
}));

console.log(`Generated ${seoRoutes.length} SEO HTML pages.`);
