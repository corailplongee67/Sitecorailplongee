import { PreviewText } from "./PreviewText";
import { OpeningHoursText } from "./OpeningHoursText";
import { SiteImage as Image } from "./SiteImage";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { ContactDetails, ContactMap } from "./SiteContact";
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
            <p className="eyebrow light"><PreviewText id="ContactPage.rich.f86925f2d25a.1">Saint-Gilles-les-Bains · </PreviewText><PreviewText id="contact.hero.location">{en ? "Reunion Island" : "La Réunion"}</PreviewText></p>
            <h1><PreviewText id="ContactPage.2b5c3d26721a.1">Contact</PreviewText></h1>
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
              <p className="eyebrow"><PreviewText id="ContactPage.a09d1349af4a.1">Corail Plongée</PreviewText></p>
              <h2><PreviewText id="ContactPage.4080e861e04b.1">{en ? "Contact us" : "Contactez-nous"}</PreviewText></h2>

              <div className="contact-origin-list">
                <ContactDetails english={en} />

                <div>
                  <Clock3 aria-hidden="true" />
                  <span>
                    <strong><PreviewText id="contact.hours.heading">{en ? "Opening hours" : "Heures d’ouverture"}</PreviewText></strong>
                    {en ? <>Monday to Saturday, <OpeningHoursText id="global.hours.weekdays" fallback="7h30 à 16h30" /></> : <><PreviewText id="contact.hours.weekdays.label">Lundi au samedi de </PreviewText><PreviewText id="global.hours.weekdays">7h30 à 16h30</PreviewText></>}<br />
                    {en ? <>Sunday, <OpeningHoursText id="global.hours.sunday" fallback="7h30 à 12h" /></> : <><PreviewText id="contact.hours.sunday.label">Dimanche de </PreviewText><PreviewText id="global.hours.sunday">7h30 à 12h</PreviewText></>}
                  </span>
                </div>
              </div>

              <a
                className="button contact-origin-book"
                href={bookingLinks.shop}
                target="_blank"
                rel="noreferrer"
              >
                <PreviewText embedded id="ContactPage.link.a2285d7a0a6c.1">{en ? "I book" : "Je réserve"}</PreviewText> <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>

            <div className="contact-origin-map">
              <ContactMap english={en} />
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
