import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { PublicCatalogPrice, PublicPriceSection } from "@/lib/pricing-data";
import type { BookingKey, Locale } from "@/lib/site-data";

function amount(price: PublicCatalogPrice, locale: Locale) {
  const fr = locale === "fr";
  const value = new Intl.NumberFormat(fr ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price.amount_cents / 100);

  return `${fr ? price.prefix_fr ?? "" : price.prefix_en ?? ""}${value}${fr ? price.suffix_fr ?? "" : price.suffix_en ?? ""}`;
}

function SectionButton({
  section,
  bookingLinks,
  locale,
}: {
  section: PublicPriceSection;
  bookingLinks: Record<BookingKey, string>;
  locale: Locale;
}) {
  const key = section.booking_link_key as BookingKey | null;
  if (!key) return null;
  return <BookingCta href={bookingLinks[key] ?? bookingLinks.main_booking}>{locale === "fr" ? "Réserver" : "Book"}</BookingCta>;
}

function ListSection({ prices, locale }: { prices: PublicCatalogPrice[]; locale: Locale }) {
  const fr = locale === "fr";
  const groups = new Map<string, PublicCatalogPrice[]>();
  for (const price of prices) {
    const name = fr ? price.subcategory_fr : price.subcategory_en;
    groups.set(name, [...(groups.get(name) ?? []), price]);
  }

  return (
    <div className="rate-groups">
      {[...groups.entries()].map(([group, rows]) => (
        <div className="rate-group" key={group || "main"}>
          {group ? <h3>{group}</h3> : null}
          {(fr ? rows[0]?.group_intro_fr : rows[0]?.group_intro_en) ? (
            <p className="rate-group-intro">{fr ? rows[0].group_intro_fr : rows[0].group_intro_en}</p>
          ) : null}
          <div className="rate-rows">
            {rows.map((price) => (
              <div className="rate-row" key={price.id}>
                <div>
                  <strong>{fr ? price.label_fr : price.label_en}</strong>
                  {(fr ? price.description_fr : price.description_en) ? (
                    <small>{fr ? price.description_fr : price.description_en}</small>
                  ) : null}
                </div>
                <b>{amount(price, locale)}</b>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComparisonSection({
  section,
  prices,
  locale,
}: {
  section: PublicPriceSection;
  prices: PublicCatalogPrice[];
  locale: Locale;
}) {
  const fr = locale === "fr";
  const rows = new Map<string, { label: string; guided?: PublicCatalogPrice; autonomous?: PublicCatalogPrice }>();

  for (const price of prices) {
    const key = price.comparison_key ?? price.content_key;
    const row = rows.get(key) ?? { label: fr ? price.label_fr : price.label_en };
    if (price.price_column === "guided") row.guided = price;
    if (price.price_column === "autonomous") row.autonomous = price;
    rows.set(key, row);
  }

  return (
    <div className="rate-comparison" role="table" aria-label={fr ? section.title_fr : section.title_en}>
      <div className="rate-comparison-head" role="row">
        <span role="columnheader">{fr ? "Forfait" : "Package"}</span>
        <strong role="columnheader">{fr ? section.guided_label_fr : section.guided_label_en}</strong>
        <strong role="columnheader">{fr ? section.autonomous_label_fr : section.autonomous_label_en}</strong>
      </div>
      {[...rows.entries()].map(([key, row]) => (
        <div className="rate-comparison-row" role="row" key={key}>
          <strong role="rowheader">{row.label}</strong>
          <span role="cell">{row.guided ? amount(row.guided, locale) : "—"}</span>
          <span role="cell">{row.autonomous ? amount(row.autonomous, locale) : "—"}</span>
        </div>
      ))}
    </div>
  );
}

export function RatesPage({
  locale,
  sections,
  prices,
  bookingLinks,
}: {
  locale: Locale;
  sections: PublicPriceSection[];
  prices: PublicCatalogPrice[];
  bookingLinks: Record<BookingKey, string>;
}) {
  const fr = locale === "fr";

  return (
    <>
      <Header locale={locale} bookingUrl={bookingLinks.agenda} giftUrl={bookingLinks.gift_dive} accountUrl={bookingLinks.customer_account} />
      <main className="rates-main">
        <section className="rates-hero">
          <Image src="/images/hero/corail-reef.jpg" alt={fr ? "Récif corallien à La Réunion" : "Coral reef in Reunion Island"} fill priority sizes="100vw" />
          <div className="rates-hero-shade" />
          <div className="shell rates-hero-copy">
            <p className="eyebrow light">Corail Plongée · Saint-Gilles-les-Bains</p>
            <h1>{fr ? "Nos tarifs" : "Our rates"}</h1>
            <p>{fr ? "Tous nos prix, organisés simplement pour choisir votre prochaine immersion." : "All our prices, clearly organised to help you choose your next dive."}</p>
          </div>
        </section>

        <nav className="rates-index" aria-label={fr ? "Rubriques tarifaires" : "Rate categories"}>
          <div className="shell">
            {sections.map((section) => <a key={section.code} href={`#${section.code}`}>{fr ? section.title_fr : section.title_en}</a>)}
          </div>
        </nav>

        <section className="rates-content section-shell">
          <div className="shell rates-stack">
            {sections.map((section, sectionIndex) => {
              const sectionPrices = prices.filter((price) => price.section_code === section.code);
              if (!sectionPrices.length) return null;
              return (
                <article className="rate-card" id={section.code} key={section.code}>
                  <header className="rate-card-heading">
                    <div>
                      <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                      <h2>{fr ? section.title_fr : section.title_en}</h2>
                      {(fr ? section.intro_fr : section.intro_en) ? <p>{fr ? section.intro_fr : section.intro_en}</p> : null}
                    </div>
                    <SectionButton section={section} bookingLinks={bookingLinks} locale={locale} />
                  </header>

                  {section.layout === "comparison" ? (
                    <ComparisonSection section={section} prices={sectionPrices} locale={locale} />
                  ) : (
                    <ListSection prices={sectionPrices} locale={locale} />
                  )}

                  {(fr ? section.note_fr : section.note_en) ? (
                    <p className="rate-note"><Info /> {fr ? section.note_fr : section.note_en}</p>
                  ) : null}
                </article>
              );
            })}

            <div className="rates-final-cta">
              <Check />
              <div>
                <p className="eyebrow coral">{fr ? "Prêt à plonger ?" : "Ready to dive?"}</p>
                <h2>{fr ? "Choisissez votre créneau." : "Choose your time."}</h2>
              </div>
              <a className="button button-coral" href={bookingLinks.main_booking} target="_blank" rel="noreferrer">
                {fr ? "Réserver en ligne" : "Book online"} <ArrowRight />
              </a>
            </div>

            <Link className="rates-back" href={fr ? "/" : "/en/home/"}>{fr ? "Retour à l’accueil" : "Back home"}</Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
