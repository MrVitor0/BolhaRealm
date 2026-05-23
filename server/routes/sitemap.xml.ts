import { getRequestURL, setHeader } from "h3";

export default defineEventHandler((event) => {
  const { origin } = getRequestURL(event);
  const lastModified = new Date().toISOString();
  const urls = [
    {
      loc: `${origin}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (url) =>
        `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`,
    ),
    "</urlset>",
  ].join("\n");

  setHeader(event, "content-type", "application/xml; charset=utf-8");

  return body;
});
