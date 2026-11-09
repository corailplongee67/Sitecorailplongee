import { PreviewText } from "./PreviewText";
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
          <p className="eyebrow"><PreviewText id="CartPage.a09d1349af4a.1">Corail Plongée</PreviewText></p>
          <h1><PreviewText id="CartPage.ae9d87a42e19.1">{fr ? "Panier" : "Cart"}</PreviewText></h1>
          <p><PreviewText id="CartPage.4cb49a3623be.1">{fr ? "Votre panier local est actuellement vide." : "Your local basket is currently empty."}</PreviewText></p>
          <div className="cart-origin-notice"><LockKeyhole aria-hidden="true" /><span><PreviewText id="cart.notice">{fr ? "Les commandes sont désormais finalisées dans la boutique sécurisée Zuurit." : "Orders are now completed in the secure Zuurit shop."}</PreviewText></span></div>
          <BookingCta href={bookingLinks.gift_dive}><PreviewText embedded id="CartPage.link.2e9bbbd59976.1">{fr ? "Retour à la boutique" : "Return to shop"}</PreviewText></BookingCta>
          <Link href={fr ? "/" : "/en/home/"}><ArrowLeft aria-hidden="true" /> <PreviewText embedded id="CartPage.link.71b47927b8d6.1">{fr ? "Retour à l’accueil" : "Back home"}</PreviewText></Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
