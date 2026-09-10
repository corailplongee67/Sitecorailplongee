import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock3, Waves } from "lucide-react";
import type { PublicEvent } from "@/lib/content-data";
import type { BookingKey } from "@/lib/site-data";
import { BookingCta } from "./BookingCta";
import { Footer, PartnerStrip } from "./Footer";
import { Header } from "./Header";

type BookingLinks = Record<BookingKey, string>;

const homeServices = [
  {
    title: "Sorties cétacés",
    image: "/images/services/cetaceans.webp",
    alt: "Baleine à bosse sautant hors de l’eau",
    href: "/sorties-cetaces-2/",
    bookingKey: "cetacean_booking" as BookingKey,
  },
  {
    title: "Découverte",
    image: "/images/services/discovery.webp",
    alt: "Plongeur au-dessus d’un récif corallien",
    href: "/decouverte/",
    bookingKey: "discovery_booking" as BookingKey,
  },
  {
    title: "Exploration",
    image: "/images/services/exploration.webp",
    alt: "Épave sous-marine entourée de poissons",
    href: "/je-plonge-autonome/",
    bookingKey: "exploration_booking" as BookingKey,
  },
  {
    title: "Formation SSI International",
    image: "/images/services/ssi.jpg",
    alt: "Formation Open Water Diver SSI",
    href: "/formation_ssi/",
    bookingKey: "ssi_booking" as BookingKey,
  },
  {
    title: "Formation française",
    image: "/images/services/french-training.webp",
    alt: "Plongeuse équipée dans l’océan",
    href: "/formation-francaise/",
    bookingKey: "french_training_booking" as BookingKey,
  },
] as const;

function eventImage(event: PublicEvent, storageBase: string) {
  const path = event.image_paths[0];
  if (path?.startsWith("http")) return path;
  if (path) return `${storageBase}${path}`;
  return event.cover_image_url ?? "/images/hero/underwater-reunion.jpg";
}

function eventRange(event: PublicEvent) {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Indian/Reunion",
  });
  const start = formatter.format(new Date(event.starts_at));
  if (!event.ends_at) return start;
  return `${start} — ${formatter.format(new Date(event.ends_at))}`;
}

export function FrenchHomePage({
  bookingLinks,
  events,
}: {
  bookingLinks: BookingLinks;
  events: PublicEvent[];
}) {
  const storageBase = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/`
    : "";

  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="home-origin-main">
        <section className="home-origin-hero">
          <Image
            src="/images/hero/corail-reef.jpg"
            alt="Fonds marins de La Réunion"
            fill
            priority
            sizes="100vw"
          />
          <div className="home-origin-hero-shade" />
          <div className="shell home-origin-hero-copy">
            <p className="eyebrow light">Saint-Gilles-les-Bains · La Réunion</p>
            <h1>Corail Plongée</h1>
            <p>Venez découvrir les fonds marins de La Réunion.</p>
            <BookingCta href={bookingLinks.main_booking}>Réserver une plongée</BookingCta>
          </div>
          <a className="home-origin-scroll" href="#evenements" aria-label="Voir les événements de la semaine">
            <ArrowDown aria-hidden="true" />
          </a>
        </section>

        <section id="evenements" className="home-origin-events section-shell">
          <div className="shell home-origin-heading">
            <p className="eyebrow">Le programme du centre</p>
            <h2>Événement de la semaine</h2>
          </div>
          {events.length ? (
            <div className="shell home-origin-event-grid">
              {events.slice(0, 3).map((event) => (
                <Link className="home-origin-event-card" href="/evenements/" key={event.id}>
                  <div className="home-origin-event-image">
                    <Image
                      src={eventImage(event, storageBase)}
                      alt={event.title_fr}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                  </div>
                  <div className="home-origin-event-copy">
                    <time dateTime={event.starts_at}><CalendarDays aria-hidden="true" /> {eventRange(event)}</time>
                    <h3>{event.title_fr}</h3>
                    <p>{event.excerpt_fr}</p>
                    <span>Voir l’événement <ArrowRight aria-hidden="true" /></span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="shell home-origin-event-empty">
              <CalendarDays aria-hidden="true" />
              <p>Le prochain programme arrive. Consultez l’agenda pour voir les créneaux disponibles.</p>
            </div>
          )}
          <div className="home-origin-event-actions">
            <BookingCta href={bookingLinks.agenda}>Je réserve</BookingCta>
            <Link className="text-link" href="/evenements/">Tous les événements <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="home-origin-dream">
          <Image src="/images/hero/diving-reunion.jpg" alt="Tortue marine sur le récif" fill sizes="100vw" />
          <div className="home-origin-dream-shade" />
          <div className="shell home-origin-dream-copy">
            <p className="eyebrow light">À chacun son aventure</p>
            <h2>Trouvez votre plongée de rêves</h2>
            <Link className="button button-ghost" href="/nos-prestations/">Découvrir plus</Link>
          </div>
        </section>

        <section className="home-origin-services section-shell">
          <div className="shell home-origin-services-intro">
            <div>
              <p className="eyebrow">Corail Plongée</p>
              <h2>Nos prestations</h2>
            </div>
            <p>
              Corail Plongée Réunion vous fait découvrir l’océan Indien et ses
              richesses tout au long de l’année. Baptêmes de plongée, formations
              tous niveaux… Profitez du cadre exceptionnel de La Réunion et
              offrez-vous une expérience hors du commun.
            </p>
          </div>
          <div className="shell home-origin-services-grid">
            {homeServices.map((service, index) => (
              <article className={`home-origin-service-card service-${index + 1}`} key={service.title}>
                <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 40vw" />
                <div className="home-origin-service-shade" />
                <div className="home-origin-service-copy">
                  <p>0{index + 1}</p>
                  <h3>{service.title}</h3>
                  <div>
                    <Link href={service.href}>En savoir plus</Link>
                    <a href={bookingLinks[service.bookingKey]} target="_blank" rel="noreferrer">Réserver <ArrowRight aria-hidden="true" /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="home-origin-services-action">
            <Link className="button button-navy" href="/nos-prestations/">Découvrir nos prestations</Link>
          </div>
        </section>

        <section className="home-origin-discovery section-shell">
          <div className="shell home-origin-discovery-grid">
            <div className="home-origin-discovery-image">
              <Image src="/images/services/discovery.webp" alt="Première expérience de plongée à La Réunion" fill sizes="(max-width: 850px) 100vw, 50vw" />
            </div>
            <div className="home-origin-discovery-copy">
              <p className="eyebrow light">Premières bulles</p>
              <h2>Découverte</h2>
              <p>
                L’immersion en baptême se déroule entre 0 et 6m, vous permettant
                ainsi de profiter pleinement de cette première expérience.
              </p>
              <div>
                <Link className="button button-outline-light" href="/decouverte/">Voir plus</Link>
                <BookingCta href={bookingLinks.discovery_booking}>Je réserve</BookingCta>
              </div>
            </div>
          </div>
        </section>

        <section className="home-origin-journey section-shell">
          <div className="shell home-origin-heading">
            <p className="eyebrow">Votre prochaine immersion</p>
            <h2>Comment ça marche</h2>
          </div>
          <div className="shell home-origin-steps">
            <article><span>01</span><Clock3 aria-hidden="true" /><h3>Choisir</h3><p>La plongée qui vous ressemble.</p></article>
            <article><span>02</span><Check aria-hidden="true" /><h3>Réserver</h3><p>Votre place sur notre agenda sécurisé.</p></article>
            <article><span>03</span><Waves aria-hidden="true" /><h3>Plongez</h3><p>Notre équipe prépare le reste au port.</p></article>
          </div>
          <div className="home-origin-journey-action"><BookingCta href={bookingLinks.main_booking}>Je réserve</BookingCta></div>
        </section>

        <section className="home-origin-newsletter section-shell">
          <div className="shell home-origin-newsletter-card">
            <div>
              <p className="eyebrow coral">Les nouvelles de Corail Plongée</p>
              <h2>Newsletter</h2>
              <p>Abonnez-vous à notre newsletter pour ne rater aucune de nos offres de plongées.</p>
            </div>
            <div className="home-origin-newsletter-form">
              <label htmlFor="home-newsletter-email">Email</label>
              <div>
                <input id="home-newsletter-email" type="email" placeholder="votre@email.fr" disabled />
                <button type="button" disabled>Envoyer</button>
              </div>
              <small>L’inscription sera activée après validation de l’outil newsletter du client.</small>
            </div>
          </div>
        </section>

        <section className="home-origin-partners-heading section-shell">
          <div className="shell home-origin-heading">
            <p className="eyebrow">Certifications et engagements</p>
            <h2>Nos partenaires</h2>
          </div>
        </section>
        <PartnerStrip />
      </main>
      <Footer locale="fr" />
    </>
  );
}
