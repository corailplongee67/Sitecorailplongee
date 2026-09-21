import Image from "next/image";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

export function ContactPage({
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

      <main className="contact-origin-main">
        <section className="contact-origin-hero">
          <Image
            src="/images/contact/original/hero.jpg"
            alt={en ? "Pink coral in the waters of Reunion Island" : "Corail rose dans les eaux de La Réunion"}
            fill
            priority
            sizes="100vw"
          />
          <div className="contact-origin-hero-shade" />
          <div className="shell contact-origin-hero-copy">
            <p className="eyebrow light">Saint-Gilles-les-Bains · {en ? "Reunion Island" : "La Réunion"}</p>
            <h1>Contact</h1>
          </div>
        </section>

        <section className="contact-origin-content" id="content">
          <Image
            className="contact-origin-turtle"
            src="/images/contact/original/turtle.png"
            alt=""
            width={254}
            height={441}
            aria-hidden="true"
          />
          <Image
            className="contact-origin-seahorse"
            src="/images/contact/original/seahorse.png"
            alt=""
            width={267}
            height={441}
            aria-hidden="true"
          />

          <div className="shell contact-origin-panel">
            <div className="contact-origin-details">
              <p className="eyebrow">Corail Plongée</p>
              <h2>{en ? "Contact us" : "Contactez-nous"}</h2>

              <div className="contact-origin-list">
                <a
                  href="https://maps.google.com/?q=Corail+Plongee+Saint-Gilles-les-Bains"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin aria-hidden="true" />
                  <span>
                    <strong>{en ? "Address" : "Adresse"}</strong>
                    Port de plaisance,<br />
                    Saint-Gilles les Bains 97434,<br />
                    {en ? "Reunion Island" : "La Réunion"}
                  </span>
                </a>

                <a href="tel:+262262243725">
                  <Phone aria-hidden="true" />
                  <span>
                    <strong>{en ? "Phone" : "Téléphone"}</strong>
                    02.62.24.37.25
                  </span>
                </a>

                <a href="mailto:info@corail-plongee.com">
                  <Mail aria-hidden="true" />
                  <span>
                    <strong>Mail</strong>
                    info@corail-plongee.com
                  </span>
                </a>

                <div>
                  <Clock3 aria-hidden="true" />
                  <span>
                    <strong>{en ? "Opening hours" : "Heures d’ouverture"}</strong>
                    {en ? "Monday to Saturday, 7.30am to 5pm" : "Lundi au samedi de 7h30 à 17h"}<br />
                    {en ? "Sunday, 7.30am to 11.30am" : "Dimanche de 7h30 à 11h30"}
                  </span>
                </div>
              </div>

              <a
                className="button contact-origin-book"
                href={bookingLinks.shop}
                target="_blank"
                rel="noreferrer"
              >
                {en ? "I book" : "Je réserve"} <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>

            <div className="contact-origin-map">
              <iframe
                title={en ? "Corail Plongée location at Saint-Gilles-les-Bains marina" : "Localisation de Corail Plongée au port de Saint-Gilles-les-Bains"}
                src="https://www.google.com/maps?q=Corail+Plong%C3%A9e+Saint-Gilles-les-Bains+La+R%C3%A9union&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="contact-origin-map-label">
                <MapPin aria-hidden="true" size={17} />
                Port de plaisance · Saint-Gilles-les-Bains
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
