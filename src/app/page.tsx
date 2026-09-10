import type { Metadata } from "next";
import { FrenchHomePage } from "@/components/FrenchHomePage";
import { getBookingLinks, getUpcomingEvents } from "@/lib/content-data";

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
  const [bookingLinks, events] = await Promise.all([
    getBookingLinks(),
    getUpcomingEvents(),
  ]);

  return <FrenchHomePage bookingLinks={bookingLinks} events={events} />;
}
