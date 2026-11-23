export const GOOGLE_REVIEWS_URL_KEY = "global.google_reviews_url";
export const DEFAULT_GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Corail+Plong%C3%A9e/@-21.0538625,55.2264702,17z/data=!4m8!3m7!1s0x218291f62f0b1073:0x8a6980bc7921c4fb!8m2!3d-21.0538625!4d55.2264702!9m1!1b1!16s%2Fg%2F11cjj4v87n?hl=fr";

export function validateGoogleReviewsUrl(value: string) {
  const url = new URL(value.trim());
  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || url.username || url.password || !(
    host === "share.google" || host === "g.page" || host === "maps.app.goo.gl" ||
    host === "google.com" || host.endsWith(".google.com") || host === "google.fr" || host.endsWith(".google.fr")
  )) throw new Error("Veuillez saisir un lien Google valide en HTTPS.");
  return url.toString();
}

export function googleReviewsUrl(value?: string) {
  try { return validateGoogleReviewsUrl(value || DEFAULT_GOOGLE_REVIEWS_URL); }
  catch { return DEFAULT_GOOGLE_REVIEWS_URL; }
}
