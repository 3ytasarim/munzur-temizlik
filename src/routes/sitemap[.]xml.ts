import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { districts, posts } from "@/data/content";
import { serviceMeta } from "@/data/site";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/hakkimizda", changefreq: "monthly", priority: "0.8" },
          { path: "/hakkimizda/temizlik-sureci", changefreq: "monthly", priority: "0.7" },
          { path: "/hakkimizda/sikca-sorulan-sorular", changefreq: "monthly", priority: "0.7" },
          { path: "/hizmetlerimiz", changefreq: "monthly", priority: "0.9" },
          { path: "/hizmet-bolgeleri", changefreq: "monthly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/iletisim", changefreq: "monthly", priority: "0.7" },
          { path: "/teklif-formu", changefreq: "monthly", priority: "0.8" },
          ...serviceMeta.map((s) => ({
            path: `/hizmetlerimiz/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...districts.map((d) => ({
            path: `/hizmet-bolgeleri/${d.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          ...posts.map((p) => ({
            path: `/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
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
