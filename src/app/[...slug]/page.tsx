import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AboutPage } from "@/components/AboutPage";
import { BlogArticlePage, isBlogArticlePath } from "@/components/BlogArticlePage";
import { BlogPage } from "@/components/BlogPage";
import { CartPage } from "@/components/CartPage";
import { CetaceanPage } from "@/components/CetaceanPage";
import { ContactPage } from "@/components/ContactPage";
import { CrossoverPage } from "@/components/CrossoverPage";
import { DiscoveryPage } from "@/components/DiscoveryPage";
import { ExplorationPage } from "@/components/ExplorationPage";
import { EventDetailPage } from "@/components/EventDetailPage";
import { FrenchTrainingPage } from "@/components/FrenchTrainingPage";
import { InitiationPage } from "@/components/InitiationPage";
import { LegalPage } from "@/components/LegalPage";
import { LegacyPage } from "@/components/LegacyPage";
import { ProductDetailPage } from "@/components/ProductDetailPage";
import { ReunionDivingPage } from "@/components/ReunionDivingPage";
import { ServicesPage } from "@/components/ServicesPage";
import { SsiTrainingPage } from "@/components/SsiTrainingPage";
import { getBookingLinks, getEventBySlug, getPriceCatalog } from "@/lib/content-data";
import auditPages from "../../../docs/audit/current-site-pages.json";

type PageProps = { params: Promise<{ slug: string[] }> };

type AuditPage = (typeof auditPages)[number];

const redirectPaths = new Set([
  "/commander/",
  "/sample-page/",
  "/en/boutique/appointment/",
  "/tag/evenement-a-venir/",
  "/nos-tarifs/",
  "/en/rates/",
  "/evenements/",
  "/en/our-events/",
]);

function pathFor(slug: string[]) {
  return `/${slug.join("/")}/`;
}

function findPage(path: string): AuditPage | undefined {
  return auditPages.find((page) => {
    try {
      return new URL(page.url).pathname === path && page.status === 200;
    } catch {
      return false;
    }
  });
}

export async function generateStaticParams() {
  return auditPages.flatMap((page) => {
    const path = new URL(page.url).pathname;
    if (page.status !== 200 || path === "/" || path === "/en/home/" || redirectPaths.has(path)) return [];
    return [{ slug: path.split("/").filter(Boolean) }];
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = pathFor(slug);
  if (path === "/panier/" || path === "/en/cart/") {
    const isEnglish = path.startsWith("/en/");
    return {
      title: isEnglish ? "Cart" : "Panier",
      description: isEnglish
        ? "Continue your order in Corail Plongée’s secure shop."
        : "Poursuivez votre commande dans la boutique sécurisée de Corail Plongée.",
      alternates: { canonical: path },
    };
  }
  const page = findPage(path);
  if (!page) return {};

  if (path === "/qui-sommes-nous/" || path === "/en/about-us/") {
    return {
      title: { absolute: page.title },
      description: page.metaDescription || undefined,
      alternates: { canonical: path },
    };
  }

  const locale = path.startsWith("/en/") ? "en" : "fr";
  return {
    title: page.title || "Corail Plongée",
    description: page.metaDescription || undefined,
    alternates: { canonical: path },
    openGraph: {
      title: page.title || "Corail Plongée",
      description: page.metaDescription || undefined,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: page.kind === "posts" ? "article" : "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const path = pathFor(slug);
  const page = findPage(path);
  if (!page) notFound();

  const bookingLinks = await getBookingLinks();
  if (path === "/qui-sommes-nous/" || path === "/en/about-us/") {
    return (
      <AboutPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/decouverte/" || path === "/en/discover/" || path === "/en/i-discover-baptism/") {
    return (
      <DiscoveryPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/je-decouvre-initiation/" || path === "/en/i-discover-initiation/") {
    return (
      <InitiationPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/formation_ssi/" || path === "/en/ssi_training-course/") {
    return (
      <SsiTrainingPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/formation-francaise/" || path === "/en/french-training/") {
    return (
      <FrenchTrainingPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/je-plonge-autonome/" || path === "/en/i-dive/") {
    const catalog = await getPriceCatalog();
    return (
      <ExplorationPage
        bookingLinks={bookingLinks}
        prices={catalog.prices}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (
    path === "/passerelle/" ||
    path === "/en/continual-course/" ||
    path === "/en/continual-courses/" ||
    path === "/en/french-to-american-american-to-french/" ||
    path === "/en/gateway-adv-ssi-to-pa40/" ||
    path === "/en/ssii-adv-training-course-to-ffessm-pad-40/" ||
    path === "/en/ssii-training-course-to-ffessm-level-3/" ||
    path === "/en/ssii-training-course-to-ffessm-level-2/"
  ) {
    const catalog = await getPriceCatalog();
    return (
      <CrossoverPage
        bookingLinks={bookingLinks}
        prices={catalog.prices}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (
    path === "/sorties-cetaces-2/" ||
    path === "/en/cetacean-excursions/" ||
    path === "/en/dive-cetacean-excursions/"
  ) {
    return (
      <CetaceanPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/nos-prestations/" || path === "/en/our-services/") {
    return (
      <ServicesPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/contactez-nous/" || path === "/en/contact/") {
    return (
      <ContactPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/plonger-reunion/" || path === "/en/to-dive-in-reunion/") {
    return (
      <ReunionDivingPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (
    path === "/blog/" ||
    path === "/en/our-blog/" ||
    path === "/en/blog-about-diving-in-reunion-island/"
  ) {
    return (
      <BlogPage
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }
  if (path === "/panier/" || path === "/en/cart/") {
    return (
      <CartPage
        locale={path.startsWith("/en/") ? "en" : "fr"}
        bookingLinks={bookingLinks}
      />
    );
  }
  if (path === "/en/event-calendar/") redirect("/en/our-events/");
  if (path === "/en/my-account/") redirect(bookingLinks.customer_account);
  if (path === "/en/order-validation/") redirect("/en/cart/");
  if (page.kind === "products") {
    return <ProductDetailPage page={page} bookingLinks={bookingLinks} />;
  }
  if (isBlogArticlePath(path)) {
    return <BlogArticlePage page={page} bookingLinks={bookingLinks} />;
  }
  if (page.kind === "posts") {
    const event = await getEventBySlug(slug.at(-1) ?? "", page.lastmod);
    if (event) return <EventDetailPage page={page} event={event} bookingLinks={bookingLinks} />;
  }
  if (
    path === "/mention-legal/" ||
    path === "/confidentialite/" ||
    path === "/conditions-generales-de-vente/" ||
    path === "/en/privacy-policies/" ||
    path === "/en/terms-and-conditions/"
  ) {
    return (
      <LegalPage
        page={page}
        bookingLinks={bookingLinks}
        locale={path.startsWith("/en/") ? "en" : "fr"}
      />
    );
  }

  return (
    <LegacyPage
      page={page}
      locale={path.startsWith("/en/") ? "en" : "fr"}
      bookingLinks={bookingLinks}
    />
  );
}
