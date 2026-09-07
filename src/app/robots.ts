import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corail-plongee.com";
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allowIndexing
      ? { userAgent: "*", allow: "/", disallow: ["/admin/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
