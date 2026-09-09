"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fallbackEvents } from "@/lib/events-data";
import { nextAvailableEventSlug } from "@/lib/event-slugs";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function color(formData: FormData, key: string, fallback: string) {
  const candidate = value(formData, key);
  return /^#[0-9a-f]{6}$/i.test(candidate) ? candidate : fallback;
}

function revalidateEvents() {
  revalidatePath("/");
  revalidatePath("/en/home/");
  revalidatePath("/evenements/");
  revalidatePath("/en/our-events/");
  revalidatePath("/admin/");
}

function revalidatePrices() {
  revalidatePath("/");
  revalidatePath("/en/home/");
  revalidatePath("/nos-tarifs/");
  revalidatePath("/en/rates/");
  revalidatePath("/admin/");
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const appMetadata = claims?.app_metadata as { role?: string } | undefined;

  if (!claims?.sub || appMetadata?.role !== "admin") redirect("/admin/login/");
  return supabase;
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: value(formData, "email"),
    password: value(formData, "password"),
  });

  if (error) redirect("/admin/login/?error=identifiants");
  redirect("/admin/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login/");
}

export async function saveEvent(formData: FormData) {
  const supabase = await requireAdmin();
  const existingId = value(formData, "id");
  const id = existingId || crypto.randomUUID();
  const titleFr = value(formData, "title_fr");
  const titleEn = value(formData, "title_en");
  const existingPaths = JSON.parse(value(formData, "existing_image_paths") || "[]") as string[];
  const replaceImages = formData.get("replace_images") === "on";
  const imagePaths = replaceImages ? [] : [...existingPaths];

  for (const entry of formData.getAll("images")) {
    if (!(entry instanceof File) || entry.size === 0) continue;
    if (entry.size > 8 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(entry.type)) {
      continue;
    }
    const extension = entry.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${id}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("event-images").upload(path, entry, {
      contentType: entry.type,
      upsert: false,
    });
    if (error) throw error;
    imagePaths.push(path);
  }

  const coverImageUrl = value(formData, "cover_image_url");
  if (coverImageUrl && new URL(coverImageUrl).protocol !== "https:") {
    throw new Error("L’image externe doit utiliser HTTPS.");
  }

  let slugQuery = supabase.from("events").select("slug_fr,slug_en");
  if (existingId) slugQuery = slugQuery.neq("id", existingId);
  const { data: existingSlugs, error: slugError } = await slugQuery;
  if (slugError) throw slugError;

  const slugFr = nextAvailableEventSlug(
    value(formData, "slug_fr") || slugify(titleFr),
    (existingSlugs ?? []).map((event) => event.slug_fr),
  );
  const requestedSlugEn = value(formData, "slug_en") || slugify(titleEn);
  const slugEn = requestedSlugEn
    ? nextAvailableEventSlug(requestedSlugEn, (existingSlugs ?? []).map((event) => event.slug_en))
    : null;

  const payload = {
    id,
    slug_fr: slugFr,
    slug_en: slugEn,
    title_fr: titleFr,
    title_en: titleEn,
    excerpt_fr: value(formData, "excerpt_fr"),
    excerpt_en: value(formData, "excerpt_en"),
    description_fr: value(formData, "description_fr"),
    description_en: value(formData, "description_en"),
    location_fr: value(formData, "location_fr") || "Saint-Gilles-les-Bains",
    location_en: value(formData, "location_en") || "Saint-Gilles-les-Bains",
    starts_at: new Date(value(formData, "starts_at")).toISOString(),
    ends_at: value(formData, "ends_at") ? new Date(value(formData, "ends_at")).toISOString() : null,
    image_paths: imagePaths,
    cover_image_url: coverImageUrl || null,
    booking_link_key: value(formData, "booking_link_key") || "agenda",
    title_color: color(formData, "title_color", "#ffb000"),
    text_color: color(formData, "text_color", "#ffffff"),
    card_color_start: color(formData, "card_color_start", "#052b43"),
    card_color_end: color(formData, "card_color_end", "#0b6078"),
    published: formData.get("published") === "on",
  };

  const { error } = await supabase.from("events").upsert(payload);
  if (error) throw error;
  if (replaceImages && existingPaths.length) {
    const { error: removalError } = await supabase.storage.from("event-images").remove(existingPaths);
    if (removalError) throw removalError;
  }
  revalidateEvents();
}

export async function deleteEvent(formData: FormData) {
  const supabase = await requireAdmin();
  const id = value(formData, "id");
  const paths = JSON.parse(value(formData, "image_paths") || "[]") as string[];
  if (paths.length) {
    const { error } = await supabase.storage.from("event-images").remove(paths);
    if (error) throw error;
  }
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
  revalidateEvents();
}

export async function importLegacyEvents() {
  const supabase = await requireAdmin();
  const rows = fallbackEvents.map((event) => {
    const { id, ...archiveEvent } = event;
    void id;
    return { ...archiveEvent, published: true };
  });
  const { error } = await supabase.from("events").upsert(rows, { onConflict: "slug_fr", ignoreDuplicates: true });
  if (error) throw error;
  revalidateEvents();
}

export async function savePrice(formData: FormData) {
  const supabase = await requireAdmin();
  const id = value(formData, "id");
  const labelFr = value(formData, "label_fr");
  const sectionCode = value(formData, "section_code");
  const requestedPriceColumn = value(formData, "price_column");
  const priceColumn: "standard" | "guided" | "autonomous" = ["standard", "guided", "autonomous"].includes(requestedPriceColumn)
    ? requestedPriceColumn as "standard" | "guided" | "autonomous"
    : "standard";
  const payload = {
    content_key: value(formData, "content_key") || `${sectionCode}-${slugify(labelFr)}-${crypto.randomUUID().slice(0, 8)}`,
    section_code: sectionCode,
    category: value(formData, "category"),
    category_en: value(formData, "category_en"),
    subcategory_fr: value(formData, "subcategory_fr"),
    subcategory_en: value(formData, "subcategory_en"),
    group_intro_fr: value(formData, "group_intro_fr"),
    group_intro_en: value(formData, "group_intro_en"),
    label_fr: labelFr,
    label_en: value(formData, "label_en"),
    description_fr: value(formData, "description_fr") || null,
    description_en: value(formData, "description_en") || null,
    amount_cents: Math.max(0, Math.round(Number(value(formData, "amount_euros")) * 100)),
    prefix_fr: value(formData, "prefix_fr") || null,
    prefix_en: value(formData, "prefix_en") || null,
    suffix_fr: value(formData, "suffix_fr") || null,
    suffix_en: value(formData, "suffix_en") || null,
    price_column: priceColumn,
    comparison_key: value(formData, "comparison_key") || null,
    booking_link_key: value(formData, "booking_link_key") || "main_booking",
    display_order: Number(value(formData, "display_order")) || 0,
    active: formData.get("active") === "on",
  };
  const { error } = id
    ? await supabase.from("prices").update(payload).eq("id", id)
    : await supabase.from("prices").insert(payload);
  if (error) throw error;
  revalidatePrices();
}

export async function deletePrice(formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("prices").delete().eq("id", value(formData, "id"));
  if (error) throw error;
  revalidatePrices();
}

export async function savePriceSection(formData: FormData) {
  const supabase = await requireAdmin();
  const id = value(formData, "id");
  const layout: "list" | "comparison" = value(formData, "layout") === "comparison" ? "comparison" : "list";
  const bookingLinkKey = value(formData, "booking_link_key");
  const payload = {
    title_fr: value(formData, "title_fr"),
    title_en: value(formData, "title_en"),
    intro_fr: value(formData, "intro_fr"),
    intro_en: value(formData, "intro_en"),
    note_fr: value(formData, "note_fr"),
    note_en: value(formData, "note_en"),
    guided_label_fr: value(formData, "guided_label_fr"),
    guided_label_en: value(formData, "guided_label_en"),
    autonomous_label_fr: value(formData, "autonomous_label_fr"),
    autonomous_label_en: value(formData, "autonomous_label_en"),
    booking_link_key: bookingLinkKey === "__none" ? null : bookingLinkKey,
    display_order: Number(value(formData, "display_order")) || 0,
    layout,
    active: formData.get("active") === "on",
  };
  const { error } = await supabase.from("price_sections").update(payload).eq("id", id);
  if (error) throw error;
  revalidatePrices();
}

export async function saveBookingLink(formData: FormData) {
  const supabase = await requireAdmin();
  const id = value(formData, "id");
  const url = new URL(value(formData, "url"));
  if (url.protocol !== "https:") throw new Error("Le lien de réservation doit utiliser HTTPS.");
  await supabase.from("booking_links").update({ url: url.toString() }).eq("id", id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/");
}
