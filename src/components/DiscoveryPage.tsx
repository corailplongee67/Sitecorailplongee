import { PreviewText } from "./PreviewText";
import { SiteImage as Image } from "./SiteImage";
import { ArrowUpRight, Check } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

export function DiscoveryPage({
  bookingLinks,
  packAmountCents,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  packAmountCents: number | null;
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
              <PreviewText id="DiscoveryPage.12c5952f6e41.1">{isEnglish ? "First bubbles in Reunion Island" : "Premières bulles à La Réunion"}</PreviewText>
            </p>
            <h1><PreviewText id="DiscoveryPage.b29cecfcd149.1">{isEnglish ? "Discoveries" : "Les découvertes"}</PreviewText></h1>
          </div>
        </section>

        <section className="discovery-origin-intro">
          <div className="shell">
            <div className="discovery-origin-intro-title">
              <h2>
                {isEnglish
                  ? "Would you like to discover scuba diving?"
                  : <><PreviewText id="DiscoveryPage.rich.354b57019f1d.1">Vous souhaitez découvrir la plongée sous-marine&nbsp;?</PreviewText></>}
                <span>
                  {isEnglish
                    ? "Discover the steps to a first dive to help you make the leap!"
                    : <><PreviewText id="DiscoveryPage.rich.afe4f591ca3e.1">Découvrez les étapes d’un baptême de plongée pour vous aider à faire le grand saut&nbsp;!</PreviewText></>}
                </span>
              </h2>
            </div>
            <div className="discovery-origin-intro-grid">
              <div>
                <p><PreviewText id="DiscoveryPage.c2216b0d109b.1">{isEnglish
                  ? "Come and discover the seabed of Reunion Island, with an individual instructor during your immersion to a maximum depth of 6 metres (depending on your age)."
                  : "Venez découvrir les fonds marins de la Réunion, avec un moniteur individuel pendant votre immersion sur une profondeur maximal de 6 mètres (suivant votre âge)."}</PreviewText></p>
                <p><PreviewText id="DiscoveryPage.c40fcbb3ebc9.1">{isEnglish
                  ? "You will be in visual contact with the tropical fish, turtles and rays that the coral reefs of Reunion’s west coast offer."
                  : "Vous serez en contact visuel des poissons tropicaux, tortues et raies qu’offre les récifs coralliens de la côte Ouest de la Réunion."}</PreviewText></p>
              </div>
              <div>
                <p><PreviewText id="DiscoveryPage.f0dd29697ebc.1">{isEnglish
                  ? "Complete, disinfected equipment will be lent to you."
                  : "Un équipement complet et désinfecté vous sera prêté."}</PreviewText></p>
                <p><PreviewText id="DiscoveryPage.4b965a261ad1.1">{isEnglish
                  ? "Your instructor will follow you from the briefing through to the presentation of your diploma."
                  : "Votre moniteur vous suivra du breifing à la remise de votre diplôme."}</PreviewText></p>
                <p className="discovery-origin-note">
                  <PreviewText id="DiscoveryPage.e948b7fd7ff8.1">{isEnglish
                    ? "As they are wild animals, we may not encounter them on every dive."
                    : "Animaux sauvage, il se peut que nous ne les rencontrions pas à toutes les plongées."}</PreviewText>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="discovery-origin-process section-shell">
          <div className="shell">
            <div className="discovery-origin-section-heading">
              <span>01</span>
              <h2><PreviewText id="DiscoveryPage.26bce4e41064.1">{isEnglish ? "The process of a first dive" : "Le déroulement d’un baptême de plongée"}</PreviewText></h2>
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
                <p><PreviewText id="DiscoveryPage.b677447ff4e8.1">{isEnglish
                  ? "First of all, the instructor will give you the necessary equipment for diving (wetsuit, mask, fins, stabilising jacket, etc.). Then, you will go to the dive site where you will be briefed on the use of the equipment and on the safety instructions."
                  : "Tout d’abord, l’instructeur vous donnera l’équipement nécessaire pour plonger (combinaison, masque, palmes, gilet stabilisateur, etc…). Ensuite, vous partirez sur le site de plongée où vous aurez un briefing sur l’utilisation du matériel et sur les consignes de sécurité."}</PreviewText></p>
                <p><PreviewText id="DiscoveryPage.2daabd261eb7.1">{isEnglish
                  ? "In the water, everything will be done to ensure your safety, reduce your apprehension and make sure you have an extraordinary experience."
                  : "Dans l’eau, tout sera mis en œuvre pour assurer votre sécurité, pour réduire vos appréhensions et faire en sorte que vous viviez une expérience extraordinaire."}</PreviewText></p>
              </div>
            </div>
          </div>
        </section>

        <section className="discovery-origin-audience section-shell">
          <div className="shell discovery-origin-audience-inner">
            <div className="discovery-origin-section-heading is-centered">
              <span>02</span>
              <h2>{isEnglish ? "Who is the first dive for?" : <><PreviewText id="DiscoveryPage.rich.a8c7d6cd202e.1">À qui s’adresse le baptême de plongée&nbsp;?</PreviewText></>}</h2>
            </div>
            <p>
              {isEnglish
                ? "Scuba diving is for anyone who wishes to discover the underwater world. However, there are a few recommendations to take into account:"
                : <><PreviewText id="DiscoveryPage.rich.7ebb98b564dd.1">Le baptême de plongée s’adresse à tout ceux qui souhaitent découvrir le monde sous marin. Il y a cependant quelques recommandations à prendre en compte&nbsp;:</PreviewText></>}
            </p>
            <ul>
              <li><Check aria-hidden="true" /> <PreviewText id="discovery.audience.minimum-age">{isEnglish ? "Children must be at least 8 years old." : "Les enfants doivent avoir au minimum 8 ans."}</PreviewText></li>
              <li><Check aria-hidden="true" /> <PreviewText id="discovery.audience.pregnancy">{isEnglish ? "Pregnant women are not allowed to dive." : "Les femmes enceintes ne peuvent pas plonger."}</PreviewText></li>
              <li><Check aria-hidden="true" /> <PreviewText id="discovery.audience.health">{isEnglish ? "If you have epilepsy or asthma, you will not be able to take a first dive." : "Si vous êtes épileptique ou asthmatique, vous ne pourrez pas effectuer de baptême."}</PreviewText></li>
            </ul>
            <p>
              <PreviewText id="DiscoveryPage.c4bd5c3696ea.1">{isEnglish
                ? "For a first dive, only an information sheet will be submitted. It is used to evaluate your aptitude to practise this sport, as a medical certificate is not necessary."
                : "Pour un baptême, seule une fiche de renseignement vous sera soumise. Elle sert à évaluer votre aptitude à pratiquer ce sport, le certificat médical n’étant pas nécessaire."}</PreviewText>
            </p>
          </div>
        </section>

        {!isEnglish && <section className="discovery-origin-pack section-shell">
          <div className="shell discovery-origin-pack-grid">
            <div className="discovery-origin-pack-heading">
              <p className="eyebrow coral"><PreviewText id="DiscoveryPage.012fb7b3056b.1">Une expérience complète</PreviewText></p>
              <h2><PreviewText id="DiscoveryPage.4152b82e80e0.1">Pack découverte, initiation et vie marine</PreviewText></h2>
              <p className="discovery-origin-pack-tagline">
                <PreviewText id="DiscoveryPage.ef5e60194ed0.1">Devenez l’invité privilégié de l’Océan Indien
              </PreviewText></p>
              {packAmountCents !== null ? <div className="discovery-origin-pack-price">
                <span><PreviewText id="discovery.pack.price-label">Tarif</PreviewText></span>
                <strong>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: packAmountCents % 100 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(packAmountCents / 100)}</strong>
                <small><PreviewText id="discovery.pack.price-description">l’expérience complète</PreviewText></small>
              </div> : null}
            </div>
            <div className="discovery-origin-pack-copy">
              <p>
                <PreviewText id="DiscoveryPage.4230a0403412.1">Vous avez toujours rêvé de respirer sous l’eau, mais vous voulez plus
                qu’un simple tour de manège&nbsp;?
              </PreviewText></p>
              <p>
                <PreviewText id="DiscoveryPage.cb6f3472db8d.1">Chez Corail Plongée, on ne se contente pas de vous mettre un masque,
                on vous ouvre les portes d’un nouveau monde avec notre Pack Découverte
                Initiation et Vie Marine.
              </PreviewText></p>

              <h3><PreviewText id="DiscoveryPage.22af7c59f64b.1">Ce qui vous attend&nbsp;:</PreviewText></h3>
              <ul>
                <li><strong><PreviewText id="DiscoveryPage.rich.393ee5ffdc63.1">Votre baptême avec un moniteur rien qu’à vous&nbsp;:</PreviewText></strong> <PreviewText id="DiscoveryPage.rich.aca068aaca9e.1">20 minutes d’immersion totale au moins, vos premières bulles en toute sérénité.</PreviewText></li>
                <li><strong><PreviewText id="DiscoveryPage.rich.9cec4638b37f.1">L’exploration technique avec un regard de biologiste (50 minutes)&nbsp;:</PreviewText></strong> <PreviewText id="DiscoveryPage.rich.352ad844128d.1">passez au niveau supérieur&nbsp;! Apprenez les premiers gestes techniques de la plongée, et explorez les trésors cachés des récifs réunionnais.</PreviewText></li>
                <li><strong><PreviewText id="DiscoveryPage.rich.a21d1bd52bdc.1">Devenez incollable&nbsp;:</PreviewText></strong> <PreviewText id="DiscoveryPage.rich.364ee16c5a63.1">briefing et debriefing passionants sur nos écosystèmes marins et nos «&nbsp;amis à écailles&nbsp;».</PreviewText></li>
              </ul>

              <h3><PreviewText id="DiscoveryPage.17a0e1051e92.1">Les + exclusifs inclus dans votre pack&nbsp;:</PreviewText></h3>
              <ul>
                <li><PreviewText id="DiscoveryPage.ff71efa7b424.1">Un document PDF unique signé Corail Plongée, illustré des magnifiques photographies d’Emmanuelle Camallonge.</PreviewText></li>
                <li><PreviewText id="DiscoveryPage.6d38c280c579.1">Votre propre carnet de plongée pour tout noter de vos aventures sous-marines.</PreviewText></li>
                <li><strong><PreviewText id="DiscoveryPage.rich.e38e2646f929.1">Bonus spécial&nbsp;:</PreviewText></strong> <PreviewText id="DiscoveryPage.rich.dda227b5fe0b.1">si vous attrapez le virus de la plongée (attention c’est contagieux&nbsp;!), profitez d’une réduction sur votre formation niveau 1&nbsp;!</PreviewText></li>
              </ul>
              <p className="discovery-origin-pack-close">
                <PreviewText id="DiscoveryPage.dd7e50cd0f66.1">Prêt à plongée dans le bleu de notre île intense&nbsp;? Ne restez pas
                à la surface, l’aventure commence ici.
              </PreviewText></p>
            </div>
          </div>
        </section>}

        <section className="discovery-origin-after section-shell">
          <div className="shell">
            <div className="discovery-origin-section-heading is-centered">
              <span>03</span>
              <h2><PreviewText id="DiscoveryPage.e09118207dd7.1">{isEnglish ? "What next after the dive?" : "Et après"}</PreviewText></h2>
            </div>
            <div className="discovery-origin-after-grid">
              <div className="discovery-origin-after-copy">
                <p><PreviewText id="DiscoveryPage.cd07a32d3bee.1">{isEnglish
                  ? "After a first dive, people wishing to continue and develop their scuba diving skills can follow training courses leading to a diploma. Several training organisations are available to you: FFESSM, SSI and ANMP. All of them deliver diplomas that will allow you, in the long run, to dive in total autonomy."
                  : "Après un baptême, les personnes désirant poursuivre et évoluer en plongée sous-marine peuvent suivre des formations diplômantes. Plusieurs organismes de formations s’offrent à vous : FFESSM, SSI et ANMP. Toutes délivrent des diplômes qui vous permettront, à terme, de plonger en totale autonomie."}</PreviewText></p>
                <p><PreviewText id="DiscoveryPage.93955ead76da.1">{isEnglish
                  ? "If your child was amazed by the underwater world after a first dive, they cannot begin their first level of diving at age 8."
                  : "Si votre enfant a été émerveillé par le monde subaquatique suite à un baptême, sachez qu’il n’est pas possible de passer son premier niveau de plongée à partir de l’âge de 8 ans."}</PreviewText></p>
                <a
                  className="button button-coral"
                  href={bookingLinks.discovery_booking}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PreviewText embedded id="DiscoveryPage.link.30bbc6a5768e.1">{isEnglish ? "I book" : "Je réserve"}</PreviewText>
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
