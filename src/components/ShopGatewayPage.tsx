import { PreviewText } from "./PreviewText";
import { SiteImage as Image } from "./SiteImage";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink, Gift, LockKeyhole, ShoppingBag } from "lucide-react";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { BookingKey, Locale } from "@/lib/site-data";

const categories = [
  ["Découverte & initiation", "Discovery & introductory dives", "discovery"],
  ["Formations SSI", "SSI training", "ssi"],
  ["Formations françaises", "French diving courses", "french-training"],
  ["Nitrox", "Nitrox courses", "nitrox"],
  ["Exploration encadrée", "Guided exploration", "guided"],
  ["Exploration autonome", "Independent exploration", "independent"],
];

export function ShopGatewayPage({ locale, bookingLinks }: {
  locale: Locale;
  bookingLinks: Record<BookingKey, string>;
}) {
  const fr = locale === "fr";
  return (
    <>
      <Header locale={locale} bookingUrl={bookingLinks.agenda} giftUrl={bookingLinks.gift_dive} accountUrl={bookingLinks.customer_account} />
      <main className="shop-gateway-main">
        <section className="shop-gateway-hero">
          <Image src="/images/hero/diving-reunion.jpg" alt="" fill priority sizes="100vw" />
          <div className="shop-gateway-shade" />
          <div className="shell shop-gateway-copy">
            <p className="eyebrow light"><PreviewText id="ShopGatewayPage.f86843a1559d.1">Corail Plongée · Saint-Gilles-les-Bains</PreviewText></p>
            <h1><PreviewText id="ShopGatewayPage.c5bab94d742e.1">{fr ? "La boutique" : "The shop"}</PreviewText></h1>
            <p><PreviewText id="ShopGatewayPage.b3962abd7574.1">{fr ? "Réservez une expérience ou offrez une plongée depuis notre espace de paiement sécurisé." : "Book an experience or offer a dive through our secure checkout."}</PreviewText></p>
            <BookingCta href={bookingLinks.gift_dive}><PreviewText embedded id="ShopGatewayPage.link.e148dbc17878.1">{fr ? "Accéder à la boutique" : "Open the shop"}</PreviewText></BookingCta>
          </div>
        </section>

        <section className="shop-gateway-section">
          <div className="shell shop-gateway-layout">
            <div className="shop-gateway-categories">
              <p className="eyebrow"><PreviewText id="ShopGatewayPage.7e7923c8c781.1">{fr ? "Toutes vos envies" : "Every way to dive"}</PreviewText></p>
              <h2><PreviewText id="ShopGatewayPage.3d51a7744627.1">{fr ? "Choisissez votre expérience." : "Choose your experience."}</PreviewText></h2>
              <div>
                {categories.map((category, index) => <span key={category[2]}><b>{String(index + 1).padStart(2, "0")}</b><PreviewText id={`shop.category.${category[2]}`}>{fr ? category[0] : category[1]}</PreviewText></span>)}
              </div>
            </div>
            <aside className="shop-gateway-panel">
              <ShoppingBag aria-hidden="true" />
              <h2><PreviewText id="ShopGatewayPage.ef4ace8f063b.1">{fr ? "Une commande simple et sécurisée" : "A simple, secure order"}</PreviewText></h2>
              <ul>
                <li><LockKeyhole aria-hidden="true" /> <PreviewText id="shop.trust.payment">{fr ? "Paiement géré dans la boutique Zuurit" : "Payment handled in the Zuurit shop"}</PreviewText></li>
                <li><Gift aria-hidden="true" /> <PreviewText id="shop.trust.gift">{fr ? "Possibilité d’offrir la prestation" : "Option to offer the experience as a gift"}</PreviewText></li>
                <li><CalendarDays aria-hidden="true" /> <PreviewText id="shop.trust.availability">{fr ? "Agenda et disponibilités actualisés" : "Up-to-date calendar and availability"}</PreviewText></li>
              </ul>
              <a href={bookingLinks.gift_dive} target="_blank" rel="noreferrer"><PreviewText embedded id="ShopGatewayPage.link.f0988abea99a.1">{fr ? "Voir tous les produits" : "See all products"}</PreviewText> <ExternalLink aria-hidden="true" /></a>
              <Link href={fr ? "/" : "/en/home/"}><ArrowLeft aria-hidden="true" /> <PreviewText embedded id="ShopGatewayPage.link.71b47927b8d6.1">{fr ? "Retour à l’accueil" : "Back home"}</PreviewText></Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
