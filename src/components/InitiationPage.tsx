import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

export function InitiationPage({
  bookingLinks,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  locale?: "fr" | "en";
}) {
  const en = locale === "en";
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
            <h1>{en ? "I discover – Initiation" : "Je découvre - Initiation"}</h1>
          </div>
        </section>

        <section className="initiation-origin-offer">
          <div className="shell">
            <article className="initiation-origin-card">
              <header className="initiation-origin-card-heading">
                <p className="eyebrow">{en ? "First bubbles" : "Premières bulles"}</p>
                <h2>{en ? "Initiation" : "Initiation"}</h2>
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
                  <div className="initiation-origin-price" aria-label="Tarif : 95 euros">
                    <Image
                      src="/images/initiation/original/fond-prix.png"
                      alt=""
                      fill
                      sizes="180px"
                      aria-hidden="true"
                    />
                    <strong>95€</strong>
                  </div>
                </div>

                <div className="initiation-origin-copy">
                  <div>
                    <p className="initiation-origin-label">{en ? "About this experience" : "À propos de cet événement"}</p>
                    <p>
                      {en
                        ? "Would you like to discover Reunion Island’s fabulous seabed, accompanied by an instructor to a depth of 6 metres? Take the plunge…"
                        : "Vous désirez découvrir les fabuleux fond de la réunion encadré par un moniteur jusqu’a une profondeur de 6 mètres, n’hésitez plus…"}
                    </p>
                    <p>{en ? "Minimum 2 people and 40 minutes underwater." : "Minimum 2 personnes et 40 minutes sous l’eau."}</p>
                  </div>

                  <a
                    className="button initiation-origin-book"
                    href={bookingLinks.discovery_booking}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {en ? "I book" : "Je réserve"}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>

              <div className="initiation-origin-location">
                <span aria-hidden="true"><MapPin size={21} /></span>
                <div>
                  <small>{en ? "Initiation location" : "Lieu de l’initiation"}</small>
                  <strong>Saint Gilles Les Bains</strong>
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
