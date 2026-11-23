export type TeamMember = { id: string; name: string; role: string; image: string; textKey?: string };
export const TEAM_TEXT_KEY = "global.team";

// Stable IDs preserve existing text edits when the team is reordered.
export const initialTeam: TeamMember[] = [
  { id: "0", name: "Chris", role: "The boss", image: "/images/about/original/equipe-chris.jpg" },
  { id: "1", name: "Jennifer", role: "Monitrice de plongée", image: "/images/about/original/equipe-jennifer.jpg" },
  { id: "2", name: "Christophe", role: "Moniteur de plongée", image: "/images/about/original/equipe-christophe.jpg" },
  { id: "3", name: "Popote", role: "Macgyver", image: "/images/about/original/equipe-popote.jpg" },
];

export function validateTeam(value: unknown): TeamMember[] {
  if (!Array.isArray(value) || value.length > 50) throw new Error("Liste d’équipe invalide.");
  const ids = new Set<string>();
  return value.map((member): TeamMember => {
    if (!member || typeof member !== "object") throw new Error("Membre invalide.");
    const { id, name, role, image, textKey } = member as Record<string, unknown>;
    if (typeof id !== "string" || !/^[a-zA-Z0-9-]{1,64}$/.test(id) || ids.has(id)) throw new Error("Identifiant de membre invalide.");
    if (textKey !== undefined && (typeof textKey !== "string" || !/^[a-zA-Z0-9-]{1,64}$/.test(textKey))) throw new Error("Identifiant de texte invalide.");
    if (typeof name !== "string" || !name.trim() || name.length > 120 || typeof role !== "string" || role.length > 160) throw new Error("Nom ou rôle invalide.");
    if (typeof image !== "string" || !(image.startsWith("/images/") || /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//.test(image))) throw new Error("Photo invalide.");
    ids.add(id);
    return { id, name: name.trim(), role: role.trim(), image, ...(textKey ? { textKey } : {}) };
  });
}

export function parseTeam(value: string | undefined): TeamMember[] {
  if (value === undefined) return initialTeam;
  try { return validateTeam(JSON.parse(value)); }
  catch { return initialTeam; }
}
