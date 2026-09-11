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

export function FrenchTrainingPage({ bookingLinks }: { bookingLinks: BookingLinks }) {
  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="french-training-origin-main">
        <section className="french-training-origin-hero">
          <Image
            src="/images/french-training/original/hero.jpg"
            alt="Hippocampe sur les fonds marins de La Réunion"
            fill
            priority
            sizes="100vw"
          />
          <div className="french-training-origin-hero-shade" />
          <div className="shell french-training-origin-hero-copy">
            <p className="eyebrow light">Certifications ANMP &amp; FFESSM</p>
            <h1>Formation française</h1>
            <p>Du Niveau 1 au Niveau 4, progressez sur les fonds coralliens de Saint-Gilles.</p>
          </div>
        </section>

        <section className="french-training-origin-content">
          <div className="shell">
            <div className="french-training-origin-panel">
              <div className="french-training-origin-panel-heading">
                <p className="eyebrow">Formation française</p>
                <h2>Choisissez votre niveau</h2>
                <p>Un parcours complet, de vos premières certifications à l’encadrement en exploration.</p>
              </div>

              <div className="french-training-origin-levels">
                {levels.map((level) => (
                  <article className="french-training-origin-level" id={level.id} key={level.id}>
                    <header className="french-training-origin-level-heading">
                      <span aria-hidden="true">{level.number}</span>
                      <div>
                        <p>Certification française</p>
                        <h2>{level.title}</h2>
                      </div>
                      <strong>{level.price}</strong>
                    </header>

                    <div className="french-training-origin-level-grid">
                      <div className="french-training-origin-level-story">
                        <section>
                          <h3>But de la formation</h3>
                          <p>{level.objective}</p>
                        </section>

                        {level.dives.length ? (
                          <section>
                            <h3>Plongées</h3>
                            {level.dives.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                          </section>
                        ) : null}
                      </div>

                      <aside className="french-training-origin-level-details">
                        <section>
                          <h3>Coût de la formation</h3>
                          <p>Le coût de la formation est de <strong>{level.price}</strong> et comprend :</p>
                          <ul>
                            {level.included.map((item) => (
                              <li key={item}><Check aria-hidden="true" />{item}</li>
                            ))}
                          </ul>
                          <div className="french-training-origin-options">
                            {level.options.map((option) => <p key={option}><span>Option</span>{option}</p>)}
                          </div>
                        </section>

                        <section>
                          <h3>Condition d’inscription</h3>
                          <ul>
                            {level.requirements.map((item) => (
                              <li key={item}><Check aria-hidden="true" />{item}</li>
                            ))}
                          </ul>
                        </section>

                        {level.id === "niveau-4" ? (
                          <Link className="button french-training-origin-button" href="/contactez-nous/">
                            Nous consulter <ArrowUpRight aria-hidden="true" size={18} />
                          </Link>
                        ) : (
                          <a
                            className="button french-training-origin-button"
                            href={bookingLinks.french_training_booking}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Je réserve <ArrowUpRight aria-hidden="true" size={18} />
                          </a>
                        )}
                      </aside>
                    </div>
                  </article>
                ))}
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

      <Footer locale="fr" />
    </>
  );
}
