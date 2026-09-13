import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink, Gift, LockKeyhole, ShoppingBag } from "lucide-react";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { BookingKey, Locale } from "@/lib/site-data";

const categories = [
  ["Découverte & initiation", "Discovery & introductory dives"],
  ["Formations SSI", "SSI training"],
  ["Formations françaises", "French diving courses"],
  ["Nitrox", "Nitrox courses"],
  ["Exploration encadrée", "Guided exploration"],
  ["Exploration autonome", "Independent exploration"],
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
            <p className="eyebrow light">Corail Plongée · Saint-Gilles-les-Bains</p>
            <h1>{fr ? "La boutique" : "The shop"}</h1>
            <p>{fr ? "Réservez une expérience ou offrez une plongée depuis notre espace de paiement sécurisé." : "Book an experience or offer a dive through our secure checkout."}</p>
            <BookingCta href={bookingLinks.gift_dive}>{fr ? "Accéder à la boutique" : "Open the shop"}</BookingCta>
          </div>
        </section>

        <section className="shop-gateway-section">
          <div className="shell shop-gateway-layout">
            <div className="shop-gateway-categories">
              <p className="eyebrow">{fr ? "Toutes vos envies" : "Every way to dive"}</p>
              <h2>{fr ? "Choisissez votre expérience." : "Choose your experience."}</h2>
              <div>
                {categories.map((category, index) => <span key={category[0]}><b>{String(index + 1).padStart(2, "0")}</b>{fr ? category[0] : category[1]}</span>)}
              </div>
            </div>
            <aside className="shop-gateway-panel">
              <ShoppingBag aria-hidden="true" />
              <h2>{fr ? "Une commande simple et sécurisée" : "A simple, secure order"}</h2>
              <ul>
                <li><LockKeyhole aria-hidden="true" /> {fr ? "Paiement géré dans la boutique Zuurit" : "Payment handled in the Zuurit shop"}</li>
                <li><Gift aria-hidden="true" /> {fr ? "Possibilité d’offrir la prestation" : "Option to offer the experience as a gift"}</li>
                <li><CalendarDays aria-hidden="true" /> {fr ? "Agenda et disponibilités actualisés" : "Up-to-date calendar and availability"}</li>
              </ul>
              <a href={bookingLinks.gift_dive} target="_blank" rel="noreferrer">{fr ? "Voir tous les produits" : "See all products"} <ExternalLink aria-hidden="true" /></a>
              <Link href={fr ? "/" : "/en/home/"}><ArrowLeft aria-hidden="true" /> {fr ? "Retour à l’accueil" : "Back home"}</Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
