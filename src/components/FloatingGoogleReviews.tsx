"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_GOOGLE_REVIEWS_URL, GOOGLE_REVIEWS_URL_KEY, googleReviewsUrl } from "@/lib/google-reviews";
import { useSharedTextValue } from "./PreviewText";

export function FloatingGoogleReviews() {
  const pathname = usePathname();
  const url = googleReviewsUrl(useSharedTextValue(GOOGLE_REVIEWS_URL_KEY, DEFAULT_GOOGLE_REVIEWS_URL));
  if (pathname.startsWith("/admin")) return null;
  return <a className="floating-google-reviews" href={url} target="_blank" rel="noopener noreferrer" aria-label="Voir les avis Google et laisser un avis (nouvel onglet)"><span aria-hidden="true">★</span> Avis Google</a>;
}
