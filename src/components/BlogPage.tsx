import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { BookingKey } from "@/lib/site-data";

type BookingLinks = Record<BookingKey, string>;

const articles = [
  {
    title: "Protection de la Biodiversité Marine : l’engagement de Corail Plongée pour le lagon réunionnais",
    excerpt: "La splendeur des fonds marins de La Réunion n’est pas seulement une ressource touristique, c’est un patrimoine biologique inestimable qui exige une vigilance de chaque instant. En tant qu’acteurs quotidiens",
    date: "30 mars 2026",
    image: "/images/blog/original/biodiversite.webp",
    href: "/engagement-protection-biodiversite-marine-reunion/",
  },
  {
    title: "Formation et Niveaux de Plongée : guide pour progresser du baptême à l’autonomie",
    excerpt: "Devenir plongeur est une quête de liberté qui commence par un premier souffle sous l’eau et s’épanouit à travers un apprentissage continu et structuré. À La Réunion, les conditions idéales",
    date: "24 mars 2026",
    image: "/images/blog/original/formation.webp",
    href: "/guide-formation-niveaux-plongee-reunion/",
  },
  {
    title: "La Plongée de Nuit : une expérience sensorielle unique pour découvrir la faune nocturne",
    excerpt: "Lorsque le soleil disparaît derrière l’horizon de l’océan Indien, un tout autre monde s’éveille sous la surface des eaux réunionnaises. La plongée de nuit transforme radicalement les paysages familiers en",
    date: "17 mars 2026",
    image: "/images/blog/original/nuit.webp",
    href: "/experience-sensorielle-plongee-nuit-reunion/",
  },
  {
    title: "Plongées à thème : comment explorer les épaves mythiques de l’île en toute sécurité ?",
    excerpt: "L’océan Indien conserve dans ses profondeurs les vestiges d’histoires maritimes captivantes, transformées au fil du temps en récifs artificiels grouillants de vie. Plonger sur une épave à La Réunion n’est",
    date: "10 mars 2026",
    image: "/images/blog/original/epaves.jpg",
    href: "/plonger-epaves-mythiques-reunion-securite/",
  },
  {
    title: "Plongée à La Réunion : les secrets des plus beaux fonds marins de Saint-Gilles-les-Bains",
    excerpt: "La côte ouest de l’île intense abrite des trésors biologiques insoupçonnés, protégés par une barrière de corail qui dessine un lagon aux eaux cristallines. Plonger à Saint-Gilles-les-Bains, c’est s’offrir une",
    date: "3 mars 2026",
    image: "/images/blog/original/saint-gilles.webp",
    href: "/plongee-reunion-secrets-fonds-marins-saint-gilles/",
  },
  {
    title: "Préparer son séjour sous-marin : le guide pratique pour plonger à la Réunion",
    excerpt: "L’île de la Réunion est une destination d’exception qui demande une organisation rigoureuse pour profiter pleinement de ses trésors subaquatiques. Entre la gestion des billets d’avion, le choix de l’hébergement",
    date: "27 janvier 2026",
    image: "/images/blog/original/sejour.webp",
    href: "/organiser-voyage-plongee-reunion-checklist/",
  },
  {
    title: "La plongée comme thérapie : cultiver son bien-être sous la surface",
    excerpt: "Dans un monde où le rythme quotidien est de plus en plus effréné, la recherche de sérénité devient une priorité pour beaucoup. La plongée sous-marine, bien au-delà de l’aspect sportif,",
    date: "19 janvier 2026",
    image: "/images/blog/original/therapie.webp",
    href: "/la-plongee-comme-therapie-cultiver-son-bien-etre-sous-la-surface/",
  },
  {
    title: "Protection de l’Océan Indien : s’engager pour la survie des récifs à la Réunion",
    excerpt: "Les récifs coralliens de l’île de la Réunion représentent un écosystème d’une richesse inestimable, mais d’une fragilité extrême face aux pressions anthropiques et au dérèglement climatique. En tant que plongeurs,",
    date: "13 janvier 2026",
    image: "/images/blog/original/ocean-indien.jpg",
    href: "/preservation-recifs-coralliens-plongee-reunion/",
  },
  {
    title: "Le team building sous-marin : l’atout d’un séminaire réussi à la Réunion",
    excerpt: "L’organisation d’un séminaire d’entreprise à l’île de la Réunion est l’occasion parfaite de sortir des cadres de travail habituels pour offrir aux collaborateurs une expérience marquante. Dans un contexte professionnel",
    date: "5 janvier 2026",
    image: "/images/blog/original/team-building.webp",
    href: "/seminaire-entreprise-plongee-reunion/",
  },
  {
    title: "Plongée sous-marine à La Réunion : exploration de la biodiversité marine",
    excerpt: "L’île de La Réunion, perle volcanique de l’océan Indien, offre aux passionnés de nature un spectacle sous-marin d’une intensité rare. Au-delà de ses paysages montagneux classés au patrimoine mondial, ses",
    date: "2 janvier 2026",
    image: "/images/blog/original/biodiversite-reunion.jpg",
    href: "/plongee-sous-marine-reunion-biodiversite/",
  },
] as const;

export function BlogPage({ bookingLinks }: { bookingLinks: BookingLinks }) {
  return (
    <>
      <Header
        locale="fr"
        bookingUrl={bookingLinks.agenda}
        giftUrl={bookingLinks.gift_dive}
        accountUrl={bookingLinks.customer_account}
      />

      <main className="blog-origin-main">
        <section className="blog-origin-hero">
          <Image
            src="/images/blog/original/hero.jpg"
            alt="Plongeur au-dessus des fonds marins de La Réunion"
            fill
            priority
            sizes="100vw"
          />
          <div className="blog-origin-hero-shade" />
          <div className="shell blog-origin-hero-copy">
            <p className="eyebrow light">Conseils · Découvertes · Océan</p>
            <h1>Blog</h1>
            <p>Blog sur la Plongée à la Réunion</p>
          </div>
        </section>

        <section className="blog-origin-content" id="content">
          <div className="shell blog-origin-panel">
            <header className="blog-origin-heading">
              <div>
                <p className="eyebrow">Le journal de Corail Plongée</p>
                <h2>Blog</h2>
              </div>
              <p>
                Conseils pratiques, biodiversité marine et récits d’exploration pour préparer et
                enrichir vos plongées à La Réunion.
              </p>
            </header>

            <div className="blog-origin-grid">
              {articles.map((article, index) => (
                <article className="blog-origin-card" key={article.href}>
                  <Link className="blog-origin-image" href={article.href} aria-label={article.title}>
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <span className="blog-origin-image-shade" />
                    <span className="blog-origin-index">{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                  <div className="blog-origin-card-copy">
                    <p className="blog-origin-date">
                      <CalendarDays aria-hidden="true" size={15} /> {article.date}
                    </p>
                    <h3><Link href={article.href}>{article.title}</Link></h3>
                    <p className="blog-origin-excerpt">{article.excerpt}…</p>
                    <Link className="blog-origin-read" href={article.href}>
                      Lire l’article <ArrowUpRight aria-hidden="true" size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale="fr" />
    </>
  );
}
