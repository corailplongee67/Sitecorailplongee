import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { getBookingLinks, getFeaturedPrices, getUpcomingEvents } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Plongée sous-marine à La Réunion – Réservez maintenant",
  description:
    "Plongée sous-marine à La Réunion : baptêmes, explorations, formations tous niveaux et sorties cétacés depuis Saint-Gilles-les-Bains.",
  alternates: {
    canonical: "/",
    languages: { fr: "/", en: "/en/home/", "x-default": "/" },
  },
};

export default async function Page() {
  const [bookingLinks, prices, events] = await Promise.all([
    getBookingLinks(),
    getFeaturedPrices(),
    getUpcomingEvents(),
  ]);

  return <HomePage locale="fr" bookingLinks={bookingLinks} prices={prices} events={events} />;
}
