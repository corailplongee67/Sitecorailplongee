"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTeamConfiguration } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/browser";
import type { TeamMember } from "@/lib/team";

export function AdminTeam({ initial, images }: { initial: TeamMember[]; images: Record<string, string> }) {
  const [members, setMembers] = useState(initial);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [crop, setCrop] = useState<{ id: string; url: string; zoom: number; x: number; y: number; width?: number; height?: number } | null>(null);
  const router = useRouter();

  function edit(id: string, field: "name" | "role", value: string) {
    setMembers((current) => current.map((member) => {
      if (member.id !== id) return member;
      const original = initial.find((item) => item.id === id);
      const sameKey = (member.textKey ?? member.id) === (original?.textKey ?? original?.id);
      return { ...member, [field]: value, textKey: sameKey ? crypto.randomUUID() : (member.textKey ?? member.id) };
    }));
  }

  function move(index: number, delta: number) {
    setMembers((current) => {
      const other = index + delta;
      if (other < 0 || other >= current.length) return current;
      const next = [...current];
      [next[index], next[other]] = [next[other], next[index]];
      return next;
    });
  }

  async function applyCrop() {
    if (!crop) return;
    setBusy(true); setMessage("");
    try {
      const image = new Image(); image.crossOrigin = "anonymous"; image.src = crop.url;
      await image.decode();
      const size = Math.min(image.naturalWidth, image.naturalHeight) / crop.zoom;
      const x = (image.naturalWidth - size) * crop.x / 100;
      const y = (image.naturalHeight - size) * crop.y / 100;
      const canvas = document.createElement("canvas"); canvas.width = 800; canvas.height = 800;
      const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Recadrage indisponible.");
      ctx.drawImage(image, x, y, size, size, 0, 0, 800, 800);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
      if (!blob) throw new Error("Conversion de la photo impossible.");
      const storage = createClient().storage.from("site-images");
      const path = `team/${crypto.randomUUID()}.webp`;
      const { error } = await storage.upload(path, blob, { contentType: "image/webp", upsert: false });
      if (error) throw error;
      const { data } = storage.getPublicUrl(path);
      setMembers((current) => current.map((member) => member.id === crop.id ? { ...member, image: data.publicUrl } : member));
      if (crop.url.startsWith("blob:")) URL.revokeObjectURL(crop.url);
      setCrop(null); setMessage("Photo prête. Enregistrez l’équipe pour la publier.");
    } catch { setMessage("Impossible de recadrer ou d’envoyer cette photo. Réessayez avec une autre image."); }
    finally { setBusy(false); }
  }

  async function save() {
    setBusy(true); setMessage("");
    try { await saveTeamConfiguration(JSON.stringify(members)); setMessage("Équipe enregistrée et mise en ligne."); router.refresh(); }
    catch { setMessage("Impossible d’enregistrer l’équipe. Vérifiez les champs et réessayez."); }
    finally { setBusy(false); }
  }

  return <div className="admin-team">
    <p>Modifiez les membres, leur photo et leur ordre, puis enregistrez l’équipe.</p>
    {members.map((member, index) => <div className="admin-team-member" key={member.id}>
      {/* The portrait can be an existing local asset or a public storage image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[member.image] ?? member.image} alt="" width={90} height={90} />
      <div className="field-grid"><label>Nom<input value={member.name} maxLength={120} onChange={(event) => edit(member.id, "name", event.target.value)} /></label><label>Rôle<input value={member.role} maxLength={160} onChange={(event) => edit(member.id, "role", event.target.value)} /></label></div>
      <div className="admin-team-actions">
        <label>Choisir une photo<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 20 * 1024 * 1024) { setMessage("La photo dépasse 20 Mo."); return; } setCrop({ id: member.id, url: URL.createObjectURL(file), zoom: 1, x: 50, y: 50 }); }} /></label>
        <button type="button" disabled={busy} onClick={() => setCrop({ id: member.id, url: images[member.image] ?? member.image, zoom: 1, x: 50, y: 50 })}>Recadrer</button>
        <button type="button" disabled={busy || index === 0} onClick={() => move(index, -1)}>Monter</button>
        <button type="button" disabled={busy || index === members.length - 1} onClick={() => move(index, 1)}>Descendre</button>
        <button type="button" disabled={busy} onClick={() => setMembers((current) => current.filter((item) => item.id !== member.id))}>Retirer</button>
      </div>
    </div>)}
    <button type="button" disabled={busy || members.length >= 50} onClick={() => setMembers((current) => [...current, { id: crypto.randomUUID(), name: "Nouveau membre", role: "", image: "/images/about/original/centre.jpg" }])}>Ajouter un membre</button>{" "}
    <button type="button" disabled={busy} onClick={() => void save()}>Enregistrer l’équipe</button>
    {message && <p role="status">{message}</p>}
    {crop && <div className="preview-editor-backdrop"><div className="preview-editor" role="dialog" aria-modal="true" aria-label="Recadrer la photo">
      <h3>Recadrer la photo</h3>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={crop.url} alt="" hidden onLoad={(event) => { const img = event.currentTarget; setCrop((current) => current && current.url === crop.url ? { ...current, width: img.naturalWidth, height: img.naturalHeight } : current); }} />
      <div className="admin-team-crop" style={{ backgroundImage: `url(${JSON.stringify(crop.url)})`, backgroundSize: crop.width && crop.height ? `${crop.width / Math.min(crop.width, crop.height) * crop.zoom * 100}% ${crop.height / Math.min(crop.width, crop.height) * crop.zoom * 100}%` : "cover", backgroundPosition: `${crop.x}% ${crop.y}%` }} />
      <label>Zoom<input type="range" min="1" max="3" step="0.01" value={crop.zoom} onChange={(event) => setCrop({ ...crop, zoom: Number(event.target.value) })} /></label>
      <label>Horizontal<input type="range" min="0" max="100" value={crop.x} onChange={(event) => setCrop({ ...crop, x: Number(event.target.value) })} /></label>
      <label>Vertical<input type="range" min="0" max="100" value={crop.y} onChange={(event) => setCrop({ ...crop, y: Number(event.target.value) })} /></label>
      <button type="button" disabled={busy} onClick={() => { if (crop.url.startsWith("blob:")) URL.revokeObjectURL(crop.url); setCrop(null); }}>Annuler</button>{" "}<button type="button" disabled={busy} onClick={() => void applyCrop()}>Utiliser cette photo</button>
    </div></div>}
  </div>;
}
