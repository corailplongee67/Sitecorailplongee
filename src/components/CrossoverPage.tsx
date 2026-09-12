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
    bookingKey: "french_training_booking" as const,
    items: [
      {
        contentKey: "bridge-ssi-level-2",
        fallbackLabel: "Passerelle Advanced SSI vers niveau 2 · 2 plongées + certifications",
        fallbackAmount: 15000,
        image: "/images/crossover/original/ssi-level-2.jpg",
      },
      {
        contentKey: "bridge-ssi-pa40",
        fallbackLabel: "Passerelle Advanced SSI vers niveau PA40 · 4 plongées + certifications",
        fallbackAmount: 35000,
        image: "/images/crossover/original/ssi-pa40.jpg",
      },
      {
        contentKey: "bridge-master-level-3",
        fallbackLabel: "Passerelle Advanced SSI vers niveau 3 · 8 plongées + certifications",
        fallbackAmount: 66000,
        image: "/images/crossover/original/ssi-level-3.jpg",
      },
    ],
  },
  {
    eyebrow: "Équivalence internationale",
    title: "Passerelle diplôme français vers diplôme SSI international",
    bookingKey: "ssi_booking" as const,
    items: [
      {
        contentKey: "bridge-french-open-water",
        fallbackLabel: "Passerelle niveau 1 vers Open Water Diver SSI",
        fallbackAmount: 28500,
        image: "/images/crossover/original/french-open-water.jpg",
      },
      {
        contentKey: "bridge-french-advanced",
        fallbackLabel: "Passerelle niveau 2 vers Advanced Open Water Diver",
        fallbackAmount: 22000,
        image: "/images/crossover/original/french-advanced.jpg",
      },
      {
        contentKey: "bridge-french-master",
        fallbackLabel: "Passerelle niveau 3 vers Master Diver",
        fallbackAmount: 29000,
        image: "/images/crossover/original/french-master.jpg",
      },
    ],
  },
] as const;

function formatAmount(amountCents: number, suffix?: string | null) {
  const amount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amountCents / 100);

  return `${amount}${suffix ?? ""}`;
}

export function CrossoverPage({
  bookingLinks,
  prices,
}: {
  bookingLinks: BookingLinks;
  prices: PublicCatalogPrice[];
}) {
  const bridgePrices = new Map(
    prices
      .filter((price) => price.section_code === "bridges")
      .map((price) => [price.content_key, price]),
  );

  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="crossover-origin-main">
        <section className="crossover-origin-hero">
          <Image
            src="/images/crossover/original/hero.jpg"
            alt="Plongeurs au-dessus du récif dans un banc de poissons"
            fill
            priority
            sizes="100vw"
          />
          <div className="crossover-origin-hero-shade" />
          <div className="shell crossover-origin-hero-copy">
            <p className="eyebrow light">Changer de certification</p>
            <h1>Passerelle</h1>
          </div>
        </section>

        <section className="crossover-origin-content">
          <div className="shell">
            <div className="crossover-origin-panel">
              {groups.map((group, groupIndex) => (
                <section className="crossover-origin-group" key={group.title}>
                  <header className="crossover-origin-heading">
                    <p className="eyebrow">{group.eyebrow}</p>
                    <h2>{group.title}</h2>
                  </header>

                  <div className="crossover-origin-grid">
                    {group.items.map((item, index) => {
                      const price = bridgePrices.get(item.contentKey);
                      const label = price?.label_fr || item.fallbackLabel;
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
                            {formatAmount(amount, price?.suffix_fr)}
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
                    Réserver cette passerelle <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                </section>
              ))}

              <div className="crossover-origin-actions">
                <div>
                  <p className="eyebrow">Prêt à faire reconnaître votre niveau ?</p>
                  <h2>Choisissez votre prochaine certification.</h2>
                </div>
                <div>
                  <a
                    className="button crossover-origin-book"
                    href={bookingLinks.main_booking}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Je réserve <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                  <a
                    className="button crossover-origin-shop"
                    href={bookingLinks.shop}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Boutique <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
