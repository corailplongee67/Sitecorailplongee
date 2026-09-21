import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { PublicCatalogPrice } from "@/lib/pricing-data";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const groups = [
  {
    eyebrow: "Reconnaissance des certifications",
    title: "Passerelle diplôme SSI international vers diplôme français",
    eyebrowEn: "Certification recognition",
    titleEn: "Bridge from an international SSI diploma to a French diploma",
    bookingKey: "french_training_booking" as const,
    items: [
      {
        contentKey: "bridge-ssi-level-2",
        fallbackLabel: "Passerelle Advanced SSI vers niveau 2 · 2 plongées + certifications",
        fallbackLabelEn: "Advanced SSI gateway to Level 2 · 2 dives + certifications",
        fallbackAmount: 15000,
        image: "/images/crossover/original/ssi-level-2.jpg",
      },
      {
        contentKey: "bridge-ssi-pa40",
        fallbackLabel: "Passerelle Advanced SSI vers niveau PA40 · 4 plongées + certifications",
        fallbackLabelEn: "Advanced SSI gateway to PA40 · 4 dives + certifications",
        fallbackAmount: 35000,
        image: "/images/crossover/original/ssi-pa40.jpg",
      },
      {
        contentKey: "bridge-master-level-3",
        fallbackLabel: "Passerelle Advanced SSI vers niveau 3 · 8 plongées + certifications",
        fallbackLabelEn: "Advanced SSI gateway to Level 3 · 8 dives + certifications",
        fallbackAmount: 66000,
        image: "/images/crossover/original/ssi-level-3.jpg",
      },
    ],
  },
  {
    eyebrow: "Équivalence internationale",
    title: "Passerelle diplôme français vers diplôme SSI international",
    eyebrowEn: "International equivalence",
    titleEn: "Bridge from a French diploma to an international SSI diploma",
    bookingKey: "ssi_booking" as const,
    items: [
      {
        contentKey: "bridge-french-open-water",
        fallbackLabel: "Passerelle niveau 1 vers Open Water Diver SSI",
        fallbackLabelEn: "Level 1 gateway to SSI Open Water Diver",
        fallbackAmount: 28500,
        image: "/images/crossover/original/french-open-water.jpg",
      },
      {
        contentKey: "bridge-french-advanced",
        fallbackLabel: "Passerelle niveau 2 vers Advanced Open Water Diver",
        fallbackLabelEn: "Level 2 gateway to Advanced Open Water Diver",
        fallbackAmount: 22000,
        image: "/images/crossover/original/french-advanced.jpg",
      },
      {
        contentKey: "bridge-french-master",
        fallbackLabel: "Passerelle niveau 3 vers Master Diver",
        fallbackLabelEn: "Level 3 gateway to Master Diver",
        fallbackAmount: 29000,
        image: "/images/crossover/original/french-master.jpg",
      },
    ],
  },
] as const;

function formatAmount(amountCents: number, suffix: string | null | undefined, locale: "fr" | "en") {
  const amount = new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amountCents / 100);

  return `${amount}${suffix ?? ""}`;
}

export function CrossoverPage({
  bookingLinks,
  prices,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  prices: PublicCatalogPrice[];
  locale?: "fr" | "en";
}) {
  const en = locale === "en";
  const bridgePrices = new Map(
    prices
      .filter((price) => price.section_code === "bridges")
      .map((price) => [price.content_key, price]),
  );

  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="crossover-origin-main">
        <section className="crossover-origin-hero">
          <Image
            src="/images/crossover/original/hero.jpg"
            alt={en ? "Divers above the reef in a school of fish" : "Plongeurs au-dessus du récif dans un banc de poissons"}
            fill
            priority
            sizes="100vw"
          />
          <div className="crossover-origin-hero-shade" />
          <div className="shell crossover-origin-hero-copy">
            <p className="eyebrow light">{en ? "Change certification" : "Changer de certification"}</p>
            <h1>{en ? "Continual courses" : "Passerelle"}</h1>
          </div>
        </section>

        <section className="crossover-origin-content">
          <div className="shell">
            <div className="crossover-origin-panel">
              {groups.map((group, groupIndex) => (
                <section className="crossover-origin-group" key={group.title}>
                  <header className="crossover-origin-heading">
                    <p className="eyebrow">{en ? group.eyebrowEn : group.eyebrow}</p>
                    <h2>{en ? group.titleEn : group.title}</h2>
                  </header>

                  <div className="crossover-origin-grid">
                    {group.items.map((item, index) => {
                      const price = bridgePrices.get(item.contentKey);
                      const label = en
                        ? (price?.label_en || item.fallbackLabelEn)
                        : (price?.label_fr || item.fallbackLabel);
                      const amount = price?.amount_cents ?? item.fallbackAmount;

                      return (
                        <article className="crossover-origin-card" key={item.contentKey}>
                          <Image
                            src={item.image}
                            alt={label}
                            fill
                            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            priority={groupIndex === 0 && index < 3}
                          />
                          <div className="crossover-origin-card-shade" />
                          <strong className="crossover-origin-price">
                            {formatAmount(amount, en ? price?.suffix_en : price?.suffix_fr, locale)}
                          </strong>
                          <div className="crossover-origin-card-copy">
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <h3>{label}</h3>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  <a
                    className="crossover-origin-inline-book"
                    href={bookingLinks[group.bookingKey]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {en ? "Book this course" : "Réserver cette passerelle"} <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                </section>
              ))}

              <div className="crossover-origin-actions">
                <div>
                  <p className="eyebrow">{en ? "Ready to have your level recognised?" : "Prêt à faire reconnaître votre niveau ?"}</p>
                  <h2>{en ? "Choose your next certification." : "Choisissez votre prochaine certification."}</h2>
                </div>
                <div>
                  <a
                    className="button crossover-origin-book"
                    href={bookingLinks.main_booking}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {en ? "I book" : "Je réserve"} <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                  <a
                    className="button crossover-origin-shop"
                    href={bookingLinks.shop}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {en ? "Shop" : "Boutique"} <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
