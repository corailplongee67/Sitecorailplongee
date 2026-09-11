import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

export function DiscoveryPage({ bookingLinks }: { bookingLinks: BookingLinks }) {
  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="discovery-origin-main">
        <section className="discovery-origin-hero">
          <Image
            src="/images/discovery/original/hero.jpg"
            alt="Poissons tropicaux au-dessus d’un récif corallien de La Réunion"
            fill
            priority
            sizes="100vw"
          />
          <div className="discovery-origin-hero-shade" />
          <div className="shell discovery-origin-hero-copy">
            <p className="eyebrow light">Premières bulles à La Réunion</p>
            <h1>Les découvertes</h1>
          </div>
        </section>

        <section className="discovery-origin-intro">
          <div className="shell">
            <div className="discovery-origin-intro-title">
              <h2>
                Vous souhaitez découvrir la plongée sous-marine&nbsp;?
                <span>Découvrez les étapes d’un baptême de plongée pour vous aider à faire le grand saut&nbsp;!</span>
              </h2>
            </div>
            <div className="discovery-origin-intro-grid">
              <div>
                <p>
                  Venez découvrir les fonds marins de la Réunion, avec un moniteur
                  individuel pendant votre immersion sur une profondeur maximal de
                  6 mètres (suivant votre âge).
                </p>
                <p>
                  Vous serez en contact visuel des poissons tropicaux, tortues et
                  raies qu’offre les récifs coralliens de la côte Ouest de la Réunion.
                </p>
              </div>
              <div>
                <p>Un équipement complet et désinfecté vous sera prêté.</p>
                <p>Votre moniteur vous suivra du breifing à la remise de votre diplôme.</p>
                <p className="discovery-origin-note">
                  Animaux sauvage, il se peut que nous ne les rencontrions pas à
                  toutes les plongées.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="discovery-origin-process section-shell">
          <div className="shell">
            <div className="discovery-origin-section-heading">
              <span>01</span>
              <h2>Le déroulement d’un baptême de plongée</h2>
            </div>
            <div className="discovery-origin-process-grid">
              <div className="discovery-origin-image discovery-origin-process-image">
                <Image
                  src="/images/discovery/original/equipes.jpg"
                  alt="Quatre plongeurs sous l’eau au-dessus d’un récif corallien"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="discovery-origin-process-copy">
                <p>
                  Tout d’abord, l’instructeur vous donnera l’équipement nécessaire
                  pour plonger (combinaison, masque, palmes, gilet stabilisateur,
                  etc…). Ensuite, vous partirez sur le site de plongée où vous aurez
                  un briefing sur l’utilisation du matériel et sur les consignes de
                  sécurité.
                </p>
                <p>
                  Dans l’eau, tout sera mis en œuvre pour assurer votre sécurité,
                  pour réduire vos appréhensions et faire en sorte que vous viviez
                  une expérience extraordinaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="discovery-origin-audience section-shell">
          <div className="shell discovery-origin-audience-inner">
            <div className="discovery-origin-section-heading is-centered">
              <span>02</span>
              <h2>À qui s’adresse le baptême de plongée&nbsp;?</h2>
            </div>
            <p>
              Le baptême de plongée s’adresse à tout ceux qui souhaitent découvrir
              le monde sous marin. Il y a cependant quelques recommandations à
              prendre en compte&nbsp;:
            </p>
            <ul>
              <li><Check aria-hidden="true" /> Les enfants doivent avoir au minimum 8 ans.</li>
              <li><Check aria-hidden="true" /> Les femmes enceintes ne peuvent pas plonger.</li>
              <li><Check aria-hidden="true" /> Si vous êtes épileptique ou asthmatique, vous ne pourrez pas effectuer de baptême.</li>
            </ul>
            <p>
              Pour un baptême, seule une fiche de renseignement vous sera soumise.
              Elle sert à évaluer votre aptitude à pratiquer ce sport, le certificat
              médical n’étant pas nécessaire.
            </p>
          </div>
        </section>

        <section className="discovery-origin-pack section-shell">
          <div className="shell discovery-origin-pack-grid">
            <div className="discovery-origin-pack-heading">
              <p className="eyebrow coral">Une expérience complète</p>
              <h2>Pack découverte, initiation et vie marine</h2>
              <p className="discovery-origin-pack-tagline">
                Devenez l’invité privilégié de l’Océan Indien
              </p>
              <div className="discovery-origin-pack-price">
                <span>Tarif</span>
                <strong>220&nbsp;€</strong>
                <small>l’expérience complète</small>
              </div>
            </div>
            <div className="discovery-origin-pack-copy">
              <p>
                Vous avez toujours rêvé de respirer sous l’eau, mais vous voulez plus
                qu’un simple tour de manège&nbsp;?
              </p>
              <p>
                Chez Corail Plongée, on ne se contente pas de vous mettre un masque,
                on vous ouvre les portes d’un nouveau monde avec notre Pack Découverte
                Initiation et Vie Marine.
              </p>

              <h3>Ce qui vous attend&nbsp;:</h3>
              <ul>
                <li><strong>Votre baptême avec un moniteur rien qu’à vous&nbsp;:</strong> 20 minutes d’immersion totale au moins, vos premières bulles en toute sérénité.</li>
                <li><strong>L’exploration technique avec un regard de biologiste (50 minutes)&nbsp;:</strong> passez au niveau supérieur&nbsp;! Apprenez les premiers gestes techniques de la plongée, et explorez les trésors cachés des récifs réunionnais.</li>
                <li><strong>Devenez incollable&nbsp;:</strong> briefing et debriefing passionants sur nos écosystèmes marins et nos «&nbsp;amis à écailles&nbsp;».</li>
              </ul>

              <h3>Les + exclusifs inclus dans votre pack&nbsp;:</h3>
              <ul>
                <li>Un document PDF unique signé Corail Plongée, illustré des magnifiques photographies d’Emmanuelle Camallonge.</li>
                <li>Votre propre carnet de plongée pour tout noter de vos aventures sous-marines.</li>
                <li><strong>Bonus spécial&nbsp;:</strong> si vous attrapez le virus de la plongée (attention c’est contagieux&nbsp;!), profitez d’une réduction sur votre formation niveau 1&nbsp;!</li>
              </ul>
              <p className="discovery-origin-pack-close">
                Prêt à plongée dans le bleu de notre île intense&nbsp;? Ne restez pas
                à la surface, l’aventure commence ici.
              </p>
            </div>
          </div>
        </section>

        <section className="discovery-origin-after section-shell">
          <div className="shell">
            <div className="discovery-origin-section-heading is-centered">
              <span>03</span>
              <h2>Et après</h2>
            </div>
            <div className="discovery-origin-after-grid">
              <div className="discovery-origin-after-copy">
                <p>
                  Après un baptême, les personnes désirant poursuivre et évoluer en
                  plongée sous-marine peuvent suivre des formations diplômantes.
                  Plusieurs organismes de formations s’offrent à vous&nbsp;: FFESSM,
                  SSI et ANMP. Toutes délivrent des diplômes qui vous permettront, à
                  terme, de plonger en totale autonomie.
                </p>
                <p>
                  Si votre enfant a été émerveillé par le monde subaquatique suite à
                  un baptême, sachez qu’il n’est pas possible de passer son premier
                  niveau de plongée à partir de l’âge de 8 ans.
                </p>
                <a
                  className="button button-coral"
                  href={bookingLinks.discovery_booking}
                  target="_blank"
                  rel="noreferrer"
                >
                  Je réserve
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </div>
              <div className="discovery-origin-image discovery-origin-after-image">
                <Image
                  src="/images/discovery/original/bapteme.jpg"
                  alt="Deux plongeurs sous l’eau faisant des gestes dans l’océan bleu"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
