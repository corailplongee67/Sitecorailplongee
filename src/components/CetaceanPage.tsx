import { PreviewText } from "./PreviewText";
import { ContactEmailLink } from "./SiteContact";
import { SiteImage as Image } from "./SiteImage";
import { ArrowUpRight, Check, Clock3, UsersRound, Waves } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const keyFacts = [
  { icon: Clock3, value: "3 heures", label: "de sortie en mer" },
  { icon: UsersRound, value: "2 moniteurs", label: "pour vous accompagner" },
  { icon: Waves, value: "9 personnes", label: "maximum par groupe dans l’eau" },
];

function EnglishCetaceanPage({ bookingLinks }: { bookingLinks: BookingLinks }) {
  const facts = [
    { icon: Clock3, value: "3 hours", label: "at sea" },
    { icon: UsersRound, value: "2 instructors", label: "to accompany you" },
    { icon: Waves, value: "9 people", label: "maximum per group in the water" },
  ];

  return (
    <>
      <Header
        locale="en"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />
      <main className="cetacean-origin-main">
        <section className="cetacean-origin-hero">
          <Image src="/images/cetaceans/original/hero.jpg" alt="Two humpback whales swimming together underwater" fill priority sizes="100vw" />
          <div className="cetacean-origin-hero-shade" />
          <div className="shell cetacean-origin-hero-copy">
            <p className="eyebrow light"><PreviewText id="CetaceanPage.851550ec220c.1">Whale season · Reunion Island</PreviewText></p>
            <h1><PreviewText id="CetaceanPage.a199b51713ff.1">An exceptional experience with cetaceans</PreviewText></h1>
            <p><PreviewText id="CetaceanPage.375ad52d65ea.1">Excursions resume in July</PreviewText></p>
          </div>
        </section>

        <section className="cetacean-origin-intro">
          <div className="shell">
            <div className="cetacean-origin-intro-title">
              <p className="eyebrow"><PreviewText id="CetaceanPage.12ad2507366a.1">A wildlife experience</PreviewText></p>
              <h2><PreviewText id="CetaceanPage.26ad60ea37c4.1">Your dream of swimming with whales or dolphins can come true!</PreviewText></h2>
            </div>
            <div className="cetacean-origin-intro-grid">
              <div className="cetacean-origin-intro-copy">
                <h2><PreviewText id="CetaceanPage.rich.5e2f3af1c9c3.1">Humpback whales or </PreviewText><em><PreviewText id="CetaceanPage.rich.cc255bb1cbbc.1">Megaptera novaeangliae</PreviewText></em></h2>
                <p><PreviewText id="CetaceanPage.c3f25d796c83.1">These marine mammals can be seen in Reunion Island from June to October. They measure an average of 15 metres and can weigh up to 40 tonnes. Humpback whales come to the coast to give birth to their calves and/or to mate, travelling from Antarctica where they spend the rest of the year.</PreviewText></p>
                <p><PreviewText id="CetaceanPage.b0df7478a143.1">We offer a three-hour trip accompanied by two diving instructors to observe these majestic animals in the wild, along with the island’s resident dolphins.</PreviewText></p>
                <p><PreviewText id="CetaceanPage.bbd85e292083.1">We enter the water with fins, masks, snorkels and wetsuits when visibility, swell, animal behaviour and surrounding boat traffic allow. We approach calmly and respectfully, then let the animals decide the rest.</PreviewText></p>
              </div>
              <aside className="cetacean-origin-requirements">
                <p className="eyebrow light"><PreviewText id="CetaceanPage.5c5349e2005f.1">To participate</PreviewText></p>
                <h3><PreviewText id="CetaceanPage.965ead68cc24.1">You must:</PreviewText></h3>
                <ul>
                  <li><Check aria-hidden="true" /><span><PreviewText id="CetaceanPage.rich.87648c5cdd99.1">Be comfortable swimming at least 200 metres with fins, a mask and a snorkel.</PreviewText></span></li>
                  <li><Check aria-hidden="true" /><span><PreviewText id="CetaceanPage.rich.37e73ffff3e6.1">Be at least 12 years old.</PreviewText></span></li>
                </ul>
                <p><PreviewText id="CetaceanPage.796cdcea0861.1">Swimming with cetaceans is possible through specific approaches that protect the animals and keep the group safe.</PreviewText></p>
              </aside>
            </div>
            <div className="cetacean-origin-facts">
              {facts.map(({ icon: Icon, value, label }) => (
                <article key={value}><Icon aria-hidden="true" /><div><strong>{value}</strong><span>{label}</span></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="cetacean-origin-story">
          <div className="shell">
            <article className="cetacean-origin-step">
              <div className="cetacean-origin-step-image"><Image src="/images/cetaceans/original/whale.webp" alt="Humpback whale swimming underwater" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className="cetacean-origin-step-copy">
                <span>01</span><p className="eyebrow"><PreviewText id="CetaceanPage.0bfe0b80f9b7.1">The encounter</PreviewText></p><h2><PreviewText id="CetaceanPage.0ea5977074d1.1">How?</PreviewText></h2>
                <p><PreviewText id="CetaceanPage.3971a22d30af.1">First, we have to find the animals. We look for signs that they are curious and open to meeting us. We never force an interaction on an animal that shows no interest.</PreviewText></p>
                <p><PreviewText id="CetaceanPage.5adfbbb15e47.1">By law, boats must remain at least 100 metres away. Participants therefore need to swim this distance in the open ocean, outside the Natural Reserve zone, where the seabed is not visible.</PreviewText></p>
                <p><PreviewText id="CetaceanPage.e66455d96bfc.1">An instructor remains in the water with a group of no more than nine people. Everyone stays together, holding hands. The animals may approach, simply pass by or dive away. After the observation, the group swims back to the boat.</PreviewText></p>
              </div>
            </article>
            <article className="cetacean-origin-step is-reverse">
              <div className="cetacean-origin-step-image"><Image src="/images/cetaceans/original/dolphins.webp" alt="Dolphins swimming underwater" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className="cetacean-origin-step-copy">
                <span>02</span><p className="eyebrow"><PreviewText id="CetaceanPage.c2a310f176df.1">Respect and wonder</PreviewText></p><h2><PreviewText id="CetaceanPage.1852e7b6f8ae.1">An extraordinary experience</PreviewText></h2>
                <p><PreviewText id="CetaceanPage.bf1030f9361d.1">Seeing these animals, meeting their gaze and interacting with them can change the way you see the world and our oceans. This is why we love sharing these excursions while strictly respecting the approach rules.</PreviewText></p>
                <p className="cetacean-origin-video-note"><PreviewText id="CetaceanPage.3ecf44843610.1">“In the end, we will conserve only what we love; we will love only what we understand; and we will understand only what we are taught.” — Baba Dioum</PreviewText></p>
              </div>
            </article>
          </div>
        </section>

        <section className="cetacean-origin-cta">
          <Image src="/images/cetaceans/original/cetacean-decoration.png" alt="" width={197} height={314} aria-hidden="true" />
          <div className="shell cetacean-origin-cta-inner">
            <div><p className="eyebrow light"><PreviewText id="CetaceanPage.04539581e63c.1">Season from June to October</PreviewText></p><h2><PreviewText id="CetaceanPage.41cbd5094101.1">Experience this encounter with us.</PreviewText></h2></div>
            <div>
              <a className="button cetacean-origin-book" href={bookingLinks.cetacean_booking} target="_blank" rel="noreferrer"><PreviewText embedded id="CetaceanPage.link.fbf62d376f90.1">Book the excursion </PreviewText><ArrowUpRight aria-hidden="true" size={18} /></a>
              <ContactEmailLink className="button button-outline-light"><PreviewText embedded id="CetaceanPage.link.47aaf31b83d6.1">Contact us</PreviewText></ContactEmailLink>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}

export function CetaceanPage({
  bookingLinks,
  locale = "fr",
}: {
  bookingLinks: BookingLinks;
  locale?: "fr" | "en";
}) {
  if (locale === "en") return <EnglishCetaceanPage bookingLinks={bookingLinks} />;

  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="cetacean-origin-main">
        <section className="cetacean-origin-hero">
          <Image
            src="/images/cetaceans/original/hero.jpg"
            alt="Deux baleines à bosse nageant ensemble sous l’eau"
            fill
            priority
            sizes="100vw"
          />
          <div className="cetacean-origin-hero-shade" />
          <div className="shell cetacean-origin-hero-copy">
            <p className="eyebrow light"><PreviewText id="CetaceanPage.9bc348fa6d42.1">Saison des baleines · La Réunion</PreviewText></p>
            <h1><PreviewText id="CetaceanPage.cd0d2ea6d087.1">Une rencontre exceptionnelle avec les cétacés</PreviewText></h1>
            <p><PreviewText id="CetaceanPage.8b0068c9d5c3.1">Reprise des sorties en juillet</PreviewText></p>
          </div>
        </section>

        <section className="cetacean-origin-intro">
          <div className="shell">
            <div className="cetacean-origin-intro-title">
              <p className="eyebrow"><PreviewText id="CetaceanPage.0ad2f374893f.1">Une expérience en milieu naturel</PreviewText></p>
              <h2><PreviewText id="CetaceanPage.de6bdae9287a.1">Vous souhaitez vivre une expérience extraordinaire avec les cétacés&nbsp;?</PreviewText></h2>
            </div>

            <div className="cetacean-origin-intro-grid">
              <div className="cetacean-origin-intro-copy">
                <h2><PreviewText id="CetaceanPage.rich.5c4e9b144743.1">Les baleines à bosse ou </PreviewText><em><PreviewText id="CetaceanPage.rich.cc255bb1cbbc.2">Megaptera novaeangliae</PreviewText></em></h2>
                <p>
                  <PreviewText id="CetaceanPage.f1524c73762a.1">Ce sont des mammifères marins qui sont visibles à la Réunion de juin à octobre.
                  Ils mesurent en moyenne 15 mètres et pèsent jusqu’à 40 tonnes&nbsp;! Les baleines
                  à bosse viennent sur les côtes réunionnaises pour mettre au monde leurs baleineaux
                  et/ou s’accoupler. Elles viennent d’Antarctique où elles vivent le reste de l’année.
                  Là-bas, l’eau est trop froide et les prédateurs trop nombreux pour que les baleineaux
                  puissent grandir en toute sécurité.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.1cd5e9170b6a.1">Si cette année, les baleines sont nombreuses à visiter la Réunion, nous vous proposons
                  une sortie de 3 heures. Vous serez accompagnés de 2 moniteurs de plongée pour observer
                  ces animaux majestueux en milieu naturel ainsi que les dauphins résidents.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.16449f045f60.1">Nous nous mettons à l’eau avec palmes, masque, tuba et combinaison si les conditions
                  d’observation sont bonnes. Cela varie en fonction de la visibilité, de la houle, du
                  comportement des animaux et des autres bateaux présents. Nous nous approchons ensuite
                  des animaux avec calme et respect… et nous les laissons décider du reste&nbsp;!
                </PreviewText></p>
              </div>

              <aside className="cetacean-origin-requirements">
                <p className="eyebrow light"><PreviewText id="CetaceanPage.383d991165a0.1">Pour participer</PreviewText></p>
                <h3><PreviewText id="CetaceanPage.1e8505f029cc.1">Vous devez&nbsp;:</PreviewText></h3>
                <ul>
                  <li>
                    <Check aria-hidden="true" />
                    <span><PreviewText id="CetaceanPage.rich.77a79fb0f5db.1">Être à l’aise pour nager au moins 200 mètres avec des palmes, un masque et un tuba.</PreviewText></span>
                  </li>
                  <li>
                    <Check aria-hidden="true" />
                    <span><PreviewText id="CetaceanPage.rich.4b6fbbc5de08.1">Être âgé d’au moins 12 ans.</PreviewText></span>
                  </li>
                </ul>
                <p>
                  <PreviewText id="CetaceanPage.faed83a2479c.1">Observer les cétacés dans l’eau est possible, mais avec des approches spécifiques pour
                  assurer le confort des animaux et le plaisir des plongeurs en toute sécurité.
                </PreviewText></p>
              </aside>
            </div>

            <div className="cetacean-origin-facts">
              {keyFacts.map(({ icon: Icon, value, label }) => (
                <article key={value}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cetacean-origin-story">
          <div className="shell">
            <article className="cetacean-origin-step">
              <div className="cetacean-origin-step-image">
                <Image
                  src="/images/cetaceans/original/whale.webp"
                  alt="Baleine à bosse nageant sous l’eau, vue de côté"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="cetacean-origin-step-copy">
                <span>01</span>
                <p className="eyebrow"><PreviewText id="CetaceanPage.e0bf4e046274.1">Avant le départ</PreviewText></p>
                <h2><PreviewText id="CetaceanPage.c51bf277a96d.1">L’arrivée au centre</PreviewText></h2>
                <p>
                  <PreviewText id="CetaceanPage.ca860e97f52d.1">On se donne rendez-vous au centre le matin. Notre centre de plongée est équipé d’une
                  douche, d’un vestiaire et de casiers pour vos affaires personnelles. Du café, du thé
                  et du sirop vous sont offerts. On vous fournira votre équipement adapté et puis on
                  partira sur le bateau pour un brief de sécurité.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.b85c72ec91ef.1">Les bateaux sont couverts et protégés du soleil. Il y a de la place sur le bateau pour
                  se déplacer et ranger ses affaires personnelles (serviettes, habits, appareils photo,
                  etc.). Pendant la sortie, nous servons des boissons et un goûter.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.3d7aed825b04.1">Si vous avez des membres de votre famille qui préfèrent rester sur le bateau et ne
                  veulent pas faire une mise à l’eau, il n’y a aucun problème. Il y aura le capitaine à
                  bord à tout moment et un prix spécial sera adapté aux personnes qui veulent rester sur
                  le bateau.
                </PreviewText></p>
              </div>
            </article>

            <article className="cetacean-origin-step is-reverse">
              <div className="cetacean-origin-step-image">
                <Image
                  src="/images/cetaceans/original/dolphins.webp"
                  alt="Groupe de dauphins nageant sous l’eau"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="cetacean-origin-step-copy">
                <span>02</span>
                <p className="eyebrow"><PreviewText id="CetaceanPage.052ee7b08116.1">Préparation dans l’océan</PreviewText></p>
                <h2><PreviewText id="CetaceanPage.9005f382502b.1">Les mises à l’eau</PreviewText></h2>
                <p>
                  <PreviewText id="CetaceanPage.94e477f75231.1">Chaque participant pour les mises à l’eau est équipé de palmes, masque, tuba et
                  combinaison. Les prérequis pour cette sortie sont d’avoir déjà maîtrisé ces équipements.
                  Nous ferons une mise à l’eau préalable pour vérifier que le matériel vous est bien adapté
                  et que vous êtes à l’aise pour l’utiliser. Nous nous entraînerons ensuite à nous déplacer
                  dans l’océan en tant que groupe.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.1d4265b62776.1">Si vous n’avez pas la capacité de nager avec l’équipement sans faire de bruit, d’écouter
                  ou de suivre les instructions du guide, nous vous demanderons de rester à bord et de ne
                  pas participer aux mises à l’eau.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.f506e1912695.1">Dès que nous aurons validé tout le monde pour la sortie, il sera temps de partir à la
                  recherche de nos belles rencontres.
                </PreviewText></p>
              </div>
            </article>

            <article className="cetacean-origin-step">
              <div className="cetacean-origin-step-image cetacean-origin-safari-image">
                <Image
                  src="/images/cetaceans/original/whale.webp"
                  alt="Baleine à bosse évoluant dans son milieu naturel"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="cetacean-origin-step-copy">
                <span>03</span>
                <p className="eyebrow"><PreviewText id="CetaceanPage.98494c9a2b81.1">À leur rencontre</PreviewText></p>
                <h2><PreviewText id="CetaceanPage.5dcedf3679ba.1">Le safari</PreviewText></h2>
                <p>
                  <PreviewText id="CetaceanPage.ad5cc733181a.1">Dans un premier temps il faut trouver les animaux&nbsp;! Nous recherchons des signes
                  indiquant qu’une baleine est curieuse et ouverte à une potentielle rencontre. Nous ne
                  proposerons jamais une rencontre avec un animal s’il nous montre qu’il n’est pas intéressé.
                  Si leur comportement le permet, il est alors possible de se mettre à l’eau pour tenter de
                  les observer dans leur milieu naturel. Ce n’est pas toujours facile ni évident&nbsp;!
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.e94f1071fbf3.1">Pour protéger ces cétacés, un arrêté préfectoral impose une distance de sécurité de
                  100 mètres à respecter pour les bateaux. Vous devrez être capables de nager sur cette
                  distance pour pouvoir vous approcher des animaux. Comme cette activité n’est autorisée
                  qu’en dehors de la zone de la réserve naturelle, cela signifie que nous serons en pleine
                  mer et que le fond ne sera pas visible.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.733959966943.1">Bien sûr, un instructeur sera toujours dans l’eau avec le groupe (9 personnes maximum),
                  et tout le monde restera ensemble dans l’eau en se tenant par la main. Notre approche se
                  fait toujours avec calme et respect. Si les animaux le souhaitent, ils peuvent parfois
                  s’approcher, sinon ils ne feront que passer, ou alors ils plongeront pour éviter le contact.
                  Une fois l’observation terminée, nous retournerons au bateau à la nage.
                </PreviewText></p>
                <p>
                  <PreviewText id="CetaceanPage.77df35140378.1">Cette activité peut être répétée autant de fois que les animaux nous le permettent. Elle
                  peut donc être très exigeante physiquement et constituer un excellent entraînement
                  cardio-vasculaire&nbsp;!
                </PreviewText></p>
                <p className="cetacean-origin-video-note">
                  <PreviewText id="CetaceanPage.5fcf717cb175.1">Enfin, un moniteur filmera toutes les observations sous l’eau avec une GoPro&nbsp;12
                  (si nous avons la chance de voir quelque chose sous l’eau&nbsp;!) et il vous enverra un
                  lien pour télécharger les vidéos après la sortie&nbsp;: cela vous est offert&nbsp;!
                </PreviewText></p>
              </div>
            </article>
          </div>
        </section>

        <section className="cetacean-origin-cta">
          <Image
            src="/images/cetaceans/original/cetacean-decoration.png"
            alt=""
            width={197}
            height={314}
            aria-hidden="true"
          />
          <div className="shell cetacean-origin-cta-inner">
            <div>
              <p className="eyebrow light"><PreviewText id="CetaceanPage.b3f173d75346.1">Saison de juin à octobre</PreviewText></p>
              <h2><PreviewText id="CetaceanPage.56b79ddade1c.1">Venez vivre cette rencontre avec nous.</PreviewText></h2>
            </div>
            <div>
              <a
                className="button cetacean-origin-book"
                href={bookingLinks.cetacean_booking}
                target="_blank"
                rel="noreferrer"
              >
                <PreviewText embedded id="CetaceanPage.link.ec887febb688.1">Réserver la sortie </PreviewText><ArrowUpRight aria-hidden="true" size={18} />
              </a>
              <ContactEmailLink className="button button-outline-light">
                <PreviewText embedded id="CetaceanPage.link.ccfa9fa0c631.1">Nous contacter
              </PreviewText></ContactEmailLink>
            </div>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
