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

export function SsiTrainingPage({ bookingLinks }: { bookingLinks: BookingLinks }) {
  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="ssi-origin-main">
        <section className="ssi-origin-hero">
          <Image
            src="/images/ssi/original/hero.jpg"
            alt="Plongeur explorant une cavité corallienne"
            fill
            priority
            sizes="100vw"
          />
          <div className="ssi-origin-hero-shade" />
          <div className="shell ssi-origin-hero-copy">
            <p>Open Water Diver</p>
            <h1>La formation SSI</h1>
            <span>Accéder à vos supports pédagogiques numériques facilement</span>
          </div>
        </section>

        <section className="ssi-origin-open-water">
          <div className="shell">
            <div className="ssi-origin-opening-card">
              <h2>Commencez votre aventure plongée avec la certification Open Water Diver</h2>
              <a className="button ssi-origin-gold-button" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">
                Commander une formation Open Water Diver
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>

            <div className="ssi-origin-intro">
              <div className="ssi-origin-intro-decoration" aria-hidden="true">
                <Image src="/images/ssi/original/dolphin.jpg" alt="" fill sizes="280px" />
              </div>
              <div className="ssi-origin-section-heading">
                <p className="eyebrow">Certification internationale</p>
                <h2>Formation SSI</h2>
              </div>
              <div className="ssi-origin-intro-copy">
                <p>
                  Ce programme de certification mondialement reconnu est la meilleure façon de commencer une longue vie d’aventures en tant que plongeur certifié. La formation personnalisée est combinée à des séances pratiques dans l’eau pour acquérir les compétences et l’expérience nécessaires pour être véritablement en confiance sous l’eau. A l’issue de ce programme, vous obtiendrez la certification Open Water Diver SSI.
                </p>
                <p>
                  Apprendre à plonger est bien plus facile que vous ne le pensez et la meilleure façon de tester cette nouvelle activité c’est avec le programme Try Scuba SSI. Il vous suffit de vous rendre dans un centre de plongée SSI CORAIL PLONGEE, de vous inscrire et de téléchargez l’application MySSI sur votre mobile. Et en plus les supports pédagogiques sont GRATUITS ! Les supports pédagogiques numériques vous permettront de vous préparer pour cette première expérience en plongée sous-marine.
                </p>
              </div>
            </div>

            <div className="ssi-origin-facts">
              <article>
                <span>01</span>
                <h3>Les avantages</h3>
                <ul>{advantages.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
              </article>
              <article>
                <span>02</span>
                <h3>Les prérequis</h3>
                <ul>
                  <li><Check aria-hidden="true" />12 ans</li>
                  <li><Check aria-hidden="true" />L’envie de découvrir les fonds sous-marins</li>
                </ul>
              </article>
              <article>
                <span>03</span>
                <h3>Infos pratique</h3>
                <ul>
                  <li><Check aria-hidden="true" />Matériel fourni</li>
                  <li><Check aria-hidden="true" />Examen et certification compris</li>
                  <li><Check aria-hidden="true" />Après l’obtention de l’Open Water Diver continuez à progresser en suivant des cours de spécialités</li>
                </ul>
              </article>
            </div>

            <div className="ssi-origin-myssi">
              <div>
                <GraduationCap aria-hidden="true" />
                <div>
                  <p className="eyebrow">Supports numériques SSI</p>
                  <h3>Préparez votre formation en ligne</h3>
                </div>
              </div>
              <p>L’inscription au site SSI vous donne accès à du contenu théorique gratuit et des extraits des supports pédagogiques de formation. Essayez dès maintenant.</p>
              <div className="ssi-origin-myssi-actions">
                <a className="button ssi-origin-gold-button" href="https://my.divessi.com/login" target="_blank" rel="noreferrer">Inscription gratuite sur divessi.com <ArrowUpRight aria-hidden="true" size={18} /></a>
                <Link className="ssi-origin-text-link" href="/tutoriels-inscription-sur-divessi-com/">Cliquez ici pour savoir comment s’inscrire · Tutoriels</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="ssi-origin-programs section-shell">
          <div className="shell">
            <div className="ssi-origin-section-heading is-centered">
              <p className="eyebrow">Après l’Open Water Diver</p>
              <h2>Les programmes de spécialités</h2>
            </div>
            <div className="ssi-origin-program-grid">
              <article>
                <div className="ssi-origin-program-image"><Image src="/images/ssi/original/program-specialized.jpg" alt="Poisson nageant près d’un récif corallien coloré" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
                <p>Les programmes de spécialités sont conçus pour vous former dans les domaines qui vous intéressent. A la suite de votre Open Water Diver et en fonction de vos centres d’intérêts vous pourrez choisir parmi un large choix de spécialités pour poursuivre votre parcours de plongeur. Les spécialités se composent d’un kit de formation numérique et de 1 à 4 plongées en fonction du programme. A l’issue de chaque spécialité vous passez un examen théorique (QCM) et obtenez une carte de certification numérique.</p>
              </article>
              <article>
                <div className="ssi-origin-program-image"><Image src="/images/ssi/original/program-specialized-alt.jpg" alt="Poissons tropicaux nageant près d’un récif corallien" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
                <p>Après avoir obtenu <strong>2 spécialités complètes et enregistré 12 plongées</strong> dans votre carnet de plongée en ligne vous obtenez automatiquement la carte de certification <strong>Speciality Diver</strong>. Puis lorsque vous cumulerez <strong>4 spécialités complètes et 24 plongées enregistrées</strong> vous obtiendrez automatiquement la carte de certification <strong>Advanced Open Water Diver</strong>. Grace aux programmes de spécialités vous progressez dans les domaines que vous souhaitez améliorer.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="ssi-origin-specialties section-shell">
          <div className="shell">
            <div className="ssi-origin-specialties-intro">
              <div className="ssi-origin-section-heading">
                <p className="eyebrow light">Construire votre parcours</p>
                <h2>Spécialités SSI</h2>
              </div>
              <p>Le programme SSI Try Scuba est la meilleure façon d’essayer la plongée sous-marine pour la première fois. Vous serez dans une eau protégée et bien encadré par votre instructeur, afin que vous puissiez profiter de ces premières respirations inoubliables sous l’eau et vivre la magie de la plongée sous-marine. À la fin de ce bref cours, vous aurez obtenu votre carte de reconnaissance SSI Try Scuba et aurez sans aucun doute envie de plonger à nouveau.</p>
              <p>D’innombrables aventures de plongée vous attendent et c’est avec ce cours que tout commence. Commencez dès aujourd’hui !</p>
              <div className="ssi-origin-package-actions">
                <a className="button ssi-origin-gold-button" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">Commander un package nitrox + deep <ArrowUpRight aria-hidden="true" size={18} /></a>
                <a className="button button-outline-light" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">Commander un package react right + stress and rescue <ArrowUpRight aria-hidden="true" size={18} /></a>
              </div>
            </div>

            <div className="ssi-origin-specialty-list">
              {specialties.map((specialty, index) => (
                <article className="ssi-origin-specialty" key={specialty.title}>
                  <div className="ssi-origin-specialty-copy">
                    <span>0{index + 1}</span>
                    <h3>{specialty.title}</h3>
                    {specialty.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {specialty.detailTitle ? <h4>{specialty.detailTitle}</h4> : null}
                    {specialty.detailParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
            <div className="ssi-origin-orientation-image"><Image src="/images/ssi/original/orientation.jpg" alt="Plongeur s’orientant sous l’eau" fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
            <div className="ssi-origin-orientation-copy">
              <p className="eyebrow">Spécialité navigation</p>
              <h2>Orientation</h2>
              <p>Ce programme permet d’acquérir les compétences et les connaissances nécessaires pour s’orienter en toute sécurité et confortablement sous l’eau pendant une plongée. Vous apprendrez à utiliser une compas ainsi que les techniques d’orientation naturelle, à estimer une distance, les procédures d’orientation de base, et comment aller et revenir d’un objectif. A l’issue de ce programme, vous obtiendrez la certification de Spécialité Navigation SSI.</p>
              <div className="ssi-origin-practical">
                <h3>Infos pratique</h3>
                <ul>
                  <li><Check aria-hidden="true" />A partir de 12 ans</li>
                  <li><Check aria-hidden="true" />Vous êtes déjà Open Water Diver</li>
                  <li><Check aria-hidden="true" />Programme théorique en ligne</li>
                  <li><Check aria-hidden="true" />2 Plongées</li>
                  <li><Check aria-hidden="true" />Matériel fourni</li>
                </ul>
              </div>
              <a className="button ssi-origin-gold-button" href={bookingLinks.ssi_booking} target="_blank" rel="noreferrer">Commander une formation Open Water Diver <ArrowUpRight aria-hidden="true" size={18} /></a>
            </div>
          </div>
        </section>

        <section className="ssi-origin-buoyancy section-shell">
          <div className="shell ssi-origin-buoyancy-grid">
            <div className="ssi-origin-buoyancy-copy">
              <p className="eyebrow light">Maîtrise et confort</p>
              <h2>Flottabilité parfaite</h2>
              <p>Vous souhaitez développer le contrôle de votre flottabilité, minimiser votre consommation en gaz respirable, ou vous déplacer sans effort au-dessus du fond ? Le programme Perfect Buoyancy SSI vous enseigne les compétences et les techniques nécessaires pour optimiser vos plongées, augmenter votre confort sous l’eau et optimiser l’utilisation de votre matériel. A l’issue de ce programme, vous obtiendrez la certification de Spécialité Perfect Buoyancy SSI.</p>
            </div>
            <div className="ssi-origin-buoyancy-image"><Image src="/images/ssi/original/perfect-buoyancy.jpg" alt="Plongeur en flottabilité au-dessus d’un récif" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
