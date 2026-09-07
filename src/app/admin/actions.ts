"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
  const id = value(formData, "id") || crypto.randomUUID();
  const titleFr = value(formData, "title_fr");
  const titleEn = value(formData, "title_en");
  const existingPaths = JSON.parse(value(formData, "existing_image_paths") || "[]") as string[];
  const imagePaths = [...existingPaths];

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
    if (!error) imagePaths.push(path);
  }

  const payload = {
    id,
    slug_fr: value(formData, "slug_fr") || slugify(titleFr),
    slug_en: value(formData, "slug_en") || slugify(titleEn) || null,
    title_fr: titleFr,
    title_en: titleEn,
    description_fr: value(formData, "description_fr"),
    description_en: value(formData, "description_en"),
    starts_at: new Date(value(formData, "starts_at")).toISOString(),
    ends_at: value(formData, "ends_at") ? new Date(value(formData, "ends_at")).toISOString() : null,
    image_paths: imagePaths,
    booking_link_key: value(formData, "booking_link_key") || "agenda",
    published: formData.get("published") === "on",
  };

  await supabase.from("events").upsert(payload);
  revalidatePath("/");
  revalidatePath("/en/home/");
  revalidatePath("/admin/");
}

export async function deleteEvent(formData: FormData) {
  const supabase = await requireAdmin();
  const id = value(formData, "id");
  const paths = JSON.parse(value(formData, "image_paths") || "[]") as string[];
  if (paths.length) await supabase.storage.from("event-images").remove(paths);
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/");
}

export async function savePrice(formData: FormData) {
  const supabase = await requireAdmin();
  const id = value(formData, "id");
  const payload = {
    category: value(formData, "category"),
    label_fr: value(formData, "label_fr"),
    label_en: value(formData, "label_en"),
    amount_cents: Math.max(0, Math.round(Number(value(formData, "amount_euros")) * 100)),
    booking_link_key: value(formData, "booking_link_key") || "main_booking",
    display_order: Number(value(formData, "display_order")) || 0,
    active: formData.get("active") === "on",
  };
  if (id) await supabase.from("prices").update(payload).eq("id", id);
  else await supabase.from("prices").insert(payload);
  revalidatePath("/");
  revalidatePath("/en/home/");
  revalidatePath("/admin/");
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
