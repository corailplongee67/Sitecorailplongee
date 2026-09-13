import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Gift, ShieldCheck } from "lucide-react";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { decodeEntities } from "./LegacyPage";
import type { BookingKey } from "@/lib/site-data";

type AuditProduct = {
  url: string;
  title: string;
  metaDescription?: string | null;
  sitemapImages?: string[];
  headings?: { h1?: string[]; h2?: string[] };
  images?: Array<{ src: string; alt?: string | null }>;
  visibleText?: string;
};

type ProductSection = {
  id: string;
  title: string;
  paragraphs: string[];
  isList: boolean;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function paragraphize(value: string) {
  const sentences = value
    .trim()
    .split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ0-9*])/)
    .filter(Boolean);
  const paragraphs: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current && `${current} ${sentence}`.length > 440) {
      paragraphs.push(current);
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) paragraphs.push(current);
  return paragraphs;
}

function productContent(page: AuditProduct) {
  const title = decodeEntities(page.headings?.h1?.[0] ?? page.title.split("– Corail")[0]);
  let source = decodeEntities(page.visibleText)
    .replace(/^(?:Skip to content|Aller au contenu)\s+(?:Français|English)\s+(?:Menu\s+Menu\s+)?/i, "")
    .trim();
  const titleIndex = source.indexOf(title);
  const preTitle = titleIndex >= 0 ? source.slice(0, titleIndex) : source;
  const priceMatch = preTitle.match(/([0-9][0-9\s.,]*)\s*€/);
  const historicalPrice = priceMatch?.[1]?.trim() ?? null;

  if (titleIndex >= 0) source = source.slice(titleIndex + title.length).trim();
  for (const marker of ["Scuba diving centre on Reunion Island", "Centre de plongée sous-marine sur l’île de la Réunion", "ADDRESS Port de plaisance"] as const) {
    const index = source.indexOf(marker);
    if (index >= 0) source = source.slice(0, index).trim();
  }
  source = source
    .replace(new RegExp(`${escapeRegExp(title)}\\s+quantity`, "gi"), "")
    .replace(/(?:^|(?<=[.!?]))\s+[^.!?]*\s+quantity\b/gi, " ")
    .replace(/(?:Add to cart|Ajouter au panier|Available|Disponibilité)/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const headings = (page.headings?.h2 ?? [])
    .map((heading) => decodeEntities(heading))
    .flatMap((heading) => {
      const position = source.indexOf(heading);
      return position >= 0 ? [{ heading, position }] : [];
    })
    .sort((a, b) => a.position - b.position);
  const introEnd = headings[0]?.position ?? source.length;
  const intro = paragraphize(source.slice(0, introEnd));
  const sections = headings.map((entry, index): ProductSection => {
    const bodyStart = entry.position + entry.heading.length;
    const bodyEnd = headings[index + 1]?.position ?? source.length;
    return {
      id: `product-section-${index + 1}`,
      title: entry.heading,
      paragraphs: paragraphize(source.slice(bodyStart, bodyEnd)),
      isList: /included|pre-?requisite|compris|pr[eé]requis/i.test(entry.heading),
    };
  });

  return { title, historicalPrice, intro, sections };
}

export function ProductDetailPage({
  page,
  bookingLinks,
}: {
  page: AuditProduct;
  bookingLinks: Record<BookingKey, string>;
}) {
  const content = productContent(page);
  const imageUrl = page.sitemapImages?.[0] ?? "/images/hero/diving-reunion.jpg";
  const imageAlt = decodeEntities(
    page.images?.find((image) => image.src === imageUrl)?.alt || content.title,
  );

  return (
    <>
      <Header
        locale="en"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="product-origin-main">
        <section className="product-origin-hero">
          <div className="shell product-origin-breadcrumb">
            <Link href="/en/shop/"><ArrowLeft aria-hidden="true" /> Secure shop</Link>
          </div>
          <div className="shell product-origin-grid">
            <figure className="product-origin-image">
              <Image src={imageUrl} alt={imageAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" />
            </figure>
            <div className="product-origin-summary">
              <p className="eyebrow light">Corail Plongée experience</p>
              <h1>{content.title}</h1>
              {content.historicalPrice ? (
                <div className="product-origin-price">
                  <span>Price displayed on the original page</span>
                  <strong>€{content.historicalPrice}</strong>
                </div>
              ) : null}
              <p>Current price, dates and availability are confirmed in Corail Plongée’s secure booking shop.</p>
              <div className="product-origin-actions">
                <BookingCta href={bookingLinks.gift_dive}>Buy or offer this dive</BookingCta>
                <a href={bookingLinks.agenda} target="_blank" rel="noreferrer">Check availability <ExternalLink aria-hidden="true" /></a>
              </div>
              <div className="product-origin-trust">
                <span><ShieldCheck aria-hidden="true" /> Secure Zuurit checkout</span>
                <span><Gift aria-hidden="true" /> Gift option available</span>
              </div>
            </div>
          </div>
        </section>

        <section className="product-origin-content" id="content">
          <div className="shell product-origin-document">
            {content.intro.length ? (
              <div className="product-origin-intro">
                <p className="eyebrow">About this experience</p>
                {content.intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : null}

            {content.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.isList ? (
                  <ul>
                    {section.paragraphs.map((paragraph, index) => (
                      <li key={index}><CheckCircle2 aria-hidden="true" /><span>{paragraph}</span></li>
                    ))}
                  </ul>
                ) : section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </section>
            ))}

            <div className="product-origin-final">
              <div>
                <p className="eyebrow light">Ready for bubbles?</p>
                <h2>Complete your order in the secure shop.</h2>
              </div>
              <BookingCta href={bookingLinks.gift_dive}>Open the shop</BookingCta>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
