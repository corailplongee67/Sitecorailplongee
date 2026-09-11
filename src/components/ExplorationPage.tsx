import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { PublicCatalogPrice } from "@/lib/pricing-data";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const packages = [
  {
    key: "unit",
    contentKey: "exploration-unit-autonomous",
    label: "Exploration de plongée niveau 2 autonomes et plus / Rescue Diver",
    shortLabel: "Plongée à l’unité",
    image: "/images/exploration/original/unit.jpg",
    fallbackAmount: 4500,
  },
  {
    key: "4",
    contentKey: "exploration-4-autonomous",
    label: "Forfait 4 plongées niveau 2 autonomes et plus ou Rescue Diver",
    shortLabel: "Forfait 4 plongées",
    image: "/images/exploration/original/package-4.jpg",
    fallbackAmount: 17200,
  },
  {
    key: "6",
    contentKey: "exploration-6-autonomous",
    label: "Forfait 6 plongées niveau 2 autonomes et plus ou Rescue Diver",
    shortLabel: "Forfait 6 plongées",
    image: "/images/exploration/original/package-6.jpg",
    fallbackAmount: 24900,
  },
  {
    key: "10",
    contentKey: "exploration-10-autonomous",
    label: "Forfait 10 plongées niveau 2 autonomes et plus ou Rescue Diver",
    shortLabel: "Forfait 10 plongées",
    image: "/images/exploration/original/package-10.jpg",
    fallbackAmount: 40000,
  },
  {
    key: "20",
    contentKey: "exploration-20-autonomous",
    label: "Forfait 20 plongées niveau 2 autonomes et plus ou Rescue Diver",
    shortLabel: "Forfait 20 plongées",
    image: "/images/exploration/original/package-20.jpg",
    fallbackAmount: 70000,
  },
  {
    key: "32",
    contentKey: "exploration-32-autonomous",
    label: "Forfait 32 plongées niveau 2 autonomes et plus ou Rescue Diver",
    shortLabel: "Forfait 32 plongées",
    image: "/images/exploration/original/package-32.jpg",
    fallbackAmount: 95000,
  },
  {
    key: "65",
    contentKey: "exploration-65-autonomous",
    label: "Forfait 65 plongées niveau 2 autonomes et plus ou Rescue Diver",
    shortLabel: "Forfait 65 plongées",
    image: "/images/exploration/original/package-65.jpg",
    fallbackAmount: 156000,
  },
] as const;

function formatAmount(amountCents: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

export function ExplorationPage({
  bookingLinks,
  prices,
}: {
  bookingLinks: BookingLinks;
  prices: PublicCatalogPrice[];
}) {
  const autonomousPrices = new Map(
    prices
      .filter((price) => price.section_code === "exploration" && price.price_column === "autonomous")
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

      <main className="exploration-origin-main">
        <section className="exploration-origin-hero">
          <Image
            src="/images/exploration/original/hero.jpg"
            alt="Plongeur autonome accompagné d’un banc de poissons"
            fill
            priority
            sizes="100vw"
          />
          <div className="exploration-origin-hero-shade" />
          <div className="shell exploration-origin-hero-copy">
            <p className="eyebrow light">Niveau 2 et plus · Rescue Diver</p>
            <h1>Je plonge autonome</h1>
          </div>
        </section>

        <section className="exploration-origin-offers">
          <div className="shell">
            <div className="exploration-origin-panel">
              <header className="exploration-origin-heading">
                <p className="eyebrow">Plonger à Saint-Gilles</p>
                <h2>Exploration autonome</h2>
              </header>

              <div className="exploration-origin-grid">
                {packages.map((item, index) => {
                  const price = autonomousPrices.get(item.contentKey);
                  const amount = price?.amount_cents ?? item.fallbackAmount;

                  return (
                    <article className="exploration-origin-card" key={item.key}>
                      <div className="exploration-origin-card-image">
                        <Image
                          src={item.image}
                          alt={`Présentation ${item.shortLabel.toLowerCase()} pour plongeur autonome`}
                          fill
                          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          priority={index < 3}
                        />
                        <strong>{formatAmount(amount)}</strong>
                      </div>
                      <div className="exploration-origin-card-copy">
                        <p>{item.shortLabel}</p>
                        <h3>{item.label}</h3>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="exploration-origin-actions">
                <a
                  className="button exploration-origin-book"
                  href={bookingLinks.exploration_booking}
                  target="_blank"
                  rel="noreferrer"
                >
                  Je réserve <ArrowUpRight aria-hidden="true" size={18} />
                </a>
                <a
                  className="button exploration-origin-shop"
                  href={bookingLinks.shop}
                  target="_blank"
                  rel="noreferrer"
                >
                  Boutique <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
