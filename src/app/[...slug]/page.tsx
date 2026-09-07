import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyPage } from "@/components/LegacyPage";
import { getBookingLinks } from "@/lib/content-data";
import auditPages from "../../../docs/audit/current-site-pages.json";

type PageProps = { params: Promise<{ slug: string[] }> };

type AuditPage = (typeof auditPages)[number];

const redirectPaths = new Set([
  "/commander/",
  "/sample-page/",
  "/en/boutique/appointment/",
  "/tag/evenement-a-venir/",
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
  return (
    <LegacyPage
      page={page}
      locale={path.startsWith("/en/") ? "en" : "fr"}
      bookingLinks={bookingLinks}
    />
  );
}
