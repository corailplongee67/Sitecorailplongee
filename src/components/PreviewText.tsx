"use client";

import { createContext, useActionState, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { publishTextBlock, submitLocalTextReview } from "@/app/admin/actions";
import { resolveSiteContact, SITE_CONTACT_TEXT_KEY } from "@/lib/site-contact";

type PreviewContextValue = {
  enabled: boolean;
  preview: boolean;
  editing: boolean;
  toggleEditing: () => void;
  drafts: Record<string, string>;
  published: Record<string, string>;
  french: boolean;
  shared: boolean;
  updateDraft: (id: string, text: string | null) => void;
};
const PreviewContext = createContext<PreviewContextValue>({ enabled: false, preview: false, editing: false, toggleEditing: () => {}, drafts: {}, published: {}, french: false, shared: false, updateDraft: () => {} });

function textLimit(target: Element, current: string) {
  const suggested = target.closest("a, button") ? 80 : target.closest("h3, h4, h5, h6") ? 70 : target.closest("h1, h2") ? 100 : 5000;
  return Math.min(5000, Math.max(suggested, current.trim().length));
}

export function PreviewTextProvider({ enabled, initialDrafts, published, shared, children }: { enabled: boolean; initialDrafts: Record<string, string>; published: Record<string, string>; shared: boolean; children: ReactNode }) {
  const pathname = usePathname();
  const [drafts, setDrafts] = useState(initialDrafts);
  const [editing, setEditing] = useState(true);
  const french = !pathname.startsWith("/en/") && !pathname.startsWith("/admin");
  const preview = enabled && french;
  function updateDraft(id: string, text: string | null) {
    setDrafts((current) => {
      const next = { ...current };
      if (text === null) delete next[id]; else next[id] = text;
      return next;
    });
  }
  return <PreviewContext.Provider value={{ enabled: preview && editing, preview, editing, toggleEditing: () => setEditing((value) => !value), drafts, published, french, shared, updateDraft }}>{children}</PreviewContext.Provider>;
}

export function PreviewModeButton() {
  const { editing, toggleEditing } = useContext(PreviewContext);
  return <button type="button" onClick={toggleEditing}>{editing ? "Passer en navigation" : "Modifier les textes"}</button>;
}

export function PreviewReviewButton() {
  const { drafts } = useContext(PreviewContext);
  const [state, submit, pending] = useActionState(submitLocalTextReview, { status: "idle", message: "", snapshot: "" });
  const snapshot = JSON.stringify(drafts);
  const message = state.status === "success" && state.snapshot !== snapshot
    ? "Les brouillons ont changé depuis la validation. Vérifiez-les puis validez à nouveau."
    : state.message;
  return <form action={submit}>
    <input type="hidden" name="snapshot" value={snapshot} />
    <button type="submit" disabled={pending || !Object.keys(drafts).length}>{pending ? "Validation…" : "Valider les brouillons"}</button>
    {message ? <span role={state.status === "error" ? "alert" : "status"}>{message}</span> : null}
    {state.status === "error" && state.message.startsWith("Les brouillons ont changé") ? <button type="button" onClick={() => window.location.reload()}>Actualiser l’aperçu</button> : null}
  </form>;
}

export function useSiteContact() {
  const { preview, drafts, published } = useContext(PreviewContext);
  return resolveSiteContact((preview ? drafts[SITE_CONTACT_TEXT_KEY] : undefined) ?? published[SITE_CONTACT_TEXT_KEY]);
}

export function usePreviewTextValue(id: string, fallback: string) {
  const { preview, drafts, published, french } = useContext(PreviewContext);
  const publicText = french ? published[id] ?? fallback : fallback;
  return preview ? drafts[id] ?? publicText : publicText;
}

export function useSharedTextValue(id: string, fallback: string) {
  const { preview, drafts, published } = useContext(PreviewContext);
  return (preview ? drafts[id] : undefined) ?? published[id] ?? fallback;
}

export function PreviewDisabledButton({ id, children }: { id: string; children: string }) {
  const { enabled } = useContext(PreviewContext);
  return <button type="button" disabled={!enabled}><PreviewText embedded id={id}>{children}</PreviewText></button>;
}

export function PreviewText({ id, children, embedded = false }: { id: string; children: string; embedded?: boolean }) {
  const { enabled, preview, drafts, published, french, shared, updateDraft } = useContext(PreviewContext);
  const stored = preview ? drafts[id] ?? null : null;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [limit, setLimit] = useState(5000);
  const linkLabel = useRef<HTMLSpanElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const publicText = french ? published[id] ?? children : children;
  const current = stored ?? publicText;

  useEffect(() => {
    if (!enabled || !embedded) return;
    const target = linkLabel.current?.closest("a, button");
    if (!target) return;
    const previousLabel = target.getAttribute("aria-label");
    const previousTitle = target.getAttribute("title");
    target.setAttribute("aria-label", `Modifier le texte : ${current.trim()}`);
    target.setAttribute("title", "Modifier ce texte");
    target.classList.add("preview-editable-link");
    const edit = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      returnFocus.current = target as HTMLElement;
      setLimit(textLimit(target, current));
      setValue(current.trim());
      setError("");
      setEditing(true);
    };
    target.addEventListener("click", edit, true);
    return () => {
      target.removeEventListener("click", edit, true);
      target.classList.remove("preview-editable-link");
      if (previousLabel === null) target.removeAttribute("aria-label"); else target.setAttribute("aria-label", previousLabel);
      if (previousTitle === null) target.removeAttribute("title"); else target.setAttribute("title", previousTitle);
    };
  }, [enabled, embedded, current]);

  if (!preview) return <>{publicText}</>;

  function startEditing(target: HTMLElement) {
    returnFocus.current = target;
    setLimit(textLimit(target, current));
    setValue(current.trim());
    setError("");
    setEditing(true);
  }

  function closeEditor() {
    setEditing(false);
    returnFocus.current?.focus();
  }

  async function persist() {
    if (!value.trim()) {
      setError("Le texte ne peut pas être vide.");
      return;
    }
    if (value.trim().length > limit) {
      setError(`Le texte ne doit pas dépasser ${limit} caractères.`);
      return;
    }
    const leading = children.match(/^\s*/)?.[0] ?? "";
    const trailing = children.match(/\s*$/)?.[0] ?? "";
    const text = leading + value.trim() + trailing;
    setSaving(true);
    setError("");
    try {
      await publishTextBlock(id, text);
      updateDraft(id, text);
      closeEditor();
    } catch {
      setError("Impossible de publier ce texte. Vérifiez votre connexion à l’administration et réessayez.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {embedded ? <span ref={linkLabel}>{current}</span> : enabled ? <span className="preview-editable-text" role="button" tabIndex={0} title="Modifier ce texte" onClick={(event) => { event.preventDefault(); event.stopPropagation(); startEditing(event.currentTarget); }} onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); startEditing(event.currentTarget); }
      }}>{current}</span> : <>{current}</>}
      {editing && createPortal(
        <div className="preview-editor-backdrop" onClick={() => { if (!saving) closeEditor(); }}>
          <div className="preview-editor" role="dialog" aria-modal="true" aria-labelledby="preview-editor-title" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => {
            if (event.key === "Escape") { event.stopPropagation(); if (!saving) closeEditor(); }
            if (event.key === "Tab") {
              const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('textarea:not(:disabled), button:not(:disabled)')];
              const first = controls[0];
              const last = controls.at(-1);
              if (event.shiftKey && document.activeElement === first && last) { event.preventDefault(); last.focus(); }
              else if (!event.shiftKey && document.activeElement === last && first) { event.preventDefault(); first.focus(); }
            }
          }}>
            <h2 id="preview-editor-title">Modifier le texte</h2>
            <p>{shared ? "La modification de ce bloc sera mise en ligne immédiatement." : "Essai local sur cet ordinateur."}</p>
            <label htmlFor="preview-editor-value">Texte</label>
            <textarea id="preview-editor-value" value={value} onChange={(event) => setValue(event.target.value)} rows={6} maxLength={limit} autoFocus disabled={saving} aria-describedby="preview-editor-limit" />
            <small id="preview-editor-limit">{value.length} / {limit} caractères</small>
            {error ? <p role="alert">{error}</p> : null}
            <div className="preview-editor-actions">
              <button type="button" disabled={saving} onClick={closeEditor}>Annuler</button>
              <button type="button" disabled={saving} onClick={() => void persist()}>{saving ? "Publication…" : shared ? "Valider et mettre en ligne" : "Enregistrer en local"}</button>
            </div>
          </div>
        </div>, document.body,
      )}
    </>
  );
}
