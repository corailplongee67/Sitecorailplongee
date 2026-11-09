import type { Metadata, Viewport } from "next";
import { createHash } from "node:crypto";
import type { CSSProperties } from "react";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import { BackgroundMusicPlayer } from "@/components/BackgroundMusicPlayer";
import { SiteImageProvider } from "@/components/SiteImage";
import { PreviewModeButton, PreviewReviewButton, PreviewTextProvider } from "@/components/PreviewText";
import { closeSitePreview } from "@/app/admin/actions";
import { getSiteAudioSettings } from "@/lib/site-audio-data";
import { getSiteImages } from "@/lib/site-images-data";
import { contact } from "@/lib/site-data";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { readLocalTextDrafts } from "@/lib/local-text-drafts";
import { readSharedText, sharedTextEditorEnabled } from "@/lib/shared-text-drafts";
import { defaultSiteContact, phoneHref, resolveSiteContact, SITE_CONTACT_TEXT_KEY } from "@/lib/site-contact";
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
  const [siteImages, siteAudio] = await Promise.all([getSiteImages(), getSiteAudioSettings()]);
  const draft = await draftMode();
  let showPreview = false;
  if (draft.isEnabled && hasSupabaseEnv()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const role = (data?.claims?.app_metadata as { role?: string } | undefined)?.role;
    showPreview = Boolean(data?.claims?.sub && role === "admin");
  }
  const sharedEditor = sharedTextEditorEnabled();
  const canEdit = showPreview && (process.env.NODE_ENV === "development" || sharedEditor);
  const [publishedText, drafts] = await Promise.all([
    sharedEditor ? readSharedText(true) : Promise.resolve({} as Record<string, string>),
    canEdit ? (sharedEditor ? readSharedText(false) : readLocalTextDrafts()) : Promise.resolve({} as Record<string, string>),
  ]);
  const previewRevision = canEdit ? createHash("sha256").update(JSON.stringify(Object.entries(drafts).sort(([a], [b]) => a.localeCompare(b)))).digest("hex") : "public";
  const publishedContact = resolveSiteContact(publishedText[SITE_CONTACT_TEXT_KEY]);
  const publicBusiness = {
    ...localBusinessJsonLd,
    telephone: phoneHref(publishedContact.phone),
    email: publishedContact.email,
    address: publishedContact.address === defaultSiteContact.address ? localBusinessJsonLd.address : publishedContact.address,
  };
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
            __html: JSON.stringify(publicBusiness).replace(/</g, "\\u003c"),
          }}
        />
        <SiteImageProvider images={siteImages}><PreviewTextProvider key={`${showPreview ? "editing" : "viewing"}:${previewRevision}`} enabled={canEdit} initialDrafts={drafts} published={publishedText} shared={sharedEditor}>
          {showPreview ? (
            <div className="site-preview-bar">
              <span>Aperçu privé · {sharedEditor ? "brouillons non publiés" : "brouillons locaux"}</span>
              {canEdit ? <PreviewModeButton /> : null}
              {canEdit ? <PreviewReviewButton /> : null}
              <form action={closeSitePreview}><button type="submit">Quitter l’aperçu</button></form>
            </div>
          ) : null}
          {children}
        </PreviewTextProvider></SiteImageProvider>
        {siteAudio ? (
          <Suspense fallback={null}>
            <BackgroundMusicPlayer src={siteAudio.url} volume={siteAudio.volume} />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
