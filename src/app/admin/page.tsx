import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, ExternalLink, Link2, LogOut, Plus, Save, Tags, Trash2 } from "lucide-react";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { PublicCatalogPrice, PublicPriceSection } from "@/lib/pricing-data";
import { deleteEvent, deletePrice, importLegacyEvents, saveBookingLink, saveEvent, savePrice, savePriceSection, signOut } from "./actions";

export const metadata = { title: "Administration", robots: { index: false, follow: false } };

function dateTimeInput(value: string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

function EventFields({ event, bookingKeys }: { event?: {
  id: string; slug_fr: string; slug_en: string | null; title_fr: string; title_en: string;
  excerpt_fr: string; excerpt_en: string; description_fr: string; description_en: string;
  location_fr: string; location_en: string; starts_at: string; ends_at: string | null;
  image_paths: string[]; cover_image_url: string | null; booking_link_key: string;
  title_color: string; text_color: string; card_color_start: string; card_color_end: string; published: boolean;
}; bookingKeys: string[] }) {
  return (
    <>
      <input type="hidden" name="id" value={event?.id ?? ""} />
      <input type="hidden" name="existing_image_paths" value={JSON.stringify(event?.image_paths ?? [])} />
      <div className="field-grid">
        <label>Titre français<input name="title_fr" defaultValue={event?.title_fr} required /></label>
        <label>Titre anglais<input name="title_en" defaultValue={event?.title_en} required /></label>
        <label>Slug français<input name="slug_fr" defaultValue={event?.slug_fr} placeholder="créé automatiquement" /></label>
        <label>Slug anglais<input name="slug_en" defaultValue={event?.slug_en ?? ""} placeholder="created automatically" /></label>
      </div>
      <div className="field-grid">
        <label>Résumé français<textarea name="excerpt_fr" defaultValue={event?.excerpt_fr} rows={3} placeholder="Texte court visible sur la carte" /></label>
        <label>Résumé anglais<textarea name="excerpt_en" defaultValue={event?.excerpt_en} rows={3} placeholder="Short text shown on the card" /></label>
        <label>Description française<textarea name="description_fr" defaultValue={event?.description_fr} rows={4} /></label>
        <label>Description anglaise<textarea name="description_en" defaultValue={event?.description_en} rows={4} /></label>
      </div>
      <div className="field-grid field-grid-3">
        <label>Lieu en français<input name="location_fr" defaultValue={event?.location_fr ?? "Saint-Gilles-les-Bains"} /></label>
        <label>Lieu en anglais<input name="location_en" defaultValue={event?.location_en ?? "Saint-Gilles-les-Bains"} /></label>
        <label>Début<input type="datetime-local" name="starts_at" defaultValue={dateTimeInput(event?.starts_at ?? null)} required /></label>
        <label>Fin (facultatif)<input type="datetime-local" name="ends_at" defaultValue={dateTimeInput(event?.ends_at ?? null)} /></label>
        <label>Lien de réservation<select name="booking_link_key" defaultValue={event?.booking_link_key ?? "agenda"}>{bookingKeys.map((key) => <option key={key}>{key}</option>)}</select></label>
      </div>
      <div className="field-grid">
        <label>Photos (JPG, PNG ou WebP, 8 Mo max)<input type="file" name="images" accept="image/jpeg,image/png,image/webp" multiple /></label>
        <label>Adresse d’une photo existante<input type="url" name="cover_image_url" defaultValue={event?.cover_image_url ?? ""} placeholder="https://…" /></label>
        {event?.image_paths.length ? <label className="check-field"><input type="checkbox" name="replace_images" /> Remplacer toutes les photos envoyées</label> : null}
        <label className="check-field"><input type="checkbox" name="published" defaultChecked={event?.published ?? false} /> Visible sur le site</label>
      </div>
      <div className="event-color-fields">
        <label><span>Couleur du titre</span><input type="color" name="title_color" defaultValue={event?.title_color ?? "#ffb000"} /></label>
        <label><span>Couleur du texte</span><input type="color" name="text_color" defaultValue={event?.text_color ?? "#ffffff"} /></label>
        <label><span>Dégradé · début</span><input type="color" name="card_color_start" defaultValue={event?.card_color_start ?? "#052b43"} /></label>
        <label><span>Dégradé · fin</span><input type="color" name="card_color_end" defaultValue={event?.card_color_end ?? "#0b6078"} /></label>
      </div>
      <p className="field-help">Les horaires sont saisis selon le fuseau de La Réunion.</p>
      <button className="button button-navy" type="submit"><Save size={16} /> Enregistrer</button>
    </>
  );
}

export default async function AdminPage() {
  if (!hasSupabaseEnv()) {
    return (
      <main className="admin-setup shell">
        <Image src="/images/brand/logo.png" alt="Corail Plongée" width={180} height={86} />
        <h1>Administration en attente de connexion</h1>
        <p>Le projet Supabase doit être relié à cette préproduction avant d’activer les évènements, tarifs et liens de réservation.</p>
        <Link className="button button-navy" href="/">Voir le site</Link>
      </main>
    );
  }

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/admin/login/");
  const appMetadata = claimsData.claims.app_metadata as { role?: string } | undefined;
  if (appMetadata?.role !== "admin") {
    return <main className="admin-setup shell"><h1>Accès non autorisé</h1><p>Ce compte ne possède pas le rôle administrateur.</p><form action={signOut}><button className="button button-navy">Se déconnecter</button></form></main>;
  }

  const [{ data: events }, { data: priceSections }, { data: prices }, { data: bookingLinks }] = await Promise.all([
    supabase.from("events").select("*").order("starts_at", { ascending: false }),
    supabase.from("price_sections").select("*").order("display_order"),
    supabase.from("prices").select("*").order("display_order"),
    supabase.from("booking_links").select("*").order("key"),
  ]);
  const bookingKeys = (bookingLinks ?? []).map((link) => link.key);
  const sectionOptions = (priceSections ?? []).map((section) => ({ code: section.code, title: section.title_fr }));
  const storageBase = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/`;

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/"><Image src="/images/brand/logo.png" alt="Corail Plongée" width={165} height={78} /></Link>
        <nav><a href="#events"><CalendarDays /> Évènements</a><a href="#prices"><Tags /> Tarifs</a><a href="#links"><Link2 /> Réservations</a></nav>
        <div className="admin-sidebar-bottom"><Link href="/" target="_blank">Voir le site <ExternalLink /></Link><form action={signOut}><button><LogOut /> Déconnexion</button></form></div>
      </aside>

      <div className="admin-content">
        <header className="admin-heading"><div><p className="eyebrow">Corail Plongée</p><h1>Tableau de bord</h1></div><span>Préproduction</span></header>

        <section id="events" className="admin-section">
          <div className="admin-section-title"><div><CalendarDays /><div><h2>Évènements</h2><p>Programme bilingue et photos des sorties.</p></div></div><span>{events?.length ?? 0}</span></div>
          <form className="admin-import-form" action={importLegacyEvents}><button className="button button-outline-admin" type="submit"><CalendarDays /> Importer ou actualiser les archives du site actuel</button><small>Les évènements déjà modifiés dans l’administration conserveront leur identité, les archives manquantes seront ajoutées.</small></form>
          <details className="admin-editor new-editor"><summary><Plus /> Ajouter un évènement</summary><form action={saveEvent}><EventFields bookingKeys={bookingKeys} /></form></details>
          <div className="admin-items">
            {(events ?? []).map((event) => (
              <details className="admin-editor" key={event.id}>
                <summary><div><strong>{event.title_fr}</strong><small>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short", timeZone: "Indian/Reunion" }).format(new Date(event.starts_at))}</small></div><span className={event.published ? "status-live" : "status-draft"}>{event.published ? "Publié" : "Brouillon"}</span></summary>
                {event.image_paths.length || event.cover_image_url ? <div className="admin-thumbnails">{event.image_paths.map((path) => <Image key={path} src={`${storageBase}${path}`} alt="" width={120} height={80} />)}{!event.image_paths.length && event.cover_image_url ? <Image src={event.cover_image_url} alt="" width={120} height={80} /> : null}</div> : null}
                <form action={saveEvent}><EventFields event={event} bookingKeys={bookingKeys} /></form>
                <form className="delete-form" action={deleteEvent}><input type="hidden" name="id" value={event.id} /><input type="hidden" name="image_paths" value={JSON.stringify(event.image_paths)} /><button type="submit"><Trash2 /> Supprimer l’évènement</button></form>
              </details>
            ))}
          </div>
        </section>

        <section id="prices" className="admin-section">
          <div className="admin-section-title"><div><Tags /><div><h2>Tarifs</h2><p>Toutes les rubriques, prestations, précisions et montants de la page Tarifs.</p></div></div><span>{prices?.length ?? 0}</span></div>

          <div className="admin-subsection-heading"><h3>Rubriques de la page</h3><p>Modifiez ici les titres, textes d’introduction, notes et boutons de chaque bloc.</p></div>
          <div className="admin-items admin-section-editors">
            {(priceSections ?? []).map((section) => (
              <details className="admin-editor compact-editor" key={section.id}>
                <summary><div><strong>{section.title_fr}</strong><small>{section.code} · ordre {section.display_order}</small></div><span className={section.active ? "status-live" : "status-draft"}>{section.active ? "Visible" : "Masquée"}</span></summary>
                <form action={savePriceSection}><PriceSectionFields section={section as PublicPriceSection} bookingKeys={bookingKeys} /></form>
              </details>
            ))}
          </div>

          <div className="admin-subsection-heading admin-price-heading"><h3>Prestations et montants</h3><p>Chaque ligne est entièrement modifiable, en français et en anglais.</p></div>
          <details className="admin-editor new-editor"><summary><Plus /> Ajouter un tarif</summary><form action={savePrice}><PriceFields bookingKeys={bookingKeys} sectionOptions={sectionOptions} /></form></details>
          <div className="admin-items">
            {(prices ?? []).map((price) => <details className="admin-editor compact-editor" key={price.id}><summary><div><strong>{price.label_fr}</strong><small>{price.category}{price.subcategory_fr ? ` · ${price.subcategory_fr}` : ""}</small></div><b>{price.prefix_fr}{(price.amount_cents / 100).toLocaleString("fr-FR")} €{price.suffix_fr}</b></summary><form action={savePrice}><PriceFields price={price as PublicCatalogPrice} bookingKeys={bookingKeys} sectionOptions={sectionOptions} /></form><form className="delete-form" action={deletePrice}><input type="hidden" name="id" value={price.id} /><button type="submit"><Trash2 /> Supprimer ce tarif</button></form></details>)}
          </div>
        </section>

        <section id="links" className="admin-section">
          <div className="admin-section-title"><div><Link2 /><div><h2>Liens Zuurit</h2><p>Une seule source pour tous les boutons de réservation.</p></div></div><span>{bookingLinks?.length ?? 0}</span></div>
          <div className="admin-link-list">{(bookingLinks ?? []).map((link) => <form action={saveBookingLink} key={link.id}><input type="hidden" name="id" value={link.id} /><label><strong>{link.label_fr}</strong><small>{link.key}</small></label><input type="url" name="url" defaultValue={link.url} required /><button title="Enregistrer"><Save /></button></form>)}</div>
        </section>
      </div>
    </main>
  );
}

function PriceSectionFields({ section, bookingKeys }: { section: PublicPriceSection; bookingKeys: string[] }) {
  return <><input type="hidden" name="id" value={section.id} /><input type="hidden" name="layout" value={section.layout} /><div className="field-grid"><label>Titre français<input name="title_fr" defaultValue={section.title_fr} required /></label><label>Titre anglais<input name="title_en" defaultValue={section.title_en} required /></label><label>Introduction française<textarea name="intro_fr" defaultValue={section.intro_fr} rows={3} /></label><label>Introduction anglaise<textarea name="intro_en" defaultValue={section.intro_en} rows={3} /></label><label>Note française<textarea name="note_fr" defaultValue={section.note_fr} rows={3} /></label><label>Note anglaise<textarea name="note_en" defaultValue={section.note_en} rows={3} /></label></div>{section.layout === "comparison" ? <div className="field-grid"><label>Colonne encadrée FR<input name="guided_label_fr" defaultValue={section.guided_label_fr} /></label><label>Guided column EN<input name="guided_label_en" defaultValue={section.guided_label_en} /></label><label>Colonne autonome FR<input name="autonomous_label_fr" defaultValue={section.autonomous_label_fr} /></label><label>Autonomous column EN<input name="autonomous_label_en" defaultValue={section.autonomous_label_en} /></label></div> : <><input type="hidden" name="guided_label_fr" value={section.guided_label_fr} /><input type="hidden" name="guided_label_en" value={section.guided_label_en} /><input type="hidden" name="autonomous_label_fr" value={section.autonomous_label_fr} /><input type="hidden" name="autonomous_label_en" value={section.autonomous_label_en} /></>}<div className="field-grid field-grid-3"><label>Ordre<input type="number" name="display_order" defaultValue={section.display_order} /></label><label>Bouton de réservation<select name="booking_link_key" defaultValue={section.booking_link_key ?? "__none"}><option value="__none">Aucun bouton</option>{bookingKeys.map((key) => <option key={key}>{key}</option>)}</select></label><label className="check-field"><input type="checkbox" name="active" defaultChecked={section.active} /> Rubrique visible</label></div><button className="button button-navy" type="submit"><Save size={16} /> Enregistrer la rubrique</button></>;
}

function PriceFields({ price, bookingKeys, sectionOptions }: { price?: PublicCatalogPrice; bookingKeys: string[]; sectionOptions: Array<{ code: string; title: string }> }) {
  const selectedSection = sectionOptions.find((section) => section.code === price?.section_code) ?? sectionOptions[0];
  return <><input type="hidden" name="id" value={price?.id ?? ""} /><input type="hidden" name="content_key" value={price?.content_key ?? ""} /><div className="field-grid field-grid-3"><label>Rubrique<select name="section_code" defaultValue={price?.section_code ?? selectedSection?.code}>{sectionOptions.map((section) => <option value={section.code} key={section.code}>{section.title}</option>)}</select></label><label>Nom de rubrique FR<input name="category" defaultValue={price?.category ?? selectedSection?.title} required /></label><label>Nom de rubrique EN<input name="category_en" defaultValue={price?.category_en ?? ""} required /></label><label>Sous-rubrique française<input name="subcategory_fr" defaultValue={price?.subcategory_fr} placeholder="Facultatif" /></label><label>Sous-rubrique anglaise<input name="subcategory_en" defaultValue={price?.subcategory_en} placeholder="Optional" /></label><label>Ordre<input type="number" name="display_order" defaultValue={price?.display_order ?? 0} /></label></div><div className="field-grid"><label>Texte d’introduction du groupe FR<input name="group_intro_fr" defaultValue={price?.group_intro_fr} placeholder="Affiché une fois sous la sous-rubrique" /></label><label>Group introduction EN<input name="group_intro_en" defaultValue={price?.group_intro_en} /></label><label>Prestation française<input name="label_fr" defaultValue={price?.label_fr} required /></label><label>Prestation anglaise<input name="label_en" defaultValue={price?.label_en} required /></label><label>Précision française<textarea name="description_fr" defaultValue={price?.description_fr ?? ""} rows={3} /></label><label>Précision anglaise<textarea name="description_en" defaultValue={price?.description_en ?? ""} rows={3} /></label></div><div className="field-grid field-grid-3"><label>Prix en euros<input type="number" step="0.01" min="0" name="amount_euros" defaultValue={price ? price.amount_cents / 100 : ""} required /></label><label>Préfixe FR<input name="prefix_fr" defaultValue={price?.prefix_fr ?? ""} placeholder="Ex. +" /></label><label>Préfixe EN<input name="prefix_en" defaultValue={price?.prefix_en ?? ""} placeholder="Ex. +" /></label><label>Suffixe FR<input name="suffix_fr" defaultValue={price?.suffix_fr ?? ""} placeholder="Ex. / pers." /></label><label>Suffixe EN<input name="suffix_en" defaultValue={price?.suffix_en ?? ""} placeholder="Ex. / person" /></label><label>Lien<select name="booking_link_key" defaultValue={price?.booking_link_key ?? "main_booking"}>{bookingKeys.map((key) => <option key={key}>{key}</option>)}</select></label><label>Colonne<select name="price_column" defaultValue={price?.price_column ?? "standard"}><option value="standard">Liste simple</option><option value="guided">Exploration encadrée</option><option value="autonomous">Exploration autonome</option></select></label><label>Clé de comparaison<input name="comparison_key" defaultValue={price?.comparison_key ?? ""} placeholder="Ex. 4 pour le forfait 4 plongées" /></label><label className="check-field"><input type="checkbox" name="active" defaultChecked={price?.active ?? true} /> Visible sur le site</label></div><button className="button button-navy" type="submit"><Save size={16} /> Enregistrer</button></>;
}
