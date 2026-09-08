import type { Metadata } from "next";
import { RatesPage } from "@/components/RatesPage";
import { getBookingLinks, getPriceCatalog } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Plongée Tarifs et Formations – Découverte à Expert",
  description: "Tous les tarifs Corail Plongée : baptême, formations SSI, ANMP et FFESSM, passerelles, explorations et suppléments à La Réunion.",
  alternates: { canonical: "/nos-tarifs/", languages: { fr: "/nos-tarifs/", en: "/en/rates/" } },
};

export default async function RatesPageFr() {
  const [bookingLinks, catalog] = await Promise.all([getBookingLinks(), getPriceCatalog()]);
  return <RatesPage locale="fr" bookingLinks={bookingLinks} sections={catalog.sections} prices={catalog.prices} />;
}
