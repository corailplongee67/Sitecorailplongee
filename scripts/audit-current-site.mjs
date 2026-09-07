import { mkdir, writeFile } from "node:fs/promises";

const ORIGIN = "https://www.corail-plongee.com";
const SITEMAPS = {
  pages: `${ORIGIN}/page-sitemap.xml`,
  posts: `${ORIGIN}/post-sitemap.xml`,
  products: `${ORIGIN}/product-sitemap.xml`,
  tags: `${ORIGIN}/post_tag-sitemap.xml`,
};

const decodeEntities = (value = "") =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:039|39);|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

const cleanText = (html = "") =>
  decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return match ? decodeEntities(match[2].trim()) : "";
};

const unique = (values) => [...new Set(values.filter(Boolean))];

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Corail-Plongee-SEO-Audit/1.0" },
    signal: AbortSignal.timeout(30_000),
  });
  const body = await response.text();
  return { response, body };
}

async function sitemapEntries(kind, url) {
  const { body } = await fetchText(url);
  const entries = [];
  for (const block of body.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const xml = block[1];
    const loc = xml.match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]?.trim();
    if (!loc) continue;
    entries.push({
      kind,
      url: decodeEntities(loc),
      lastmod: xml.match(/<lastmod>([\s\S]*?)<\/lastmod>/i)?.[1]?.trim() || null,
      sitemapImages: unique([...xml.matchAll(/<image:loc>([\s\S]*?)<\/image:loc>/gi)].map((m) => decodeEntities(m[1].trim()))),
    });
  }
  return entries;
}

function absoluteUrl(value, base) {
  if (!value || /^(?:mailto|tel|javascript|data):/i.test(value)) return value;
  try {
    return new URL(value, base).href;
  } catch {
    return value;
  }
}

function parsePage(entry, response, html) {
  const finalUrl = response.url;
  const title = cleanText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const anchors = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => {
    const tag = match[0];
    return {
      src: absoluteUrl(attribute(tag, "src"), finalUrl),
      alt: attribute(tag, "alt"),
      width: attribute(tag, "width") || null,
      height: attribute(tag, "height") || null,
      loading: attribute(tag, "loading") || null,
    };
  });

  const links = anchors.map((tag) => ({
    url: absoluteUrl(attribute(tag, "href"), finalUrl),
    text: cleanText(tag),
    rel: attribute(tag, "rel") || null,
    target: attribute(tag, "target") || null,
  }));

  const descriptionTag = metaTags.find((tag) => attribute(tag, "name").toLowerCase() === "description");
  const robotsTag = metaTags.find((tag) => attribute(tag, "name").toLowerCase() === "robots");
  const canonicalTag = linkTags.find((tag) => attribute(tag, "rel").toLowerCase().split(/\s+/).includes("canonical"));
  const hreflang = linkTags
    .filter((tag) => attribute(tag, "rel").toLowerCase().split(/\s+/).includes("alternate") && attribute(tag, "hreflang"))
    .map((tag) => ({ lang: attribute(tag, "hreflang"), url: absoluteUrl(attribute(tag, "href"), finalUrl) }));
  const headings = {};
  for (const level of [1, 2, 3]) {
    headings[`h${level}`] = unique(
      [...html.matchAll(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi"))].map((match) => cleanText(match[1]))
    );
  }
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);

  return {
    ...entry,
    status: response.status,
    finalUrl,
    redirected: finalUrl !== entry.url,
    language: new URL(finalUrl).pathname.startsWith("/en/") ? "en" : "fr",
    title,
    metaDescription: descriptionTag ? attribute(descriptionTag, "content") : null,
    metaRobots: robotsTag ? attribute(robotsTag, "content") : null,
    canonical: canonicalTag ? absoluteUrl(attribute(canonicalTag, "href"), finalUrl) : null,
    hreflang,
    headings,
    links,
    internalLinks: unique(links.map((link) => link.url).filter((url) => url?.startsWith(ORIGIN))),
    externalLinks: unique(links.map((link) => link.url).filter((url) => /^https?:/i.test(url || "") && !url.startsWith(ORIGIN))),
    zuuritLinks: unique(links.map((link) => link.url).filter((url) => /(?:^|\.)zuurit\.com/i.test(new URL(url || "https://invalid.invalid").hostname))),
    images,
    imagesMissingAlt: images.filter((image) => !image.alt).map((image) => image.src),
    jsonLd,
    visibleText: cleanText(html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || ""),
  };
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

await mkdir("docs/audit", { recursive: true });

const sitemapGroups = await Promise.all(
  Object.entries(SITEMAPS).map(([kind, url]) => sitemapEntries(kind, url))
);
const entries = sitemapGroups.flat();

const pages = await mapWithConcurrency(entries, 6, async (entry, index) => {
  try {
    const { response, body } = await fetchText(entry.url);
    process.stderr.write(`[${index + 1}/${entries.length}] ${response.status} ${entry.url}\n`);
    return parsePage(entry, response, body);
  } catch (error) {
    process.stderr.write(`[${index + 1}/${entries.length}] ERROR ${entry.url}: ${error.message}\n`);
    return { ...entry, status: 0, error: error.message };
  }
});

const allZuuritLinks = unique(pages.flatMap((page) => page.zuuritLinks || []));
const allExternalLinks = unique(pages.flatMap((page) => page.externalLinks || []));
const summary = {
  auditedAt: new Date().toISOString(),
  origin: ORIGIN,
  sitemapCounts: Object.fromEntries(Object.keys(SITEMAPS).map((kind) => [kind, entries.filter((entry) => entry.kind === kind).length])),
  totalUrls: entries.length,
  successful: pages.filter((page) => page.status >= 200 && page.status < 400).length,
  errors: pages.filter((page) => !page.status || page.status >= 400).map((page) => ({ url: page.url, status: page.status, error: page.error || null })),
  redirected: pages.filter((page) => page.redirected).map((page) => ({ from: page.url, to: page.finalUrl })),
  missingTitle: pages.filter((page) => !page.title).map((page) => page.url),
  missingDescription: pages.filter((page) => !page.metaDescription).map((page) => page.url),
  missingH1: pages.filter((page) => !page.headings?.h1?.length).map((page) => page.url),
  multipleH1: pages.filter((page) => (page.headings?.h1?.length || 0) > 1).map((page) => ({ url: page.url, h1: page.headings.h1 })),
  allZuuritLinks,
  allExternalLinks,
};

await writeFile("docs/audit/current-site-pages.json", `${JSON.stringify(pages, null, 2)}\n`);
await writeFile("docs/audit/current-site-summary.json", `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
