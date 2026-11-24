import { SiteImage as Image } from "./SiteImage";
import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock3, Waves } from "lucide-react";
import type { PublicEvent } from "@/lib/content-data";
import type { BookingKey } from "@/lib/site-data";
import { BookingCta } from "./BookingCta";
import { Footer, PartnerStrip } from "./Footer";
import { Header } from "./Header";
import { PreviewDisabledButton, PreviewText } from "./PreviewText";

type BookingLinks = Record<BookingKey, string>;

const homeServices = [
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
  {
    title: "Sorties cétacés",
    image: "/images/services/cetaceans.webp",
    alt: "Baleine à bosse sautant hors de l’eau",
    href: "/sorties-cetaces-2/",
    bookingKey: "cetacean_booking" as BookingKey,
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
            src="/images/hero/turtle-rays-corail-plongee.png"
            alt="Tortue marine nageant sous les rayons du soleil au-dessus d’un récif corallien"
            fill
            priority
            sizes="100vw"
          />
          <div className="home-origin-hero-shade" />
          <div className="shell home-origin-hero-copy">
            <p className="eyebrow light"><PreviewText id="home.hero.location">Saint-Gilles-les-Bains · La Réunion</PreviewText></p>
            <h1><PreviewText id="home.hero.title">Corail Plongée</PreviewText></h1>
            <p><PreviewText id="home.hero.description">Venez découvrir les fonds marins de La Réunion.</PreviewText></p>
            <BookingCta href={bookingLinks.main_booking}><PreviewText embedded id="FrenchHomePage.link.99b753f82669.1">Réserver une plongée</PreviewText></BookingCta>
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
            <p className="eyebrow light"><PreviewText id="home.dream.eyebrow">À chacun son aventure</PreviewText></p>
            <h2><PreviewText id="home.dream.title">Trouvez votre plongée de rêves</PreviewText></h2>
            <Link className="button button-ghost" href="/nos-prestations/"><PreviewText embedded id="FrenchHomePage.link.3354f4bb1d0f.1">Découvrir plus</PreviewText></Link>
          </div>
        </section>

        <section className="home-origin-services section-shell">
          <div className="shell home-origin-services-intro">
            <div>
              <p className="eyebrow"><PreviewText id="home.services.eyebrow">Corail Plongée</PreviewText></p>
              <h2><PreviewText id="home.services.title">Nos prestations</PreviewText></h2>
            </div>
            <p>
              <PreviewText id="home.services.description">{"Corail Plongée Réunion vous fait découvrir l’océan Indien et ses richesses tout au long de l’année. Baptêmes de plongée, formations tous niveaux… Profitez du cadre exceptionnel de La Réunion et offrez-vous une expérience hors du commun."}</PreviewText>
            </p>
          </div>
          <div className="shell home-origin-services-grid">
            {homeServices.map((service, index) => (
              <article className={`home-origin-service-card service-${index + 1}`} key={service.title}>
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 40vw"
                  variants={{ desktop: "home-card-desktop", mobile: "home-card-mobile", breakpoint: 760 }}
                />
                <div className="home-origin-service-shade" />
                <div className="home-origin-service-copy">
                  <p>0{index + 1}</p>
                  <h3><PreviewText id={`home.services.card.${index + 1}.title`}>{service.title}</PreviewText></h3>
                  <div>
                    <Link href={service.href}><PreviewText embedded id="FrenchHomePage.link.dd3ae33250cf.1">En savoir plus</PreviewText></Link>
                    <a href={bookingLinks[service.bookingKey]} target="_blank" rel="noreferrer"><PreviewText embedded id="FrenchHomePage.link.c8d5cf010aec.1">Réserver </PreviewText><ArrowRight aria-hidden="true" /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="home-origin-services-action">
            <Link className="button button-navy" href="/nos-prestations/"><PreviewText embedded id="FrenchHomePage.link.065a95485ae6.1">Découvrir nos prestations</PreviewText></Link>
          </div>
        </section>

        <section className="home-origin-discovery section-shell">
          <div className="shell home-origin-discovery-grid">
            <div className="home-origin-discovery-image">
              <Image
                src="/images/services/discovery.webp"
                alt="Première expérience de plongée à La Réunion"
                fill
                sizes="(max-width: 850px) 100vw, 50vw"
                variants={{ desktop: "home-feature-desktop", mobile: "home-feature-mobile", breakpoint: 850 }}
              />
            </div>
            <div className="home-origin-discovery-copy">
              <p className="eyebrow light"><PreviewText id="home.discovery.eyebrow">Premières bulles</PreviewText></p>
              <h2><PreviewText id="home.discovery.title">Découverte</PreviewText></h2>
              <p>
                <PreviewText id="home.discovery.description">{"L’immersion en baptême se déroule entre 0 et 6m, vous permettant ainsi de profiter pleinement de cette première expérience."}</PreviewText>
              </p>
              <div>
                <Link className="button button-outline-light" href="/decouverte/"><PreviewText embedded id="FrenchHomePage.link.df1e57b28822.1">Voir plus</PreviewText></Link>
                <BookingCta href={bookingLinks.discovery_booking}><PreviewText embedded id="FrenchHomePage.link.7fff04a217a8.2">Je réserve</PreviewText></BookingCta>
              </div>
            </div>
          </div>
        </section>

        <section className="home-origin-journey section-shell">
          <div className="shell home-origin-heading">
            <p className="eyebrow"><PreviewText id="home.journey.eyebrow">Votre prochaine immersion</PreviewText></p>
            <h2><PreviewText id="home.journey.title">Comment ça marche</PreviewText></h2>
          </div>
          <div className="shell home-origin-steps">
            <article><span>01</span><Clock3 aria-hidden="true" /><h3><PreviewText id="home.steps.choose.title">Choisir</PreviewText></h3><p><PreviewText id="home.steps.choose.description">La plongée qui vous ressemble.</PreviewText></p></article>
            <article><span>02</span><Check aria-hidden="true" /><h3><PreviewText id="home.steps.book.title">Réserver</PreviewText></h3><p><PreviewText id="home.steps.book.description">Votre place sur notre agenda sécurisé.</PreviewText></p></article>
            <article><span>03</span><Waves aria-hidden="true" /><h3><PreviewText id="home.steps.dive.title">Plongez</PreviewText></h3><p><PreviewText id="home.steps.dive.description">Notre équipe prépare le reste au port.</PreviewText></p></article>
          </div>
          <div className="home-origin-journey-action"><BookingCta href={bookingLinks.main_booking}><PreviewText embedded id="FrenchHomePage.link.7fff04a217a8.3">Je réserve</PreviewText></BookingCta></div>
        </section>

        <section className="home-origin-seo section-shell" aria-labelledby="home-seo-title">
          <div className="shell home-origin-seo-card">
            <p className="eyebrow"><PreviewText id="home.seo.eyebrow">Plonger à Saint-Gilles-les-Bains</PreviewText></p>
            <h2 id="home-seo-title"><PreviewText id="home.seo.title">Votre centre de plongée à La Réunion</PreviewText></h2>
            <p>
              <PreviewText id="home.seo.description">{"Installé sur le port de Saint-Gilles-les-Bains, Corail Plongée vous accueille toute l’année pour découvrir les fonds marins de La Réunion. Le centre propose des baptêmes de plongée pour une première immersion, des plongées d’exploration sur les récifs de la côte ouest, ainsi que des formations SSI internationales et des formations françaises adaptées à votre parcours. Débutants, plongeurs encadrés ou autonomes profitent d’une équipe expérimentée, de bateaux équipés et d’un accès privilégié aux sites sous-marins de l’océan Indien. Corail Plongée organise également des sorties et activités en mer, dont les rencontres avec les cétacés en saison. Depuis la réservation jusqu’au retour au port, chaque expérience est préparée avec attention pour vous faire vivre une plongée conviviale à Saint-Gilles-les-Bains."}</PreviewText>
            </p>
          </div>
        </section>

        <section className="home-origin-newsletter section-shell">
          <div className="shell home-origin-newsletter-card">
            <div>
              <p className="eyebrow coral"><PreviewText id="home.newsletter.eyebrow">Les nouvelles de Corail Plongée</PreviewText></p>
              <h2><PreviewText id="home.newsletter.title">Newsletter</PreviewText></h2>
              <p><PreviewText id="home.newsletter.description">Abonnez-vous à notre newsletter pour ne rater aucune de nos offres de plongées.</PreviewText></p>
            </div>
            <div className="home-origin-newsletter-form">
              <label htmlFor="home-newsletter-email"><PreviewText id="home.newsletter.email-label">Email</PreviewText></label>
              <div>
                <input id="home-newsletter-email" type="email" placeholder="votre@email.fr" disabled />
                <PreviewDisabledButton id="home.newsletter.submit">Envoyer</PreviewDisabledButton>
              </div>
              <small><PreviewText id="home.newsletter.notice">L’inscription sera activée après validation de l’outil newsletter du client.</PreviewText></small>
            </div>
          </div>
        </section>

        <section className="home-origin-partners-heading section-shell">
          <div className="shell home-origin-heading">
            <p className="eyebrow"><PreviewText id="home.partners.eyebrow">Certifications et engagements</PreviewText></p>
            <h2><PreviewText id="home.partners.title">Nos partenaires</PreviewText></h2>
          </div>
        </section>
        <PartnerStrip />
      </main>
      <Footer locale="fr" />
    </>
  );
}
