import Image from "next/image";
import { EventExplorer } from "./EventExplorer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { PublicEvent } from "@/lib/events-data";
import type { BookingKey, Locale } from "@/lib/site-data";

export function EventsPage({ locale, events, bookingLinks }: {
  locale: Locale;
  events: PublicEvent[];
  bookingLinks: Record<BookingKey, string>;
}) {
  const fr = locale === "fr";
  const storageBase = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/`
    : "";

  return (
    <>
      <Header locale={locale} bookingUrl={bookingLinks.main_booking} accountUrl={bookingLinks.customer_account} />
      <main className="events-main">
        <section className="events-hero">
          <Image src="/images/hero/underwater-reunion.jpg" alt={fr ? "Plongée sur les récifs de La Réunion" : "Diving on Reunion Island reefs"} fill priority sizes="100vw" />
          <div className="events-hero-shade" />
          <div className="shell events-hero-copy">
            <p className="eyebrow light">Corail Plongée · Saint-Gilles-les-Bains</p>
            <h1>{fr ? "Évènements" : "Events"}</h1>
            <p>{fr ? "Plongées à thème, sorties spéciales et rendez-vous de la semaine, réunis dans un programme clair." : "Themed dives, special trips and this week’s rendezvous, all gathered in one clear programme."}</p>
          </div>
        </section>
        <EventExplorer events={events} locale={locale} bookingLinks={bookingLinks} storageBase={storageBase} referenceDate={new Date().toISOString()} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
