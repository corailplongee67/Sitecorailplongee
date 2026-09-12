import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { decodeEntities } from "./LegacyPage";
import type { BookingKey } from "@/lib/site-data";

type AuditPage = {
  url: string;
  title: string;
  metaDescription?: string | null;
  headings?: { h1?: string[]; h2?: string[]; h3?: string[] };
  visibleText?: string;
};

type LegalSection = {
  id: string;
  title: string;
  level: 2 | 3;
  paragraphs: string[];
};

const legalHeadingOrder: Record<string, string[]> = {
  "/confidentialite/": [
    "Qui sommes-nous ?",
    "Commentaires",
    "Médias",
    "Cookies",
    "Contenu intégré d'autres sites Web",
    "Avec qui nous partageons vos données",
    "Combien de temps conservons-nous vos données ?",
    "Quels sont vos droits sur vos données ?",
    "Où nous envoyons vos données ?",
  ],
  "/conditions-generales-de-vente/": [
    "Acceptation des CGV :",
    "1.Les réservations d’une sortie Corail plongée :",
    "2. Météo marine :",
    "3.Annulation / modification d’une sortie par un client :.",
    "4. Annulation d’une sortie par CORAIL PLONGÉE :",
    "5.Sites partenaires :",
    "6. Litige et médiation de la consommation :",
  ],
  "/mention-legal/": [
    "Définitions",
    "1. Présentation du site internet.",
    "2. Conditions générales d’utilisation du site et des services proposés.",
    "3. Description des services fournis.",
    "4. Limitations contractuelles sur les données techniques.",
    "5. Propriété intellectuelle et contrefaçons.",
    "6. Limitations de responsabilité.",
    "7. Gestion des données personnelles.",
    "7.1 Responsables de la collecte des données personnelles",
    "7.2 Finalité des données collectées",
    "7.3 Droit d’accès, de rectification et d’opposition",
    "7.4 Non-communication des données personnelles",
    "7.5 Types de données collectées",
    "8. Notification d’incident",
    "Sécurité",
    "9. Liens hypertextes « cookies » et balises (“tags”) internet",
    "9.1. « COOKIES »",
    "Article 9.2. BALISES (“TAGS”) INTERNET",
    "10. Droit applicable et attribution de juridiction.",
  ],
};

function sectionId(title: string, index: number) {
  const normalized = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54);
  return normalized || `section-${index + 1}`;
}

function paragraphize(value: string) {
  const sentences = value
    .trim()
    .split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ0-9])/)
    .filter(Boolean);
  const paragraphs: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current && `${current} ${sentence}`.length > 560) {
      paragraphs.push(current);
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) paragraphs.push(current);
  return paragraphs;
}

function extractSections(page: AuditPage, path: string): LegalSection[] {
  let text = decodeEntities(page.visibleText);
  text = text.replace(/^Aller au contenu\s+(English|Français)?\s*/i, "");
  const footerStart = text.indexOf("Centre de plongée sous-marine sur l’île de la Réunion");
  if (footerStart > 0) text = text.slice(0, footerStart).trim();

  const h3 = new Set((page.headings?.h3 ?? []).map((heading) => decodeEntities(heading)));
  const headings = legalHeadingOrder[path] ?? (page.headings?.h2 ?? []).map((heading) => decodeEntities(heading));
  const firstHeading = headings[0];
  const contentStart = firstHeading ? text.indexOf(firstHeading) : -1;
  if (contentStart >= 0) text = text.slice(contentStart);

  return headings.flatMap((title, index) => {
    const start = text.indexOf(title);
    if (start < 0) return [];
    const bodyStart = start + title.length;
    const nextTitle = headings[index + 1];
    const nextStart = nextTitle ? text.indexOf(nextTitle, bodyStart) : text.length;
    const body = text.slice(bodyStart, nextStart < 0 ? text.length : nextStart).trim();

    return [{
      id: sectionId(title, index),
      title,
      level: h3.has(title) ? 3 : 2,
      paragraphs: paragraphize(body),
    } satisfies LegalSection];
  });
}

export function LegalPage({
  page,
  bookingLinks,
}: {
  page: AuditPage;
  bookingLinks: Record<BookingKey, string>;
}) {
  const path = new URL(page.url).pathname;
  const sourceTitles = page.headings?.h1 ?? [];
  const title = decodeEntities(
    path === "/conditions-generales-de-vente/"
      ? sourceTitles.at(-1) ?? page.title.split("–")[0]
      : sourceTitles[0] ?? page.title.split("–")[0],
  );
  const sections = extractSections(page, path);

  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="legal-origin-main">
        <section className={`legal-origin-hero${path === "/conditions-generales-de-vente/" ? " is-terms" : ""}`}>
          <Image src="/images/hero/corail-reef.jpg" alt="Récif corallien de La Réunion" fill priority sizes="100vw" />
          <div className="legal-origin-hero-shade" />
          <div className="shell legal-origin-hero-copy">
            <p className="eyebrow light">Corail Plongée</p>
            <h1>{title}</h1>
          </div>
        </section>

        <section className="legal-origin-content">
          <div className="shell legal-origin-layout">
            <aside className="legal-origin-summary" aria-label="Sommaire de la page">
              <div>
                <FileText aria-hidden="true" />
                <p className="eyebrow">Dans cette page</p>
                <h2>Sommaire</h2>
              </div>
              <nav>
                {sections.filter((section) => section.level === 2).map((section, index) => (
                  <a href={`#${section.id}`} key={section.id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title.replace(/^\d+[.]?\s*/, "")}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="legal-origin-document">
              <header>
                <p className="eyebrow">Document d’information</p>
                <p>{decodeEntities(page.metaDescription ?? "Informations légales de Corail Plongée.")}</p>
              </header>
              {sections.map((section, index) => (
                <section
                  className={section.level === 3 ? "legal-origin-subsection" : undefined}
                  id={section.id}
                  key={section.id}
                >
                  <div className="legal-origin-section-heading">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.level === 3 ? <h3>{section.title}</h3> : <h2>{section.title}</h2>}
                  </div>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </section>
              ))}
              <Link className="legal-origin-back" href="/">
                <ArrowLeft aria-hidden="true" /> Retour à l’accueil
              </Link>
            </article>
          </div>
        </section>
      </main>
      <Footer locale="fr" />
    </>
  );
}
