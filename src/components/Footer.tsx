import { PreviewText } from "./PreviewText";
import Image from "next/image";
import Link from "next/link";
import { FooterContact } from "./SiteContact";
import { type Locale } from "@/lib/site-data";

const partners = [
  ["/images/partners/ffessm.png", "FFESSM"],
  ["/images/partners/ssi.webp", "SSI"],
  ["/images/partners/anmp.png", "ANMP"],
  ["/images/partners/qualite-tourisme.webp", "Qualité Tourisme"],
  ["/images/partners/cetaceans-responsible.png", "Observation responsable des cétacés"],
  ["/images/partners/scubapro.png", "Scubapro"],
  ["/images/partners/nitrox.png", "Nitrox"],
] as const;

export function PartnerStrip({ locale = "fr" }: { locale?: Locale }) {
  return (
    <section className="partner-strip" aria-label={locale === "fr" ? "Partenaires et certifications" : "Partners and certifications"}>
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
            <PreviewText id="Footer.294903ec7951.1">{isFr
              ? "Depuis le port de Saint-Gilles-les-Bains, notre équipe vous accueille toute l’année pour partager les plus beaux reliefs sous-marins de La Réunion."
              : "From Saint-Gilles-les-Bains marina, our team welcomes you year-round to share Reunion Island’s most beautiful underwater landscapes."}</PreviewText>
          </p>
          <div className="social-links">
            <a href="https://web.facebook.com/corailplongeereunion/" aria-label="Facebook"><span aria-hidden="true">f</span></a>
            <a href="https://www.instagram.com/corail.plongee/" aria-label="Instagram"><span aria-hidden="true">◎</span></a>
          </div>
        </div>

        <div>
          <p className="footer-title"><PreviewText id="Footer.09410d7cf194.1">{isFr ? "Nous trouver" : "Find us"}</PreviewText></p>
          <FooterContact />
        </div>

        <div>
          <p className="footer-title"><PreviewText id="Footer.94b20a9e60fd.1">{isFr ? "Informations" : "Information"}</PreviewText></p>
          <div className="footer-links">
            <Link href={isFr ? "/qui-sommes-nous/" : "/en/about-us/"}><PreviewText embedded id="Footer.link.d2f5956c66cb.1">{isFr ? "Le centre" : "The centre"}</PreviewText></Link>
            <Link href={isFr ? "/blog/" : "/en/blog-about-diving-in-reunion-island/"}><PreviewText embedded id="Footer.link.8c6bc099534a.1">Blog</PreviewText></Link>
            <Link href={isFr ? "/contactez-nous/" : "/en/contact/"}><PreviewText embedded id="Footer.link.58db8114e276.1">{isFr ? "Contact" : "Contact"}</PreviewText></Link>
            <Link href={isFr ? "/mention-legal/" : "/en/terms-and-conditions/"}><PreviewText embedded id="Footer.link.d5c3a0698902.1">{isFr ? "Mentions légales" : "Legal notice"}</PreviewText></Link>
            <Link href={isFr ? "/confidentialite/" : "/en/privacy-policies/"}><PreviewText embedded id="Footer.link.0e5b7ccec041.1">{isFr ? "Confidentialité" : "Privacy"}</PreviewText></Link>
          </div>
        </div>
      </div>
      <div className="shell footer-funding">
        <p className="footer-title"><PreviewText id="Footer.3a6b9341d053.1">{isFr ? "Financement européen" : "European funding"}</PreviewText></p>
        <div>
          <p><PreviewText id="Footer.397f2ebefd15.1">{isFr ? "Ce site a été financé à l’aide du FEDER (REACT-UE) dans le cadre de la réponse de l’Union européenne à la pandémie COVID-19." : "This site was funded by the ERDF (REACT-EU) as part of the European Union’s response to the COVID-19 pandemic."}</PreviewText></p>
          <p><PreviewText id="Footer.2f3652823da3.1">{isFr ? "Le recrutement de 3 moniteurs de plongée et 1 secrétaire a été financé par l’Union européenne." : "The recruitment of three diving instructors and one secretary was funded by the European Union."}</PreviewText></p>
          <p><PreviewText id="Footer.7de2fc6c7dd4.1">{isFr ? "Le développement de l’activité de plongée sous-marine de loisirs est financé par l’Union européenne pour l’acquisition d’un bateau « Popot Dive »." : "The development of recreational scuba diving was supported by the European Union through the acquisition of the “Popot Dive” boat."}</PreviewText></p>
          <strong>{isFr ? "L’Europe s’engage à La Réunion." : "Europe is committed to Reunion Island."}</strong>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} Corail Plongée</span>
        <span>{isFr ? "Port de Saint-Gilles · Île de La Réunion" : "Saint-Gilles marina · Reunion Island"}</span>
      </div>
    </footer>
  );
}
