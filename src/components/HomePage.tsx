import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock3, Compass, ShieldCheck, UsersRound, Waves } from "lucide-react";
import type { PublicEvent, PublicPrice } from "@/lib/content-data";
import { services, type BookingKey, type Locale } from "@/lib/site-data";
import { BookingCta } from "./BookingCta";
import { Footer, PartnerStrip } from "./Footer";
import { Header } from "./Header";

type BookingLinks = Record<BookingKey, string>;

function formatPrice(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

export function HomePage({
  locale,
  bookingLinks,
  prices,
  events,
}: {
  locale: Locale;
  bookingLinks: BookingLinks;
  prices: PublicPrice[];
  events: PublicEvent[];
}) {
  const fr = locale === "fr";

  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.main_booking}
        accountUrl={bookingLinks.customer_account}
      />
      <main>
        <section className="hero">
          <Image
            className="hero-image"
            src="/images/hero/corail-reef.jpg"
            alt={fr ? "Récif corallien baigné de lumière à La Réunion" : "Sunlit coral reef in Reunion Island"}
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-scrim" />
          <div className="shell hero-content">
            <div className="hero-copy">
              <p className="eyebrow light">Saint-Gilles-les-Bains · La Réunion</p>
              <h1>
                {fr ? (
                  <>Plongez dans<br /><em>l’île intense.</em></>
                ) : (
                  <>Dive into<br /><em>the intense island.</em></>
                )}
              </h1>
              <p className="hero-lead">
                {fr
                  ? "Baptêmes, explorations, formations et rencontres avec les cétacés sur la côte ouest de La Réunion."
                  : "Try dives, explorations, training and cetacean encounters on Reunion Island’s west coast."}
              </p>
              <div className="hero-buttons">
                <BookingCta href={bookingLinks.main_booking}>
                  {fr ? "Réserver ma plongée" : "Book my dive"}
                </BookingCta>
                <Link className="button button-ghost" href={fr ? "/nos-prestations/" : "/en/our-services/"}>
                  {fr ? "Choisir mon expérience" : "Choose my experience"}
                </Link>
              </div>
            </div>
            <a className="hero-scroll" href="#experiences">
              <span>{fr ? "Descendre sous la surface" : "Below the surface"}</span>
              <ArrowDown />
            </a>
          </div>
          <div className="depth-marker" aria-hidden="true">
            <span>00 m</span><i /><span>20 m</span><i /><span>40 m</span>
          </div>
        </section>

        <section className="intro-section section-shell">
          <div className="shell intro-grid">
            <div>
              <p className="eyebrow">{fr ? "Votre centre de plongée" : "Your dive centre"}</p>
              <h2>
                {fr ? "L’océan Indien comme terrain d’exploration." : "The Indian Ocean, your playground."}
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                {fr
                  ? "Installé sur le port de Saint-Gilles-les-Bains, Corail Plongée accueille débutants et plongeurs confirmés toute l’année. Une équipe de moniteurs diplômés d’État vous guide entre récifs, tombants volcaniques et épaves."
                  : "Based in Saint-Gilles-les-Bains marina, Corail Plongée welcomes beginners and experienced divers all year round. State-qualified instructors guide you across reefs, volcanic drop-offs and wrecks."}
              </p>
              <Link className="text-link" href={fr ? "/qui-sommes-nous/" : "/en/about-us/"}>
                {fr ? "Découvrir le centre" : "Discover the centre"} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="shell fact-row">
            <div><strong>2</strong><span>{fr ? "bateaux couverts" : "covered boats"}</span></div>
            <div><strong>45</strong><span>{fr ? "équipements complets" : "complete equipment sets"}</span></div>
            <div><strong>7/7</strong><span>{fr ? "en saison" : "in season"}</span></div>
            <div><strong>Nitrox</strong><span>{fr ? "disponible au centre" : "available on site"}</span></div>
          </div>
        </section>

        <section id="experiences" className="experiences-section section-shell">
          <div className="shell section-heading split-heading">
            <div>
              <p className="eyebrow">{fr ? "Toutes les façons de plonger" : "Every way to dive"}</p>
              <h2>{fr ? "Choisissez votre profondeur." : "Choose your depth."}</h2>
            </div>
            <p>
              {fr
                ? "Une expérience adaptée à votre niveau, votre envie et votre rythme — toujours avec la même attention à la sécurité."
                : "An experience shaped around your level, your goals and your pace — always with the same care for safety."}
            </p>
          </div>
          <div className="shell service-grid">
            {services.map((service, index) => (
              <article className={`service-card service-card-${index + 1}`} key={service.key}>
                <Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                <div className="card-shade" />
                <div className="service-card-content">
                  <p>{service.eyebrow[locale]}</p>
                  <h3>{service.title[locale]}</h3>
                  <span>{service.text[locale]}</span>
                  <div className="card-links">
                    <Link href={service.href[locale]}>{fr ? "En savoir plus" : "Learn more"}</Link>
                    <a href={bookingLinks[service.bookingKey]} target="_blank" rel="noreferrer">
                      {fr ? "Réserver" : "Book"} <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="events-section section-shell">
          <div className="shell events-layout">
            <div className="events-visual">
              <Image src="/images/hero/underwater-reunion.jpg" alt={fr ? "Vie marine à La Réunion" : "Marine life in Reunion Island"} fill sizes="(max-width: 800px) 100vw, 50vw" />
              <div className="events-stamp"><Waves /><span>{fr ? "Programme de la semaine" : "This week’s programme"}</span></div>
            </div>
            <div className="events-copy">
              <p className="eyebrow coral">{fr ? "Sorties à thème" : "Themed dives"}</p>
              <h2>{fr ? "Cette semaine sous l’eau." : "This week underwater."}</h2>
              {events.length ? (
                <div className="event-list">
                  {events.map((event) => (
                    <article key={event.id}>
                      <CalendarDays />
                      <div>
                        <time dateTime={event.starts_at}>
                          {new Intl.DateTimeFormat(fr ? "fr-FR" : "en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Indian/Reunion" }).format(new Date(event.starts_at))}
                        </time>
                        <h3>{fr ? event.title_fr : event.title_en}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="event-placeholder">
                  <CalendarDays />
                  <div>
                    <h3>{fr ? "Le prochain programme arrive" : "The next programme is coming"}</h3>
                    <p>{fr ? "Consultez l’agenda de réservation pour les créneaux disponibles." : "Check the booking calendar for available sessions."}</p>
                  </div>
                </div>
              )}
              <div className="inline-buttons">
                <BookingCta href={bookingLinks.agenda}>{fr ? "Voir l’agenda" : "View calendar"}</BookingCta>
                <Link className="text-link light-link" href={fr ? "/evenements/" : "/en/our-events/"}>{fr ? "Tous les évènements" : "All events"} <ArrowRight size={18} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="prices-section section-shell">
          <div className="shell section-heading split-heading">
            <div>
              <p className="eyebrow">{fr ? "Tarifs essentiels" : "Essential rates"}</p>
              <h2>{fr ? "Une offre claire, l’océan en plus." : "Clear choices. Ocean included."}</h2>
            </div>
            <p>{fr ? "Matériel et accompagnement selon la prestation. Les tarifs complets détaillent les prérequis et suppléments." : "Equipment and guidance depend on the activity. Full rates include prerequisites and extras."}</p>
          </div>
          <div className="shell price-list">
            {prices.slice(0, 7).map((price) => (
              <a href={bookingLinks[price.booking_link_key as BookingKey] ?? bookingLinks.main_booking} target="_blank" rel="noreferrer" key={price.id}>
                <span className="price-category">{price.category}</span>
                <strong>{fr ? price.label_fr : price.label_en}</strong>
                <span className="price-amount">{formatPrice(price.amount_cents, locale)} <ArrowRight /></span>
              </a>
            ))}
          </div>
          <div className="shell prices-footer">
            <p>{fr ? "Certificat médical nécessaire pour les formations. Licence FFESSM en supplément selon certification." : "Medical certificate required for training. FFESSM licence may be charged separately."}</p>
            <Link className="button button-navy" href={fr ? "/nos-tarifs/" : "/en/rates/"}>{fr ? "Voir tous les tarifs" : "View all rates"}</Link>
          </div>
        </section>

        <section className="about-section section-shell">
          <div className="shell about-layout">
            <div className="about-copy">
              <p className="eyebrow light">{fr ? "Ici, on plonge vraiment" : "This is where we dive"}</p>
              <h2>{fr ? "Une équipe passionnée. Un centre à taille humaine." : "A passionate team. A human-sized centre."}</h2>
              <p>{fr ? "Au départ du port, tout est pensé pour que votre plongée soit simple : vestiaires, douche chaude, stockage, salle de cours et café après la sortie." : "From the marina, everything is designed to make diving easy: lockers, hot shower, storage, classroom and coffee after your dive."}</p>
              <ul>
                <li><ShieldCheck /> {fr ? "Moniteurs diplômés d’État" : "State-qualified instructors"}</li>
                <li><UsersRound /> {fr ? "Accueil adultes et enfants" : "Adults and children welcome"}</li>
                <li><Compass /> {fr ? "Sites variés sur la côte ouest" : "Varied sites along the west coast"}</li>
              </ul>
              <Link className="button button-outline-light" href={fr ? "/qui-sommes-nous/" : "/en/about-us/"}>{fr ? "Rencontrer l’équipe" : "Meet the team"}</Link>
            </div>
            <div className="about-image">
              <Image src="/images/about/team-center.jpg" alt={fr ? "Centre Corail Plongée au port de Saint-Gilles" : "Corail Plongée centre at Saint-Gilles marina"} fill sizes="(max-width: 800px) 100vw, 50vw" />
            </div>
          </div>
        </section>

        <section className="journey-section section-shell">
          <div className="shell center-heading">
            <p className="eyebrow">{fr ? "Votre prochaine immersion" : "Your next dive"}</p>
            <h2>{fr ? "Trois étapes. Et vous y êtes." : "Three steps. Then you’re in."}</h2>
          </div>
          <div className="shell journey-steps">
            <div><span>01</span><Clock3 /><h3>{fr ? "Choisissez" : "Choose"}</h3><p>{fr ? "Votre expérience et votre créneau." : "Your experience and time slot."}</p></div>
            <div><span>02</span><Check /><h3>{fr ? "Réservez" : "Book"}</h3><p>{fr ? "Directement sur notre agenda sécurisé." : "Directly through our secure calendar."}</p></div>
            <div><span>03</span><Waves /><h3>{fr ? "Plongez" : "Dive"}</h3><p>{fr ? "On prépare le reste au port." : "We prepare everything at the marina."}</p></div>
          </div>
          <div className="center-button"><BookingCta href={bookingLinks.main_booking}>{fr ? "Je réserve" : "Book now"}</BookingCta></div>
        </section>

        <PartnerStrip />

        <section className="newsletter-section section-shell">
          <div className="shell newsletter-card">
            <div>
              <p className="eyebrow coral">{fr ? "La lettre du large" : "News from the blue"}</p>
              <h2>{fr ? "Des nouvelles de l’océan, rarement. De belles images, toujours." : "Ocean news, occasionally. Beautiful images, always."}</h2>
            </div>
            <div className="newsletter-placeholder">
              <label htmlFor="newsletter-email">Email</label>
              <div><input id="newsletter-email" type="email" placeholder="vous@exemple.fr" disabled /><button disabled>{fr ? "Bientôt disponible" : "Coming soon"}</button></div>
              <small>{fr ? "L’inscription sera activée après validation de l’outil newsletter actuel." : "Subscriptions will open once the current newsletter tool is confirmed."}</small>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
