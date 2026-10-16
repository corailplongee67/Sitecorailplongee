"use client";

import { useRef, useState } from "react";

const MAX_SOURCE_BYTES = 20 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Impossible d’ouvrir ${file.name}.`));
    };
    image.src = url;
  });
}

function toWebp(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

async function optimize(file: File) {
  if (file.size > MAX_SOURCE_BYTES) throw new Error(`${file.name} dépasse 20 Mo.`);
  const image = await loadImage(file);
  const scale = Math.min(1, 1600 / image.naturalWidth, 1200 / image.naturalHeight);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Compression indisponible.");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  let quality = 0.82;
  let blob = await toWebp(canvas, quality);
  while (blob && blob.size > 900 * 1024 && quality > 0.66) {
    quality -= 0.04;
    blob = await toWebp(canvas, quality);
  }
  if (!blob) throw new Error(`La compression de ${file.name} a échoué.`);
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
}

export function OptimizedEventImageInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <label>
      Photos (recadrage libre, compression WebP automatique)
      <input
        ref={inputRef}
        name={ready ? "images" : undefined}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={async (event) => {
          const files = Array.from(event.target.files ?? []);
          if (!files.length) return;
          const before = files.reduce((sum, file) => sum + file.size, 0);
          setReady(false);
          setStatus("Optimisation des photos…");
          try {
            const optimized = await Promise.all(files.map(optimize));
            const transfer = new DataTransfer();
            optimized.forEach((file) => transfer.items.add(file));
            if (inputRef.current) inputRef.current.files = transfer.files;
            const after = optimized.reduce((sum, file) => sum + file.size, 0);
            setStatus(`${optimized.length} photo${optimized.length > 1 ? "s" : ""} prête${optimized.length > 1 ? "s" : ""} · ${formatBytes(before)} → ${formatBytes(after)}`);
          } catch (error) {
            if (inputRef.current) inputRef.current.value = "";
            setStatus(error instanceof Error ? error.message : "La compression a échoué.");
          } finally {
            setReady(true);
          }
        }}
      />
      {status ? <small className="optimized-upload-status" role="status">{status}</small> : null}
    </label>
  );
}
