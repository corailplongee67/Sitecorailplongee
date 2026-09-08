import type { Metadata } from "next";
import { EventsPage } from "@/components/EventsPage";
import { getBookingLinks, getEventsCatalog } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Évènements et plongées à thème à La Réunion",
  description: "Le programme de la semaine et les archives des plongées à thème de Corail Plongée à Saint-Gilles-les-Bains.",
  alternates: { canonical: "/evenements/", languages: { fr: "/evenements/", en: "/en/our-events/" } },
};

export default async function EventsPageFr() {
  const [bookingLinks, events] = await Promise.all([getBookingLinks(), getEventsCatalog()]);
  return <EventsPage locale="fr" events={events} bookingLinks={bookingLinks} />;
}
