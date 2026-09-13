import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Mail, Share2 } from "lucide-react";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { decodeEntities } from "./LegacyPage";
import type { BookingKey } from "@/lib/site-data";

type AuditPage = {
  url: string;
  title: string;
  lastmod?: string;
  headings?: { h1?: string[]; h2?: string[]; h3?: string[] };
  visibleText?: string;
};

type ArticleVisual = {
  hero: string;
  detail?: string;
};

type ArticleSection = {
  id: string;
  title: string;
  level: 2 | 3;
  paragraphs: string[];
};

const articleVisuals = {
  "/engagement-protection-biodiversite-marine-reunion/": { hero: "/images/blog/original/biodiversite.webp", detail: "/images/blog/original/biodiversite-detail.jpg" },
  "/guide-formation-niveaux-plongee-reunion/": { hero: "/images/blog/original/formation.webp", detail: "/images/blog/original/formation-detail.webp" },
  "/experience-sensorielle-plongee-nuit-reunion/": { hero: "/images/blog/original/nuit.webp", detail: "/images/blog/original/nuit-detail.jpg" },
  "/plonger-epaves-mythiques-reunion-securite/": { hero: "/images/blog/original/epaves.jpg", detail: "/images/blog/original/epaves-detail.jpg" },
  "/plongee-reunion-secrets-fonds-marins-saint-gilles/": { hero: "/images/blog/original/saint-gilles.webp", detail: "/images/blog/original/saint-gilles-detail.jpg" },
  "/organiser-voyage-plongee-reunion-checklist/": { hero: "/images/blog/original/sejour.webp" },
  "/la-plongee-comme-therapie-cultiver-son-bien-etre-sous-la-surface/": { hero: "/images/blog/original/therapie.webp" },
  "/preservation-recifs-coralliens-plongee-reunion/": { hero: "/images/blog/original/ocean-indien.jpg" },
  "/seminaire-entreprise-plongee-reunion/": { hero: "/images/blog/original/team-building.webp" },
  "/plongee-sous-marine-reunion-biodiversite/": { hero: "/images/blog/original/biodiversite-reunion.jpg" },
} satisfies Record<string, ArticleVisual>;

const articlePaths = Object.keys(articleVisuals);

export function isBlogArticlePath(path: string) {
  return path in articleVisuals;
}

function slugify(value: string, index: number) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64) || `chapitre-${index + 1}`;
}

function paragraphize(value: string) {
  const sentences = value
    .trim()
    .split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ0-9])/)
    .filter(Boolean);
  const paragraphs: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current && `${current} ${sentence}`.length > 650) {
      paragraphs.push(current);
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) paragraphs.push(current);
  return paragraphs;
}

function articleContent(page: AuditPage) {
  const title = decodeEntities(page.headings?.h1?.[0] ?? page.title);
  let source = decodeEntities(page.visibleText).replace(/^Aller au contenu\s+(English|Français)?\s*/i, "");
  const firstTitle = source.indexOf(title);
  const breadcrumb = source.indexOf("Accueil »", firstTitle + title.length);
  const date = firstTitle >= 0 && breadcrumb > firstTitle
    ? source.slice(firstTitle + title.length, breadcrumb).trim()
    : "";
  const repeatedTitle = source.indexOf(title, breadcrumb + "Accueil »".length);
  if (repeatedTitle >= 0) source = source.slice(repeatedTitle + title.length).trim();
  const shareStart = source.indexOf("Partager :");
  if (shareStart > 0) source = source.slice(0, shareStart).trim();

  const h3 = new Set((page.headings?.h3 ?? []).map((heading) => decodeEntities(heading)));
  const headingCandidates = [...(page.headings?.h2 ?? []), ...(page.headings?.h3 ?? [])]
    .map((heading) => decodeEntities(heading))
    .filter((heading) => !heading.toLowerCase().startsWith("plongée à thème"))
    .flatMap((heading) => {
      const position = source.indexOf(heading);
      return position >= 0 ? [{ title: heading, position }] : [];
    })
    .sort((a, b) => a.position - b.position);

  const introEnd = headingCandidates[0]?.position ?? source.length;
  const intro = paragraphize(source.slice(0, introEnd));
  const sections = headingCandidates.map((heading, index): ArticleSection => {
    const bodyStart = heading.position + heading.title.length;
    const bodyEnd = headingCandidates[index + 1]?.position ?? source.length;
    return {
      id: slugify(heading.title, index),
      title: heading.title,
      level: h3.has(heading.title) ? 3 : 2,
      paragraphs: paragraphize(source.slice(bodyStart, bodyEnd)),
    };
  });

  return {
    title,
    date: date ? date.charAt(0).toUpperCase() + date.slice(1) : "",
    intro,
    sections,
    readingMinutes: Math.max(4, Math.ceil(source.split(/\s+/).length / 220)),
  };
}

export function BlogArticlePage({
  page,
  bookingLinks,
}: {
  page: AuditPage;
  bookingLinks: Record<BookingKey, string>;
}) {
  const path = new URL(page.url).pathname;
  const visual: ArticleVisual = articleVisuals[path as keyof typeof articleVisuals];
  const content = articleContent(page);
  const currentIndex = articlePaths.indexOf(path);
  const previousPath = currentIndex > 0 ? articlePaths[currentIndex - 1] : articlePaths.at(-1)!;
  const nextPath = currentIndex < articlePaths.length - 1 ? articlePaths[currentIndex + 1] : articlePaths[0];
  const encodedUrl = encodeURIComponent(page.url);
  const encodedTitle = encodeURIComponent(content.title);

  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="article-origin-main">
        <section className="article-origin-hero">
          <Image src={visual.hero} alt="" fill priority sizes="100vw" />
          <div className="article-origin-hero-shade" />
          <div className="shell article-origin-hero-copy">
            <Link href="/blog/">Le journal de Corail Plongée</Link>
            <h1>{content.title}</h1>
            <div className="article-origin-meta">
              {content.date ? <time dateTime={page.lastmod}><CalendarDays aria-hidden="true" /> {content.date}</time> : null}
              <span><Clock3 aria-hidden="true" /> {content.readingMinutes} min de lecture</span>
            </div>
          </div>
        </section>

        <section className="article-origin-content" id="content">
          <div className="shell article-origin-layout">
            <article className="article-origin-document">
              <div className="article-origin-lead">
                {content.intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>

              {content.sections.map((section, index) => (
                <div key={section.id}>
                  <section className={section.level === 3 ? "article-origin-faq" : undefined} id={section.id}>
                    <p className="article-origin-chapter">{section.level === 3 ? "Question" : `Chapitre ${String(index + 1).padStart(2, "0")}`}</p>
                    {section.level === 3 ? <h3>{section.title}</h3> : <h2>{section.title}</h2>}
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </section>
                  {visual.detail && index === 1 ? (
                    <figure className="article-origin-detail">
                      <Image
                        src={visual.detail}
                        alt={`Illustration de l’article « ${content.title} »`}
                        fill
                        sizes="(max-width: 900px) 100vw, 760px"
                      />
                    </figure>
                  ) : null}
                </div>
              ))}

              <footer className="article-origin-share">
                <div><Share2 aria-hidden="true" /><span>Partager cet article</span></div>
                <div>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer">Facebook</a>
                  <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}><Mail aria-hidden="true" /> E-mail</a>
                </div>
              </footer>
            </article>

            <aside className="article-origin-aside">
              <p className="eyebrow">Envie de passer à l’eau ?</p>
              <h2>Vivez votre propre histoire.</h2>
              <p>Notre équipe vous accueille à Saint-Gilles-les-Bains pour une plongée adaptée à votre niveau.</p>
              <BookingCta href={bookingLinks.main_booking}>Réserver une plongée</BookingCta>
              <Link href="/blog/">Tous les articles <ArrowRight aria-hidden="true" /></Link>
            </aside>
          </div>

          <nav className="shell article-origin-navigation" aria-label="Articles précédent et suivant">
            <Link href={previousPath}><ArrowLeft aria-hidden="true" /><span>Article précédent</span></Link>
            <Link href={nextPath}><span>Article suivant</span><ArrowRight aria-hidden="true" /></Link>
          </nav>
        </section>
      </main>
      <Footer locale="fr" />
    </>
  );
}
