import { Router } from 'express';

const router = Router();

const pages = [
  { path: '/', freq: 'daily', priority: '1.0' },
  { path: '/analyze', freq: 'weekly', priority: '0.8' },
  { path: '/framework', freq: 'weekly', priority: '0.8' },
  { path: '/report-card', freq: 'weekly', priority: '0.8' },
  { path: '/faq', freq: 'monthly', priority: '0.6' },
  { path: '/privacy', freq: 'monthly', priority: '0.3' },
  { path: '/terms', freq: 'monthly', priority: '0.3' },
  { path: '/support', freq: 'monthly', priority: '0.3' },
  { path: '/revurdict', freq: 'weekly', priority: '0.5' },
];

const origins = [
  'https://vurdict.site',
];

const urls = origins.flatMap(origin =>
  pages.map(p => `  <url>\n    <loc>${origin}${p.path}</loc>\n    <changefreq>${p.freq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

router.get('/', (_req, res) => {
  res.type('application/xml').send(sitemapXml);
});

export default router;
