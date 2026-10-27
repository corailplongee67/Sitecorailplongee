"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, LoaderCircle, Music2, Save, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { removeSiteAudioSettings, saveSiteAudioSettings } from "@/app/admin/actions";
import { SITE_AUDIO_BUCKET } from "@/lib/site-audio-data";
import { createClient } from "@/lib/supabase/browser";

const MAX_AUDIO_BYTES = 30 * 1024 * 1024;
const AUDIO_TYPES = new Set([
  "audio/mpeg",
  "audio/mp4",
  "audio/ogg",
  "audio/wav",
  "audio/x-wav",
  "audio/webm",
  "audio/aac",
  "audio/x-m4a",
]);

function formatMegabytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`;
}

export function AdminBackgroundMusic({
  currentPath,
  currentUrl,
  currentVolume,
}: {
  currentPath: string | null;
  currentUrl: string | null;
  currentVolume: number;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLAudioElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl);
  const [volume, setVolume] = useState(Math.round(currentVolume * 100));
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (previewRef.current) previewRef.current.volume = volume / 100;
  }, [previewUrl, volume]);

  useEffect(() => () => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function selectAudio(selected?: File) {
    setMessage("");
    if (!selected) return;
    if (!AUDIO_TYPES.has(selected.type)) {
      setMessage("Choisissez un fichier MP3, M4A, AAC, OGG, WAV ou WebM.");
      return;
    }
    if (selected.size > MAX_AUDIO_BYTES) {
      setMessage("La musique dépasse la limite de 30 Mo.");
      return;
    }
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setMessage(`${selected.name} · ${formatMegabytes(selected.size)}`);
  }

  async function save() {
    setIsSaving(true);
    setMessage("");
    let uploadedPath = "";
    try {
      if (file) {
        const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "mp3";
        uploadedPath = `background/${crypto.randomUUID()}.${extension}`;
        const supabase = createClient();
        const { error } = await supabase.storage.from(SITE_AUDIO_BUCKET).upload(uploadedPath, file, {
          contentType: file.type,
          cacheControl: "31536000",
          upsert: false,
        });
        if (error) throw error;
      }

      const formData = new FormData();
      formData.set("volume", String(volume / 100));
      if (uploadedPath) formData.set("audio_path", uploadedPath);
      await saveSiteAudioSettings(formData);
      setFile(null);
      setMessage(uploadedPath ? "Musique et volume enregistrés." : "Volume enregistré.");
      router.refresh();
    } catch (error) {
      if (uploadedPath) {
        try {
          await createClient().storage.from(SITE_AUDIO_BUCKET).remove([uploadedPath]);
        } catch {
          // The database remains unchanged even if best-effort upload cleanup fails.
        }
      }
      setMessage(error instanceof Error ? error.message : "L’enregistrement de la musique a échoué.");
    } finally {
      setIsSaving(false);
    }
  }

  async function remove() {
    setIsSaving(true);
    setMessage("");
    try {
      await removeSiteAudioSettings();
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      setFile(null);
      setPreviewUrl(null);
      setMessage("La musique de fond a été supprimée.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "La suppression a échoué.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="admin-audio-card">
      <div className="admin-audio-preview">
        <div className="admin-audio-icon"><Headphones /></div>
        <div>
          <strong>{file?.name ?? (currentPath ? "Musique de fond actuelle" : "Aucune musique choisie")}</strong>
          <span>{currentPath || file ? "Lecture en boucle sur toutes les pages publiques" : "Ajoutez un morceau pour habiller le site."}</span>
        </div>
        {previewUrl ? <audio ref={previewRef} controls preload="metadata" src={previewUrl} /> : null}
      </div>

      <input
        ref={inputRef}
        className="admin-crop-file"
        type="file"
        accept="audio/mpeg,audio/mp4,audio/ogg,audio/wav,audio/x-wav,audio/webm,audio/aac,audio/x-m4a,.mp3,.m4a,.aac,.ogg,.wav,.webm"
        onChange={(event) => selectAudio(event.target.files?.[0])}
      />

      <div className="admin-audio-controls">
        <label>
          <span>Volume entendu par les visiteurs</span>
          <div><Music2 size={17} /><input type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /><strong>{volume} %</strong></div>
        </label>
        <div className="admin-audio-actions">
          <button className="button button-outline-admin" type="button" onClick={() => inputRef.current?.click()} disabled={isSaving}>
            <Upload size={16} /> {currentPath || file ? "Remplacer la musique" : "Choisir une musique"}
          </button>
          <button className="button button-navy" type="button" onClick={() => void save()} disabled={isSaving || (!file && !currentPath)}>
            {isSaving ? <LoaderCircle className="is-spinning" size={16} /> : <Save size={16} />}
            {isSaving ? "Enregistrement…" : "Enregistrer"}
          </button>
          {currentPath ? (
            <button className="admin-audio-delete" type="button" onClick={() => void remove()} disabled={isSaving}>
              <Trash2 size={15} /> Supprimer
            </button>
          ) : null}
        </div>
      </div>
      {message ? <p className="admin-upload-message" role="status">{message}</p> : null}
    </div>
  );
}
