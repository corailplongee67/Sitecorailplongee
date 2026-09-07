import type { MetadataRoute } from "next";
import auditPages from "../../docs/audit/current-site-pages.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corail-plongee.com";
  const seen = new Set<string>();

  return auditPages.flatMap((page) => {
    if (page.status !== 200) return [];
    const path = new URL(page.url).pathname;
    if (seen.has(path) || path.startsWith("/admin/")) return [];
    seen.add(path);
    return [{
      url: new URL(path, base).toString(),
      lastModified: page.lastmod ? new Date(page.lastmod) : undefined,
      changeFrequency: page.kind === "posts" ? "monthly" as const : "weekly" as const,
      priority: path === "/" || path === "/en/home/" ? 1 : page.kind === "pages" ? 0.8 : 0.6,
    }];
  });
}
