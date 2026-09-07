import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { getBookingLinks, getFeaturedPrices, getUpcomingEvents } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Scuba Diving Reunion – Discover the Indian Ocean",
  description:
    "Try dives, exploration, training and responsible cetacean excursions from Saint-Gilles-les-Bains, Reunion Island.",
  alternates: {
    canonical: "/en/home/",
    languages: { fr: "/", en: "/en/home/", "x-default": "/" },
  },
};

export default async function Page() {
  const [bookingLinks, prices, events] = await Promise.all([
    getBookingLinks(),
    getFeaturedPrices(),
    getUpcomingEvents(),
  ]);

  return <HomePage locale="en" bookingLinks={bookingLinks} prices={prices} events={events} />;
}
