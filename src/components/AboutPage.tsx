import { PreviewText } from "./PreviewText";
import { OpeningHoursText } from "./OpeningHoursText";
import { AboutTeamImage } from "./AboutTeamImage";
import { SiteImage as Image } from "./SiteImage";
import { ArrowUpRight } from "lucide-react";
import { Footer, PartnerStrip } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const frenchSections = [
  {
    id: "centre",
    title: "Le centre de plongée",
    image: "/images/about/original/centre.jpg",
    imageAlt: "Le centre Corail Plongée sur le port de Saint-Gilles-les-Bains",
    caption: "Centre Corail Plongée sur le port de Saint-Gilles-les-Bains",
    paragraphs: [
      <>
        <PreviewText id="AboutPage.rich.1581e8766c4b.1">Corail Plongée est un centre de plongée sous-marine à La Réunion, situé
        sur le port de Saint-Gilles-les-Bains. Nous sommes ouverts toute l’année
        de </PreviewText><strong><PreviewText id="global.hours.weekdays">7h30 à 16h30</PreviewText>{" ("}<PreviewText id="global.hours.sunday">7h30 à 12h</PreviewText>{" le dimanche)."}</strong>
      </>,
      <>
        <PreviewText id="AboutPage.rich.e84c19d297e2.1">Nous sommes ravis de partager avec vous notre passion de la plongée sur
        les nombreux sites qu’offre notre île…
      </PreviewText></>,
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
        <PreviewText id="AboutPage.rich.86fb9f5bc48a.1">Nous sommes adhérents à la charte Réunion Qualité Tourisme, agréée par
        le Ministère de la Jeunesse et des Sports N° ET94.003.
      </PreviewText></>,
      <><PreviewText id="AboutPage.rich.af043119311b.1">Les moniteurs de notre centre sont tous diplomés d’état.</PreviewText></>,
      <><PreviewText id="AboutPage.rich.c98e09eb3cec.1">N° siret 42050512500013.</PreviewText></>,
    ],
  },
  {
    id: "materiel",
    title: "Le matériel",
    image: "/images/about/original/materiel.jpg",
    imageAlt: "Plongeur équipé au-dessus d’un récif corallien",
    paragraphs: [
      <>
        <PreviewText id="AboutPage.rich.024a6b4c472e.1">Corail Plongée dispose de 45 ensembles complets d’équipements de plongée
        SCUBAPRO ; (palmes, masques, tubas, gilets stabilisateurs, détendeurs avec
        octopus). Des ordinateurs et parachutes sont disponibles.
      </PreviewText></>,
      <><PreviewText id="AboutPage.rich.bb161840fdb2.1">Nous avons deux options pour les combinaisons ; 3 mm longues ou shorty.</PreviewText></>,
      <>
        <PreviewText id="AboutPage.rich.a8f988187e64.1">Nos bouteilles sont toutes en acier, vous pouvez choisir entre 10L, 12L
        (court ou long) ou 15L.
      </PreviewText></>,
      <><PreviewText id="AboutPage.rich.03e5ebd48973.1">Des tailles enfants sont disponibles.</PreviewText></>,
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
        <PreviewText id="AboutPage.rich.68bb5f4221e7.1">Nos deux bateaux sont couverts pour se protéger du soleil. Ils peuvent
        accueillir 20 plongeurs chacun. Ils sont entièrement équipés du matériel
        de sécurité (oxygénothérapie, VHF, trousse de secours).
      </PreviewText></>,
    ],
  },
  {
    id: "local",
    title: "Le local",
    image: "/images/about/original/local.jpg",
    imageAlt: "L’accueil et le local de Corail Plongée",
    paragraphs: [
      <><PreviewText id="AboutPage.rich.4a75b4c37f0f.1">Des casiers sont prévus pour vos effets personels pendant que vous êtes en mer.</PreviewText></>,
      <>
        <PreviewText id="AboutPage.rich.f846fb45682b.1">Un espace de stockage est disponible pour les personnes ayant leur propre
        matériel.
      </PreviewText></>,
      <>
        <PreviewText id="AboutPage.rich.f52e386e442a.1">Une salle de classe est à votre disposition pour nos formations fédérales
        et internationales (SSI).
      </PreviewText></>,
      <>
        <PreviewText id="AboutPage.rich.ab07fbeae714.1">Après la plongée, vous pourrez vous détendre en prenant une douche chaude,
        en prenant un café gratuit ou en feuilletant quelques livres de notre
        bibliothèque.
      </PreviewText></>,
      <>
        <PreviewText id="AboutPage.rich.3688dc5db07f.1">Vous pouvez réserver vos plongées directement au centre, par téléphone,
        ou sur notre site internet.
      </PreviewText></>,
    ],
  },
] as const;

const englishSections = [
  {
    id: "dive-center",
    title: "The dive center",
    image: "/images/about/original-en/centre.jpg",
    imageAlt: "Corail Plongée dive center in Saint-Gilles-les-Bains marina",
    paragraphs: [
      <>
        Corail Plongée is a scuba diving center on Reunion Island, located in the
        port of Saint-Gilles-les-Bains. We are open year round from <strong><OpeningHoursText id="global.hours.weekdays" fallback="7h30 à 16h30" />{" ("}<OpeningHoursText id="global.hours.sunday" fallback="7h30 à 12h" />{" on Sundays)."}</strong>
      </>,
      <>
        We are excited to share our passion for diving with you on the many sites
        offered by our island…
      </>,
    ],
  },
  {
    id: "accreditation",
    title: "Accreditation",
    image: "/images/about/original-en/agrements.jpg",
    imageAlt: "Reunion Island coral reef",
    reverse: true,
    paragraphs: [
      <>
        We are members of the Réunion Qualité Tourisme charter, approved by the
        Ministry of Youth and Sports N° ET94.003.
      </>,
      <>The instructors of our center are all State Certified.</>,
      <>N° siret 42050512500013.</>,
    ],
  },
  {
    id: "equipment",
    title: "The equipment",
    image: "/images/about/original-en/materiel.jpg",
    imageAlt: "Corail Plongée scuba diving equipment",
    paragraphs: [
      <>
        Corail Plongée has 45 complete SCUBAPRO dive gear sets; fins, masks,
        snorkels, BCDs, regulators with octopuses and depth gauges. Dive computers
        and parachutes are also available.
      </>,
      <>We have two options for wetsuits: 3 mm long or shorties.</>,
      <>You can choose between 10L, 12L (short or long) or 15L steel tanks.</>,
      <>Children’s sizes are available.</>,
    ],
  },
  {
    id: "boats",
    title: "The boats",
    image: "/images/about/original-en/bateaux.jpg",
    imageAlt: "Corail Plongée boats in front of the center",
    reverse: true,
    paragraphs: [
      <>
        Our two speedboats are covered so you are protected from the sun. Each
        boat can accommodate 20 divers, and has all the necessary safety equipment
        (oxygen therapy, VHF and first aid kit).
      </>,
    ],
  },
  {
    id: "center-facilities",
    title: "The center",
    image: "/images/about/original-en/local.png",
    imageAlt: "Inside the Corail Plongée center",
    paragraphs: [
      <>Lockers are available to store your personal affairs while you are at sea.</>,
      <>We also have storage space for people traveling with their own gear.</>,
      <>
        A classroom is available for our federal and international (SSI) training
        courses.
      </>,
      <>
        After the dive you can relax by taking a hot shower, have some complimentary
        coffee, or browse through some books from our library.
      </>,
      <>
        You can book your dives directly at the dive center, by telephone, or on
        our website.
      </>,
    ],
  },
] as const;

const frenchTeam = [
  { name: "Chris", role: "The boss", image: "/images/about/original/equipe-chris.jpg" },
  { name: "Jennifer", role: "Monitrice de plongée", image: "/images/about/original/equipe-jennifer.jpg" },
  { name: "Christophe", role: "Moniteur de plongée", image: "/images/about/original/equipe-christophe.jpg" },
  { name: "Popote", role: "Macgyver", image: "/images/about/original/equipe-popote.jpg" },
] as const;

const englishTeam = [
  { name: "Chris", role: "The boss", image: "/images/about/original/equipe-chris.jpg" },
  { name: "Jennifer", role: "Diving instructor", image: "/images/about/original/equipe-jennifer.jpg" },
  { name: "Christophe", role: "Diving instructor", image: "/images/about/original/equipe-christophe.jpg" },
  { name: "Popote", role: "Our MacGyver", image: "/images/about/original/equipe-popote.jpg" },
] as const;

export function AboutPage({
  bookingLinks,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  locale?: "fr" | "en";
}) {
  const isEnglish = locale === "en";
  const sections = isEnglish ? englishSections : frenchSections;
  const team = isEnglish ? englishTeam : frenchTeam;
  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="about-origin-main">
        <section className="about-origin-hero">
          <Image
            src="/images/hero/corail-reef.jpg"
            alt={isEnglish ? "Reunion Island coral reef" : "Récif corallien de La Réunion"}
            fill
            priority
            sizes="100vw"
          />
          <div className="about-origin-hero-shade" />
          <div className="shell about-origin-hero-copy">
            <p className="eyebrow light"><PreviewText id="AboutPage.rich.40e467cf393a.1">Corail Plongée · </PreviewText><PreviewText id="about.hero.location">{isEnglish ? "Reunion Island" : "La Réunion"}</PreviewText></p>
            <h1>{isEnglish ? "About Us" : <><PreviewText id="AboutPage.rich.a88fbb4e4bed.1">Qui sommes-nous&nbsp;?</PreviewText></>}</h1>
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
                  {"caption" in section ? <figcaption><PreviewText id={`about.section.${section.id}.caption`}>{section.caption}</PreviewText></figcaption> : null}
                </figure>
                <div className="about-origin-copy">
                  <p className="about-origin-number" aria-hidden="true">0{index + 1}</p>
                  <h2><PreviewText id={`about.section.${section.id}.title`}>{section.title}</PreviewText></h2>
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
                <p className="eyebrow light"><PreviewText id="AboutPage.f5a22417bf2c.1">{isEnglish ? "Passionate divers at your service" : "Des passionnés à votre écoute"}</PreviewText></p>
                <h2><PreviewText id="AboutPage.8211f097a68c.1">{isEnglish ? "The Corail Plongée team" : "L’équipe Corail Plongée"}</PreviewText></h2>
              </div>
              <p>
                <PreviewText id="AboutPage.271028af7cf9.1">{isEnglish
                  ? "A team of professionals to guide you through Reunion Island’s underwater world."
                  : "Une équipe de professionnels pour vous accompagner à la découverte des fonds marins de La Réunion."}</PreviewText>
              </p>
            </div>
            <div className="about-origin-team-grid">
              {team.map((member, index) => (
                <article className="about-origin-team-card" key={member.name}>
                  <div className="about-origin-team-image">
                    <AboutTeamImage image={member.image} name={member.name} role={member.role} index={index} english={isEnglish} />
                  </div>
                  <div>
                    <h3><PreviewText id={`about.team.${index}.name`}>{member.name}</PreviewText></h3>
                    <p><PreviewText id={`about.team.${index}.role`}>{member.role}</PreviewText></p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-origin-cta section-shell">
          <div className="shell about-origin-cta-inner">
            <div>
              <p className="eyebrow coral">{isEnglish ? "Ready to dive?" : <><PreviewText id="AboutPage.rich.67ffa499ae4b.1">Prêt à plonger&nbsp;?</PreviewText></>}</p>
              <h2>{isEnglish ? "See you soon for new bubbles!" : <><PreviewText id="AboutPage.rich.86995f74e262.1">À bientôt pour de nouvelles bulles&nbsp;!</PreviewText></>}</h2>
            </div>
            <a
              className="button button-coral"
              href={bookingLinks.main_booking}
              target="_blank"
              rel="noreferrer"
            >
              <PreviewText embedded id="AboutPage.link.ae44515a793f.1">{isEnglish ? "Book now" : "Je réserve"}</PreviewText>
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>
      </main>
      <PartnerStrip locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
