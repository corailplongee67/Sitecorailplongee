import type { Metadata } from "next";
import { EventsPage } from "@/components/EventsPage";
import { getBookingLinks, getEventsCatalog } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Events and themed dives in Reunion Island",
  description: "This week’s programme and the themed-dive archives from Corail Plongée in Saint-Gilles-les-Bains.",
  alternates: { canonical: "/en/our-events/", languages: { fr: "/evenements/", en: "/en/our-events/" } },
};

export default async function EventsPageEn() {
  const [bookingLinks, events] = await Promise.all([getBookingLinks(), getEventsCatalog()]);
  return <EventsPage locale="en" events={events} bookingLinks={bookingLinks} />;
}
