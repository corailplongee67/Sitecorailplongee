import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { SiteImageProvider } from "@/components/SiteImage";
import { getSiteImages } from "@/lib/site-images-data";
import { contact } from "@/lib/site-data";
import "./globals.css";
import "./design-v2.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corail-plongee.com";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SportsActivityLocation"],
  "@id": `${siteUrl}/#corail-plongee`,
  name: "Corail Plongée",
  url: siteUrl,
  logo: new URL("/images/brand/logo.png", siteUrl).toString(),
  image: new URL("/images/hero/turtle-rays-corail-plongee.png", siteUrl).toString(),
  telephone: contact.phoneHref,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Port de plaisance",
    postalCode: "97434",
    addressLocality: "Saint-Gilles-les-Bains",
    addressRegion: "La Réunion",
    addressCountry: "FR",
  },
  sameAs: [
    "https://web.facebook.com/corailplongeereunion/",
    "https://www.instagram.com/corail.plongee/",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plongée sous-marine à La Réunion | Corail Plongée",
    template: "%s | Corail Plongée",
  },
  description:
    "Baptêmes, explorations, formations et sorties cétacés à Saint-Gilles-les-Bains, sur la côte ouest de La Réunion.",
  applicationName: "Corail Plongée",
  authors: [{ name: "Corail Plongée" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Corail Plongée",
    images: [{ url: "/images/hero/corail-reef.jpg", width: 1440, height: 960 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#042330",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const siteImages = await getSiteImages();
  const managedBackgrounds = {
    "--site-image-ssi-video": `url("${siteImages["/images/ssi/original/video-deep.jpg"] ?? "/images/ssi/original/video-deep.jpg"}")`,
    "--site-image-cetacean-floral": `url("${siteImages["/images/cetaceans/original/floral-corner.png"] ?? "/images/cetaceans/original/floral-corner.png"}")`,
  } as CSSProperties;

  return (
    <html lang="fr">
      <body style={managedBackgrounds}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SiteImageProvider images={siteImages}>{children}</SiteImageProvider>
      </body>
    </html>
  );
}
