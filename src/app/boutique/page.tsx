import type { Metadata } from "next";
import { ShopGatewayPage } from "@/components/ShopGatewayPage";
import { getBookingLinks } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Boutique plongée et bons cadeaux",
  description: "Réservez ou offrez une expérience Corail Plongée depuis la boutique sécurisée.",
  alternates: { canonical: "/boutique/", languages: { fr: "/boutique/", en: "/en/shop/" } },
};

export default async function Page() {
  return <ShopGatewayPage locale="fr" bookingLinks={await getBookingLinks()} />;
}
