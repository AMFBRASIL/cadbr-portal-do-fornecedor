import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/site";

const BASE_URL = SITE.url;

const SICAF_SLUGS = new Set([
  "o-que-e-sicaf",
  "documentos-exigidos-no-sicaf",
  "como-renovar-o-sicaf",
]);

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          {
            path: "/cadastro-no-sicaf",
            changefreq: "weekly",
            priority: "1.0",
            lastmod: today,
          },
          { path: "/conteudos", changefreq: "weekly", priority: "0.8", lastmod: today },
          ...ARTICLES.map((a) => ({
            path: `/conteudos/${a.slug}`,
            changefreq: "monthly" as const,
            priority: SICAF_SLUGS.has(a.slug) ? "0.9" : "0.7",
            lastmod: a.dateModified ?? today,
          })),
          { path: "/contato", changefreq: "yearly", priority: "0.5", lastmod: today },
          {
            path: "/politica-de-privacidade",
            changefreq: "yearly",
            priority: "0.3",
            lastmod: today,
          },
          { path: "/termos-de-uso", changefreq: "yearly", priority: "0.3", lastmod: today },
          {
            path: "/politica-de-cookies",
            changefreq: "yearly",
            priority: "0.3",
            lastmod: today,
          },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path === "/" ? "" : e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
