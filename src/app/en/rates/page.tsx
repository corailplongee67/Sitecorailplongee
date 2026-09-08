import type { Metadata } from "next";
import { RatesPage } from "@/components/RatesPage";
import { getBookingLinks, getPriceCatalog } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Scuba Diving Rates and Courses – Beginner to Expert",
  description: "All Corail Plongée rates: try dives, SSI, ANMP and FFESSM training, crossovers, exploration packages and extras in Reunion Island.",
  alternates: { canonical: "/en/rates/", languages: { fr: "/nos-tarifs/", en: "/en/rates/" } },
};

export default async function RatesPageEn() {
  const [bookingLinks, catalog] = await Promise.all([getBookingLinks(), getPriceCatalog()]);
  return <RatesPage locale="en" bookingLinks={bookingLinks} sections={catalog.sections} prices={catalog.prices} />;
}
