import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShoppingBag } from "lucide-react";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { BookingKey, Locale } from "@/lib/site-data";

export function CartPage({ locale, bookingLinks }: {
  locale: Locale;
  bookingLinks: Record<BookingKey, string>;
}) {
  const fr = locale === "fr";
  return (
    <>
      <Header locale={locale} bookingUrl={bookingLinks.agenda} giftUrl={bookingLinks.gift_dive} accountUrl={bookingLinks.customer_account} />
      <main className="cart-origin-main">
        <section className="cart-origin-shell shell">
          <div className="cart-origin-icon"><ShoppingBag aria-hidden="true" /></div>
          <p className="eyebrow">Corail Plongée</p>
          <h1>{fr ? "Panier" : "Cart"}</h1>
          <p>{fr ? "Votre panier local est actuellement vide." : "Your local basket is currently empty."}</p>
          <div className="cart-origin-notice"><LockKeyhole aria-hidden="true" /><span>{fr ? "Les commandes sont désormais finalisées dans la boutique sécurisée Zuurit." : "Orders are now completed in the secure Zuurit shop."}</span></div>
          <BookingCta href={bookingLinks.gift_dive}>{fr ? "Retour à la boutique" : "Return to shop"}</BookingCta>
          <Link href={fr ? "/" : "/en/home/"}><ArrowLeft aria-hidden="true" /> {fr ? "Retour à l’accueil" : "Back home"}</Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
