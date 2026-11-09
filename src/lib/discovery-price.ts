import type { PublicCatalogPrice } from "./pricing-data";

export function discoveryPackAmount(prices: Pick<PublicCatalogPrice, "content_key" | "amount_cents">[]) {
  return prices.find((price) => price.content_key === "discovery-marine-life")?.amount_cents ?? null;
}
