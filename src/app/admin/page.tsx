import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, ExternalLink, Link2, LogOut, Plus, Save, Tags, Trash2 } from "lucide-react";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { deleteEvent, saveBookingLink, saveEvent, savePrice, signOut } from "./actions";

export const metadata = { title: "Administration", robots: { index: false, follow: false } };

function dateTimeInput(value: string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

function EventFields({ event, bookingKeys }: { event?: {
  id: string; slug_fr: string; slug_en: string | null; title_fr: string; title_en: string;
  description_fr: string; description_en: string; starts_at: string; ends_at: string | null;
  image_paths: string[]; booking_link_key: string; published: boolean;
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
        <label>Description française<textarea name="description_fr" defaultValue={event?.description_fr} rows={4} /></label>
        <label>Description anglaise<textarea name="description_en" defaultValue={event?.description_en} rows={4} /></label>
      </div>
      <div className="field-grid field-grid-3">
        <label>Début<input type="datetime-local" name="starts_at" defaultValue={dateTimeInput(event?.starts_at ?? null)} required /></label>
        <label>Fin (facultatif)<input type="datetime-local" name="ends_at" defaultValue={dateTimeInput(event?.ends_at ?? null)} /></label>
        <label>Lien de réservation<select name="booking_link_key" defaultValue={event?.booking_link_key ?? "agenda"}>{bookingKeys.map((key) => <option key={key}>{key}</option>)}</select></label>
      </div>
      <div className="field-grid">
        <label>Photos (JPG, PNG ou WebP, 8 Mo max)<input type="file" name="images" accept="image/jpeg,image/png,image/webp" multiple /></label>
        <label className="check-field"><input type="checkbox" name="published" defaultChecked={event?.published ?? false} /> Visible sur le site</label>
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

  const [{ data: events }, { data: prices }, { data: bookingLinks }] = await Promise.all([
    supabase.from("events").select("*").order("starts_at", { ascending: false }),
    supabase.from("prices").select("*").order("display_order"),
    supabase.from("booking_links").select("*").order("key"),
  ]);
  const bookingKeys = (bookingLinks ?? []).map((link) => link.key);
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
          <details className="admin-editor new-editor"><summary><Plus /> Ajouter un évènement</summary><form action={saveEvent}><EventFields bookingKeys={bookingKeys} /></form></details>
          <div className="admin-items">
            {(events ?? []).map((event) => (
              <details className="admin-editor" key={event.id}>
                <summary><div><strong>{event.title_fr}</strong><small>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short", timeZone: "Indian/Reunion" }).format(new Date(event.starts_at))}</small></div><span className={event.published ? "status-live" : "status-draft"}>{event.published ? "Publié" : "Brouillon"}</span></summary>
                {event.image_paths.length ? <div className="admin-thumbnails">{event.image_paths.map((path) => <Image key={path} src={`${storageBase}${path}`} alt="" width={120} height={80} />)}</div> : null}
                <form action={saveEvent}><EventFields event={event} bookingKeys={bookingKeys} /></form>
                <form className="delete-form" action={deleteEvent}><input type="hidden" name="id" value={event.id} /><input type="hidden" name="image_paths" value={JSON.stringify(event.image_paths)} /><button type="submit"><Trash2 /> Supprimer l’évènement</button></form>
              </details>
            ))}
          </div>
        </section>

        <section id="prices" className="admin-section">
          <div className="admin-section-title"><div><Tags /><div><h2>Tarifs</h2><p>Montants affichés sur le site.</p></div></div><span>{prices?.length ?? 0}</span></div>
          <details className="admin-editor new-editor"><summary><Plus /> Ajouter un tarif</summary><form action={savePrice}><PriceFields bookingKeys={bookingKeys} /></form></details>
          <div className="admin-items">
            {(prices ?? []).map((price) => <details className="admin-editor compact-editor" key={price.id}><summary><div><strong>{price.label_fr}</strong><small>{price.category}</small></div><b>{(price.amount_cents / 100).toLocaleString("fr-FR")} €</b></summary><form action={savePrice}><PriceFields price={price} bookingKeys={bookingKeys} /></form></details>)}
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

function PriceFields({ price, bookingKeys }: { price?: {
  id: string; category: string; label_fr: string; label_en: string; amount_cents: number;
  booking_link_key: string; display_order: number; active: boolean;
}; bookingKeys: string[] }) {
  return <><input type="hidden" name="id" value={price?.id ?? ""} /><div className="field-grid field-grid-3"><label>Catégorie<input name="category" defaultValue={price?.category} required /></label><label>Libellé français<input name="label_fr" defaultValue={price?.label_fr} required /></label><label>Libellé anglais<input name="label_en" defaultValue={price?.label_en} required /></label><label>Prix en euros<input type="number" step="0.01" min="0" name="amount_euros" defaultValue={price ? price.amount_cents / 100 : ""} required /></label><label>Ordre<input type="number" name="display_order" defaultValue={price?.display_order ?? 0} /></label><label>Lien<select name="booking_link_key" defaultValue={price?.booking_link_key ?? "main_booking"}>{bookingKeys.map((key) => <option key={key}>{key}</option>)}</select></label></div><label className="check-field"><input type="checkbox" name="active" defaultChecked={price?.active ?? true} /> Visible sur le site</label><button className="button button-navy" type="submit"><Save size={16} /> Enregistrer</button></>;
}
