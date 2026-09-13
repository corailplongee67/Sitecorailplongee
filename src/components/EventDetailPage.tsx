import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Phone } from "lucide-react";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { decodeEntities } from "./LegacyPage";
import type { PublicEvent } from "@/lib/events-data";
import type { BookingKey } from "@/lib/site-data";

type AuditPage = {
  url: string;
  title: string;
  lastmod?: string;
  sitemapImages?: string[];
  headings?: { h1?: string[] };
  images?: Array<{ src: string; alt?: string | null }>;
};

function eventImage(event: PublicEvent, originalImage?: string) {
  const storedImage = event.image_paths?.[0];
  if (storedImage?.startsWith("http")) return storedImage;
  if (storedImage && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/${storedImage}`;
  }
  return event.cover_image_url || originalImage || "/images/hero/diving-reunion.jpg";
}

function eventImageAlt(page: AuditPage, imageUrl: string, title: string) {
  const matchingImage = page.images?.find((image) => image.src === imageUrl);
  return decodeEntities(matchingImage?.alt || `Affiche de l’événement ${title}`);
}

function eventCopy(value: string) {
  return decodeEntities(value)
    .replace(/\s+(?=(?:Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)\b)/g, "\n")
    .replace(/\s+(?=(?:Rendez-vous|Sur réservation|Réservation et renseignement|A [Bb]ientôt|Niveau \d|N\d)\b)/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function formatEventDate(event: PublicEvent) {
  const startsAt = new Date(event.starts_at);
  const endsAt = event.ends_at ? new Date(event.ends_at) : null;
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (!endsAt || startsAt.toDateString() === endsAt.toDateString()) return formatter.format(startsAt);
  return `Du ${formatter.format(startsAt)} au ${formatter.format(endsAt)}`;
}

function formatEventTime(event: PublicEvent, title: string) {
  const writtenTime = title.match(/(?:à|rdv)\s*(\d{1,2})h(\d{2})?/i);
  if (writtenTime) return `${writtenTime[1].padStart(2, "0")}h${writtenTime[2] ?? "00"}`;
  if (event.id.startsWith("legacy-") || event.ends_at) return null;
  const startsAt = new Date(event.starts_at);
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(startsAt);
}

export function EventDetailPage({
  page,
  event,
  bookingLinks,
}: {
  page: AuditPage;
  event: PublicEvent;
  bookingLinks: Record<BookingKey, string>;
}) {
  const title = decodeEntities(event.title_fr || page.headings?.h1?.[0] || page.title);
  const originalImage = page.sitemapImages?.[0];
  const imageUrl = eventImage(event, originalImage);
  const description = event.description_fr || event.excerpt_fr;
  const lines = eventCopy(description);
  const time = formatEventTime(event, title);
  const bookingKey = event.booking_link_key as BookingKey;
  const bookingUrl = bookingLinks[bookingKey] || bookingLinks.agenda;

  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="event-detail-main">
        <section className="event-detail-hero">
          <Image src="/images/hero/underwater-reunion.jpg" alt="" fill priority sizes="100vw" />
          <div className="event-detail-hero-shade" />
          <div className="shell event-detail-hero-copy">
            <Link href="/evenements/"><ArrowLeft aria-hidden="true" /> Programme des événements</Link>
            <h1>{title}</h1>
          </div>
        </section>

        <section className="event-detail-section" id="content">
          <div className="shell event-detail-layout">
            <figure className="event-detail-poster">
              <Image
                src={imageUrl}
                alt={eventImageAlt(page, originalImage || imageUrl, title)}
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
              />
            </figure>

            <article
              className="event-detail-card"
              style={{
                "--event-detail-title": event.title_color,
                "--event-detail-text": event.text_color,
                "--event-detail-start": event.card_color_start,
                "--event-detail-end": event.card_color_end,
              } as CSSProperties}
            >
              <p className="eyebrow light">Sortie Corail Plongée</p>
              <h2>{title}</h2>
              <div className="event-detail-meta">
                <span><CalendarDays aria-hidden="true" /> {formatEventDate(event)}</span>
                {time ? <span><Clock3 aria-hidden="true" /> {time}</span> : null}
                <span><MapPin aria-hidden="true" /> {event.location_fr || "Saint-Gilles-les-Bains"}</span>
              </div>
              <div className="event-detail-copy">
                {lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
              </div>
              <div className="event-detail-actions">
                <BookingCta href={bookingUrl}>Réserver une place</BookingCta>
                <a href="tel:+262262243725"><Phone aria-hidden="true" /> 0262 24 37 25</a>
              </div>
            </article>
          </div>

          <div className="shell event-detail-back">
            <Link href="/evenements/"><ArrowLeft aria-hidden="true" /> Voir tous les événements</Link>
          </div>
        </section>
      </main>
      <Footer locale="fr" />
    </>
  );
}
