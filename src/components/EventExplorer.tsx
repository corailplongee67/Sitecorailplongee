"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, ChevronDown, Clock3, MapPin, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import type { PublicEvent } from "@/lib/events-data";
import type { BookingKey, Locale } from "@/lib/site-data";

const copy = {
  fr: {
    weekEyebrow: "Cette semaine",
    weekTitle: "Le programme de la semaine",
    weekIntro: "Les sorties prévues du lundi au dimanche, sans faire défiler des années d’archives.",
    emptyTitle: "Aucun évènement publié cette semaine",
    emptyText: "Le prochain programme sera affiché ici dès sa publication. Les sorties passées restent accessibles dans la recherche.",
    searchButton: "Rechercher dans les évènements",
    hideSearch: "Masquer les archives",
    searchLabel: "Rechercher un évènement",
    searchPlaceholder: "Nom, lieu, thème…",
    allYears: "Toutes les années",
    results: "évènement(s)",
    noResults: "Aucun évènement ne correspond à votre recherche.",
    showMore: "Afficher plus",
    details: "Voir le détail",
    reserve: "Réserver une place",
    close: "Fermer",
    program: "Programme détaillé",
  },
  en: {
    weekEyebrow: "This week",
    weekTitle: "This week’s programme",
    weekIntro: "Trips scheduled from Monday to Sunday, without scrolling through years of archives.",
    emptyTitle: "No event published this week",
    emptyText: "The next programme will appear here as soon as it is published. Past trips remain available in search.",
    searchButton: "Search all events",
    hideSearch: "Hide archives",
    searchLabel: "Search for an event",
    searchPlaceholder: "Name, place, theme…",
    allYears: "All years",
    results: "event(s)",
    noResults: "No event matches your search.",
    showMore: "Show more",
    details: "View details",
    reserve: "Book a place",
    close: "Close",
    program: "Detailed programme",
  },
} as const;

function eventImage(event: PublicEvent, storageBase: string) {
  const path = event.image_paths[0];
  if (path?.startsWith("http")) return path;
  if (path) return `${storageBase}${path}`;
  return event.cover_image_url ?? "/images/hero/corail-reef.jpg";
}

function eventText(event: PublicEvent, locale: Locale) {
  const fr = locale === "fr";
  return {
    title: fr ? event.title_fr : event.title_en || event.title_fr,
    excerpt: fr ? event.excerpt_fr : event.excerpt_en || event.excerpt_fr,
    description: fr ? event.description_fr : event.description_en || event.description_fr,
    location: fr ? event.location_fr : event.location_en || event.location_fr,
  };
}

function formatRange(event: PublicEvent, locale: Locale) {
  const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Indian/Reunion",
  });
  const start = formatter.format(new Date(event.starts_at));
  if (!event.ends_at) return start;
  const end = formatter.format(new Date(event.ends_at));
  return start === end ? start : `${start} — ${end}`;
}

function Card({ event, locale, storageBase, onOpen }: {
  event: PublicEvent;
  locale: Locale;
  storageBase: string;
  onOpen: (event: PublicEvent) => void;
}) {
  const words = eventText(event, locale);
  const style = {
    "--event-title": event.title_color,
    "--event-text": event.text_color,
    "--event-start": event.card_color_start,
    "--event-end": event.card_color_end,
  } as CSSProperties;

  return (
    <article className="event-card" style={style}>
      <button type="button" onClick={() => onOpen(event)} aria-label={`${copy[locale].details} : ${words.title}`}>
        <span className="event-card-image">
          <Image src={eventImage(event, storageBase)} alt={words.title} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
          <span className="event-card-date"><CalendarDays /> {formatRange(event, locale)}</span>
        </span>
        <span className="event-card-body">
          <span className="event-card-location"><MapPin /> {words.location}</span>
          <strong>{words.title}</strong>
          <span className="event-card-excerpt">{words.excerpt || words.description}</span>
          <span className="event-card-link">{copy[locale].details} <ArrowRight /></span>
        </span>
      </button>
    </article>
  );
}

function EventDialog({ event, locale, storageBase, bookingLinks, onClose }: {
  event: PublicEvent;
  locale: Locale;
  storageBase: string;
  bookingLinks: Record<BookingKey, string>;
  onClose: () => void;
}) {
  const words = eventText(event, locale);
  const bookingUrl = bookingLinks[event.booking_link_key as BookingKey] ?? bookingLinks.main_booking;
  const paragraphs = words.description.split(/\n{2,}/).filter(Boolean);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  return (
    <div className="event-dialog-backdrop" role="presentation" onMouseDown={(eventObject) => {
      if (eventObject.target === eventObject.currentTarget) onClose();
    }}>
      <section className="event-dialog" role="dialog" aria-modal="true" aria-labelledby="event-dialog-title">
        <button className="event-dialog-close" type="button" onClick={onClose} aria-label={copy[locale].close} autoFocus><X /></button>
        <div className="event-dialog-image">
          <Image src={eventImage(event, storageBase)} alt={words.title} fill sizes="(max-width: 850px) 100vw, 45vw" />
        </div>
        <div className="event-dialog-content">
          <p className="eyebrow coral">{copy[locale].program}</p>
          <h2 id="event-dialog-title">{words.title}</h2>
          <div className="event-dialog-meta">
            <span><CalendarDays /> {formatRange(event, locale)}</span>
            <span><MapPin /> {words.location}</span>
          </div>
          <div className="event-dialog-copy">
            {(paragraphs.length ? paragraphs : [words.excerpt]).map((paragraph, index) => <p key={`${event.id}-${index}`}>{paragraph}</p>)}
          </div>
          <a className="button button-coral" href={bookingUrl} target="_blank" rel="noreferrer">{copy[locale].reserve} <ArrowRight /></a>
        </div>
      </section>
    </div>
  );
}

export function EventExplorer({ events, locale, bookingLinks, storageBase, referenceDate }: {
  events: PublicEvent[];
  locale: Locale;
  bookingLinks: Record<BookingKey, string>;
  storageBase: string;
  referenceDate: string;
}) {
  const labels = copy[locale];
  const [archivesOpen, setArchivesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [visible, setVisible] = useState(9);
  const [selected, setSelected] = useState<PublicEvent | null>(null);
  const closeDialog = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeDialog(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, closeDialog]);

  const week = useMemo(() => {
    const reference = new Date(referenceDate);
    const day = reference.getDay() || 7;
    const start = new Date(reference);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - day + 1);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return events.filter((event) => {
      const eventStart = new Date(event.starts_at).getTime();
      const eventEnd = new Date(event.ends_at ?? event.starts_at).getTime();
      return eventStart < end.getTime() && eventEnd >= start.getTime();
    });
  }, [events, referenceDate]);

  const years = useMemo(() => [...new Set(events.map((event) => new Date(event.starts_at).getFullYear()))].sort((a, b) => b - a), [events]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale === "fr" ? "fr" : "en");
    return events.filter((event) => {
      const words = eventText(event, locale);
      const matchesYear = year === "all" || String(new Date(event.starts_at).getFullYear()) === year;
      const haystack = `${words.title} ${words.excerpt} ${words.description} ${words.location}`.toLocaleLowerCase(locale === "fr" ? "fr" : "en");
      return matchesYear && (!needle || haystack.includes(needle));
    });
  }, [events, locale, query, year]);

  return (
    <section className="events-explorer section-shell">
      <div className="shell">
        <div className="events-heading">
          <div><p className="eyebrow coral">{labels.weekEyebrow}</p><h2>{labels.weekTitle}</h2></div>
          <p>{labels.weekIntro}</p>
        </div>

        {week.length ? (
          <div className="event-grid">{week.map((event) => <Card key={event.id} event={event} locale={locale} storageBase={storageBase} onOpen={setSelected} />)}</div>
        ) : (
          <div className="events-empty"><span><Clock3 /></span><div><h3>{labels.emptyTitle}</h3><p>{labels.emptyText}</p></div></div>
        )}

        <div className="events-archive-toggle">
          <button className="button button-navy" type="button" aria-expanded={archivesOpen} aria-controls="events-archive" onClick={() => setArchivesOpen((open) => !open)}>
            <Search /> {archivesOpen ? labels.hideSearch : labels.searchButton} <ChevronDown className={archivesOpen ? "is-open" : ""} />
          </button>
        </div>

        {archivesOpen ? (
          <div id="events-archive" className="events-archive">
            <div className="events-searchbar">
              <label><span>{labels.searchLabel}</span><div><Search /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(9); }} placeholder={labels.searchPlaceholder} /></div></label>
              <label><span>{locale === "fr" ? "Année" : "Year"}</span><select value={year} onChange={(event) => { setYear(event.target.value); setVisible(9); }}><option value="all">{labels.allYears}</option>{years.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            </div>
            <div className="events-result-count"><strong>{filtered.length}</strong> {labels.results}</div>
            {filtered.length ? <div className="event-grid">{filtered.slice(0, visible).map((event) => <Card key={event.id} event={event} locale={locale} storageBase={storageBase} onOpen={setSelected} />)}</div> : <p className="events-no-results">{labels.noResults}</p>}
            {visible < filtered.length ? <button className="events-more" type="button" onClick={() => setVisible((count) => count + 9)}>{labels.showMore} <ChevronDown /></button> : null}
          </div>
        ) : null}
      </div>

      {selected ? <EventDialog event={selected} locale={locale} storageBase={storageBase} bookingLinks={bookingLinks} onClose={closeDialog} /> : null}
    </section>
  );
}
