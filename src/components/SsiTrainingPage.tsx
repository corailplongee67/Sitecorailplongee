import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, GraduationCap } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const advantages = [
  "Reconnaissance internationale",
  "Supports pédagogiques numériques (sur téléphone, tablettes ou ordinateurs)",
  "Vidéos de démonstration",
  "Quizz de révision",
  "Carnet de plongée en ligne",
  "Carte de certification numérique",
];

const advantagesEn = [
  "International recognition",
  "Digital learning materials (on phones, tablets or computers)",
  "Video tutorials",
  "Revision quizzes",
  "Online diving logbook",
  "Digital certification card",
];

const specialtyCopyEn: Record<string, { paragraphs: string[]; detailTitle?: string; detailParagraphs?: string[] }> = {
  "Deep diving": {
    paragraphs: ["Are you ready to become a deep diver and explore deeper wrecks, coral-encrusted walls, reefs and more? Many exciting dive sites are found in deep water and the SSI Deep Diving specialty will teach you how to get there – safely and with confidence. You will learn to plan and conduct dives to depths between 18 and 40 metres and earn your SSI Deep Diving specialty certification."],
    detailTitle: "Training information and standards",
    detailParagraphs: [
      "The SSI Deep Diving specialty will teach you everything you need to dive to depths between 18 and 40 metres, through a combination of theory sessions and open-water dives. You will learn to safely plan and conduct your deep-diving adventures and use computers and gas-consumption calculations to get the most out of your dives.",
      "Upon completion, you will earn your SSI Deep Diving specialty certification and be able to explore beautiful deep-dive sites. This specialty is also a prerequisite for certain additional courses, making it the logical next step in your diver training.",
    ],
  },
  "Enriched AIR NITROX level 2": {
    paragraphs: ["As a Nitrox diver, you can increase your dive times and safety margins and shorten your surface intervals, so you can spend more time diving and less time waiting. You will learn to safely plan and dive with enriched-air mixtures containing up to 40% oxygen. Upon completion, you will earn an SSI Enriched Air Nitrox 32% or 40% certification."],
  },
  "Stress & rescue": {
    paragraphs: ["Diver stress is a major cause of diving accidents, but it can be prevented and managed. Join the SSI Diver Stress and Rescue specialty and learn how to help yourself and other divers stay safe."],
    detailTitle: "Training information and standards",
    detailParagraphs: ["The SSI Diver Stress and Rescue specialty teaches the skills needed to protect yourself and other divers. You will learn to identify stress, prevent accidents, perform rescues and provide emergency care through practical pool and open-water sessions.", "Upon completion, you will earn the SSI Diver Stress and Rescue specialty certification."],
  },
  "React right": { paragraphs: [] },
};

const specialties = [
  {
    title: "Deep diving",
    videoId: "-paDQXtRQzk",
    videoTitle: "SSI Deep Diving",
    paragraphs: [
      "Êtes-vous prêt à devenir un plongeur profond et à explorer des épaves plus profondes, des murs incrustés de coraux, des récifs et plus encore ? De nombreux sites de plongée passionnants se trouvent en eaux profondes et la spécialité Deep Diving SSI vous apprendra à vous y rendre – en toute sécurité et avec confiance. Vous apprendrez à planifier et à effectuer des plongées à des profondeurs comprises entre 18 et 40 mètres et obtiendrez votre certification de spécialité Deep Diving SSI.",
    ],
    detailTitle: "Infos et standard de formation",
    detailParagraphs: [
      "La spécialité Deep Diving SSI vous enseignera tout ce dont vous avez besoin pour plonger à des profondeurs comprises entre 18 et 40 mètres, grâce à un mélange de séances théoriques et de plongées en milieu naturel. Vous apprendrez à planifier et à réaliser en toute sécurité vos aventures de plongée profonde et à utiliser les ordinateurs et les calculs de consommation de gaz pour tirer le meilleur parti de vos plongées profondes.",
      "À l’issue de ce cours, vous obtiendrez votre certification de spécialité Deep Diving SSI et serez en mesure d’explorer de magnifiques sites de plongée profonde où vous le souhaitez. Cette spécialité SSI est également un prérequis pour certaines formations complémentaires, ce qui en fait l’étape logique suivante de votre formation de plongeur.",
    ],
  },
  {
    title: "Enriched AIR NITROX level 2",
    videoId: "yUrweMV2R5s",
    videoTitle: "SSI Enriched Air Nitrox",
    paragraphs: [
      "En tant que plongeur Nitrox, vous pouvez augmenter vos temps de plongée et vos marges de sécurité, et raccourcir vos intervalles de surface – vous pouvez donc passer plus de temps à plonger et moins de temps à attendre ! Dans ce programme, vous apprendrez de nouvelles compétences et augmenterez vos connaissances en matière de plongée tout en apprenant à planifier et à plonger en toute sécurité avec des mélanges d’air enrichi contenant jusqu’à 40 % d’oxygène.",
      "À l’issue de ce programme, vous obtiendrez une certification SSI Enriched Air Nitrox 32% ou 40%.",
    ],
  },
  {
    title: "Stress & rescue",
    videoId: "ymRy7dEiP8I",
    videoTitle: "SSI Stress and Rescue",
    paragraphs: [
      "Le stress du plongeur est une cause majeure d’accidents de plongée, mais il peut facilement être prévenu et résolu. Rejoignez le programme de spécialité Diver Stress and Rescue SSI et apprenez comment vous aider vous-même et les autres plongeurs à rester en sécurité. Obtenez cette certification de spécialité essentielle dès aujourd’hui !",
    ],
    detailTitle: "Training information and standards",
    detailParagraphs: [
      "The Diver Stress and Rescue SSI Specialty Program teaches you the skills you need to protect yourself and other divers. You will learn to identify stress, prevent accidents, and receive practical techniques for performing rescues and providing emergency care. Thanks to a combination of practical sessions in the pool and in the natural environment, you will become well prepared and confident in the management of emergency and rescue situations.",
      "Upon completion of this course, you will achieve Diver Stress and Rescue SSI Specialty Certification.",
    ],
  },
  {
    title: "React right",
    videoId: "VIwyZ2-rg8g",
    videoTitle: "SSI React Right",
    paragraphs: [],
  },
];

function VideoFrame({ id, title }: { id: string; title: string }) {
  return (
    <div className="ssi-origin-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export function SsiTrainingPage({
  bookingLinks,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  locale?: "fr" | "en";
}) {
  const en = locale === "en";
  const displayedAdvantages = en ? advantagesEn : advantages;
  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="ssi-origin-main">
        <section className="ssi-origin-hero">
          <Image
            src="/images/ssi/original/hero.jpg"
            alt={en ? "Diver exploring a coral cavity" : "Plongeur explorant une cavité corallienne"}
            fill
            priority
            sizes="100vw"
          />
          <div className="ssi-origin-hero-shade" />
          <div className="shell ssi-origin-hero-copy">
            <p>Open Water Diver</p>
            <h1>{en ? "SSI Specialities" : "La formation SSI"}</h1>
            <span>{en ? "Access your digital learning materials easily" : "Accéder à vos supports pédagogiques numériques facilement"}</span>
          </div>
        </section>

        <section className="ssi-origin-open-water">
          <div className="shell">
            <div className="ssi-origin-opening-card">
              <h2>{en ? "Start your diving adventure with Open Water Diver certification" : "Commencez votre aventure plongée avec la certification Open Water Diver"}</h2>
              <a className="button ssi-origin-gold-button" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">
                {en ? "Order an Open Water Diver course" : "Commander une formation Open Water Diver"}
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>

            <div className="ssi-origin-intro">
              <div className="ssi-origin-intro-decoration" aria-hidden="true">
                <Image src="/images/ssi/original/dolphin.jpg" alt="" fill sizes="280px" />
              </div>
              <div className="ssi-origin-section-heading">
                <p className="eyebrow">{en ? "International certification" : "Certification internationale"}</p>
                <h2>{en ? "SSI Training" : "Formation SSI"}</h2>
              </div>
              <div className="ssi-origin-intro-copy">
                <p>{en ? "This world-renowned certification programme is the best way to begin a lifetime of adventure as a certified diver. Personalised training is combined with practical in-water sessions to build the skills and experience needed to feel truly confident underwater. At the end of the programme, you will earn the SSI Open Water Diver certification." : "Ce programme de certification mondialement reconnu est la meilleure façon de commencer une longue vie d’aventures en tant que plongeur certifié. La formation personnalisée est combinée à des séances pratiques dans l’eau pour acquérir les compétences et l’expérience nécessaires pour être véritablement en confiance sous l’eau. A l’issue de ce programme, vous obtiendrez la certification Open Water Diver SSI."}</p>
                <p>{en ? "Learning to dive is much easier than you think, and the best way to try this new activity is with the SSI Try Scuba programme. Visit the SSI Corail Plongée dive centre, register and download the MySSI app. The digital learning materials are free and will help you prepare for your first scuba-diving experience." : "Apprendre à plonger est bien plus facile que vous ne le pensez et la meilleure façon de tester cette nouvelle activité c’est avec le programme Try Scuba SSI. Il vous suffit de vous rendre dans un centre de plongée SSI CORAIL PLONGEE, de vous inscrire et de téléchargez l’application MySSI sur votre mobile. Et en plus les supports pédagogiques sont GRATUITS ! Les supports pédagogiques numériques vous permettront de vous préparer pour cette première expérience en plongée sous-marine."}</p>
              </div>
            </div>

            <div className="ssi-origin-facts">
              <article>
                <span>01</span>
                <h3>{en ? "The advantages" : "Les avantages"}</h3>
                <ul>{displayedAdvantages.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
              </article>
              <article>
                <span>02</span>
                <h3>{en ? "Prerequisites" : "Les prérequis"}</h3>
                <ul>
                  <li><Check aria-hidden="true" />{en ? "12 years old" : "12 ans"}</li>
                  <li><Check aria-hidden="true" />{en ? "The desire to discover the underwater world" : "L’envie de découvrir les fonds sous-marins"}</li>
                </ul>
              </article>
              <article>
                <span>03</span>
                <h3>{en ? "Practical information" : "Infos pratique"}</h3>
                <ul>
                  <li><Check aria-hidden="true" />{en ? "Equipment provided" : "Matériel fourni"}</li>
                  <li><Check aria-hidden="true" />{en ? "Examination and certification included" : "Examen et certification compris"}</li>
                  <li><Check aria-hidden="true" />{en ? "After earning Open Water Diver, continue to progress with specialty courses" : "Après l’obtention de l’Open Water Diver continuez à progresser en suivant des cours de spécialités"}</li>
                </ul>
              </article>
            </div>

            <div className="ssi-origin-myssi">
              <div>
                <GraduationCap aria-hidden="true" />
                <div>
                  <p className="eyebrow">{en ? "SSI digital materials" : "Supports numériques SSI"}</p>
                  <h3>{en ? "Prepare for your course online" : "Préparez votre formation en ligne"}</h3>
                </div>
              </div>
              <p>{en ? "Registration on the SSI website gives you access to free theory content and extracts from the training materials. Try it now." : "L’inscription au site SSI vous donne accès à du contenu théorique gratuit et des extraits des supports pédagogiques de formation. Essayez dès maintenant."}</p>
              <div className="ssi-origin-myssi-actions">
                <a className="button ssi-origin-gold-button" href="https://my.divessi.com/login" target="_blank" rel="noreferrer">{en ? "Free registration on divessi.com" : "Inscription gratuite sur divessi.com"} <ArrowUpRight aria-hidden="true" size={18} /></a>
                <Link className="ssi-origin-text-link" href="/tutoriels-inscription-sur-divessi-com/">{en ? "How to register · Tutorials" : "Cliquez ici pour savoir comment s’inscrire · Tutoriels"}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="ssi-origin-programs section-shell">
          <div className="shell">
            <div className="ssi-origin-section-heading is-centered">
              <p className="eyebrow">{en ? "After Open Water Diver" : "Après l’Open Water Diver"}</p>
              <h2>{en ? "Specialty programmes" : "Les programmes de spécialités"}</h2>
            </div>
            <div className="ssi-origin-program-grid">
              <article>
                <div className="ssi-origin-program-image"><Image src="/images/ssi/original/program-specialized.jpg" alt={en ? "Fish swimming near a colourful coral reef" : "Poisson nageant près d’un récif corallien coloré"} fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
                <p>{en ? "Specialty programmes are designed to train you in the areas that interest you. After Open Water Diver, choose from a wide range of specialties to continue your diving journey. Each specialty includes a digital training kit and 1 to 4 dives, followed by a theory exam and a digital certification card." : "Les programmes de spécialités sont conçus pour vous former dans les domaines qui vous intéressent. A la suite de votre Open Water Diver et en fonction de vos centres d’intérêts vous pourrez choisir parmi un large choix de spécialités pour poursuivre votre parcours de plongeur. Les spécialités se composent d’un kit de formation numérique et de 1 à 4 plongées en fonction du programme. A l’issue de chaque spécialité vous passez un examen théorique (QCM) et obtenez une carte de certification numérique."}</p>
              </article>
              <article>
                <div className="ssi-origin-program-image"><Image src="/images/ssi/original/program-specialized-alt.jpg" alt={en ? "Tropical fish swimming near a coral reef" : "Poissons tropicaux nageant près d’un récif corallien"} fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
                <p>{en ? <>After completing <strong>2 specialties and logging 12 dives</strong>, you automatically receive the <strong>Speciality Diver</strong> certification. With <strong>4 specialties and 24 logged dives</strong>, you automatically receive the <strong>Advanced Open Water Diver</strong> certification.</> : <>Après avoir obtenu <strong>2 spécialités complètes et enregistré 12 plongées</strong> dans votre carnet de plongée en ligne vous obtenez automatiquement la carte de certification <strong>Speciality Diver</strong>. Puis lorsque vous cumulerez <strong>4 spécialités complètes et 24 plongées enregistrées</strong> vous obtiendrez automatiquement la carte de certification <strong>Advanced Open Water Diver</strong>. Grace aux programmes de spécialités vous progressez dans les domaines que vous souhaitez améliorer.</>}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="ssi-origin-specialties section-shell">
          <div className="shell">
            <div className="ssi-origin-specialties-intro">
              <div className="ssi-origin-section-heading">
                <p className="eyebrow light">{en ? "Build your journey" : "Construire votre parcours"}</p>
                <h2>{en ? "SSI Specialties" : "Spécialités SSI"}</h2>
              </div>
              <p>{en ? "The SSI Try Scuba programme is the best way to try scuba diving for the first time. In protected water and under your instructor’s close supervision, enjoy those unforgettable first breaths underwater and experience the magic of scuba diving. At the end of this short course, you will receive your SSI Try Scuba recognition card." : "Le programme SSI Try Scuba est la meilleure façon d’essayer la plongée sous-marine pour la première fois. Vous serez dans une eau protégée et bien encadré par votre instructeur, afin que vous puissiez profiter de ces premières respirations inoubliables sous l’eau et vivre la magie de la plongée sous-marine. À la fin de ce bref cours, vous aurez obtenu votre carte de reconnaissance SSI Try Scuba et aurez sans aucun doute envie de plonger à nouveau."}</p>
              <p>{en ? "Countless diving adventures await you, and this is where it all begins. Get started today!" : "D’innombrables aventures de plongée vous attendent et c’est avec ce cours que tout commence. Commencez dès aujourd’hui !"}</p>
              <div className="ssi-origin-package-actions">
                <a className="button ssi-origin-gold-button" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">{en ? "Order a Nitrox + Deep package" : "Commander un package nitrox + deep"} <ArrowUpRight aria-hidden="true" size={18} /></a>
                <a className="button button-outline-light" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">{en ? "Order a React Right + Stress and Rescue package" : "Commander un package react right + stress and rescue"} <ArrowUpRight aria-hidden="true" size={18} /></a>
              </div>
            </div>

            <div className="ssi-origin-specialty-list">
              {specialties.map((specialty, index) => (
                <article className="ssi-origin-specialty" key={specialty.title}>
                  <div className="ssi-origin-specialty-copy">
                    <span>0{index + 1}</span>
                    <h3>{specialty.title}</h3>
                    {(en ? specialtyCopyEn[specialty.title].paragraphs : specialty.paragraphs).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {(en ? specialtyCopyEn[specialty.title].detailTitle : specialty.detailTitle) ? <h4>{en ? specialtyCopyEn[specialty.title].detailTitle : specialty.detailTitle}</h4> : null}
                    {(en ? specialtyCopyEn[specialty.title].detailParagraphs : specialty.detailParagraphs)?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <VideoFrame id={specialty.videoId} title={specialty.videoTitle} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ssi-origin-orientation section-shell">
          <div className="shell ssi-origin-orientation-video">
            <VideoFrame id="ouGNG_8u4gY" title="SSI Navigation" />
          </div>
          <div className="shell ssi-origin-orientation-grid">
            <div className="ssi-origin-orientation-image"><Image src="/images/ssi/original/orientation.jpg" alt={en ? "Diver navigating underwater" : "Plongeur s’orientant sous l’eau"} fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
            <div className="ssi-origin-orientation-copy">
              <p className="eyebrow">{en ? "Navigation specialty" : "Spécialité navigation"}</p>
              <h2>{en ? "Orientation" : "Orientation"}</h2>
              <p>{en ? "This programme provides the skills and knowledge necessary to navigate safely and comfortably underwater. You will learn to use a compass and natural-navigation techniques, estimate distance, apply basic procedures and travel to and from a target. Upon completion, you will earn the SSI Navigation specialty certification." : "Ce programme permet d’acquérir les compétences et les connaissances nécessaires pour s’orienter en toute sécurité et confortablement sous l’eau pendant une plongée. Vous apprendrez à utiliser une compas ainsi que les techniques d’orientation naturelle, à estimer une distance, les procédures d’orientation de base, et comment aller et revenir d’un objectif. A l’issue de ce programme, vous obtiendrez la certification de Spécialité Navigation SSI."}</p>
              <div className="ssi-origin-practical">
                <h3>{en ? "Practical information" : "Infos pratique"}</h3>
                <ul>
                  <li><Check aria-hidden="true" />{en ? "From 12 years old" : "A partir de 12 ans"}</li>
                  <li><Check aria-hidden="true" />{en ? "You are already an Open Water Diver" : "Vous êtes déjà Open Water Diver"}</li>
                  <li><Check aria-hidden="true" />{en ? "Online theory programme" : "Programme théorique en ligne"}</li>
                  <li><Check aria-hidden="true" />{en ? "2 dives" : "2 Plongées"}</li>
                  <li><Check aria-hidden="true" />{en ? "Equipment provided" : "Matériel fourni"}</li>
                </ul>
              </div>
              <a className="button ssi-origin-gold-button" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">{en ? "Order an Open Water Diver course" : "Commander une formation Open Water Diver"} <ArrowUpRight aria-hidden="true" size={18} /></a>
            </div>
          </div>
        </section>

        <section className="ssi-origin-buoyancy section-shell">
          <div className="shell ssi-origin-buoyancy-grid">
            <div className="ssi-origin-buoyancy-copy">
              <p className="eyebrow light">{en ? "Control and comfort" : "Maîtrise et confort"}</p>
              <h2>{en ? "Perfect buoyancy" : "Flottabilité parfaite"}</h2>
              <p>{en ? "Do you want to develop control over your buoyancy, minimise breathing-gas consumption or move effortlessly above the seabed? The SSI Perfect Buoyancy programme teaches the skills and techniques needed to optimise your dives, increase your comfort underwater and make the best use of your equipment. Upon completion, you will earn the SSI Perfect Buoyancy specialty certification." : "Vous souhaitez développer le contrôle de votre flottabilité, minimiser votre consommation en gaz respirable, ou vous déplacer sans effort au-dessus du fond ? Le programme Perfect Buoyancy SSI vous enseigne les compétences et les techniques nécessaires pour optimiser vos plongées, augmenter votre confort sous l’eau et optimiser l’utilisation de votre matériel. A l’issue de ce programme, vous obtiendrez la certification de Spécialité Perfect Buoyancy SSI."}</p>
            </div>
            <div className="ssi-origin-buoyancy-image"><Image src="/images/ssi/original/perfect-buoyancy.jpg" alt={en ? "Diver in perfect buoyancy above a reef" : "Plongeur en flottabilité au-dessus d’un récif"} fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
