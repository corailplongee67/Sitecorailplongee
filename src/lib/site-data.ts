export type Locale = "fr" | "en";

export type BookingKey =
  | "customer_account"
  | "agenda"
  | "main_booking"
  | "shop"
  | "gift_dive"
  | "discovery_booking"
  | "ssi_booking"
  | "french_training_booking"
  | "cetacean_booking"
  | "exploration_booking";

export const fallbackBookingLinks: Record<BookingKey, string> = {
  customer_account:
    "https://public.zuurit.com/corailplongee/login?redirect=billing",
  agenda: "https://public.zuurit.com/corailplongee/agenda",
  main_booking: "https://public.zuurit.com/corailplongee/booking",
  shop: "https://public.zuurit.com/corailplongee/shop",
  gift_dive: "https://public.zuurit.com/corailplongee/shop",
  discovery_booking: "https://public.zuurit.com/corailplongee/booking",
  ssi_booking: "https://public.zuurit.com/corailplongee/shop",
  french_training_booking:
    "https://public.zuurit.com/corailplongee/booking",
  cetacean_booking: "https://public.zuurit.com/corailplongee/booking",
  exploration_booking: "https://public.zuurit.com/corailplongee/booking",
};

export const nav = {
  fr: [
    { label: "Découvrir", href: "/decouverte/" },
    { label: "Se former", href: "/nos-prestations/" },
    { label: "Explorer", href: "/je-plonge-autonome/" },
    { label: "Cétacés", href: "/sorties-cetaces-2/" },
    { label: "Tarifs", href: "/nos-tarifs/" },
    { label: "Évènements", href: "/evenements/" },
  ],
  en: [
    { label: "Discover", href: "/en/discover/" },
    { label: "Training", href: "/en/our-services/" },
    { label: "Explore", href: "/en/i-dive/" },
    { label: "Cetaceans", href: "/en/cetacean-excursions/" },
    { label: "Rates", href: "/en/rates/" },
    { label: "Events", href: "/en/our-events/" },
  ],
} satisfies Record<Locale, Array<{ label: string; href: string }>>;

export const services = [
  {
    key: "discovery",
    image: "/images/services/discovery.webp",
    href: { fr: "/decouverte/", en: "/en/discover/" },
    bookingKey: "discovery_booking" as BookingKey,
    eyebrow: { fr: "Premières bulles", en: "First bubbles" },
    title: { fr: "Baptême & découverte", en: "Try dive & discovery" },
    text: {
      fr: "Une première immersion douce, en tête-à-tête avec un moniteur, dans le lagon ouvert de Saint-Gilles.",
      en: "A gentle first immersion, one-to-one with an instructor, in the open lagoon of Saint-Gilles.",
    },
  },
  {
    key: "exploration",
    image: "/images/services/exploration.webp",
    href: { fr: "/je-plonge-autonome/", en: "/en/i-dive/" },
    bookingKey: "exploration_booking" as BookingKey,
    eyebrow: { fr: "Sites d’exception", en: "Remarkable sites" },
    title: { fr: "Plongée exploration", en: "Exploration dives" },
    text: {
      fr: "Récifs, tombants, épaves et reliefs volcaniques de la côte ouest, pour plongeurs encadrés ou autonomes.",
      en: "Reefs, drop-offs, wrecks and volcanic formations along the west coast, for guided or autonomous divers.",
    },
  },
  {
    key: "ssi",
    image: "/images/services/ssi.jpg",
    href: { fr: "/formation_ssi/", en: "/en/ssi_training-course/" },
    bookingKey: "ssi_booking" as BookingKey,
    eyebrow: { fr: "Certification internationale", en: "International certification" },
    title: { fr: "Formations SSI", en: "SSI training" },
    text: {
      fr: "De l’Open Water aux spécialités profondes, Nitrox et Stress & Rescue, à votre rythme.",
      en: "From Open Water to Deep, Nitrox and Stress & Rescue specialities, at your pace.",
    },
  },
  {
    key: "french",
    image: "/images/services/french-training.webp",
    href: { fr: "/formation-francaise/", en: "/en/french-training/" },
    bookingKey: "french_training_booking" as BookingKey,
    eyebrow: { fr: "ANMP & FFESSM", en: "ANMP & FFESSM" },
    title: { fr: "Formations françaises", en: "French certifications" },
    text: {
      fr: "Niveau 1 à Niveau 3, autonomie, profondeur, Nitrox et passerelles depuis SSI.",
      en: "Level 1 to Level 3, autonomy, depth, Nitrox and crossover paths from SSI.",
    },
  },
  {
    key: "cetaceans",
    image: "/images/services/cetaceans.webp",
    href: { fr: "/sorties-cetaces-2/", en: "/en/cetacean-excursions/" },
    bookingKey: "cetacean_booking" as BookingKey,
    eyebrow: { fr: "Juillet à octobre", en: "July to October" },
    title: { fr: "Sorties cétacés", en: "Cetacean excursions" },
    text: {
      fr: "Trois heures en mer pour observer baleines et dauphins dans une démarche responsable.",
      en: "Three hours at sea to observe whales and dolphins through a responsible approach.",
    },
  },
];

export const fallbackPrices = [
  { category: "Découverte", labelFr: "Baptême", labelEn: "Try dive", price: 85 },
  { category: "Découverte", labelFr: "Initiation 40 min", labelEn: "40 min initiation", price: 125 },
  { category: "SSI", labelFr: "Open Water SSI · 7 plongées", labelEn: "SSI Open Water · 7 dives", price: 595 },
  { category: "Français", labelFr: "Niveau 1 · PE20 · 5 plongées", labelEn: "Level 1 · PE20 · 5 dives", price: 425 },
  { category: "Exploration", labelFr: "Exploration encadrée", labelEn: "Guided exploration dive", price: 65 },
  { category: "Exploration", labelFr: "Exploration autonome", labelEn: "Autonomous exploration dive", price: 45 },
  { category: "Cétacés", labelFr: "Sortie cétacés · 3 h", labelEn: "Cetacean excursion · 3 hrs", price: 150 },
];

export const contact = {
  address: "Port de plaisance, 97434 Saint-Gilles-les-Bains, La Réunion",
  phoneDisplay: "+262 262 24 37 25",
  phoneHref: "+262262243725",
  email: "info@corail-plongee.com",
};
