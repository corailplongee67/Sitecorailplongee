import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { isExcludedEventTextKey, sameTextDrafts } from "./text-draft-scope";

const directory = path.join(process.cwd(), ".local-data", "text-drafts");
type Draft = { id: string; text: string };

function assertLocal() {
  if (process.env.NODE_ENV !== "development") throw new Error("Les brouillons locaux sont disponibles uniquement en développement.");
}
function fileFor(id: string) {
  return path.join(directory, `${createHash("sha256").update(id).digest("hex")}.json`);
}
export async function readLocalTextDrafts(): Promise<Record<string, string>> {
  assertLocal();
  let files: string[];
  try {
    files = await readdir(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
  const rows = await Promise.all(files.filter((file) => /^[a-f0-9]{64}\.json$/.test(file)).map(async (file) => {
    const row: unknown = JSON.parse(await readFile(path.join(directory, file), "utf8"));
    if (!row || typeof row !== "object" || !("id" in row) || typeof row.id !== "string" || !("text" in row) || typeof row.text !== "string") {
      throw new Error("Un brouillon local est illisible : la validation est suspendue.");
    }
    return row as Draft;
  }));
  return Object.fromEntries(rows.filter((row) => !isExcludedEventTextKey(row.id)).map((row) => [row.id, row.text]));
}
export async function writeLocalTextDraft(id: string, text: string | null) {
  assertLocal();
  if (!id || id.length > 500 || isExcludedEventTextKey(id) || (text !== null && (!text.trim() || text.length > 5000))) throw new Error("Texte ou identifiant invalide.");
  await mkdir(directory, { recursive: true });
  const target = fileFor(id);
  if (text === null) {
    try { await unlink(target); } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
    return;
  }
  const temporary = `${target}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, JSON.stringify({ id, text }), { mode: 0o600 });
    await rename(temporary, target);
  } finally {
    await unlink(temporary).catch(() => {});
  }
}

function revisionOf(drafts: Record<string, string>) {
  return createHash("sha256").update(JSON.stringify(Object.entries(drafts).sort(([a], [b]) => a.localeCompare(b)))).digest("hex");
}

export async function readLocalTextReview() {
  assertLocal();
  const drafts = await readLocalTextDrafts();
  try {
    const review = JSON.parse(await readFile(path.join(directory, "review.json"), "utf8")) as { revision: string; requestedAt: string };
    return { count: Object.keys(drafts).length, requestedAt: review.requestedAt, current: review.revision === revisionOf(drafts) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return { count: Object.keys(drafts).length, requestedAt: null, current: false };
  }
}

export async function requestLocalTextReview(expected: unknown) {
  assertLocal();
  const drafts = await readLocalTextDrafts();
  if (!Object.keys(drafts).length) throw new Error("Il n’y a aucun brouillon à valider.");
  if (!sameTextDrafts(expected, drafts)) throw new Error("Les brouillons ont changé. Actualisez l’aperçu avant de valider.");
  await mkdir(directory, { recursive: true });
  const target = path.join(directory, "review.json");
  const temporary = `${target}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, JSON.stringify({ revision: revisionOf(drafts), requestedAt: new Date().toISOString() }), { mode: 0o600 });
    await rename(temporary, target);
  } finally {
    await unlink(temporary).catch(() => {});
  }
}
