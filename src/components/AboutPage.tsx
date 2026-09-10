import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Footer, PartnerStrip } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const sections = [
  {
    id: "centre",
    title: "Le centre de plongée",
    image: "/images/about/original/centre.jpg",
    imageAlt: "Le centre Corail Plongée sur le port de Saint-Gilles-les-Bains",
    caption: "Centre Corail Plongée sur le port de Saint-Gilles-les-Bains",
    paragraphs: [
      <>
        Corail Plongée est un centre de plongée sous-marine à La Réunion, situé
        sur le port de Saint-Gilles-les-Bains. Nous sommes ouverts toute l’année
        de <strong>7h30 à 16h30 (12h le dimanche).</strong>
      </>,
      <>
        Nous sommes ravis de partager avec vous notre passion de la plongée sur
        les nombreux sites qu’offre notre île…
      </>,
    ],
  },
  {
    id: "agrements",
    title: "Les agréments",
    image: "/images/about/original/agrements.jpg",
    imageAlt: "Plongeur au-dessus du récif de La Réunion",
    reverse: true,
    paragraphs: [
      <>
        Nous sommes adhérents à la charte Réunion Qualité Tourisme, agréée par
        le Ministère de la Jeunesse et des Sports N° ET94.003.
      </>,
      <>Les moniteurs de notre centre sont tous diplomés d’état.</>,
      <>N° siret 42050512500013.</>,
    ],
  },
  {
    id: "materiel",
    title: "Le matériel",
    image: "/images/about/original/materiel.jpg",
    imageAlt: "Plongeur équipé au-dessus d’un récif corallien",
    paragraphs: [
      <>
        Corail Plongée dispose de 45 ensembles complets d’équipements de plongée
        SCUBAPRO ; (palmes, masques, tubas, gilets stabilisateurs, détendeurs avec
        octopus). Des ordinateurs et parachutes sont disponibles.
      </>,
      <>Nous avons deux options pour les combinaisons ; 3 mm longues ou shorty.</>,
      <>
        Nos bouteilles sont toutes en acier, vous pouvez choisir entre 10L, 12L
        (court ou long) ou 15L.
      </>,
      <>Des tailles enfants sont disponibles.</>,
    ],
  },
  {
    id: "bateaux",
    title: "Les bateaux",
    image: "/images/about/original/bateaux.jpg",
    imageAlt: "Les deux bateaux de Corail Plongée devant le centre",
    caption: "Nos 2 bateaux Corail Plongée en face du local à Saint-Gilles-les-Bains",
    reverse: true,
    paragraphs: [
      <>
        Nos deux bateaux sont couverts pour se protéger du soleil. Ils peuvent
        accueillir 20 plongeurs chacun. Ils sont entièrement équipés du matériel
        de sécurité (oxygénothérapie, VHF, trousse de secours).
      </>,
    ],
  },
  {
    id: "local",
    title: "Le local",
    image: "/images/about/original/local.jpg",
    imageAlt: "L’accueil et le local de Corail Plongée",
    paragraphs: [
      <>Des casiers sont prévus pour vos effets personels pendant que vous êtes en mer.</>,
      <>
        Un espace de stockage est disponible pour les personnes ayant leur propre
        matériel.
      </>,
      <>
        Une salle de classe est à votre disposition pour nos formations fédérales
        et internationales (SSI).
      </>,
      <>
        Après la plongée, vous pourrez vous détendre en prenant une douche chaude,
        en prenant un café gratuit ou en feuilletant quelques livres de notre
        bibliothèque.
      </>,
      <>
        Vous pouvez réserver vos plongées directement au centre, par téléphone,
        ou sur notre site internet.
      </>,
    ],
  },
] as const;

const team = [
  { name: "Chris", role: "The boss", image: "/images/about/original/equipe-chris.jpg" },
  { name: "Jennifer", role: "Monitrice de plongée", image: "/images/about/original/equipe-jennifer.jpg" },
  { name: "Christophe", role: "Moniteur de plongée", image: "/images/about/original/equipe-christophe.jpg" },
  { name: "Popote", role: "Macgyver", image: "/images/about/original/equipe-popote.jpg" },
] as const;

export function AboutPage({ bookingLinks }: { bookingLinks: BookingLinks }) {
  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="about-origin-main">
        <section className="about-origin-hero">
          <Image
            src="/images/hero/corail-reef.jpg"
            alt="Récif corallien de La Réunion"
            fill
            priority
            sizes="100vw"
          />
          <div className="about-origin-hero-shade" />
          <div className="shell about-origin-hero-copy">
            <p className="eyebrow light">Corail Plongée · La Réunion</p>
            <h1>Qui sommes-nous&nbsp;?</h1>
          </div>
        </section>

        <div className="about-origin-story">
          {sections.map((section, index) => (
            <section
              className={`about-origin-section${"reverse" in section && section.reverse ? " is-reverse" : ""}`}
              id={section.id}
              key={section.id}
            >
              <div className="shell about-origin-grid">
                <figure className="about-origin-visual">
                  <div className="about-origin-image">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                  {"caption" in section ? <figcaption>{section.caption}</figcaption> : null}
                </figure>
                <div className="about-origin-copy">
                  <p className="about-origin-number" aria-hidden="true">0{index + 1}</p>
                  <h2>{section.title}</h2>
                  <span className="about-origin-rule" aria-hidden="true" />
                  <div className="about-origin-paragraphs">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="about-origin-team section-shell">
          <div className="shell">
            <div className="about-origin-team-heading">
              <div>
                <p className="eyebrow light">Des passionnés à votre écoute</p>
                <h2>L’équipe Corail Plongée</h2>
              </div>
              <p>
                Une équipe de professionnels pour vous accompagner à la découverte
                des fonds marins de La Réunion.
              </p>
            </div>
            <div className="about-origin-team-grid">
              {team.map((member) => (
                <article className="about-origin-team-card" key={member.name}>
                  <div className="about-origin-team-image">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role} chez Corail Plongée`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    />
                  </div>
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-origin-cta section-shell">
          <div className="shell about-origin-cta-inner">
            <div>
              <p className="eyebrow coral">Prêt à plonger&nbsp;?</p>
              <h2>À bientôt pour de nouvelles bulles&nbsp;!</h2>
            </div>
            <a
              className="button button-coral"
              href={bookingLinks.main_booking}
              target="_blank"
              rel="noreferrer"
            >
              Je réserve
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>
      </main>
      <PartnerStrip />
      <Footer locale="fr" />
    </>
  );
}
