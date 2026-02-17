import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteUrl = 'https://robocache.app';
const now = new Date().toISOString();

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/explore', changefreq: 'daily', priority: '0.9' },
  { path: '/create', changefreq: 'weekly', priority: '0.86' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.78' },
  { path: '/robocaching-101', changefreq: 'monthly', priority: '0.72' },
  { path: '/contact', changefreq: 'monthly', priority: '0.67' },
  { path: '/all-created', changefreq: 'daily', priority: '0.73' },
  { path: '/all-logged', changefreq: 'daily', priority: '0.73' },
];

const urls = routes
  .map(
    ({ path, changefreq, priority }) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;

writeFileSync(resolve('public/sitemap.xml'), xml, 'utf8');
console.log('Generated public/sitemap.xml');
