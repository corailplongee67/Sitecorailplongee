import { SiteImage as Image } from "./SiteImage";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, MapPin, Waves } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { PublicCatalogPrice } from "@/lib/pricing-data";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

export function ExplorationPage({
  bookingLinks,
  prices,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  prices: PublicCatalogPrice[];
  locale?: "fr" | "en";
}) {
  const en = locale === "en";
  const explorationPrices = prices.filter((price) => price.section_code === "exploration");
  const guidedCount = explorationPrices.filter((price) => price.price_column === "guided").length;
  const autonomousCount = explorationPrices.filter((price) => price.price_column === "autonomous").length;

  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="exploration-origin-main">
        <section className="exploration-origin-hero">
          <Image
            src="/images/exploration/original/hero.jpg"
            alt={en ? "Divers exploring a reef with a school of fish" : "Plongeurs explorant un récif au milieu d’un banc de poissons"}
            fill
            priority
            sizes="100vw"
          />
          <div className="exploration-origin-hero-shade" />
          <div className="shell exploration-origin-hero-copy">
            <p className="eyebrow light">{en ? "Guided or autonomous" : "Encadrée ou autonome"}</p>
            <h1>{en ? "Exploration diving" : "Plongée exploration"}</h1>
            <p>{en ? "Discover the underwater landscapes of Reunion Island from Saint-Gilles-les-Bains." : "Découvrez les paysages sous-marins de La Réunion depuis Saint-Gilles-les-Bains."}</p>
          </div>
        </section>

        <section className="exploration-story section-shell">
          <div className="shell exploration-story-intro">
            <div>
              <p className="eyebrow">{en ? "The Indian Ocean, in all its variety" : "L’océan Indien dans toute sa diversité"}</p>
              <h2>{en ? "A new site with every dive." : "À chaque plongée, un nouveau site."}</h2>
            </div>
            <p>
              {en
                ? "Corail Plongée organises exploration dives from Saint-Gilles-les-Bains for guided and autonomous divers. The outings reveal the reefs and reliefs of the west coast, with particular emphasis on the outer slope and its marine life."
                : "Corail Plongée organise des plongées d’exploration au départ de Saint-Gilles-les-Bains, pour les plongeurs encadrés comme autonomes. Les sorties dévoilent les récifs et les reliefs de la côte ouest, avec une place particulière accordée à la pente externe et à sa vie marine."}
            </p>
          </div>

          <div className="shell exploration-story-visual">
            <Image
              src="/images/about/original/materiel.jpg"
              alt={en ? "Diver above the coral reef of Reunion Island" : "Plongeur au-dessus du récif corallien de La Réunion"}
              fill
              sizes="(max-width: 760px) 100vw, 1280px"
            />
            <div className="exploration-story-visual-label">
              <Waves aria-hidden="true" />
              <span>{en ? "Reefs · outer slope · open water" : "Récifs · pente externe · pleine eau"}</span>
            </div>
          </div>
        </section>

        <section className="exploration-principle section-shell">
          <div className="shell exploration-principle-grid">
            <div className="exploration-principle-heading">
              <p className="eyebrow">{en ? "The principle" : "Le principe"}</p>
              <h2>{en ? "Dive according to your experience." : "Plongez selon votre expérience."}</h2>
              <p>
                {en
                  ? "Choose a guided exploration with an instructor or dive autonomously within the scope of your certification. The team guides you towards the suitable formula and presents the selected site before departure."
                  : "Choisissez une exploration encadrée avec un moniteur ou plongez en autonomie dans le cadre de votre certification. L’équipe vous oriente vers la formule adaptée et vous présente le site retenu avant le départ."}
              </p>
            </div>

            <div className="exploration-principle-options">
              <article>
                <span>01</span>
                <h3>{en ? "Guided exploration" : "Exploration encadrée"}</h3>
                <p>{en ? "Discover the site accompanied by a Corail Plongée instructor." : "Découvrez le site accompagné par un moniteur de Corail Plongée."}</p>
              </article>
              <article>
                <span>02</span>
                <h3>{en ? "Autonomous exploration" : "Exploration autonome"}</h3>
                <p>{en ? "Explore as a buddy team within the scope of your diving certification." : "Explorez en palanquée dans le cadre de votre certification de plongée."}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="exploration-flow section-shell">
          <div className="shell">
            <header className="exploration-flow-heading">
              <p className="eyebrow">{en ? "Your outing" : "Votre sortie"}</p>
              <h2>{en ? "From the marina to the reef." : "Du port au récif."}</h2>
            </header>
            <div className="exploration-flow-steps">
              <article><span>01</span><h3>{en ? "Welcome" : "Accueil"}</h3><p>{en ? "Meet the team at Saint-Gilles-les-Bains marina." : "Retrouvez l’équipe au port de Saint-Gilles-les-Bains."}</p></article>
              <article><span>02</span><h3>{en ? "Preparation" : "Préparation"}</h3><p>{en ? "The site and the organisation of the dive are presented before departure." : "Le site et l’organisation de la plongée sont présentés avant le départ."}</p></article>
              <article><span>03</span><h3>{en ? "Exploration" : "Exploration"}</h3><p>{en ? "Enjoy the reliefs and marine life of Reunion Island’s west coast." : "Profitez des reliefs et de la vie marine de la côte ouest de La Réunion."}</p></article>
            </div>
          </div>
        </section>

        <section className="exploration-practical section-shell">
          <div className="shell exploration-practical-grid">
            <div className="exploration-practical-copy">
              <p className="eyebrow">{en ? "Practical information" : "Informations pratiques"}</p>
              <h2>{en ? "Choose your next exploration." : "Choisissez votre prochaine exploration."}</h2>
              <p>{en ? "All available packages and exact prices are listed on the rates page and remain updated from the centre’s catalogue." : "Toutes les formules disponibles et leurs tarifs exacts sont regroupés sur la page Tarifs et restent mis à jour depuis le catalogue du centre."}</p>
              <div className="exploration-practical-actions">
                <a className="button exploration-origin-book" href={bookingLinks.exploration_booking} target="_blank" rel="noreferrer">
                  {en ? "Book an exploration" : "Réserver une exploration"} <ArrowUpRight aria-hidden="true" size={18} />
                </a>
                <Link className="button button-outline" href={en ? "/en/rates/#exploration" : "/nos-tarifs/#exploration"}>
                  {en ? "View all rates" : "Voir tous les tarifs"} <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </div>
            </div>

            <div className="exploration-practical-facts">
              <article><MapPin aria-hidden="true" /><div><strong>{en ? "Departure" : "Départ"}</strong><span>Saint-Gilles-les-Bains</span></div></article>
              <article><Compass aria-hidden="true" /><div><strong>{en ? "Environment" : "Environnement"}</strong><span>{en ? "West-coast reefs and outer slope" : "Récifs de la côte ouest et pente externe"}</span></div></article>
              <article><Waves aria-hidden="true" /><div><strong>{en ? "Relevant formula" : "Formule concernée"}</strong><span>{en ? "Exploration from 0 to 20 metres" : "Exploration de 0 à 20 mètres"}</span></div></article>
              <article className="exploration-practical-catalog"><div><strong>{en ? "Available packages" : "Formules disponibles"}</strong><span>{en ? `${guidedCount} guided · ${autonomousCount} autonomous` : `${guidedCount} encadrées · ${autonomousCount} autonomes`}</span></div></article>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
