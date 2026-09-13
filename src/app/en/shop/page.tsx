import type { Metadata } from "next";
import { ShopGatewayPage } from "@/components/ShopGatewayPage";
import { getBookingLinks } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Diving shop and gift experiences",
  description: "Book or offer a Corail Plongée experience through the secure shop.",
  alternates: { canonical: "/en/shop/", languages: { fr: "/boutique/", en: "/en/shop/" } },
};

export default async function Page() {
  return <ShopGatewayPage locale="en" bookingLinks={await getBookingLinks()} />;
}
