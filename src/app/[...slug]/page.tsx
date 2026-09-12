import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/AboutPage";
import { CetaceanPage } from "@/components/CetaceanPage";
import { ContactPage } from "@/components/ContactPage";
import { CrossoverPage } from "@/components/CrossoverPage";
import { DiscoveryPage } from "@/components/DiscoveryPage";
import { ExplorationPage } from "@/components/ExplorationPage";
import { FrenchTrainingPage } from "@/components/FrenchTrainingPage";
import { InitiationPage } from "@/components/InitiationPage";
import { LegacyPage } from "@/components/LegacyPage";
import { ServicesPage } from "@/components/ServicesPage";
import { SsiTrainingPage } from "@/components/SsiTrainingPage";
import { getBookingLinks, getPriceCatalog } from "@/lib/content-data";
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
  const page = findPage(path);
  if (!page) return {};

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
  if (path === "/qui-sommes-nous/") {
    return <AboutPage bookingLinks={bookingLinks} />;
  }
  if (path === "/decouverte/") {
    return <DiscoveryPage bookingLinks={bookingLinks} />;
  }
  if (path === "/je-decouvre-initiation/") {
    return <InitiationPage bookingLinks={bookingLinks} />;
  }
  if (path === "/formation_ssi/") {
    return <SsiTrainingPage bookingLinks={bookingLinks} />;
  }
  if (path === "/formation-francaise/") {
    return <FrenchTrainingPage bookingLinks={bookingLinks} />;
  }
  if (path === "/je-plonge-autonome/") {
    const catalog = await getPriceCatalog();
    return <ExplorationPage bookingLinks={bookingLinks} prices={catalog.prices} />;
  }
  if (path === "/passerelle/") {
    const catalog = await getPriceCatalog();
    return <CrossoverPage bookingLinks={bookingLinks} prices={catalog.prices} />;
  }
  if (path === "/sorties-cetaces-2/") {
    return <CetaceanPage bookingLinks={bookingLinks} />;
  }
  if (path === "/nos-prestations/") {
    return <ServicesPage bookingLinks={bookingLinks} />;
  }
  if (path === "/contactez-nous/") {
    return <ContactPage bookingLinks={bookingLinks} />;
  }

  return (
    <LegacyPage
      page={page}
      locale={path.startsWith("/en/") ? "en" : "fr"}
      bookingLinks={bookingLinks}
    />
  );
}
