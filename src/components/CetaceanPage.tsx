import Image from "next/image";
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
            <p className="eyebrow light">Whale season · Reunion Island</p>
            <h1>An exceptional experience with cetaceans</h1>
            <p>Excursions resume in July</p>
          </div>
        </section>

        <section className="cetacean-origin-intro">
          <div className="shell">
            <div className="cetacean-origin-intro-title">
              <p className="eyebrow">A wildlife experience</p>
              <h2>Your dream of swimming with whales or dolphins can come true!</h2>
            </div>
            <div className="cetacean-origin-intro-grid">
              <div className="cetacean-origin-intro-copy">
                <h2>Humpback whales or <em>Megaptera novaeangliae</em></h2>
                <p>These marine mammals can be seen in Reunion Island from June to October. They measure an average of 15 metres and can weigh up to 40 tonnes. Humpback whales come to the coast to give birth to their calves and/or to mate, travelling from Antarctica where they spend the rest of the year.</p>
                <p>We offer a three-hour trip accompanied by two diving instructors to observe these majestic animals in the wild, along with the island’s resident dolphins.</p>
                <p>We enter the water with fins, masks, snorkels and wetsuits when visibility, swell, animal behaviour and surrounding boat traffic allow. We approach calmly and respectfully, then let the animals decide the rest.</p>
              </div>
              <aside className="cetacean-origin-requirements">
                <p className="eyebrow light">To participate</p>
                <h3>You must:</h3>
                <ul>
                  <li><Check aria-hidden="true" /><span>Be comfortable swimming at least 200 metres with fins, a mask and a snorkel.</span></li>
                  <li><Check aria-hidden="true" /><span>Be at least 12 years old.</span></li>
                </ul>
                <p>Swimming with cetaceans is possible through specific approaches that protect the animals and keep the group safe.</p>
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
                <span>01</span><p className="eyebrow">The encounter</p><h2>How?</h2>
                <p>First, we have to find the animals. We look for signs that they are curious and open to meeting us. We never force an interaction on an animal that shows no interest.</p>
                <p>By law, boats must remain at least 100 metres away. Participants therefore need to swim this distance in the open ocean, outside the Natural Reserve zone, where the seabed is not visible.</p>
                <p>An instructor remains in the water with a group of no more than nine people. Everyone stays together, holding hands. The animals may approach, simply pass by or dive away. After the observation, the group swims back to the boat.</p>
              </div>
            </article>
            <article className="cetacean-origin-step is-reverse">
              <div className="cetacean-origin-step-image"><Image src="/images/cetaceans/original/dolphins.webp" alt="Dolphins swimming underwater" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className="cetacean-origin-step-copy">
                <span>02</span><p className="eyebrow">Respect and wonder</p><h2>An extraordinary experience</h2>
                <p>Seeing these animals, meeting their gaze and interacting with them can change the way you see the world and our oceans. This is why we love sharing these excursions while strictly respecting the approach rules.</p>
                <p className="cetacean-origin-video-note">“In the end, we will conserve only what we love; we will love only what we understand; and we will understand only what we are taught.” — Baba Dioum</p>
              </div>
            </article>
          </div>
        </section>

        <section className="cetacean-origin-cta">
          <Image src="/images/cetaceans/original/cetacean-decoration.png" alt="" width={197} height={314} aria-hidden="true" />
          <div className="shell cetacean-origin-cta-inner">
            <div><p className="eyebrow light">Season from June to October</p><h2>Experience this encounter with us.</h2></div>
            <div>
              <a className="button cetacean-origin-book" href={bookingLinks.cetacean_booking} target="_blank" rel="noreferrer">Book the excursion <ArrowUpRight aria-hidden="true" size={18} /></a>
              <a className="button button-outline-light" href="mailto:info@corail-plongee.com">Contact us</a>
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
            <p className="eyebrow light">Saison des baleines · La Réunion</p>
            <h1>Une rencontre exceptionnelle avec les cétacés</h1>
            <p>Reprise des sorties en juillet</p>
          </div>
        </section>

        <section className="cetacean-origin-intro">
          <div className="shell">
            <div className="cetacean-origin-intro-title">
              <p className="eyebrow">Une expérience en milieu naturel</p>
              <h2>Vous souhaitez vivre une expérience extraordinaire avec les cétacés&nbsp;?</h2>
            </div>

            <div className="cetacean-origin-intro-grid">
              <div className="cetacean-origin-intro-copy">
                <h2>Les baleines à bosse ou <em>Megaptera novaeangliae</em></h2>
                <p>
                  Ce sont des mammifères marins qui sont visibles à la Réunion de juin à octobre.
                  Ils mesurent en moyenne 15 mètres et pèsent jusqu’à 40 tonnes&nbsp;! Les baleines
                  à bosse viennent sur les côtes réunionnaises pour mettre au monde leurs baleineaux
                  et/ou s’accoupler. Elles viennent d’Antarctique où elles vivent le reste de l’année.
                  Là-bas, l’eau est trop froide et les prédateurs trop nombreux pour que les baleineaux
                  puissent grandir en toute sécurité.
                </p>
                <p>
                  Si cette année, les baleines sont nombreuses à visiter la Réunion, nous vous proposons
                  une sortie de 3 heures. Vous serez accompagnés de 2 moniteurs de plongée pour observer
                  ces animaux majestueux en milieu naturel ainsi que les dauphins résidents.
                </p>
                <p>
                  Nous nous mettons à l’eau avec palmes, masque, tuba et combinaison si les conditions
                  d’observation sont bonnes. Cela varie en fonction de la visibilité, de la houle, du
                  comportement des animaux et des autres bateaux présents. Nous nous approchons ensuite
                  des animaux avec calme et respect… et nous les laissons décider du reste&nbsp;!
                </p>
              </div>

              <aside className="cetacean-origin-requirements">
                <p className="eyebrow light">Pour participer</p>
                <h3>Vous devez&nbsp;:</h3>
                <ul>
                  <li>
                    <Check aria-hidden="true" />
                    <span>Être à l’aise pour nager au moins 200 mètres avec des palmes, un masque et un tuba.</span>
                  </li>
                  <li>
                    <Check aria-hidden="true" />
                    <span>Être âgé d’au moins 12 ans.</span>
                  </li>
                </ul>
                <p>
                  Observer les cétacés dans l’eau est possible, mais avec des approches spécifiques pour
                  assurer le confort des animaux et le plaisir des plongeurs en toute sécurité.
                </p>
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
                <p className="eyebrow">Avant le départ</p>
                <h2>L’arrivée au centre</h2>
                <p>
                  On se donne rendez-vous au centre le matin. Notre centre de plongée est équipé d’une
                  douche, d’un vestiaire et de casiers pour vos affaires personnelles. Du café, du thé
                  et du sirop vous sont offerts. On vous fournira votre équipement adapté et puis on
                  partira sur le bateau pour un brief de sécurité.
                </p>
                <p>
                  Les bateaux sont couverts et protégés du soleil. Il y a de la place sur le bateau pour
                  se déplacer et ranger ses affaires personnelles (serviettes, habits, appareils photo,
                  etc.). Pendant la sortie, nous servons des boissons et un goûter.
                </p>
                <p>
                  Si vous avez des membres de votre famille qui préfèrent rester sur le bateau et ne
                  veulent pas faire une mise à l’eau, il n’y a aucun problème. Il y aura le capitaine à
                  bord à tout moment et un prix spécial sera adapté aux personnes qui veulent rester sur
                  le bateau.
                </p>
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
                <p className="eyebrow">Préparation dans l’océan</p>
                <h2>Les mises à l’eau</h2>
                <p>
                  Chaque participant pour les mises à l’eau est équipé de palmes, masque, tuba et
                  combinaison. Les prérequis pour cette sortie sont d’avoir déjà maîtrisé ces équipements.
                  Nous ferons une mise à l’eau préalable pour vérifier que le matériel vous est bien adapté
                  et que vous êtes à l’aise pour l’utiliser. Nous nous entraînerons ensuite à nous déplacer
                  dans l’océan en tant que groupe.
                </p>
                <p>
                  Si vous n’avez pas la capacité de nager avec l’équipement sans faire de bruit, d’écouter
                  ou de suivre les instructions du guide, nous vous demanderons de rester à bord et de ne
                  pas participer aux mises à l’eau.
                </p>
                <p>
                  Dès que nous aurons validé tout le monde pour la sortie, il sera temps de partir à la
                  recherche de nos belles rencontres.
                </p>
              </div>
            </article>

            <article className="cetacean-origin-step">
              <div className="cetacean-origin-step-image cetacean-origin-safari-image">
                <Image
                  src="/images/cetaceans/original/hero.jpg"
                  alt="Deux baleines à bosse évoluant dans leur milieu naturel"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="cetacean-origin-step-copy">
                <span>03</span>
                <p className="eyebrow">À leur rencontre</p>
                <h2>Le safari</h2>
                <p>
                  Dans un premier temps il faut trouver les animaux&nbsp;! Nous recherchons des signes
                  indiquant qu’une baleine est curieuse et ouverte à une potentielle rencontre. Nous ne
                  proposerons jamais une rencontre avec un animal s’il nous montre qu’il n’est pas intéressé.
                  Si leur comportement le permet, il est alors possible de se mettre à l’eau pour tenter de
                  les observer dans leur milieu naturel. Ce n’est pas toujours facile ni évident&nbsp;!
                </p>
                <p>
                  Pour protéger ces cétacés, un arrêté préfectoral impose une distance de sécurité de
                  100 mètres à respecter pour les bateaux. Vous devrez être capables de nager sur cette
                  distance pour pouvoir vous approcher des animaux. Comme cette activité n’est autorisée
                  qu’en dehors de la zone de la réserve naturelle, cela signifie que nous serons en pleine
                  mer et que le fond ne sera pas visible.
                </p>
                <p>
                  Bien sûr, un instructeur sera toujours dans l’eau avec le groupe (9 personnes maximum),
                  et tout le monde restera ensemble dans l’eau en se tenant par la main. Notre approche se
                  fait toujours avec calme et respect. Si les animaux le souhaitent, ils peuvent parfois
                  s’approcher, sinon ils ne feront que passer, ou alors ils plongeront pour éviter le contact.
                  Une fois l’observation terminée, nous retournerons au bateau à la nage.
                </p>
                <p>
                  Cette activité peut être répétée autant de fois que les animaux nous le permettent. Elle
                  peut donc être très exigeante physiquement et constituer un excellent entraînement
                  cardio-vasculaire&nbsp;!
                </p>
                <p className="cetacean-origin-video-note">
                  Enfin, un moniteur filmera toutes les observations sous l’eau avec une GoPro&nbsp;12
                  (si nous avons la chance de voir quelque chose sous l’eau&nbsp;!) et il vous enverra un
                  lien pour télécharger les vidéos après la sortie&nbsp;: cela vous est offert&nbsp;!
                </p>
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
              <p className="eyebrow light">Saison de juin à octobre</p>
              <h2>Venez vivre cette rencontre avec nous.</h2>
            </div>
            <div>
              <a
                className="button cetacean-origin-book"
                href={bookingLinks.cetacean_booking}
                target="_blank"
                rel="noreferrer"
              >
                Réserver la sortie <ArrowUpRight aria-hidden="true" size={18} />
              </a>
              <a className="button button-outline-light" href="mailto:info@corail-plongee.com">
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
