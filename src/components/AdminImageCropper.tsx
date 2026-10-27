"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Check, Crop, ImagePlus, LoaderCircle, Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveSiteImage } from "@/app/admin/actions";
import type { SiteImagePreview } from "@/lib/site-image-slots";

type EditorImage = {
  sourceChanged: boolean;
  revokeOnClose: boolean;
  url: string;
  element: HTMLImageElement;
  width: number;
  height: number;
};

type Point = { x: number; y: number };
type CropState = { zoom: number; pan: Point };

const MAX_SOURCE_BYTES = 20 * 1024 * 1024;
const TARGET_BYTES = 950 * 1024;
const SOURCE_TARGET_BYTES = 2.5 * 1024 * 1024;
const SOURCE_MAX_DIMENSION = 2600;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function canvasBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

function initialCrop(preview: SiteImagePreview): CropState {
  return {
    zoom: 1,
    pan: {
      x: 1 - ((preview.positionX ?? 50) / 50),
      y: 1 - ((preview.positionY ?? 50) / 50),
    },
  };
}

function cropDisplay(
  image: Pick<EditorImage, "width" | "height">,
  frame: { width: number; height: number },
  crop: CropState,
) {
  const baseScale = Math.max(frame.width / image.width, frame.height / image.height);
  const width = image.width * baseScale * crop.zoom;
  const height = image.height * baseScale * crop.zoom;
  const maxX = Math.max(0, (width - frame.width) / 2);
  const maxY = Math.max(0, (height - frame.height) / 2);
  return {
    width,
    height,
    offset: { x: crop.pan.x * maxX, y: crop.pan.y * maxY },
    maxOffset: { x: maxX, y: maxY },
  };
}

function previewImageStyle(image: EditorImage, preview: SiteImagePreview, crop: CropState) {
  const display = cropDisplay(image, { width: preview.width, height: preview.height }, crop);
  return {
    width: `${(display.width / preview.width) * 100}%`,
    height: `${(display.height / preview.height) * 100}%`,
    left: `${50 - (display.width / preview.width) * 50 + (display.offset.x / preview.width) * 100}%`,
    top: `${50 - (display.height / preview.height) * 50 + (display.offset.y / preview.height) * 100}%`,
  };
}

async function optimizedCrop(
  image: EditorImage,
  output: { width: number; height: number },
  crop: CropState,
) {
  const imageRatio = image.width / image.height;
  const outputRatio = output.width / output.height;
  const coverWidth = imageRatio > outputRatio ? image.height * outputRatio : image.width;
  const coverHeight = imageRatio > outputRatio ? image.height : image.width / outputRatio;
  const sourceWidth = coverWidth / crop.zoom;
  const sourceHeight = coverHeight / crop.zoom;
  const centeredX = (image.width - sourceWidth) / 2;
  const centeredY = (image.height - sourceHeight) / 2;
  const sourceX = Math.max(0, Math.min(image.width - sourceWidth, centeredX - crop.pan.x * centeredX));
  const sourceY = Math.max(0, Math.min(image.height - sourceHeight, centeredY - crop.pan.y * centeredY));

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

async function optimizedSource(image: EditorImage) {
  let scale = Math.min(1, SOURCE_MAX_DIMENSION / Math.max(image.width, image.height));

  while (true) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) throw new Error("La préparation de la photo source n’est pas disponible dans ce navigateur.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image.element, 0, 0, canvas.width, canvas.height);

    let quality = 0.86;
    let blob = await canvasBlob(canvas, quality);
    while (blob && blob.size > SOURCE_TARGET_BYTES && quality > 0.54) {
      quality -= 0.05;
      blob = await canvasBlob(canvas, quality);
    }
    if (!blob) throw new Error("La sauvegarde de la photo source a échoué.");
    if (blob.size <= SOURCE_TARGET_BYTES || Math.max(canvas.width, canvas.height) <= 1200) return blob;
    scale *= 0.82;
  }
}

export function AdminImageCropper({
  slotKey,
  label,
  width,
  height,
  previews,
  circular = false,
  hasOverride,
  existingSrc,
  hasStoredSource,
}: {
  slotKey: string;
  label: string;
  width: number;
  height: number;
  previews: SiteImagePreview[];
  circular?: boolean;
  hasOverride: boolean;
  existingSrc: string;
  hasStoredSource: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; start: Point; origin: Point; maxOffset: Point } | null>(null);
  const [editor, setEditor] = useState<EditorImage | null>(null);
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const [activePreviewId, setActivePreviewId] = useState(previews[0].id);
  const [crops, setCrops] = useState<Record<string, CropState>>(() => Object.fromEntries(
    previews.map((preview) => [preview.id, initialCrop(preview)]),
  ));
  const [message, setMessage] = useState("");
  const [isLoadingSource, setIsLoadingSource] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activePreview = previews.find((preview) => preview.id === activePreviewId) ?? previews[0];
  const activeCrop = crops[activePreview.id] ?? initialCrop(activePreview);

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
    if (editor?.revokeOnClose) URL.revokeObjectURL(editor.url);
  }, [editor]);

  const displayed = useMemo(() => {
    if (!editor || !frame.width || !frame.height) return null;
    return cropDisplay(editor, frame, activeCrop);
  }, [activeCrop, editor, frame]);

  function closeEditor() {
    if (editor?.revokeOnClose) URL.revokeObjectURL(editor.url);
    setEditor(null);
    setActivePreviewId(previews[0].id);
    setCrops(Object.fromEntries(previews.map((preview) => [preview.id, initialCrop(preview)])));
    if (inputRef.current) inputRef.current.value = "";
  }

  function openEditor(url: string, sourceChanged: boolean, revokeOnClose: boolean) {
    const image = new window.Image();
    image.decoding = "async";
    if (!revokeOnClose) image.crossOrigin = "anonymous";
    image.onload = () => {
      setEditor({ sourceChanged, revokeOnClose, url, element: image, width: image.naturalWidth, height: image.naturalHeight });
      setActivePreviewId(previews[0].id);
      setCrops(Object.fromEntries(previews.map((preview) => [preview.id, initialCrop(preview)])));
      setIsLoadingSource(false);
    };
    image.onerror = () => {
      if (revokeOnClose) URL.revokeObjectURL(url);
      setMessage("Cette image ne peut pas être ouverte.");
      setIsLoadingSource(false);
    };
    image.src = url;
  }

  function recropCurrentImage() {
    setMessage("");
    setIsLoadingSource(true);
    openEditor(existingSrc, !hasStoredSource, false);
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
    openEditor(url, true, true);
  }

  function updateZoom(value: number) {
    const nextZoom = Math.max(1, Math.min(3, value));
    setCrops((current) => ({
      ...current,
      [activePreview.id]: { ...(current[activePreview.id] ?? initialCrop(activePreview)), zoom: nextZoom },
    }));
  }

  async function confirmCrop() {
    if (!editor || !frame.width || !frame.height) return;
    setMessage("");
    try {
      const formData = new FormData();
      formData.set("slot_key", slotKey);
      let totalSize = 0;
      if (editor.sourceChanged) {
        const source = await optimizedSource(editor);
        totalSize += source.size;
        formData.set("source", new File([source], `${label}-source.webp`, { type: "image/webp" }));
      }
      for (const preview of previews) {
        const crop = crops[preview.id] ?? initialCrop(preview);
        const blob = await optimizedCrop(editor, { width: preview.width, height: preview.height }, crop);
        totalSize += blob.size;
        const fileName = `${label}-${preview.id}`.toLowerCase().replace(/[^a-z0-9]+/gi, "-");
        formData.set(`variant:${preview.id}`, new File([blob], `${fileName}.webp`, { type: "image/webp" }));
      }
      startTransition(async () => {
        try {
          await saveSiteImage(formData);
          setMessage(`${previews.length} cadrage${previews.length > 1 ? "s" : ""} enregistré${previews.length > 1 ? "s" : ""} · ${formatBytes(totalSize)} en WebP`);
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
      <div className="admin-crop-buttons">
        <button className="button button-navy" type="button" onClick={recropCurrentImage} disabled={isPending || isLoadingSource}>
          {isLoadingSource ? <LoaderCircle className="is-spinning" size={16} /> : <Crop size={16} />}
          {isLoadingSource ? "Ouverture…" : "Recadrer la photo actuelle"}
        </button>
        <button className="button button-outline-admin" type="button" onClick={() => inputRef.current?.click()} disabled={isPending || isLoadingSource}>
          <ImagePlus size={16} />
          {hasOverride ? "Remplacer la photo" : "Choisir une nouvelle photo"}
        </button>
      </div>
      {message ? <p className="admin-upload-message" role="status">{message}</p> : null}

      {editor ? (
        <div className="crop-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby={`crop-title-${width}-${height}`}>
          <div className="crop-modal">
            <div className="crop-modal-heading">
              <div><small>RECADRAGE ET APERÇUS DU SITE</small><h3 id={`crop-title-${width}-${height}`}>{label}</h3></div>
              <button type="button" onClick={closeEditor} aria-label="Fermer"><X /></button>
            </div>

            <div className="crop-workspace">
              <div className="crop-active-label">
                <span>Cadrage en cours</span>
                <strong>{activePreview.label}</strong>
              </div>
              <div
                ref={frameRef}
                className={`crop-frame${circular ? " is-circular" : ""}`}
                style={{
                  aspectRatio: `${activePreview.width} / ${activePreview.height}`,
                  width: `min(100%, ${circular ? 480 : 720}px, ${(56 * activePreview.width) / activePreview.height}svh)`,
                }}
                onPointerDown={(event) => {
                  if (!displayed) return;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  dragRef.current = {
                    pointerId: event.pointerId,
                    start: { x: event.clientX, y: event.clientY },
                    origin: activeCrop.pan,
                    maxOffset: displayed.maxOffset,
                  };
                }}
                onPointerMove={(event) => {
                  const drag = dragRef.current;
                  if (!drag || drag.pointerId !== event.pointerId) return;
                  const deltaX = event.clientX - drag.start.x;
                  const deltaY = event.clientY - drag.start.y;
                  const pan = {
                    x: drag.maxOffset.x ? Math.max(-1, Math.min(1, drag.origin.x + deltaX / drag.maxOffset.x)) : 0,
                    y: drag.maxOffset.y ? Math.max(-1, Math.min(1, drag.origin.y + deltaY / drag.maxOffset.y)) : 0,
                  };
                  setCrops((current) => ({
                    ...current,
                    [activePreview.id]: { ...(current[activePreview.id] ?? initialCrop(activePreview)), pan },
                  }));
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
                      left: `calc(50% - ${displayed.width / 2}px + ${displayed.offset.x}px)`,
                      top: `calc(50% - ${displayed.height / 2}px + ${displayed.offset.y}px)`,
                    }}
                  />
                ) : null}
                <span className="crop-frame-outline" />
              </div>
              <p><Crop size={15} /> Faites glisser la photo pour choisir le cadrage.</p>
            </div>

            <div className="crop-site-preview-section">
              <div className="crop-site-preview-heading">
                <strong>{previews.length > 1 ? "Choisissez l’emplacement à recadrer" : "Résultat visible sur le site"}</strong>
                <span>{previews.length > 1
                  ? "Cliquez sur chaque vignette : son cadrage et son zoom sont enregistrés indépendamment."
                  : "Ce cadre reproduit le résultat qui sera affiché sur le site."}</span>
              </div>
              <div className="crop-site-previews">
                {previews.map((preview) => {
                  const isActive = preview.id === activePreview.id;
                  const crop = crops[preview.id] ?? initialCrop(preview);
                  return (
                    <button
                      className={`crop-site-preview${isActive ? " is-active" : ""}`}
                      type="button"
                      key={preview.id}
                      onClick={() => setActivePreviewId(preview.id)}
                      aria-pressed={isActive}
                    >
                      <span className="crop-site-preview-frame" style={{ aspectRatio: `${preview.width} / ${preview.height}` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={editor.url} alt="" draggable={false} style={previewImageStyle(editor, preview, crop)} />
                        {isActive ? <span className="crop-site-preview-badge"><Crop size={12} /> En cours</span> : null}
                      </span>
                      <span className="crop-site-preview-label">{preview.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="crop-controls">
              <div className="crop-zoom">
                <Minus size={16} />
                <input aria-label={`Zoom · ${activePreview.label}`} type="range" min="1" max="3" step="0.01" value={activeCrop.zoom} onChange={(event) => updateZoom(Number(event.target.value))} />
                <Plus size={16} />
              </div>
              <div className="crop-details">
                <span>Sortie sélectionnée : {activePreview.width} × {activePreview.height}px</span>
                <span>WebP optimisé · objectif inférieur à 950 Ko</span>
                {editor.width < activePreview.width || editor.height < activePreview.height ? <strong>La photo source est plus petite que ce format.</strong> : null}
              </div>
            </div>

            <div className="crop-actions">
              <button type="button" className="button button-outline-admin" onClick={closeEditor}>Annuler</button>
              <button type="button" className="button button-navy" onClick={() => void confirmCrop()} disabled={isPending}>
                {isPending ? <LoaderCircle className="is-spinning" size={16} /> : <Check size={16} />}
                {previews.length > 1 ? `Enregistrer les ${previews.length} cadrages` : "Valider et enregistrer"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
