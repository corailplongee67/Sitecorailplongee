import { PreviewText } from "./PreviewText";
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
            <p className="eyebrow light"><PreviewText id="ExplorationPage.b12e8a570d96.1">{en ? "Guided or autonomous" : "Encadrée ou autonome"}</PreviewText></p>
            <h1><PreviewText id="ExplorationPage.d164b4745f52.1">{en ? "Exploration diving" : "Plongée exploration"}</PreviewText></h1>
            <p><PreviewText id="ExplorationPage.5ad9b6101329.1">{en ? "Discover the underwater landscapes of Reunion Island from Saint-Gilles-les-Bains." : "Découvrez les paysages sous-marins de La Réunion depuis Saint-Gilles-les-Bains."}</PreviewText></p>
          </div>
        </section>

        <section className="exploration-story section-shell">
          <div className="shell exploration-story-intro">
            <div>
              <p className="eyebrow"><PreviewText id="ExplorationPage.e48b898338d8.1">{en ? "The Indian Ocean, in all its variety" : "L’océan Indien dans toute sa diversité"}</PreviewText></p>
              <h2><PreviewText id="ExplorationPage.d8e8d40d3a1f.1">{en ? "A new site with every dive." : "À chaque plongée, un nouveau site."}</PreviewText></h2>
            </div>
            <p>
              <PreviewText id="ExplorationPage.ff62a380b662.1">{en
                ? "Corail Plongée organises exploration dives from Saint-Gilles-les-Bains for guided and autonomous divers. The outings reveal the reefs and reliefs of the west coast, with particular emphasis on the outer slope and its marine life."
                : "Corail Plongée organise des plongées d’exploration au départ de Saint-Gilles-les-Bains, pour les plongeurs encadrés comme autonomes. Les sorties dévoilent les récifs et les reliefs de la côte ouest, avec une place particulière accordée à la pente externe et à sa vie marine."}</PreviewText>
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
              <span><PreviewText id="exploration.hero.description">{en ? "Reefs · outer slope · open water" : "Récifs · pente externe · pleine eau"}</PreviewText></span>
            </div>
          </div>
        </section>

        <section className="exploration-principle section-shell">
          <div className="shell exploration-principle-grid">
            <div className="exploration-principle-heading">
              <p className="eyebrow"><PreviewText id="ExplorationPage.ce1f73f6dc03.1">{en ? "The principle" : "Le principe"}</PreviewText></p>
              <h2><PreviewText id="ExplorationPage.896b9f62f194.1">{en ? "Dive according to your experience." : "Plongez selon votre expérience."}</PreviewText></h2>
              <p>
                <PreviewText id="ExplorationPage.17763aa1e795.1">{en
                  ? "Choose a guided exploration with an instructor or dive autonomously within the scope of your certification. The team guides you towards the suitable formula and presents the selected site before departure."
                  : "Choisissez une exploration encadrée avec un moniteur ou plongez en autonomie dans le cadre de votre certification. L’équipe vous oriente vers la formule adaptée et vous présente le site retenu avant le départ."}</PreviewText>
              </p>
            </div>

            <div className="exploration-principle-options">
              <article>
                <span>01</span>
                <h3><PreviewText id="ExplorationPage.794aa1334ffa.1">{en ? "Guided exploration" : "Exploration encadrée"}</PreviewText></h3>
                <p><PreviewText id="ExplorationPage.a34e1a719e7f.1">{en ? "Discover the site accompanied by a Corail Plongée instructor." : "Découvrez le site accompagné par un moniteur de Corail Plongée."}</PreviewText></p>
              </article>
              <article>
                <span>02</span>
                <h3><PreviewText id="ExplorationPage.33c3c1840e96.1">{en ? "Autonomous exploration" : "Exploration autonome"}</PreviewText></h3>
                <p><PreviewText id="ExplorationPage.cfe790d83eb2.1">{en ? "Explore as a buddy team within the scope of your diving certification." : "Explorez en palanquée dans le cadre de votre certification de plongée."}</PreviewText></p>
              </article>
            </div>
          </div>
        </section>

        <section className="exploration-flow section-shell">
          <div className="shell">
            <header className="exploration-flow-heading">
              <p className="eyebrow"><PreviewText id="ExplorationPage.771faf0ce850.1">{en ? "Your outing" : "Votre sortie"}</PreviewText></p>
              <h2><PreviewText id="ExplorationPage.b9b451e4f841.1">{en ? "From the marina to the reef." : "Du port au récif."}</PreviewText></h2>
            </header>
            <div className="exploration-flow-steps">
              <article><span>01</span><h3><PreviewText id="ExplorationPage.b4cb83b9a8ad.1">{en ? "Welcome" : "Accueil"}</PreviewText></h3><p><PreviewText id="ExplorationPage.7f2d2c6c4318.1">{en ? "Meet the team at Saint-Gilles-les-Bains marina." : "Retrouvez l’équipe au port de Saint-Gilles-les-Bains."}</PreviewText></p></article>
              <article><span>02</span><h3><PreviewText id="ExplorationPage.d85bfb976ae2.1">{en ? "Preparation" : "Préparation"}</PreviewText></h3><p><PreviewText id="ExplorationPage.909b1c997d08.1">{en ? "The site and the organisation of the dive are presented before departure." : "Le site et l’organisation de la plongée sont présentés avant le départ."}</PreviewText></p></article>
              <article><span>03</span><h3><PreviewText id="ExplorationPage.610b7fc4e822.1">{en ? "Exploration" : "Exploration"}</PreviewText></h3><p><PreviewText id="ExplorationPage.5569775f878d.1">{en ? "Enjoy the reliefs and marine life of Reunion Island’s west coast." : "Profitez des reliefs et de la vie marine de la côte ouest de La Réunion."}</PreviewText></p></article>
            </div>
          </div>
        </section>

        <section className="exploration-practical section-shell">
          <div className="shell exploration-practical-grid">
            <div className="exploration-practical-copy">
              <p className="eyebrow"><PreviewText id="ExplorationPage.568b74b8afe6.1">{en ? "Practical information" : "Informations pratiques"}</PreviewText></p>
              <h2><PreviewText id="ExplorationPage.529054aed9e9.1">{en ? "Choose your next exploration." : "Choisissez votre prochaine exploration."}</PreviewText></h2>
              <p><PreviewText id="ExplorationPage.b23a29c9898b.1">{en ? "All available packages and exact prices are listed on the rates page and remain updated from the centre’s catalogue." : "Toutes les formules disponibles et leurs tarifs exacts sont regroupés sur la page Tarifs et restent mis à jour depuis le catalogue du centre."}</PreviewText></p>
              <div className="exploration-practical-actions">
                <a className="button exploration-origin-book" href={bookingLinks.exploration_booking} target="_blank" rel="noreferrer">
                  <PreviewText embedded id="ExplorationPage.link.ff6569c1a8d2.1">{en ? "Book an exploration" : "Réserver une exploration"}</PreviewText> <ArrowUpRight aria-hidden="true" size={18} />
                </a>
                <Link className="button button-outline" href={en ? "/en/rates/#exploration" : "/nos-tarifs/#exploration"}>
                  <PreviewText embedded id="ExplorationPage.link.a93ba166d969.1">{en ? "View all rates" : "Voir tous les tarifs"}</PreviewText> <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </div>
            </div>

            <div className="exploration-practical-facts">
              <article><MapPin aria-hidden="true" /><div><strong><PreviewText id="exploration.facts.departure.label">{en ? "Departure" : "Départ"}</PreviewText></strong><span><PreviewText id="exploration.facts.departure.value">Saint-Gilles-les-Bains</PreviewText></span></div></article>
              <article><Compass aria-hidden="true" /><div><strong><PreviewText id="exploration.facts.environment.label">{en ? "Environment" : "Environnement"}</PreviewText></strong><span><PreviewText id="exploration.facts.environment.value">{en ? "West-coast reefs and outer slope" : "Récifs de la côte ouest et pente externe"}</PreviewText></span></div></article>
              <article><Waves aria-hidden="true" /><div><strong><PreviewText id="exploration.facts.formula.label">{en ? "Relevant formula" : "Formule concernée"}</PreviewText></strong><span><PreviewText id="exploration.facts.formula.value">{en ? "Exploration from 0 to 20 metres" : "Exploration de 0 à 20 mètres"}</PreviewText></span></div></article>
              <article className="exploration-practical-catalog"><div><strong>{en ? "Available packages" : "Formules disponibles"}</strong><span>{en ? `${guidedCount} guided · ${autonomousCount} autonomous` : `${guidedCount} encadrées · ${autonomousCount} autonomes`}</span></div></article>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
