import { contact } from "./site-data";

export const SITE_CONTACT_TEXT_KEY = "global.contact";
export type SiteContact = { address: string; phone: string; email: string };
export const defaultSiteContact: SiteContact = { address: contact.address, phone: contact.phoneDisplay, email: contact.email };

export function validateSiteContact(value: SiteContact): SiteContact {
  const address = value.address.trim();
  const phone = value.phone.trim();
  const email = value.email.trim();
  if (!address || address.length > 300 || /[\r\n]/.test(address)) throw new Error("L’adresse doit tenir sur une ligne et contenir au maximum 300 caractères.");
  const digits = phone.replace(/\D/g, "");
  if (!/^(?:\+|00)?[\d .()/-]+$/.test(phone) || digits.length < 8 || digits.length > 15) throw new Error("Le numéro de téléphone est invalide.");
  if (email.length > 254 || !/^[a-z0-9.!$%&'*+/=^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) throw new Error("L’adresse e-mail est invalide.");
  return { address, phone, email };
}

export function resolveSiteContact(raw: string | undefined): SiteContact {
  if (!raw) return defaultSiteContact;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("address" in value) || typeof value.address !== "string" || !("phone" in value) || typeof value.phone !== "string" || !("email" in value) || typeof value.email !== "string") return defaultSiteContact;
    return validateSiteContact({ address: value.address, phone: value.phone, email: value.email });
  } catch { return defaultSiteContact; }
}

export function phoneHref(phone: string) {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : trimmed.startsWith("00") ? `+${digits.slice(2)}` : digits;
}

export function contactMapUrl(address: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export function emailHref(email: string) {
  return `mailto:${encodeURIComponent(email).replace(/%40/i, "@")}`;
}
