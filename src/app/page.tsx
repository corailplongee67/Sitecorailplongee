import type { Metadata } from "next";
import { FrenchHomePage } from "@/components/FrenchHomePage";
import { getBookingLinks, getUpcomingEvents } from "@/lib/content-data";

export const metadata: Metadata = {
  title: { absolute: "Corail Plongée | Centre de plongée à Saint-Gilles, La Réunion" },
  description:
    "Centre de plongée à Saint-Gilles-les-Bains, La Réunion : baptêmes, formations SSI et françaises, plongées d’exploration et sorties en mer toute l’année.",
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
