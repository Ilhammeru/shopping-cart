export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl || 'http://localhost:3000';

  // Static routes
  const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/dashboard', changefreq: 'daily', priority: 0.9 },
  ];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  event.node.res.setHeader('Content-Type', 'application/xml');
  return sitemap;
});
