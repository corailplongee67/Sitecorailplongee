"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { contactMapUrl, defaultSiteContact, emailHref, phoneHref } from "@/lib/site-contact";
import { useSiteContact } from "./PreviewText";

export function FooterContact() {
  const contact = useSiteContact();
  const map = contact.address === defaultSiteContact.address ? "https://maps.google.com/?q=Corail+Plongee+Saint-Gilles-les-Bains" : contactMapUrl(contact.address);
  return <>
    <a className="footer-contact" href={map} target="_blank" rel="noreferrer"><MapPin /> {contact.address}</a>
    <a className="footer-contact" href={`tel:${phoneHref(contact.phone)}`}><Phone /> {contact.phone}</a>
    <a className="footer-contact" href={emailHref(contact.email)}><Mail /> {contact.email}</a>
  </>;
}

export function ContactDetails({ english }: { english: boolean }) {
  const contact = useSiteContact();
  const defaultAddress = contact.address === defaultSiteContact.address;
  const map = defaultAddress ? "https://maps.google.com/?q=Corail+Plongee+Saint-Gilles-les-Bains" : contactMapUrl(contact.address);
  const displayedPhone = contact.phone === defaultSiteContact.phone ? "02.62.24.37.25" : contact.phone;
  return <>
    <a href={map} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><strong>{english ? "Address" : "Adresse"}</strong>{defaultAddress ? <>Port de plaisance,<br />Saint-Gilles les Bains 97434,<br />{english ? "Reunion Island" : "La Réunion"}</> : contact.address}</span></a>
    <a href={`tel:${phoneHref(contact.phone)}`}><Phone aria-hidden="true" /><span><strong>{english ? "Phone" : "Téléphone"}</strong>{displayedPhone}</span></a>
    <a href={emailHref(contact.email)}><Mail aria-hidden="true" /><span><strong>Mail</strong>{contact.email}</span></a>
  </>;
}

export function ContactMap({ english }: { english: boolean }) {
  const contact = useSiteContact();
  const defaultAddress = contact.address === defaultSiteContact.address;
  const url = defaultAddress ? "https://www.google.com/maps?q=Corail+Plong%C3%A9e+Saint-Gilles-les-Bains+La+R%C3%A9union&output=embed" : `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;
  return <>
    <iframe title={defaultAddress ? (english ? "Corail Plongée location at Saint-Gilles-les-Bains marina" : "Localisation de Corail Plongée au port de Saint-Gilles-les-Bains") : `${english ? "Location" : "Localisation"} : ${contact.address}`} src={url} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    <div className="contact-origin-map-label"><MapPin aria-hidden="true" size={17} />{defaultAddress ? "Port de plaisance · Saint-Gilles-les-Bains" : contact.address}</div>
  </>;
}

export function ContactEmailLink({ className, children }: { className?: string; children: ReactNode }) {
  const contact = useSiteContact();
  return <a className={className} href={emailHref(contact.email)}>{children}</a>;
}
