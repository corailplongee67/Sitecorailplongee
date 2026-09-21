import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const levels = [
  {
    id: "niveau-1",
    title: "Niveau 1 ANMP / FFESSM",
    number: "01",
    objective:
      "Vous faire acquérir la certification de plongeur Niveau 1 de manière sûre et plaisante, afin de pouvoir plonger encadré jusqu’à 20 mètres.",
    dives: [
      "Sont prévues 5 plongées (plongées supplémentaires en mer à la discrétion du moniteur pour une formation de qualité).",
      "Toutes nos plongées se font sur des fonds coralliens à St-Gilles par groupe de 4 élèves maximum, sous la supervision directe d’un instructeur diplômé.",
      "Cette formation peut être effectuée n’importe quel jour de la semaine matin et/ou après midi et cela sur une période maximum de 2 mois.",
    ],
    price: "425€",
    included: [
      "Le prêt de tout le matériel de plongée",
      "Les sorties en bateau",
      "Le carnet de plongée",
      "La certification en fin de stage",
    ],
    options: ["Licence 60€ pour le diplôme FFESSM / CMAS"],
    requirements: [
      "Age minimum de 12 ans",
      "Autorisation parentale pour les mineurs",
      "Certificat médical de non contre-indication à la plongée",
    ],
  },
  {
    id: "niveau-2",
    title: "Niveau 2",
    number: "02",
    objective:
      "Vous faire acquérir la certification de plongeur Niveau 2 de manière sûre et plaisante, afin de pouvoir plonger encadré jusqu’à 40 mètres et en autonomie jusqu’à 20 mètres.",
    dives: [
      "Sont prévues 10 plongées (plongées supplémentaires en mer à la discrétion du moniteur pour une formation de qualité).",
      "Toutes nos plongées se font sur des fonds coralliens à St-Gilles par groupe de 4 élèves maximum, sous la supervision directe d’un instructeur diplômé.",
      "Cette formation peut être effectuée n’importe quel jour de la semaine matin et/ou après midi et cela sur une période maximum de 2 mois.",
    ],
    price: "770 €",
    included: [
      "Le prêt de tout le matériel",
      "Les sorties en bateau",
      "La certification en fin de stage",
    ],
    options: [
      "Licence 60€ pour le diplôme FFESSM / CMAS",
      "Nitrox 80€",
    ],
    requirements: [
      "Age minimum de 16 ans",
      "Autorisation parentale pour les mineurs",
      "Certificat médical de non contre-indication à la plongée",
      "Être niveau 1",
      "Prouver 10 plongées minimum depuis le niveau 1",
    ],
  },
  {
    id: "niveau-3",
    title: "Niveau 3 et rifap",
    number: "03",
    objective:
      "Vous faire acquérir la certification de plongeur Niveau 3 de manière sûre et plaisante, afin de pouvoir plonger en autonomie jusqu’à 40 mètres et plus.",
    dives: [
      "Sont prévues 10 plongées (plongées supplémentaires en mer à la discrétion du moniteur pour une formation de qualité).",
      "Toutes nos plongées se font sur des fonds coralliens à St-Gilles par groupe de 4 élèves maximum, sous la supervision directe d’un instructeur diplômé.",
      "Cette formation peut être effectuée n’importe quel jour de la semaine matin et/ou après midi et cela sur une période maximum de 3 mois.",
    ],
    price: "900 €",
    included: [
      "Le prêt de tout le matériel",
      "Les sorties en bateau",
      "La certification en fin de stage",
      "Rifap",
    ],
    options: [
      "Licence 60€ pour le diplôme FFESSM / CMAS",
      "Formation PA 60+ Nitrox confirmé – 12 plongées 1060€",
    ],
    requirements: [
      "Age minimum de 18 ans",
      "Certificat médical de non contre-indication à la plongée",
      "Être niveau 2",
      "Prouver 10 plongées minimum depuis le niveau 2",
    ],
  },
  {
    id: "niveau-4",
    title: "Niveau 4",
    number: "04",
    objective:
      "Vous faire acquérir la certification de plongeur Niveau 4 de manière sûre, plaisante et technique afin de pouvoir plonger en autonome jusqu’à 40 mètres et plus, de pouvoir encadrer des plongeurs en exploration, et de se présenter au DEJEPS.",
    dives: [],
    price: "1800 €",
    included: [
      "Le prêt de tout le matériel",
      "Les sorties en bateau",
      "La certification en fin de stage",
    ],
    options: ["Licence 60€ pour le diplôme FFESSM / CMAS"],
    requirements: [
      "Age minimum de 18 ans",
      "Certificat médical de non contre-indication à la plongée",
      "Être niveau 3",
      "Pouvoir Prouver 20 plongées au à 40 mètres minimum depuis le niveau 3 certifiées par un moniteur.",
      "Être titulaire rifap",
    ],
  },
] as const;

const levelCopyEn: Record<string, {
  title: string;
  objective: string;
  dives: string[];
  price: string;
  included: string[];
  options: string[];
  requirements: string[];
}> = {
  "niveau-1": {
    title: "Level 1 ANMP / FFESSM",
    objective: "Acquire the Level 1 diver certification safely and enjoyably, so that you can dive under supervision to a depth of 20 metres.",
    dives: ["5 dives are planned, with additional sea dives at the instructor’s discretion to ensure quality training.", "All dives take place on the coral reefs of Saint-Gilles in groups of no more than 4 students, under the direct supervision of a qualified instructor.", "Training can be completed on any day of the week, morning and/or afternoon, over a maximum period of 2 months."],
    price: "425 €",
    included: ["Loan of all diving equipment", "Boat trips", "Diving logbook", "Certification at the end of the course"],
    options: ["€60 licence for the FFESSM / CMAS diploma"],
    requirements: ["Minimum age of 12", "Parental authorisation for minors", "Medical certificate confirming no contraindication to diving"],
  },
  "niveau-2": {
    title: "Level 2",
    objective: "Acquire the Level 2 diver certification safely and enjoyably, so that you can dive under supervision to 40 metres and autonomously to 20 metres.",
    dives: ["10 dives are planned, with additional sea dives at the instructor’s discretion to ensure quality training.", "All dives take place on the coral reefs of Saint-Gilles in groups of no more than 4 students, under the direct supervision of a qualified instructor.", "Training can be completed on any day of the week, morning and/or afternoon, over a maximum period of 2 months."],
    price: "770 €",
    included: ["Loan of all equipment", "Boat trips", "Certification at the end of the course"],
    options: ["€60 licence for the FFESSM / CMAS diploma", "Nitrox €80"],
    requirements: ["Minimum age of 16", "Parental authorisation for minors", "Medical certificate confirming no contraindication to diving", "Hold Level 1", "Provide proof of at least 10 dives since Level 1"],
  },
  "niveau-3": {
    title: "Level 3",
    objective: "Acquire the Level 3 diver certification safely and enjoyably, allowing you to dive autonomously to 40 metres and beyond.",
    dives: ["10 dives are planned, with additional sea dives at the instructor’s discretion to ensure quality training.", "All dives take place on the coral reefs of Saint-Gilles in groups of no more than 4 students, under the direct supervision of a qualified instructor.", "Training can be completed on any day of the week, morning and/or afternoon, over a maximum period of 3 months."],
    price: "790 €",
    included: ["Loan of all equipment", "Boat trips", "Certification at the end of the course"],
    options: ["€60 licence for the FFESSM / CMAS diploma"],
    requirements: ["Minimum age of 18", "Medical certificate confirming no contraindication to diving", "Hold Level 2", "Provide proof of at least 10 dives since Level 2"],
  },
  "niveau-4": {
    title: "Level 4",
    objective: "Acquire the Level 4 diver certification in a safe, enjoyable and technical way, allowing you to dive autonomously to 40 metres and beyond, supervise exploration divers and apply for the DEJEPS.",
    dives: [],
    price: "1,450 €",
    included: ["Loan of all equipment", "Boat trips", "Certification at the end of the course"],
    options: ["€60 licence for the FFESSM / CMAS diploma"],
    requirements: ["Minimum age of 18", "Medical certificate confirming no contraindication to diving", "Hold Level 3", "Provide proof of at least 20 instructor-certified dives to 40 metres since Level 3", "Hold the RIFAP qualification"],
  },
};

export function FrenchTrainingPage({
  bookingLinks,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  locale?: "fr" | "en";
}) {
  const en = locale === "en";
  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="french-training-origin-main">
        <section className="french-training-origin-hero">
          <Image
            src="/images/french-training/original/hero.jpg"
            alt={en ? "Seahorse on the seabed of Reunion Island" : "Hippocampe sur les fonds marins de La Réunion"}
            fill
            priority
            sizes="100vw"
          />
          <div className="french-training-origin-hero-shade" />
          <div className="shell french-training-origin-hero-copy">
            <p className="eyebrow light">Certifications ANMP &amp; FFESSM</p>
            <h1>{en ? "French training" : "Formation française"}</h1>
            <p>{en ? "From Level 1 to Level 4, progress on the coral reefs of Saint-Gilles." : "Du Niveau 1 au Niveau 4, progressez sur les fonds coralliens de Saint-Gilles."}</p>
          </div>
        </section>

        <section className="french-training-origin-content">
          <div className="shell">
            <div className="french-training-origin-panel">
              <div className="french-training-origin-panel-heading">
                <p className="eyebrow">{en ? "French certification" : "Formation française"}</p>
                <h2>{en ? "Choose your level" : "Choisissez votre niveau"}</h2>
                <p>{en ? "A complete pathway, from your first certification to supervising exploration dives." : "Un parcours complet, de vos premières certifications à l’encadrement en exploration."}</p>
              </div>

              <div className="french-training-origin-levels">
                {levels.map((level) => {
                  const copy = en ? levelCopyEn[level.id] : level;
                  return (
                  <article className="french-training-origin-level" id={level.id} key={level.id}>
                    <header className="french-training-origin-level-heading">
                      <span aria-hidden="true">{level.number}</span>
                      <div>
                        <p>{en ? "French certification" : "Certification française"}</p>
                        <h2>{copy.title}</h2>
                      </div>
                      <strong>{copy.price}</strong>
                    </header>

                    <div className="french-training-origin-level-grid">
                      <div className="french-training-origin-level-story">
                        <section>
                          <h3>{en ? "Purpose of the training" : "But de la formation"}</h3>
                          <p>{copy.objective}</p>
                        </section>

                        {copy.dives.length ? (
                          <section>
                            <h3>{en ? "Dives" : "Plongées"}</h3>
                            {copy.dives.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                          </section>
                        ) : null}
                      </div>

                      <aside className="french-training-origin-level-details">
                        <section>
                          <h3>{en ? "Training cost" : "Coût de la formation"}</h3>
                          <p>{en ? "The training costs " : "Le coût de la formation est de "}<strong>{copy.price}</strong>{en ? " and includes:" : " et comprend :"}</p>
                          <ul>
                            {copy.included.map((item) => (
                              <li key={item}><Check aria-hidden="true" />{item}</li>
                            ))}
                          </ul>
                          <div className="french-training-origin-options">
                            {copy.options.map((option) => <p key={option}><span>Option</span>{option}</p>)}
                          </div>
                        </section>

                        <section>
                          <h3>{en ? "Registration conditions" : "Condition d’inscription"}</h3>
                          <ul>
                            {copy.requirements.map((item) => (
                              <li key={item}><Check aria-hidden="true" />{item}</li>
                            ))}
                          </ul>
                        </section>

                        {level.id === "niveau-4" ? (
                          <Link className="button french-training-origin-button" href={en ? "/en/contact/" : "/contactez-nous/"}>
                            {en ? "Contact us" : "Nous consulter"} <ArrowUpRight aria-hidden="true" size={18} />
                          </Link>
                        ) : (
                          <a
                            className="button french-training-origin-button"
                            href={bookingLinks.french_training_booking}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {en ? "I book" : "Je réserve"} <ArrowUpRight aria-hidden="true" size={18} />
                          </a>
                        )}
                      </aside>
                    </div>
                  </article>
                  );
                })}
              </div>
            </div>
          </div>
          <Image
            className="french-training-origin-decoration"
            src="/images/french-training/original/decoration.png"
            alt=""
            width={267}
            height={388}
            aria-hidden="true"
          />
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
