import { PreviewText } from "./PreviewText";
import { SiteImage as Image } from "./SiteImage";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

export function InitiationPage({
  bookingLinks,
  amountCents,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  amountCents: number | null;
  locale?: "fr" | "en";
}) {
  const en = locale === "en";
  const price = amountCents === null ? null : new Intl.NumberFormat(en ? "en-GB" : "fr-FR", {
    style: "currency", currency: "EUR", minimumFractionDigits: amountCents % 100 === 0 ? 0 : 2, maximumFractionDigits: 2,
  }).format(amountCents / 100);
  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="initiation-origin-main">
        <section className="initiation-origin-hero">
          <Image
            src="/images/initiation/original/hero.jpg"
            alt={en ? "Diver observing clownfish in their anemone" : "Plongeuse observant des poissons-clowns dans leur anémone"}
            fill
            priority
            sizes="100vw"
          />
          <div className="initiation-origin-hero-shade" />
          <div className="shell initiation-origin-hero-copy">
            <h1><PreviewText id="InitiationPage.c19f68be33f2.1">{en ? "I discover – Initiation" : "Je découvre - Initiation"}</PreviewText></h1>
          </div>
        </section>

        <section className="initiation-origin-offer">
          <div className="shell">
            <article className="initiation-origin-card">
              <header className="initiation-origin-card-heading">
                <p className="eyebrow"><PreviewText id="InitiationPage.371e5c2443b7.1">{en ? "First bubbles" : "Premières bulles"}</PreviewText></p>
                <h2><PreviewText id="InitiationPage.9974e6957330.1">{en ? "Initiation" : "Initiation"}</PreviewText></h2>
              </header>

              <div className="initiation-origin-card-grid">
                <div className="initiation-origin-visual">
                  <Image
                    src="/images/initiation/original/plongeur.jpg"
                    alt={en ? "Diver underwater surrounded by bubbles" : "Plongeur sous l’eau entouré de bulles"}
                    fill
                    loading="eager"
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                  {price !== null && <div className="initiation-origin-price" aria-label={`${en ? "Price" : "Tarif"} : ${price}`}>
                    <Image
                      src="/images/initiation/original/fond-prix.png"
                      alt=""
                      fill
                      sizes="180px"
                      aria-hidden="true"
                    />
                    <strong>{price}</strong>
                  </div>}
                </div>

                <div className="initiation-origin-copy">
                  <div>
                    <p className="initiation-origin-label"><PreviewText id="InitiationPage.4fa328b0955f.1">{en ? "About this experience" : "À propos de cet événement"}</PreviewText></p>
                    <p>
                      <PreviewText id="InitiationPage.2cc7bc914217.1">{en
                        ? "Would you like to discover Reunion Island’s fabulous seabed, accompanied by an instructor to a depth of 6 metres? Take the plunge…"
                        : "Vous désirez découvrir les fabuleux fond de la réunion encadré par un moniteur jusqu’a une profondeur de 6 mètres, n’hésitez plus…"}</PreviewText>
                    </p>
                    <p><PreviewText id="InitiationPage.e7a7446feaa0.1">{en ? "Minimum 2 people and 40 minutes underwater." : "Minimum 2 personnes et 40 minutes sous l’eau."}</PreviewText></p>
                  </div>

                  <a
                    className="button initiation-origin-book"
                    href={bookingLinks.discovery_booking}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <PreviewText embedded id="InitiationPage.link.a2285d7a0a6c.1">{en ? "I book" : "Je réserve"}</PreviewText>
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>

              <div className="initiation-origin-location">
                <span aria-hidden="true"><MapPin size={21} /></span>
                <div>
                  <small><PreviewText id="initiation.location.label">{en ? "Initiation location" : "Lieu de l’initiation"}</PreviewText></small>
                  <strong><PreviewText id="initiation.location.value">Saint Gilles Les Bains</PreviewText></strong>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
