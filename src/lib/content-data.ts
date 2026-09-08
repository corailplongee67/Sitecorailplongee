import { fallbackBookingLinks, fallbackPrices, type BookingKey } from "./site-data";
import {
  fallbackPriceCatalog,
  fallbackPriceSections,
  type PublicCatalogPrice,
  type PublicPriceSection,
} from "./pricing-data";
import { fallbackEvents, type PublicEvent } from "./events-data";
import { createClient, hasSupabaseEnv } from "./supabase/server";

export type { PublicEvent } from "./events-data";

const eventSelect = "id,slug_fr,slug_en,title_fr,title_en,excerpt_fr,excerpt_en,description_fr,description_en,location_fr,location_en,starts_at,ends_at,image_paths,cover_image_url,booking_link_key,title_color,text_color,card_color_start,card_color_end";

export type PublicPrice = {
  id: string;
  category: string;
  label_fr: string;
  label_en: string;
  amount_cents: number;
  suffix_fr: string | null;
  suffix_en: string | null;
  booking_link_key: string;
};

export async function getBookingLinks() {
  if (!hasSupabaseEnv()) return fallbackBookingLinks;

  const supabase = await createClient();
  const { data } = await supabase.from("booking_links").select("key,url");

  return (data ?? []).reduce(
    (links, row) => ({ ...links, [row.key]: row.url }),
    { ...fallbackBookingLinks },
  ) as Record<BookingKey, string>;
}

export async function getFeaturedPrices(): Promise<PublicPrice[]> {
  if (!hasSupabaseEnv()) {
    return fallbackPrices.map((price, index) => ({
      id: String(index),
      category: price.category,
      label_fr: price.labelFr,
      label_en: price.labelEn,
      amount_cents: price.price * 100,
      suffix_fr: null,
      suffix_en: null,
      booking_link_key: "main_booking",
    }));
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("prices")
    .select(
      "id,category,label_fr,label_en,amount_cents,suffix_fr,suffix_en,booking_link_key",
    )
    .eq("active", true)
    .order("display_order")
    .limit(8);

  return data ?? [];
}

export async function getPriceCatalog(): Promise<{
  sections: PublicPriceSection[];
  prices: PublicCatalogPrice[];
}> {
  if (!hasSupabaseEnv()) {
    return { sections: fallbackPriceSections, prices: fallbackPriceCatalog };
  }

  const supabase = await createClient();
  const [sectionResult, priceResult] = await Promise.all([
    supabase.from("price_sections").select("*").eq("active", true).order("display_order"),
    supabase.from("prices").select("*").eq("active", true).order("display_order"),
  ]);

  if (sectionResult.error || priceResult.error || !sectionResult.data?.length || !priceResult.data?.length) {
    return { sections: fallbackPriceSections, prices: fallbackPriceCatalog };
  }

  return {
    sections: sectionResult.data as PublicPriceSection[],
    prices: priceResult.data as PublicCatalogPrice[],
  };
}

export async function getUpcomingEvents(): Promise<PublicEvent[]> {
  if (!hasSupabaseEnv()) {
    return fallbackEvents
      .filter((event) => new Date(event.ends_at ?? event.starts_at).getTime() >= Date.now())
      .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
      .slice(0, 3);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select(eventSelect)
    .eq("published", true)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at")
    .limit(3);

  return error ? [] : (data as PublicEvent[] ?? []);
}

export async function getEventsCatalog(): Promise<PublicEvent[]> {
  if (!hasSupabaseEnv()) return fallbackEvents;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select(eventSelect)
    .eq("published", true)
    .order("starts_at", { ascending: false });

  if (error || !data?.length) return fallbackEvents;
  return data as PublicEvent[];
}
