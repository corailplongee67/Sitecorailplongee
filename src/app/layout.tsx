import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corail-plongee.com";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
