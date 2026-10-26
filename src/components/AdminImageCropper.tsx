"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Check, Crop, ImagePlus, LoaderCircle, Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveSiteImage } from "@/app/admin/actions";
import type { SiteImagePreview } from "@/lib/site-image-slots";

type EditorImage = {
  file: File;
  url: string;
  element: HTMLImageElement;
  width: number;
  height: number;
};

type Point = { x: number; y: number };

const MAX_SOURCE_BYTES = 20 * 1024 * 1024;
const TARGET_BYTES = 950 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function canvasBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

function previewOutputStyle(
  output: { width: number; height: number },
  preview: SiteImagePreview,
) {
  const outputRatio = output.width / output.height;
  const previewRatio = preview.width / preview.height;
  const positionX = (preview.positionX ?? 50) / 100;
  const positionY = (preview.positionY ?? 50) / 100;

  if (outputRatio > previewRatio) {
    const width = (outputRatio / previewRatio) * 100;
    return { width: `${width}%`, height: "100%", left: `${(100 - width) * positionX}%`, top: 0 };
  }

  const height = (previewRatio / outputRatio) * 100;
  return { width: "100%", height: `${height}%`, left: 0, top: `${(100 - height) * positionY}%` };
}

async function optimizedCrop(
  image: EditorImage,
  frame: { width: number; height: number },
  output: { width: number; height: number },
  zoom: number,
  offset: Point,
) {
  const baseScale = Math.max(frame.width / image.width, frame.height / image.height);
  const scale = baseScale * zoom;
  const sourceWidth = frame.width / scale;
  const sourceHeight = frame.height / scale;
  const sourceX = Math.max(0, Math.min(image.width - sourceWidth, (image.width - sourceWidth) / 2 - offset.x / scale));
  const sourceY = Math.max(0, Math.min(image.height - sourceHeight, (image.height - sourceHeight) / 2 - offset.y / scale));

  const canvas = document.createElement("canvas");
  canvas.width = output.width;
  canvas.height = output.height;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Le recadrage n’est pas disponible dans ce navigateur.");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image.element,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    output.width,
    output.height,
  );

  let quality = 0.84;
  let blob = await canvasBlob(canvas, quality);
  while (blob && blob.size > TARGET_BYTES && quality > 0.66) {
    quality -= 0.04;
    blob = await canvasBlob(canvas, quality);
  }
  if (!blob) throw new Error("La conversion WebP a échoué.");
  return blob;
}

export function AdminImageCropper({
  slotKey,
  label,
  width,
  height,
  previews,
  circular = false,
  hasOverride,
}: {
  slotKey: string;
  label: string;
  width: number;
  height: number;
  previews: SiteImagePreview[];
  circular?: boolean;
  hasOverride: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; start: Point; origin: Point } | null>(null);
  const [editor, setEditor] = useState<EditorImage | null>(null);
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const node = frameRef.current;
    if (!node || !editor) return;
    const observer = new ResizeObserver(([entry]) => {
      setFrame({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [editor]);

  useEffect(() => () => {
    if (editor) URL.revokeObjectURL(editor.url);
  }, [editor]);

  const displayed = useMemo(() => {
    if (!editor || !frame.width || !frame.height) return null;
    const baseScale = Math.max(frame.width / editor.width, frame.height / editor.height);
    return {
      width: editor.width * baseScale * zoom,
      height: editor.height * baseScale * zoom,
    };
  }, [editor, frame, zoom]);

  const normalizedImageStyle = displayed && frame.width && frame.height
    ? {
        width: `${(displayed.width / frame.width) * 100}%`,
        height: `${(displayed.height / frame.height) * 100}%`,
        left: `${50 - (displayed.width / frame.width) * 50 + (offset.x / frame.width) * 100}%`,
        top: `${50 - (displayed.height / frame.height) * 50 + (offset.y / frame.height) * 100}%`,
      }
    : null;

  function clamp(next: Point, dimensions = displayed) {
    if (!dimensions) return next;
    const maxX = Math.max(0, (dimensions.width - frame.width) / 2);
    const maxY = Math.max(0, (dimensions.height - frame.height) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
  }

  function closeEditor() {
    if (editor) URL.revokeObjectURL(editor.url);
    setEditor(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    if (inputRef.current) inputRef.current.value = "";
  }

  async function selectFile(file?: File) {
    setMessage("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Choisissez une image JPG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setMessage("L’image d’origine dépasse 20 Mo.");
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      setEditor({ file, url, element: image, width: image.naturalWidth, height: image.naturalHeight });
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setMessage("Cette image ne peut pas être ouverte.");
    };
    image.src = url;
  }

  function updateZoom(value: number) {
    const nextZoom = Math.max(1, Math.min(3, value));
    if (!editor || !frame.width) return setZoom(nextZoom);
    const baseScale = Math.max(frame.width / editor.width, frame.height / editor.height);
    const dimensions = {
      width: editor.width * baseScale * nextZoom,
      height: editor.height * baseScale * nextZoom,
    };
    setZoom(nextZoom);
    setOffset((current) => clamp(current, dimensions));
  }

  async function confirmCrop() {
    if (!editor || !frame.width || !frame.height) return;
    setMessage("");
    try {
      const blob = await optimizedCrop(editor, frame, { width, height }, zoom, offset);
      const formData = new FormData();
      formData.set("slot_key", slotKey);
      formData.set("image", new File([blob], `${label.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.webp`, { type: "image/webp" }));
      startTransition(async () => {
        try {
          await saveSiteImage(formData);
          setMessage(`Photo enregistrée · ${formatBytes(blob.size)} en WebP`);
          closeEditor();
          router.refresh();
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "L’enregistrement a échoué.");
        }
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Le recadrage a échoué.");
    }
  }

  return (
    <div className="admin-crop-upload">
      <input
        ref={inputRef}
        className="admin-crop-file"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => void selectFile(event.target.files?.[0])}
      />
      <button className="button button-navy" type="button" onClick={() => inputRef.current?.click()} disabled={isPending}>
        {isPending ? <LoaderCircle className="is-spinning" size={16} /> : <ImagePlus size={16} />}
        {isPending ? "Optimisation…" : hasOverride ? "Remplacer et recadrer" : "Ajouter et recadrer"}
      </button>
      {message ? <p className="admin-upload-message" role="status">{message}</p> : null}

      {editor ? (
        <div className="crop-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby={`crop-title-${width}-${height}`}>
          <div className="crop-modal">
            <div className="crop-modal-heading">
              <div><small>RECADRAGE ET APERÇUS DU SITE</small><h3 id={`crop-title-${width}-${height}`}>{label}</h3></div>
              <button type="button" onClick={closeEditor} aria-label="Fermer"><X /></button>
            </div>

            <div className="crop-workspace">
              <div
                ref={frameRef}
                className={`crop-frame${circular ? " is-circular" : ""}`}
                style={{
                  aspectRatio: `${width} / ${height}`,
                  width: `min(100%, ${circular ? 480 : 720}px, ${(56 * width) / height}svh)`,
                }}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  dragRef.current = { pointerId: event.pointerId, start: { x: event.clientX, y: event.clientY }, origin: offset };
                }}
                onPointerMove={(event) => {
                  const drag = dragRef.current;
                  if (!drag || drag.pointerId !== event.pointerId) return;
                  setOffset(clamp({ x: drag.origin.x + event.clientX - drag.start.x, y: drag.origin.y + event.clientY - drag.start.y }));
                }}
                onPointerUp={() => { dragRef.current = null; }}
                onPointerCancel={() => { dragRef.current = null; }}
              >
                {displayed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={editor.url}
                    alt="Aperçu à recadrer"
                    draggable={false}
                    style={{
                      width: displayed.width,
                      height: displayed.height,
                      left: `calc(50% - ${displayed.width / 2}px + ${offset.x}px)`,
                      top: `calc(50% - ${displayed.height / 2}px + ${offset.y}px)`,
                    }}
                  />
                ) : null}
                <span className="crop-frame-outline" />
              </div>
              <p><Crop size={15} /> Faites glisser la photo pour choisir le cadrage.</p>
            </div>

            {normalizedImageStyle ? (
              <div className="crop-site-preview-section">
                <div className="crop-site-preview-heading">
                  <strong>Résultat visible sur le site</strong>
                  <span>Ces cadres reproduisent le recadrage appliqué sur ordinateur et mobile.</span>
                </div>
                <div className="crop-site-previews">
                  {previews.map((preview) => (
                    <figure className="crop-site-preview" key={`${preview.label}-${preview.width}-${preview.height}`}>
                      <div className="crop-site-preview-frame" style={{ aspectRatio: `${preview.width} / ${preview.height}` }}>
                        <div
                          className="crop-site-preview-output"
                          style={previewOutputStyle({ width, height }, preview)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={editor.url} alt="" draggable={false} style={normalizedImageStyle} />
                        </div>
                      </div>
                      <figcaption>{preview.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="crop-controls">
              <div className="crop-zoom">
                <Minus size={16} />
                <input aria-label="Zoom" type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => updateZoom(Number(event.target.value))} />
                <Plus size={16} />
              </div>
              <div className="crop-details">
                <span>Sortie : {width} × {height}px</span>
                <span>WebP optimisé · objectif inférieur à 950 Ko</span>
                {editor.width < width || editor.height < height ? <strong>La photo source est plus petite que le format conseillé.</strong> : null}
              </div>
            </div>

            <div className="crop-actions">
              <button type="button" className="button button-outline-admin" onClick={closeEditor}>Annuler</button>
              <button type="button" className="button button-navy" onClick={() => void confirmCrop()} disabled={isPending}>
                {isPending ? <LoaderCircle className="is-spinning" size={16} /> : <Check size={16} />}
                Valider et enregistrer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
