import auditPages from "../../docs/audit/current-site-pages.json";

export type PublicEvent = {
  id: string;
  slug_fr: string;
  slug_en: string | null;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  description_fr: string;
  description_en: string;
  location_fr: string;
  location_en: string;
  starts_at: string;
  ends_at: string | null;
  image_paths: string[];
  cover_image_url: string | null;
  booking_link_key: string;
  title_color: string;
  text_color: string;
  card_color_start: string;
  card_color_end: string;
};

const entityMap: Record<string, string> = {
  amp: "&", nbsp: " ", quot: '"', apos: "'", eacute: "é", egrave: "è",
  ecirc: "ê", agrave: "à", acirc: "â", ugrave: "ù", ucirc: "û", ocirc: "ô",
  icirc: "î", ccedil: "ç", Eacute: "É", Egrave: "È", rsquo: "’", lsquo: "‘",
  ldquo: "“", rdquo: "”", hellip: "…", ndash: "–", mdash: "—", oelig: "œ",
};

function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => entityMap[name] ?? match)
    .replace(/\s+/g, " ")
    .trim();
}

function cleanLegacyDescription(visibleText: string, title: string) {
  let text = decodeEntities(visibleText)
    .replace(/^Aller au contenu\s+(English|Français)?\s*/i, "")
    .trim();
  if (text.startsWith(title)) text = text.slice(title.length).trim();

  const footerMarkers = ["Centre de plongée sous-marine", "Scuba diving centre", "Scuba diving center"];
  for (const marker of footerMarkers) {
    const index = text.indexOf(marker);
    if (index > 0) text = text.slice(0, index).trim();
  }
  return text.replace(/\s+(RESERVER|Réserver)\s*$/i, "").trim();
}

const frenchMonths: Record<string, number> = {
  janvier: 0, fevrier: 1, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, aout: 7, août: 7, septembre: 8, octobre: 9, novembre: 10, decembre: 11, décembre: 11,
};

function legacyDate(source: string, lastmod: string) {
  const fallback = new Date(lastmod);
  const fallbackYear = fallback.getUTCFullYear();
  const numericDates = [...source.matchAll(/(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?/g)].map((match) => ({
    index: match.index,
    day: Number(match[1]),
    month: Number(match[2]) - 1,
    year: match[3],
  }));
  const namedDates = [...source.matchAll(/(\d{1,2})\s+(janvier|f[eé]vrier|mars|avril|mai|juin|juillet|ao[uû]t|septembre|octobre|novembre|d[eé]cembre)\s+(\d{4})/gi)].map((match) => ({
    index: match.index,
    day: Number(match[1]),
    month: frenchMonths[match[2].toLowerCase()],
    year: match[3],
  }));
  const dates = [...numericDates, ...namedDates].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  if (!dates.length) return { startsAt: fallback.toISOString(), endsAt: null };

  const toYear = (value?: string) => {
    if (!value) return fallbackYear;
    const year = Number(value);
    return year < 100 ? 2000 + year : year;
  };
  const first = dates[0];
  const last = dates.at(-1) ?? first;
  const endYear = toYear(last.year ?? first.year);
  const startYear = toYear(first.year ?? last.year);
  const startsAt = new Date(Date.UTC(startYear, first.month, first.day, 3, 30)).toISOString();
  const endsAt = dates.length > 1
    ? new Date(Date.UTC(endYear, last.month, last.day, 13, 0)).toISOString()
    : null;
  return { startsAt, endsAt };
}

const articlePaths = new Set([
  "/plongee-autonome-reunion/",
  "/plongee-initiation-reunion/",
  "/sorties-cetaces-observation-dauphins-baleines-reunion/",
  "/plongee-epaves-reunion/",
  "/sorties-cetaces-reunion/",
]);

const eventsIndex = auditPages.find((page) => new URL(page.url).pathname === "/evenements/");
const eventPaths = new Set(
  (eventsIndex?.links ?? [])
    .flatMap((link) => {
      try { return [new URL(link.url).pathname]; } catch { return []; }
    })
    .filter((path) => !articlePaths.has(path)),
);

const palettes = [
  ["#052b43", "#0b6078"],
  ["#09275e", "#105b82"],
  ["#073e4b", "#13706d"],
];

export const fallbackEvents: PublicEvent[] = auditPages
  .filter((page) => page.kind === "posts" && eventPaths.has(new URL(page.url).pathname))
  .map((page, index) => {
    const path = new URL(page.url).pathname;
    const slug = path.split("/").filter(Boolean).at(-1) ?? `archive-${index}`;
    const title = decodeEntities(page.headings?.h1?.[0] ?? page.title);
    const description = cleanLegacyDescription(page.visibleText ?? "", title);
    const excerpt = description.length > 190 ? `${description.slice(0, 187).trim()}…` : description;
    const { startsAt, endsAt } = legacyDate(`${title} ${description}`, page.lastmod ?? new Date(0).toISOString());
    const [cardStart, cardEnd] = palettes[index % palettes.length];

    return {
      id: `legacy-${slug}`,
      slug_fr: slug,
      slug_en: null,
      title_fr: title,
      title_en: title,
      excerpt_fr: excerpt,
      excerpt_en: excerpt,
      description_fr: description,
      description_en: description,
      location_fr: "Saint-Gilles-les-Bains",
      location_en: "Saint-Gilles-les-Bains",
      starts_at: startsAt,
      ends_at: endsAt,
      image_paths: [],
      cover_image_url: page.sitemapImages?.[0] ?? null,
      booking_link_key: "agenda",
      title_color: "#ffb000",
      text_color: "#ffffff",
      card_color_start: cardStart,
      card_color_end: cardEnd,
    };
  })
  .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
