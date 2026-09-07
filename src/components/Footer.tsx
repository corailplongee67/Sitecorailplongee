import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact, type Locale } from "@/lib/site-data";

const partners = [
  ["/images/partners/ffessm.png", "FFESSM"],
  ["/images/partners/ssi.webp", "SSI"],
  ["/images/partners/anmp.png", "ANMP"],
  ["/images/partners/qualite-tourisme.webp", "Qualité Tourisme"],
  ["/images/partners/cetaceans-responsible.png", "Observation responsable des cétacés"],
  ["/images/partners/scubapro.png", "Scubapro"],
  ["/images/partners/nitrox.png", "Nitrox"],
] as const;

export function PartnerStrip() {
  return (
    <section className="partner-strip" aria-label="Partenaires et certifications">
      <div className="shell partner-row">
        {partners.map(([src, alt]) => (
          <div className="partner-logo" key={src}>
            <Image src={src} alt={alt} width={112} height={64} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const isFr = locale === "fr";
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Image src="/images/brand/logo.png" alt="Corail Plongée" width={205} height={96} />
          <p>
            {isFr
              ? "Depuis le port de Saint-Gilles-les-Bains, notre équipe vous accueille toute l’année pour partager les plus beaux reliefs sous-marins de La Réunion."
              : "From Saint-Gilles-les-Bains marina, our team welcomes you year-round to share Reunion Island’s most beautiful underwater landscapes."}
          </p>
          <div className="social-links">
            <a href="https://web.facebook.com/corailplongeereunion/" aria-label="Facebook"><span aria-hidden="true">f</span></a>
            <a href="https://www.instagram.com/corail.plongee/" aria-label="Instagram"><span aria-hidden="true">◎</span></a>
          </div>
        </div>

        <div>
          <p className="footer-title">{isFr ? "Nous trouver" : "Find us"}</p>
          <a className="footer-contact" href="https://maps.google.com/?q=Corail+Plongee+Saint-Gilles-les-Bains" target="_blank" rel="noreferrer">
            <MapPin /> {contact.address}
          </a>
          <a className="footer-contact" href={`tel:${contact.phoneHref}`}><Phone /> {contact.phoneDisplay}</a>
          <a className="footer-contact" href={`mailto:${contact.email}`}><Mail /> {contact.email}</a>
        </div>

        <div>
          <p className="footer-title">{isFr ? "Informations" : "Information"}</p>
          <div className="footer-links">
            <Link href={isFr ? "/qui-sommes-nous/" : "/en/about-us/"}>{isFr ? "Le centre" : "The centre"}</Link>
            <Link href={isFr ? "/blog/" : "/en/blog-about-diving-in-reunion-island/"}>Blog</Link>
            <Link href={isFr ? "/contactez-nous/" : "/en/contact/"}>{isFr ? "Contact" : "Contact"}</Link>
            <Link href={isFr ? "/mention-legal/" : "/en/terms-and-conditions/"}>{isFr ? "Mentions légales" : "Legal notice"}</Link>
            <Link href={isFr ? "/confidentialite/" : "/en/privacy-policies/"}>{isFr ? "Confidentialité" : "Privacy"}</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} Corail Plongée</span>
        <span>{isFr ? "Port de Saint-Gilles · Île de La Réunion" : "Saint-Gilles marina · Reunion Island"}</span>
      </div>
    </footer>
  );
}
