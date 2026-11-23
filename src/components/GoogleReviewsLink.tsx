"use client";

import { googleReviewsUrl, GOOGLE_REVIEWS_URL_KEY, DEFAULT_GOOGLE_REVIEWS_URL } from "@/lib/google-reviews";
import { PreviewText, useSharedTextValue } from "./PreviewText";

export function GoogleReviewsLink() {
  const url = googleReviewsUrl(useSharedTextValue(GOOGLE_REVIEWS_URL_KEY, DEFAULT_GOOGLE_REVIEWS_URL));
  return <a className="button button-navy" href={url} target="_blank" rel="noopener noreferrer"><PreviewText embedded id="home.reviews.link">Voir les avis sur Google</PreviewText></a>;
}
