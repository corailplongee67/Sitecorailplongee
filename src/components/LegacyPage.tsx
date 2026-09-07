import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { BookingCta } from "./BookingCta";
import type { BookingKey, Locale } from "@/lib/site-data";

type AuditPage = {
  url: string;
  title: string;
  metaDescription?: string | null;
  lastmod?: string;
  kind: string;
  sitemapImages?: string[];
  headings?: { h1?: string[]; h2?: string[] };
  visibleText?: string;
};

const entityMap: Record<string, string> = {
  amp: "&", nbsp: " ", quot: '"', apos: "'", eacute: "é", egrave: "è",
  ecirc: "ê", agrave: "à", acirc: "â", ugrave: "ù", ucirc: "û", ocirc: "ô",
  icirc: "î", ccedil: "ç", Eacute: "É", Egrave: "È", rsquo: "’", lsquo: "‘",
  ldquo: "“", rdquo: "”", hellip: "…", ndash: "–", mdash: "—", oelig: "œ",
};

export function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => entityMap[name] ?? match)
    .replace(/\s+/g, " ")
    .trim();
}

function contentParagraphs(page: AuditPage) {
  let text = decodeEntities(page.visibleText);
  text = text.replace(/^Aller au contenu\s+(English|Français)?\s*/i, "");
  for (const marker of [
    "Centre de plongée sous-marine sur l’île de la Réunion",
    "Scuba diving center on Reunion Island",
    "ADRESSE Port de plaisance",
  ]) {
    const index = text.indexOf(marker);
    if (index > 300) text = text.slice(0, index);
  }

  const title = decodeEntities(page.headings?.h1?.[0] ?? page.title);
  if (text.startsWith(title)) text = text.slice(title.length).trim();

  const sentences = text.split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ0-9])/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + sentence).length > 520 && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += `${current ? " " : ""}${sentence}`;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter((chunk) => chunk.length > 8);
}

function localHero(path: string) {
  if (/cetace|baleine|dauphin/.test(path)) return "/images/services/cetaceans.webp";
  if (/formation|course|ssi|niveau|passerelle/.test(path)) return "/images/services/ssi.jpg";
  if (/decouv|baptem|initiation|discover/.test(path)) return "/images/services/discovery.webp";
  if (/qui-sommes|about|contact/.test(path)) return "/images/about/team-center.jpg";
  return "/images/hero/diving-reunion.jpg";
}

export function LegacyPage({
  page,
  locale,
  bookingLinks,
}: {
  page: AuditPage;
  locale: Locale;
  bookingLinks: Record<BookingKey, string>;
}) {
  const fr = locale === "fr";
  const path = new URL(page.url).pathname;
  const h1 = decodeEntities(page.headings?.h1?.[0] ?? page.title.split("–")[0]);
  const paragraphs = contentParagraphs(page);
  const eyebrow = page.kind === "posts" ? (fr ? "Journal de plongée" : "Dive journal") : "Corail Plongée";

  return (
    <>
      <Header locale={locale} bookingUrl={bookingLinks.main_booking} accountUrl={bookingLinks.customer_account} />
      <main className="legacy-main">
        <section className="legacy-hero">
          <Image src={localHero(path)} alt="" fill priority sizes="100vw" />
          <div className="legacy-hero-shade" />
          <div className="shell legacy-hero-copy">
            <p className="eyebrow light">{eyebrow}</p>
            <h1>{h1}</h1>
            {page.metaDescription ? <p>{decodeEntities(page.metaDescription)}</p> : null}
          </div>
        </section>

        <section className="legacy-content section-shell">
          <div className="shell legacy-layout">
            <article>
              {page.lastmod && page.kind === "posts" ? (
                <time dateTime={page.lastmod}>
                  {new Intl.DateTimeFormat(fr ? "fr-FR" : "en-GB", { dateStyle: "long" }).format(new Date(page.lastmod))}
                </time>
              ) : null}
              {paragraphs.length ? paragraphs.map((paragraph, index) => (
                index === 1 && page.headings?.h2?.[0] ? (
                  <div key={index}>
                    <h2>{decodeEntities(page.headings.h2[0])}</h2>
                    <p>{paragraph}</p>
                  </div>
                ) : <p key={index}>{paragraph}</p>
              )) : (
                <p>{fr ? "Cette page est en cours de reprise depuis le site historique." : "This page is being migrated from the previous website."}</p>
              )}
            </article>
            <aside>
              <p className="eyebrow">{fr ? "Envie de bulles ?" : "Ready for bubbles?"}</p>
              <h2>{fr ? "On s’occupe du reste." : "We’ll handle the rest."}</h2>
              <p>{fr ? "Choisissez votre créneau dans l’agenda sécurisé Zuurit ou contactez directement le centre." : "Choose a time in the secure Zuurit calendar or contact the centre directly."}</p>
              <BookingCta href={bookingLinks.main_booking}>{fr ? "Réserver" : "Book"}</BookingCta>
              <a className="text-link" href={bookingLinks.agenda} target="_blank" rel="noreferrer">{fr ? "Voir l’agenda" : "View calendar"} <ArrowRight /></a>
            </aside>
          </div>
          <div className="shell legacy-back">
            <Link href={fr ? "/" : "/en/home/"}><ArrowLeft /> {fr ? "Retour à l’accueil" : "Back home"}</Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
