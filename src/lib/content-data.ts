import { fallbackBookingLinks, fallbackPrices, type BookingKey } from "./site-data";
import { createClient, hasSupabaseEnv } from "./supabase/server";

export type PublicEvent = {
  id: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  starts_at: string;
  image_paths: string[];
  booking_link_key: string;
};

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

export async function getUpcomingEvents(): Promise<PublicEvent[]> {
  if (!hasSupabaseEnv()) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select(
      "id,title_fr,title_en,description_fr,description_en,starts_at,image_paths,booking_link_key",
    )
    .eq("published", true)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at")
    .limit(3);

  return data ?? [];
}
