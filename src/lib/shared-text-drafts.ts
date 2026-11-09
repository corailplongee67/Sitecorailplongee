import "server-only";
import { createClient } from "./supabase/server";
import { isExcludedEventTextKey, sameTextDrafts } from "./text-draft-scope";

export function sharedTextEditorEnabled() {
  return process.env.NODE_ENV !== "development" && process.env.SITE_TEXT_EDITOR_SHARED === "true";
}

export async function readSharedText(published: boolean): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from(published ? "site_text_published" : "site_text_drafts").select("text_key,content");
  if (error) throw error;
  return Object.fromEntries((data ?? []).filter(({ text_key }) => !isExcludedEventTextKey(text_key)).map(({ text_key, content }) => [text_key, content]));
}

export async function writeSharedTextDraft(id: string, text: string | null) {
  if (!id || id.length > 500 || isExcludedEventTextKey(id) || (text !== null && (!text.trim() || text.length > 5000))) throw new Error("Texte ou identifiant invalide.");
  const supabase = await createClient();
  const result = text === null
    ? await supabase.from("site_text_drafts").delete().eq("text_key", id)
    : await supabase.from("site_text_drafts").upsert({ text_key: id, content: text, updated_at: new Date().toISOString() });
  if (result.error) throw result.error;
}

export async function submitSharedTextReview(expected: unknown) {
  const snapshot = await readSharedText(false);
  if (!Object.keys(snapshot).length) throw new Error("Il n’y a aucun brouillon à valider.");
  if (!sameTextDrafts(expected, snapshot)) throw new Error("Les brouillons ont changé. Actualisez l’aperçu avant de valider.");
  const supabase = await createClient();
  const { error } = await supabase.from("site_text_reviews").insert({ snapshot });
  if (error) throw error;
}

export async function readSharedTextReview() {
  const supabase = await createClient();
  const [drafts, result] = await Promise.all([
    readSharedText(false),
    supabase.from("site_text_reviews").select("id,snapshot,created_at").order("created_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  if (result.error) throw result.error;
  const order = (value: Record<string, unknown>) => JSON.stringify(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)));
  const snapshot = result.data?.snapshot;
  const validSnapshot = snapshot && typeof snapshot === "object" && !Array.isArray(snapshot) ? snapshot : null;
  return { id: result.data?.id ?? null, count: Object.keys(drafts).length, requestedAt: result.data?.created_at ?? null, current: Boolean(validSnapshot && order(validSnapshot) === order(drafts)) };
}
