import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const frenchOffers = [
  {
    title: "Découverte",
    description:
      "L’immersion en baptême se déroule entre 0 et 6 m, vous permettant ainsi de profiter pleinement de cette première expérience.",
    image: "/images/services/original/discovery.jpg",
    href: "/decouverte/",
    alt: "Poisson tropical coloré dans les eaux de La Réunion",
  },
  {
    title: "Les formations SSI international",
    description: "Les formations spécialisées",
    image: "/images/services/original/ssi-training.jpg",
    href: "/formation_ssi/",
    alt: "Banc de poissons-clowns dans une anémone",
  },
  {
    title: "Formations française",
    description: "Les formations spécialisées",
    image: "/images/services/original/french-training.jpg",
    href: "/formation-francaise/",
    alt: "Poisson-clown au milieu d’une anémone",
  },
  {
    title: "Les forfaits d’exploration",
    description: "Exploration encadrée",
    image: "/images/services/original/exploration.jpg",
    href: "/je-plonge-autonome/",
    alt: "Poisson-papillon au-dessus d’un récif corallien",
  },
  {
    title: "Passerelle",
    description: "Passerelle diplôme SSI International vers diplôme français",
    image: "/images/services/original/crossover.jpg",
    href: "/passerelle/",
    alt: "Poissons tropicaux et coraux colorés",
  },
  {
    title: "Sortie cétacés",
    description: "Une rencontre exceptionnelle avec les cétacés.",
    image: "/images/services/original/cetaceans.jpg",
    href: "/sorties-cetaces-2/",
    alt: "Étoile de mer rose dans l’océan Indien",
  },
] as const;

const englishOffers = [
  {
    title: "Baptisms",
    description:
      "Corail Plongée Reunion makes you discover the Indian Ocean and its richness all year long. First dives and training courses for all levels…",
    image: "/images/services/original/discovery.jpg",
    href: "/en/discover/",
    alt: "Colorful tropical fish in Reunion Island waters",
  },
  {
    title: "SSI training courses",
    description: "Specialized training courses",
    image: "/images/services/original/ssi-training.jpg",
    href: "/en/ssi_training-course/",
    alt: "Clownfish gathered in an anemone",
  },
  {
    title: "French training",
    description: "Specialized training",
    image: "/images/services/original/french-training.jpg",
    href: "/en/french-training/",
    alt: "Clownfish among the tentacles of an anemone",
  },
  {
    title: "Exploration packages",
    description: "Guided exploration",
    image: "/images/services/original/exploration.jpg",
    href: "/en/i-dive/",
    alt: "Butterflyfish above a coral reef",
  },
  {
    title: "Continual courses",
    description: "Bridge from SSI International diploma to French diploma",
    image: "/images/services/original/crossover.jpg",
    href: "/en/continual-course/",
    alt: "Tropical fish and colorful coral",
  },
  {
    title: "Cetacean excursion",
    description: "An exceptional experience with cetaceans.",
    image: "/images/services/original/cetaceans.jpg",
    href: "/en/cetacean-excursions/",
    alt: "Pink starfish in the Indian Ocean",
  },
] as const;

export function ServicesPage({
  bookingLinks,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  locale?: "fr" | "en";
}) {
  const isEnglish = locale === "en";
  const offers = isEnglish ? englishOffers : frenchOffers;
  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="services-origin-main">
        <section className="services-origin-hero">
          <Image
            src="/images/services/original/hero.jpg"
            alt={isEnglish
              ? "Coral reef and tropical fish in the Indian Ocean"
              : "Récif corallien et poissons tropicaux dans l’océan Indien"}
            fill
            priority
            sizes="100vw"
          />
          <div className="services-origin-hero-shade" />
          <div className="shell services-origin-hero-copy">
            <p className="eyebrow light">Corail Plongée · {isEnglish ? "Reunion Island" : "La Réunion"}</p>
            <h1>{isEnglish ? "Our services" : "Nos prestations"}</h1>
          </div>
        </section>

        <section className="services-origin-content" id="content">
          <div className="shell">
            <header className="services-origin-intro">
              <p className="eyebrow">Corail Plongée La Réunion</p>
              <h2>{isEnglish ? "Discover activities" : "Découvrez notre activité"}</h2>
              <p>
                {isEnglish
                  ? "Corail Plongée Reunion makes you discover the Indian Ocean and its richness all year long. First dives, training courses for all levels… Take advantage of the exceptional setting of Reunion Island and offer yourself an extraordinary experience. FFESSM and SSI training courses are also available."
                  : "Corail Plongée Réunion vous fait découvrir l’océan Indien et ses richesses tout au long de l’année. Baptêmes de plongée, formations tous niveaux… Profitez du cadre exceptionnel de La Réunion et offrez-vous une expérience hors du commun. Formations FFESSM et SSI possibles."}
              </p>
            </header>

            <div className="services-origin-grid">
              {offers.map((offer, index) => (
                <article className="services-origin-card" key={offer.href}>
                  <div className="services-origin-card-image">
                    <Image
                      src={offer.image}
                      alt={offer.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="services-origin-card-shade" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="services-origin-card-copy">
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <Link href={offer.href}>
                      {isEnglish ? "Learn more" : "En savoir plus"} <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
