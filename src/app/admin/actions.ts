"use server";

import { revalidatePath, updateTag } from "next/cache";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { fallbackEvents } from "@/lib/events-data";
import { nextAvailableEventSlug } from "@/lib/event-slugs";
import { getSiteImageSlot } from "@/lib/site-image-slots";
import { isSiteImageUploadPath, SITE_IMAGE_BUCKET, SITE_IMAGE_SOURCE_VARIANT, siteImageRowKeys, siteImageVariantKey } from "@/lib/site-image-variants";
import { SITE_AUDIO_BUCKET } from "@/lib/site-audio-data";
import { createClient } from "@/lib/supabase/server";
import { requestLocalTextReview, writeLocalTextDraft } from "@/lib/local-text-drafts";
import { sharedTextEditorEnabled, submitSharedTextReview, writeSharedTextDraft } from "@/lib/shared-text-drafts";
import { SITE_CONTACT_TEXT_KEY, validateSiteContact } from "@/lib/site-contact";

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
  revalidatePath("/decouverte/");
  revalidatePath("/formation-francaise/");
  revalidatePath("/en/french-training/");
  revalidatePath("/en/rates/");
  revalidatePath("/admin/");
}

function revalidateSiteImages() {
  updateTag("site-images");
  revalidatePath("/", "layout");
  revalidatePath("/admin/");
}

function revalidateSiteAudio() {
  updateTag("site-audio");
  revalidatePath("/", "layout");
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

export async function openSitePreview() {
  await requireAdmin();
  (await draftMode()).enable();
  redirect("/");
}

export async function closeSitePreview() {
  (await draftMode()).disable();
  redirect("/admin/");
}

export async function saveLocalTextDraft(id: string, text: string | null) {
  await requireAdmin();
  if (!(await draftMode()).isEnabled) throw new Error("Ouvrez l’aperçu privé avant de modifier un texte.");
  if (id === SITE_CONTACT_TEXT_KEY) throw new Error("Modifiez les coordonnées dans leur fiche dédiée.");
  if (sharedTextEditorEnabled()) await writeSharedTextDraft(id, text);
  else await writeLocalTextDraft(id, text);
}

export async function publishTextBlock(id: string, text: string) {
  const supabase = await requireAdmin();
  if (!(await draftMode()).isEnabled) throw new Error("Ouvrez la modification du site avant de publier un texte.");
  if (id === SITE_CONTACT_TEXT_KEY || !text.trim() || text.length > 5000) throw new Error("Texte invalide.");
  if (!sharedTextEditorEnabled()) {
    await writeLocalTextDraft(id, text);
    return;
  }
  const { error } = await supabase.rpc("publish_single_site_text", { text_key_value: id, content_value: text });
  if (error) throw error;
  revalidatePath("/", "layout");
}

export async function saveSiteContact(formData: FormData) {
  await requireAdmin();
  const contact = validateSiteContact({ address: value(formData, "address"), phone: value(formData, "phone"), email: value(formData, "email") });
  const data = JSON.stringify(contact);
  if (sharedTextEditorEnabled()) {
    const supabase = await requireAdmin();
    const { error } = await supabase.rpc("publish_single_site_text", { text_key_value: SITE_CONTACT_TEXT_KEY, content_value: data });
    if (error) throw error;
  }
  else await writeLocalTextDraft(SITE_CONTACT_TEXT_KEY, data);
  revalidatePath("/", "layout");
  revalidatePath("/admin/");
}

export async function submitLocalTextReview(_previous: { status: string; message: string; snapshot: string }, formData: FormData) {
  await requireAdmin();
  if (!(await draftMode()).isEnabled) throw new Error("Ouvrez l’aperçu privé avant de valider les brouillons.");
  const snapshot = String(formData.get("snapshot") ?? "");
  try {
    const expected: unknown = JSON.parse(snapshot);
    if (sharedTextEditorEnabled()) await submitSharedTextReview(expected);
    else await requestLocalTextReview(expected);
  } catch (error) {
    const message = error instanceof Error && (error.message.startsWith("Les brouillons ont changé") || error.message.startsWith("Il n’y a aucun brouillon"))
      ? error.message : "La validation n’a pas pu être enregistrée. Réessayez après avoir actualisé l’aperçu.";
    return { status: "error", message, snapshot: "" };
  }
  revalidatePath("/admin/");
  return { status: "success", message: "Validation enregistrée. Les modifications restent en attente de mise en ligne.", snapshot };
}

export async function publishReviewedText(formData: FormData) {
  if (!sharedTextEditorEnabled()) throw new Error("La publication des textes n’est pas activée.");
  const supabase = await requireAdmin();
  const { data } = await supabase.auth.getClaims();
  const metadata = data?.claims?.app_metadata as { publish_site_texts?: boolean } | undefined;
  if (metadata?.publish_site_texts !== true) throw new Error("Ce compte ne peut pas publier les textes.");
  const reviewId = value(formData, "review_id");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reviewId)) throw new Error("Validation introuvable.");
  const { error } = await supabase.rpc("publish_site_text_review", { review_id: reviewId });
  if (error) throw error;
  revalidatePath("/", "layout");
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
  (await draftMode()).disable();
  redirect("/admin/login/");
}

export async function saveSiteImagePaths(formData: FormData) {
  const supabase = await requireAdmin();
  const slotKey = value(formData, "slot_key");
  const slot = getSiteImageSlot(slotKey);

  if (!slot) throw new Error("Cette image ne fait pas partie de la médiathèque du site.");

  const variants = slot.previews.map((preview) => ({
    variantId: preview.id,
    path: value(formData, `variant_path:${preview.id}`),
  }));
  const sourcePath = value(formData, "source_path");
  const receivedPaths = [...variants.map(({ path }) => path), ...(sourcePath ? [sourcePath] : [])];
  if (variants.some(({ path }) => !path)) {
    throw new Error("Tous les cadrages doivent être envoyés avant la validation.");
  }
  if (new Set(receivedPaths).size !== receivedPaths.length || receivedPaths.some((path) => !isSiteImageUploadPath(slotKey, path))) {
    throw new Error("Un fichier envoyé ne correspond pas à cette photo.");
  }

  const rowKeys = siteImageRowKeys(slotKey, [
    ...slot.previews.map((preview) => preview.id),
    SITE_IMAGE_SOURCE_VARIANT,
  ]);
  const { data: existingImages, error: existingError } = await supabase
    .from("site_images")
    .select("slot_key,image_path")
    .in("slot_key", rowKeys);
  if (existingError) throw existingError;

  const primaryPath = variants[0]?.path;
  if (!primaryPath) throw new Error("Aucun cadrage n’a été généré.");
  const rows = [
    { slot_key: slotKey, image_path: primaryPath },
    ...variants.map(({ variantId, path }) => ({ slot_key: siteImageVariantKey(slotKey, variantId), image_path: path })),
    ...(sourcePath ? [{ slot_key: siteImageVariantKey(slotKey, SITE_IMAGE_SOURCE_VARIANT), image_path: sourcePath }] : []),
  ];
  const { error: saveError } = await supabase
    .from("site_images")
    .upsert(rows);
  if (saveError) throw saveError;

  const newPaths = new Set(receivedPaths);
  if (!sourcePath) {
    const preservedSource = (existingImages ?? []).find(
      ({ slot_key }) => slot_key === siteImageVariantKey(slotKey, SITE_IMAGE_SOURCE_VARIANT),
    );
    if (preservedSource) newPaths.add(preservedSource.image_path);
  }
  const obsoletePaths = [...new Set((existingImages ?? [])
    .map(({ image_path }) => image_path)
    .filter((path) => !newPaths.has(path)))];
  if (obsoletePaths.length) {
    // The database already points at the new files. Old-file cleanup is best effort
    // and must never make a successful save look like a failure to the editor.
    await supabase.storage.from(SITE_IMAGE_BUCKET).remove(obsoletePaths);
  }

  revalidateSiteImages();
  return { savedVariants: variants.length };
}

export async function resetSiteImage(formData: FormData) {
  const supabase = await requireAdmin();
  const slotKey = value(formData, "slot_key");
  const slot = getSiteImageSlot(slotKey);
  if (!slot) throw new Error("Cette image ne fait pas partie de la médiathèque du site.");
  const rowKeys = siteImageRowKeys(slotKey, [
    ...slot.previews.map((preview) => preview.id),
    SITE_IMAGE_SOURCE_VARIANT,
  ]);

  const { data: existingImages, error: existingError } = await supabase
    .from("site_images")
    .select("image_path")
    .in("slot_key", rowKeys);
  if (existingError) throw existingError;

  const { error: deleteError } = await supabase.from("site_images").delete().in("slot_key", rowKeys);
  if (deleteError) throw deleteError;

  const existingPaths = [...new Set((existingImages ?? []).map(({ image_path }) => image_path))];
  if (existingPaths.length) {
    const { error: removalError } = await supabase.storage
      .from(SITE_IMAGE_BUCKET)
      .remove(existingPaths);
    if (removalError) throw removalError;
  }

  revalidateSiteImages();
}

export async function saveSiteAudioSettings(formData: FormData) {
  const supabase = await requireAdmin();
  const volume = Number(value(formData, "volume"));
  if (!Number.isFinite(volume) || volume < 0 || volume > 1) {
    throw new Error("Le volume doit être compris entre 0 et 100 %.");
  }

  const { data: existing, error: existingError } = await supabase
    .from("site_audio_settings")
    .select("audio_path")
    .eq("id", "background")
    .maybeSingle();
  if (existingError) throw existingError;

  const requestedPath = value(formData, "audio_path");
  const audioPath = requestedPath || existing?.audio_path;
  if (!audioPath || !/^background\/[a-z0-9-]+\.[a-z0-9]+$/i.test(audioPath)) {
    throw new Error("Choisissez une musique avant d’enregistrer.");
  }

  const { error: saveError } = await supabase.from("site_audio_settings").upsert({
    id: "background",
    audio_path: audioPath,
    volume,
  });
  if (saveError) throw saveError;

  if (requestedPath && existing?.audio_path && existing.audio_path !== requestedPath) {
    await supabase.storage.from(SITE_AUDIO_BUCKET).remove([existing.audio_path]);
  }

  revalidateSiteAudio();
}

export async function removeSiteAudioSettings() {
  const supabase = await requireAdmin();
  const { data: existing, error: existingError } = await supabase
    .from("site_audio_settings")
    .select("audio_path")
    .eq("id", "background")
    .maybeSingle();
  if (existingError) throw existingError;

  const { error: deleteError } = await supabase
    .from("site_audio_settings")
    .delete()
    .eq("id", "background");
  if (deleteError) throw deleteError;

  if (existing?.audio_path) {
    await supabase.storage.from(SITE_AUDIO_BUCKET).remove([existing.audio_path]);
  }

  revalidateSiteAudio();
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
      cacheControl: "31536000",
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
  const { error } = await supabase
    .from("booking_links")
    .update({ url: url.toString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/", "layout");
  revalidatePath("/admin/");
}
