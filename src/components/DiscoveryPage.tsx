import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

export function DiscoveryPage({
  bookingLinks,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  locale?: "fr" | "en";
}) {
  const isEnglish = locale === "en";

  return (
    <>
      <Header
        locale={locale}
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="discovery-origin-main">
        <section className="discovery-origin-hero">
          <Image
            src="/images/discovery/original/hero.jpg"
            alt={isEnglish
              ? "Tropical fish above a coral reef in Reunion Island"
              : "Poissons tropicaux au-dessus d’un récif corallien de La Réunion"}
            fill
            priority
            sizes="100vw"
          />
          <div className="discovery-origin-hero-shade" />
          <div className="shell discovery-origin-hero-copy">
            <p className="eyebrow light">
              {isEnglish ? "First bubbles in Reunion Island" : "Premières bulles à La Réunion"}
            </p>
            <h1>{isEnglish ? "Discoveries" : "Les découvertes"}</h1>
          </div>
        </section>

        <section className="discovery-origin-intro">
          <div className="shell">
            <div className="discovery-origin-intro-title">
              <h2>
                {isEnglish
                  ? "Would you like to discover scuba diving?"
                  : <>Vous souhaitez découvrir la plongée sous-marine&nbsp;?</>}
                <span>
                  {isEnglish
                    ? "Discover the steps to a first dive to help you make the leap!"
                    : <>Découvrez les étapes d’un baptême de plongée pour vous aider à faire le grand saut&nbsp;!</>}
                </span>
              </h2>
            </div>
            <div className="discovery-origin-intro-grid">
              <div>
                <p>{isEnglish
                  ? "Come and discover the seabed of Reunion Island, with an individual instructor during your immersion to a maximum depth of 6 metres (depending on your age)."
                  : "Venez découvrir les fonds marins de la Réunion, avec un moniteur individuel pendant votre immersion sur une profondeur maximal de 6 mètres (suivant votre âge)."}</p>
                <p>{isEnglish
                  ? "You will be in visual contact with the tropical fish, turtles and rays that the coral reefs of Reunion’s west coast offer."
                  : "Vous serez en contact visuel des poissons tropicaux, tortues et raies qu’offre les récifs coralliens de la côte Ouest de la Réunion."}</p>
              </div>
              <div>
                <p>{isEnglish
                  ? "Complete, disinfected equipment will be lent to you."
                  : "Un équipement complet et désinfecté vous sera prêté."}</p>
                <p>{isEnglish
                  ? "Your instructor will follow you from the briefing through to the presentation of your diploma."
                  : "Votre moniteur vous suivra du breifing à la remise de votre diplôme."}</p>
                <p className="discovery-origin-note">
                  {isEnglish
                    ? "As they are wild animals, we may not encounter them on every dive."
                    : "Animaux sauvage, il se peut que nous ne les rencontrions pas à toutes les plongées."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="discovery-origin-process section-shell">
          <div className="shell">
            <div className="discovery-origin-section-heading">
              <span>01</span>
              <h2>{isEnglish ? "The process of a first dive" : "Le déroulement d’un baptême de plongée"}</h2>
            </div>
            <div className="discovery-origin-process-grid">
              <div className="discovery-origin-image discovery-origin-process-image">
                <Image
                  src="/images/discovery/original/equipes.jpg"
                  alt={isEnglish
                    ? "Four divers underwater above a coral reef"
                    : "Quatre plongeurs sous l’eau au-dessus d’un récif corallien"}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="discovery-origin-process-copy">
                <p>{isEnglish
                  ? "First of all, the instructor will give you the necessary equipment for diving (wetsuit, mask, fins, stabilising jacket, etc.). Then, you will go to the dive site where you will be briefed on the use of the equipment and on the safety instructions."
                  : "Tout d’abord, l’instructeur vous donnera l’équipement nécessaire pour plonger (combinaison, masque, palmes, gilet stabilisateur, etc…). Ensuite, vous partirez sur le site de plongée où vous aurez un briefing sur l’utilisation du matériel et sur les consignes de sécurité."}</p>
                <p>{isEnglish
                  ? "In the water, everything will be done to ensure your safety, reduce your apprehension and make sure you have an extraordinary experience."
                  : "Dans l’eau, tout sera mis en œuvre pour assurer votre sécurité, pour réduire vos appréhensions et faire en sorte que vous viviez une expérience extraordinaire."}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="discovery-origin-audience section-shell">
          <div className="shell discovery-origin-audience-inner">
            <div className="discovery-origin-section-heading is-centered">
              <span>02</span>
              <h2>{isEnglish ? "Who is the first dive for?" : <>À qui s’adresse le baptême de plongée&nbsp;?</>}</h2>
            </div>
            <p>
              {isEnglish
                ? "Scuba diving is for anyone who wishes to discover the underwater world. However, there are a few recommendations to take into account:"
                : <>Le baptême de plongée s’adresse à tout ceux qui souhaitent découvrir le monde sous marin. Il y a cependant quelques recommandations à prendre en compte&nbsp;:</>}
            </p>
            <ul>
              <li><Check aria-hidden="true" /> {isEnglish ? "Children must be at least 8 years old." : "Les enfants doivent avoir au minimum 8 ans."}</li>
              <li><Check aria-hidden="true" /> {isEnglish ? "Pregnant women are not allowed to dive." : "Les femmes enceintes ne peuvent pas plonger."}</li>
              <li><Check aria-hidden="true" /> {isEnglish ? "If you have epilepsy or asthma, you will not be able to take a first dive." : "Si vous êtes épileptique ou asthmatique, vous ne pourrez pas effectuer de baptême."}</li>
            </ul>
            <p>
              {isEnglish
                ? "For a first dive, only an information sheet will be submitted. It is used to evaluate your aptitude to practise this sport, as a medical certificate is not necessary."
                : "Pour un baptême, seule une fiche de renseignement vous sera soumise. Elle sert à évaluer votre aptitude à pratiquer ce sport, le certificat médical n’étant pas nécessaire."}
            </p>
          </div>
        </section>

        {!isEnglish && <section className="discovery-origin-pack section-shell">
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
        </section>}

        <section className="discovery-origin-after section-shell">
          <div className="shell">
            <div className="discovery-origin-section-heading is-centered">
              <span>03</span>
              <h2>{isEnglish ? "What next after the dive?" : "Et après"}</h2>
            </div>
            <div className="discovery-origin-after-grid">
              <div className="discovery-origin-after-copy">
                <p>{isEnglish
                  ? "After a first dive, people wishing to continue and develop their scuba diving skills can follow training courses leading to a diploma. Several training organisations are available to you: FFESSM, SSI and ANMP. All of them deliver diplomas that will allow you, in the long run, to dive in total autonomy."
                  : "Après un baptême, les personnes désirant poursuivre et évoluer en plongée sous-marine peuvent suivre des formations diplômantes. Plusieurs organismes de formations s’offrent à vous : FFESSM, SSI et ANMP. Toutes délivrent des diplômes qui vous permettront, à terme, de plonger en totale autonomie."}</p>
                <p>{isEnglish
                  ? "If your child was amazed by the underwater world after a first dive, they can begin their first level of diving from the age of 8."
                  : "Si votre enfant a été émerveillé par le monde subaquatique suite à un baptême, sachez qu’il n’est pas possible de passer son premier niveau de plongée à partir de l’âge de 8 ans."}</p>
                <a
                  className="button button-coral"
                  href={bookingLinks.discovery_booking}
                  target="_blank"
                  rel="noreferrer"
                >
                  {isEnglish ? "I book" : "Je réserve"}
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </div>
              <div className="discovery-origin-image discovery-origin-after-image">
                <Image
                  src="/images/discovery/original/bapteme.jpg"
                  alt={isEnglish
                    ? "Two divers signalling underwater in the blue ocean"
                    : "Deux plongeurs sous l’eau faisant des gestes dans l’océan bleu"}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
