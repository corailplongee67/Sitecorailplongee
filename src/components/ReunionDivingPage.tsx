import Image from "next/image";
import { ArrowUpRight, CalendarDays, Droplets, Eye, ThermometerSun } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const diveEnvironments = [
  {
    id: "recifs-coralliens",
    title: "Les récifs coralliens",
    image: "/images/reunion/original/recifs.webp",
    alt: "Récif corallien coloré avec poissons tropicaux nageant dans une eau bleue",
    paragraphs: [
      "Des plongées sympathiques, du débutant au chevronné, la côte sous le vent de St-Paul à St-Leu, propose des plongées hautes en couleurs, à la vie foisonnante.",
      "C’est sur la face externe du récif corallien que l’on peut admirer l’ensemble complexe de la vie.",
      "Corail noir, corail de feu, gorgones jaunes, rouges, oranges vous attendent pour un véritable festival de couleurs. La vie est luxuriante, murènes java, loches, poissons anges, bénitiers, langoustes, un aquarium grandeur nature encore préservé des grands pôles touristiques de la plongée.",
    ],
  },
  {
    id: "tombants",
    title: "Les tombants",
    image: "/images/reunion/original/tombants.webp",
    alt: "Plongeur en apnée près d’un récif corallien avec des poissons rouges",
    reverse: true,
    paragraphs: [
      "Le long de la côte sous le vent, les tombants sont nombreux et variés. Entre 15 et 40 m, le choix est grand et comblera même les plus exigeants. Ce qui impressionnera, c’est la luminosité de l’eau et sa clarté.",
      "Vous pourrez admirer lors de vos promenades sous-marines, une quantité de poissons : nasons, lutjans, chirurgiens, plathax…",
      "Les plongées à la Réunion vous séduiront par leur diversité et leur qualité.",
    ],
  },
  {
    id: "grottes",
    title: "Les grottes",
    image: "/images/reunion/original/grottes.webp",
    alt: "Plongeurs explorant une grotte sous-marine éclairée par la lumière du soleil",
    paragraphs: [
      "Entre le pain de sucre, la cheminée, les trois failles, et bien d’autres, vous pourrez profiter de plongées exceptionnelles où les jeux de lumières vous raviront.",
      "En effet, laissez vous aller entre les failles et les grottes de toutes tailles, laissez vous séduire par la beauté des lieux.",
      "Extrêmement riche, différent à chaque fois, le relief sous marin vous conduira de surprise en surprise.",
    ],
  },
  {
    id: "epaves",
    title: "Les épaves",
    image: "/images/reunion/original/epaves.webp",
    alt: "Épave de bateau sous-marin entourée de poissons, plongeur visible au loin",
    reverse: true,
    paragraphs: [
      "Quelques épaves, le Hïa Sïang, le Navarra , la Barge, finiront de vous combler. Ces havres de paix, riches en flores et en faunes sous-marines terminent agréablement le tableau.",
    ],
  },
] as const;

export function ReunionDivingPage({ bookingLinks }: { bookingLinks: BookingLinks }) {
  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="reunion-origin-main">
        <section className="reunion-origin-hero">
          <Image
            src="/images/reunion/original/hero.jpg"
            alt="Fonds marins de La Réunion"
            fill
            priority
            sizes="100vw"
          />
          <div className="reunion-origin-hero-shade" />
          <div className="shell reunion-origin-hero-copy">
            <p className="eyebrow light">Corail Plongée Réunion</p>
            <h1>Plonger Réunion</h1>
            <p>Centre de plongée sous-marine sur l’île de la Réunion</p>
          </div>
        </section>

        <section className="reunion-origin-conditions" id="content">
          <Image
            className="reunion-origin-decoration reunion-origin-decoration-coral"
            src="/images/reunion/original/coral-decoration.png"
            alt=""
            width={186}
            height={372}
          />
          <div className="shell reunion-origin-conditions-grid">
            <header>
              <p className="eyebrow coral">365 jours de plongée</p>
              <h2>Les conditions</h2>
              <p className="reunion-origin-conditions-lead">Deux types de plongées sont proposés :</p>
            </header>
            <div className="reunion-origin-coasts">
              <article>
                <span>01</span>
                <h3>La côte sous le vent</h3>
                <p>
                  À l’ouest, sur la côte sous le vent, le lagon corallien a fait surgir des flots
                  un récif barrière. Au large, la plongée se pratique sur la pente externe de celui-ci.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>La côte au vent</h3>
                <p>
                  À l’est, sur la côte au vent, les plongées seront plus sportives qu’ailleurs,
                  mais non dénuées de charmes.
                </p>
              </article>
            </div>
            <div className="reunion-origin-facts">
              <div><CalendarDays aria-hidden="true" /><strong>365</strong><span>jours par an</span></div>
              <div><ThermometerSun aria-hidden="true" /><strong>24–30°</strong><span>température de l’eau</span></div>
              <div><Eye aria-hidden="true" /><strong>Excellente</strong><span>visibilité</span></div>
            </div>
            <p className="reunion-origin-condition-note">
              Sur la côte sous le vent, les conditions de plongées sont idéales, possibles 365
              jours par an, avec une température de l’eau qui évolue entre 24 et 30°, et une
              visibilité excellente.
            </p>
          </div>
        </section>

        <section className="reunion-origin-environments">
          <div className="shell reunion-origin-environments-heading">
            <p className="eyebrow light">Un relief sous-marin d’exception</p>
            <h2>Quatre univers à explorer</h2>
          </div>
          {diveEnvironments.map((environment, index) => (
            <article
              className={`reunion-origin-environment${"reverse" in environment && environment.reverse ? " is-reverse" : ""}`}
              id={environment.id}
              key={environment.id}
            >
              <div className="shell reunion-origin-environment-grid">
                <div className="reunion-origin-environment-image">
                  <Image
                    src={environment.image}
                    alt={environment.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
                <div className="reunion-origin-environment-copy">
                  <p className="reunion-origin-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{environment.title}</h3>
                  <span className="reunion-origin-rule" aria-hidden="true" />
                  {environment.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="reunion-origin-pelagics">
          <Image
            src="/images/reunion/original/pelagiques.webp"
            alt="Requin entouré de poissons dans l’océan bleu"
            fill
            sizes="100vw"
          />
          <div className="reunion-origin-pelagics-shade" />
          <Image
            className="reunion-origin-decoration reunion-origin-decoration-turtle"
            src="/images/reunion/original/turtle-decoration.png"
            alt=""
            width={253}
            height={416}
          />
          <div className="shell reunion-origin-pelagics-copy">
            <div className="reunion-origin-pelagics-icon"><Droplets aria-hidden="true" /></div>
            <p className="eyebrow light">Le grand cinéma de l’océan Indien</p>
            <h2>Les pélagiques</h2>
            <p>
              Enfin et pour finir, le grand cinéma vous offre la possibilité de plonger avec les
              baleines et les dauphins à certaines périodes de l’année.
            </p>
            <p>
              En effet, dès le mois de juillet, ces mammifères se donnent rendez-vous au large de
              St-Gilles pour notre plus grand bonheur.
            </p>
            <p>
              Néanmoins, tout au long de l’année, vous pourrez admirer les pélagiques, thons,
              barracudas, carrangues…
            </p>
            <a className="button button-coral" href={bookingLinks.shop} target="_blank" rel="noreferrer">
              Je réserve <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
