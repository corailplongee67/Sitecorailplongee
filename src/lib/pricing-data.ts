import type { BookingKey } from "./site-data";

export type PriceColumn = "standard" | "guided" | "autonomous";
export type PriceSectionLayout = "list" | "comparison";

export type PublicPriceSection = {
  id: string;
  code: string;
  title_fr: string;
  title_en: string;
  intro_fr: string;
  intro_en: string;
  note_fr: string;
  note_en: string;
  guided_label_fr: string;
  guided_label_en: string;
  autonomous_label_fr: string;
  autonomous_label_en: string;
  booking_link_key: string | null;
  display_order: number;
  layout: PriceSectionLayout;
  active: boolean;
};

export type PublicCatalogPrice = {
  id: string;
  content_key: string;
  section_code: string;
  category: string;
  category_en: string;
  subcategory_fr: string;
  subcategory_en: string;
  group_intro_fr: string;
  group_intro_en: string;
  label_fr: string;
  label_en: string;
  description_fr: string | null;
  description_en: string | null;
  amount_cents: number;
  prefix_fr: string | null;
  prefix_en: string | null;
  suffix_fr: string | null;
  suffix_en: string | null;
  price_column: PriceColumn;
  comparison_key: string | null;
  booking_link_key: string;
  display_order: number;
  active: boolean;
};

export const fallbackPriceSections: PublicPriceSection[] = [
  {
    id: "discovery",
    code: "discovery",
    title_fr: "Découverte & sorties",
    title_en: "Discovery & excursions",
    intro_fr: "Premières bulles, immersion plus longue ou rencontre avec les cétacés.",
    intro_en: "First bubbles, a longer immersion or a responsible cetacean excursion.",
    note_fr: "",
    note_en: "",
    guided_label_fr: "",
    guided_label_en: "",
    autonomous_label_fr: "",
    autonomous_label_en: "",
    booking_link_key: "discovery_booking",
    display_order: 10,
    layout: "list",
    active: true,
  },
  {
    id: "ssi",
    code: "ssi",
    title_fr: "Formation internationale SSI",
    title_en: "International SSI training",
    intro_fr: "Formations et supports pédagogiques numériques SSI.",
    intro_en: "SSI courses and digital learning materials.",
    note_fr: "",
    note_en: "",
    guided_label_fr: "",
    guided_label_en: "",
    autonomous_label_fr: "",
    autonomous_label_en: "",
    booking_link_key: "ssi_booking",
    display_order: 20,
    layout: "list",
    active: true,
  },
  {
    id: "french",
    code: "french",
    title_fr: "Formation française ANMP & FFESSM",
    title_en: "French ANMP & FFESSM training",
    intro_fr: "Du niveau 1 au niveau 3, autonomie, profondeur, Nitrox et secourisme.",
    intro_en: "From Level 1 to Level 3, autonomy, depth, Nitrox and rescue skills.",
    note_fr: "",
    note_en: "",
    guided_label_fr: "",
    guided_label_en: "",
    autonomous_label_fr: "",
    autonomous_label_en: "",
    booking_link_key: "french_training_booking",
    display_order: 30,
    layout: "list",
    active: true,
  },
  {
    id: "bridges",
    code: "bridges",
    title_fr: "Passerelles",
    title_en: "Crossovers",
    intro_fr: "Faites reconnaître votre expérience d’un système de certification à l’autre.",
    intro_en: "Have your experience recognised across certification systems.",
    note_fr: "",
    note_en: "",
    guided_label_fr: "",
    guided_label_en: "",
    autonomous_label_fr: "",
    autonomous_label_en: "",
    booking_link_key: "french_training_booking",
    display_order: 40,
    layout: "list",
    active: true,
  },
  {
    id: "exploration",
    code: "exploration",
    title_fr: "Les forfaits d’exploration",
    title_en: "Exploration dive packages",
    intro_fr: "Forfaits valables 1 an.",
    intro_en: "Packages valid for 1 year.",
    note_fr: "Forfaits annuels et 6 mois : nous consulter. Plongée autonome uniquement avec l’ensemble de votre matériel.",
    note_en: "Contact us for annual and 6-month packages. Autonomous diving requires your complete equipment.",
    guided_label_fr: "Exploration encadrée",
    guided_label_en: "Guided exploration",
    autonomous_label_fr: "Exploration autonome",
    autonomous_label_en: "Autonomous exploration",
    booking_link_key: "exploration_booking",
    display_order: 50,
    layout: "comparison",
    active: true,
  },
  {
    id: "supplements",
    code: "supplements",
    title_fr: "Suppléments",
    title_en: "Extras",
    intro_fr: "Options applicables selon la plongée choisie.",
    intro_en: "Options that may apply depending on your dive.",
    note_fr: "Pour l’ensemble des formations, un certificat médical est nécessaire.",
    note_en: "A medical certificate is required for all training courses.",
    guided_label_fr: "",
    guided_label_en: "",
    autonomous_label_fr: "",
    autonomous_label_en: "",
    booking_link_key: "main_booking",
    display_order: 60,
    layout: "list",
    active: true,
  },
];

type PriceSeed = Omit<PublicCatalogPrice, "id" | "category" | "category_en" | "active">;

const sectionNames = Object.fromEntries(
  fallbackPriceSections.map((section) => [section.code, [section.title_fr, section.title_en]]),
) as Record<string, [string, string]>;

function price(seed: PriceSeed): PublicCatalogPrice {
  const [category, categoryEn] = sectionNames[seed.section_code];
  return { ...seed, id: seed.content_key, category, category_en: categoryEn, active: true };
}

const standard = {
  subcategory_fr: "",
  subcategory_en: "",
  group_intro_fr: "",
  group_intro_en: "",
  description_fr: null,
  description_en: null,
  prefix_fr: null,
  prefix_en: null,
  suffix_fr: null,
  suffix_en: null,
  price_column: "standard" as const,
  comparison_key: null,
};

export const fallbackPriceCatalog: PublicCatalogPrice[] = [
  price({ ...standard, content_key: "discovery-bapteme", section_code: "discovery", label_fr: "Découverte « Baptême »", label_en: "Try dive", amount_cents: 8500, booking_link_key: "discovery_booking", display_order: 10 }),
  price({ ...standard, content_key: "discovery-initiation", section_code: "discovery", label_fr: "Initiation 40 min · 2 personnes minimum", label_en: "40-minute initiation · minimum 2 people", amount_cents: 12500, suffix_fr: " / pers.", suffix_en: " / person", booking_link_key: "discovery_booking", display_order: 20 }),
  price({ ...standard, content_key: "discovery-marine-life", section_code: "discovery", label_fr: "Initiation et vie marine · 2 personnes minimum · 2 plongées", label_en: "Initiation and marine life · minimum 2 people · 2 dives", description_fr: "Baptême, initiation, support et module vie marine inclus.", description_en: "Try dive, initiation, learning material and marine-life module included.", amount_cents: 22000, suffix_fr: " / pers.", suffix_en: " / person", booking_link_key: "discovery_booking", display_order: 30 }),
  price({ ...standard, content_key: "discovery-cetaceans", section_code: "discovery", label_fr: "Sortie cétacés · de mi-juillet à fin octobre", label_en: "Cetacean excursion · mid-July to late October", amount_cents: 15000, booking_link_key: "cetacean_booking", display_order: 40 }),

  price({ ...standard, content_key: "ssi-open-water", section_code: "ssi", label_fr: "Open Water SSI · kit inclus · 7 plongées", label_en: "SSI Open Water · kit included · 7 dives", amount_cents: 59500, booking_link_key: "ssi_booking", display_order: 100 }),
  price({ ...standard, content_key: "ssi-open-water-kit", section_code: "ssi", label_fr: "Kit pédagogique numérique Open Water SSI", label_en: "SSI Open Water digital learning kit", amount_cents: 9500, booking_link_key: "ssi_booking", display_order: 110 }),
  price({ ...standard, content_key: "ssi-deep-nitrox", section_code: "ssi", label_fr: "Spécialité Deep Diving « profonde » + Nitrox · 3 plongées · kit inclus", label_en: "Deep Diving speciality + Nitrox · 3 dives · kit included", amount_cents: 37500, booking_link_key: "ssi_booking", display_order: 120 }),
  price({ ...standard, content_key: "ssi-deep-kit", section_code: "ssi", label_fr: "Kit pédagogique numérique Spécialité Deep & Nitrox", label_en: "Deep & Nitrox speciality digital learning kit", amount_cents: 11500, booking_link_key: "ssi_booking", display_order: 130 }),
  price({ ...standard, content_key: "ssi-rescue-react", section_code: "ssi", label_fr: "Spécialité Stress & Rescue + React Right · 7 plongées + cours · kit inclus", label_en: "Stress & Rescue + React Right speciality · 7 dives + course · kit included", amount_cents: 68500, booking_link_key: "ssi_booking", display_order: 140 }),
  price({ ...standard, content_key: "ssi-rescue-kit", section_code: "ssi", label_fr: "Kit pédagogique numérique Spécialité Rescue & React", label_en: "Rescue & React speciality digital learning kit", amount_cents: 12500, booking_link_key: "ssi_booking", display_order: 150 }),

  price({ ...standard, content_key: "french-pe20", section_code: "french", label_fr: "Plongeur encadré à 20 m · PE20 niveau 1 · 5 plongées", label_en: "Guided diver to 20 m · PE20 Level 1 · 5 dives", amount_cents: 42500, booking_link_key: "french_training_booking", display_order: 200 }),
  price({ ...standard, content_key: "french-pa20", section_code: "french", label_fr: "Plongeur autonome à 20 m · PA20 · 6 plongées", label_en: "Autonomous diver to 20 m · PA20 · 6 dives", amount_cents: 48000, booking_link_key: "french_training_booking", display_order: 210 }),
  price({ ...standard, content_key: "french-pe40", section_code: "french", label_fr: "Plongeur encadré à 40 m · PE40 · 4 plongées", label_en: "Guided diver to 40 m · PE40 · 4 dives", amount_cents: 32000, booking_link_key: "french_training_booking", display_order: 220 }),
  price({ ...standard, content_key: "french-level-2", section_code: "french", label_fr: "Niveau 2 · PA20 + PE40 · 10 plongées", label_en: "Level 2 · PA20 + PE40 · 10 dives", amount_cents: 77000, booking_link_key: "french_training_booking", display_order: 230 }),
  price({ ...standard, content_key: "french-level-2-nitrox", section_code: "french", label_fr: "Niveau 2 + Nitrox · 10 plongées", label_en: "Level 2 + Nitrox · 10 dives", amount_cents: 85000, booking_link_key: "french_training_booking", display_order: 240 }),
  price({ ...standard, content_key: "french-pa40", section_code: "french", label_fr: "PA40 · 6 plongées", label_en: "PA40 · 6 dives", amount_cents: 54000, booking_link_key: "french_training_booking", display_order: 250 }),
  price({ ...standard, content_key: "french-pa40-nitrox", section_code: "french", label_fr: "PA40 + Nitrox simple · 6 plongées", label_en: "PA40 + basic Nitrox · 6 dives", amount_cents: 61000, booking_link_key: "french_training_booking", display_order: 260 }),
  price({ ...standard, content_key: "french-pa40-pa60", section_code: "french", label_fr: "PA40 vers PA60 · 4 plongées · RIFAP compris", label_en: "PA40 to PA60 · 4 dives · RIFAP included", amount_cents: 40000, booking_link_key: "french_training_booking", display_order: 270 }),
  price({ ...standard, content_key: "french-level-3", section_code: "french", label_fr: "Niveau 3 · PA60 · 10 plongées", label_en: "Level 3 · PA60 · 10 dives", amount_cents: 79000, booking_link_key: "french_training_booking", display_order: 280 }),
  price({ ...standard, content_key: "french-level-3-rifap", section_code: "french", label_fr: "Niveau 3 · PA60 · 10 plongées · RIFAP compris", label_en: "Level 3 · PA60 · 10 dives · RIFAP included", amount_cents: 90000, booking_link_key: "french_training_booking", display_order: 290 }),
  price({ ...standard, content_key: "french-level-3-rifap-nitrox", section_code: "french", label_fr: "Niveau 3 · PA60 + RIFAP + Nitrox confirmé · 12 plongées", label_en: "Level 3 · PA60 + RIFAP + Advanced Nitrox · 12 dives", amount_cents: 106000, booking_link_key: "french_training_booking", display_order: 300 }),
  price({ ...standard, content_key: "french-rifap", section_code: "french", label_fr: "RIFAP secourisme obligatoire pour le niveau 3", label_en: "Mandatory RIFAP rescue training for Level 3", amount_cents: 15000, booking_link_key: "french_training_booking", display_order: 310 }),
  price({ ...standard, content_key: "french-nitrox", section_code: "french", label_fr: "Formation Nitrox · 2 plongées", label_en: "Nitrox course · 2 dives", amount_cents: 18000, booking_link_key: "french_training_booking", display_order: 320 }),
  price({ ...standard, content_key: "french-advanced-nitrox", section_code: "french", label_fr: "Formation Nitrox confirmé · 4 plongées", label_en: "Advanced Nitrox course · 4 dives", amount_cents: 32000, booking_link_key: "french_training_booking", display_order: 330 }),
  price({ ...standard, content_key: "french-technical-dive", section_code: "french", label_fr: "Plongée technique", label_en: "Technical dive", amount_cents: 8000, booking_link_key: "french_training_booking", display_order: 340 }),
  price({ ...standard, content_key: "french-ffessm-licence", section_code: "french", label_fr: "Licence FFESSM pour les certifications", label_en: "FFESSM licence for certifications", amount_cents: 6000, suffix_fr: " en supplément", suffix_en: " extra", booking_link_key: "french_training_booking", display_order: 350 }),

  price({ ...standard, content_key: "bridge-ssi-level-2", section_code: "bridges", subcategory_fr: "SSI vers diplôme français", subcategory_en: "SSI to French certification", group_intro_fr: "Advanced SSI avec 24 plongées", group_intro_en: "SSI Advanced with 24 logged dives", label_fr: "Passerelle Advanced SSI vers niveau 2 · 1 plongée + certification", label_en: "SSI Advanced to Level 2 crossover · 1 dive + certification", amount_cents: 14000, booking_link_key: "french_training_booking", display_order: 400 }),
  price({ ...standard, content_key: "bridge-ssi-pa40", section_code: "bridges", subcategory_fr: "SSI vers diplôme français", subcategory_en: "SSI to French certification", label_fr: "Passerelle Advanced SSI vers PA40 · 4 plongées + certification*", label_en: "SSI Advanced to PA40 crossover · 4 dives + certification*", description_fr: "* Prérequis : 4 plongées au-delà de 30 m en exploration.", description_en: "* Prerequisite: 4 exploration dives deeper than 30 m.", amount_cents: 35000, booking_link_key: "french_training_booking", display_order: 410 }),
  price({ ...standard, content_key: "bridge-master-level-3", section_code: "bridges", subcategory_fr: "SSI vers diplôme français", subcategory_en: "SSI to French certification", label_fr: "Passerelle Master Diver SSI vers niveau 3 · 8 plongées + certification**", label_en: "SSI Master Diver to Level 3 crossover · 8 dives + certification**", description_fr: "** Prérequis : 10 plongées dont 4 au-delà de 30 m en exploration.", description_en: "** Prerequisite: 10 dives, including 4 exploration dives deeper than 30 m.", amount_cents: 66000, booking_link_key: "french_training_booking", display_order: 420 }),
  price({ ...standard, content_key: "bridge-french-open-water", section_code: "bridges", subcategory_fr: "Diplôme français vers SSI", subcategory_en: "French certification to SSI", group_intro_fr: "Passerelle française vers SSI international", group_intro_en: "French certification to international SSI", label_fr: "Niveau 1 vers Open Water Diver SSI", label_en: "Level 1 to SSI Open Water Diver", description_fr: "3 plongées + kit OWD et certification.", description_en: "3 dives + OWD kit and certification.", amount_cents: 28500, booking_link_key: "ssi_booking", display_order: 430 }),
  price({ ...standard, content_key: "bridge-french-advanced", section_code: "bridges", subcategory_fr: "Diplôme français vers SSI", subcategory_en: "French certification to SSI", label_fr: "Niveau 2 vers Advanced Open Water Diver", label_en: "Level 2 to Advanced Open Water Diver", description_fr: "2 plongées + 4 kits Rescue, React, Deep et Nitrox + certification.", description_en: "2 dives + 4 Rescue, React, Deep and Nitrox kits + certification.", amount_cents: 35000, booking_link_key: "ssi_booking", display_order: 440 }),
  price({ ...standard, content_key: "bridge-french-master", section_code: "bridges", subcategory_fr: "Diplôme français vers SSI", subcategory_en: "French certification to SSI", label_fr: "Niveau 3 vers Master Diver", label_en: "Level 3 to Master Diver", description_fr: "3 plongées + 5 kits Rescue, React, Deep, Nitrox et Decompression + certification.", description_en: "3 dives + 5 Rescue, React, Deep, Nitrox and Decompression kits + certification.", amount_cents: 40000, booking_link_key: "ssi_booking", display_order: 450 }),
  price({ ...standard, content_key: "bridge-extra-dive", section_code: "bridges", subcategory_fr: "Diplôme français vers SSI", subcategory_en: "French certification to SSI", label_fr: "Plongée supplémentaire", label_en: "Additional dive", amount_cents: 8000, suffix_fr: " / plongée", suffix_en: " / dive", booking_link_key: "ssi_booking", display_order: 460 }),

  ...[
    ["unit", "Plongée exploration à l’unité", "Single exploration dive", 6500, 4500],
    ["4", "Forfait 4 plongées", "4-dive package", 24500, 17200],
    ["6", "Forfait 6 plongées", "6-dive package", 35000, 24900],
    ["10", "Forfait 10 plongées", "10-dive package", 55000, 40000],
    ["20", "Forfait 20 plongées", "20-dive package", 100000, 70000],
    ["32", "Forfait 32 plongées", "32-dive package", null, 95000],
    ["65", "Forfait 65 plongées", "65-dive package", null, 156000],
  ].flatMap(([key, labelFr, labelEn, guided, autonomous], index) => {
    const base = { ...standard, section_code: "exploration", label_fr: String(labelFr), label_en: String(labelEn), comparison_key: String(key), booking_link_key: "exploration_booking" as BookingKey };
    const entries: PublicCatalogPrice[] = [];
    if (typeof guided === "number") entries.push(price({ ...base, content_key: `exploration-${key}-guided`, amount_cents: guided, price_column: "guided", display_order: 500 + index * 2 }));
    if (typeof autonomous === "number") entries.push(price({ ...base, content_key: `exploration-${key}-autonomous`, amount_cents: autonomous, price_column: "autonomous", display_order: 501 + index * 2 }));
    return entries;
  }),

  price({ ...standard, content_key: "supplement-night-dive", section_code: "supplements", label_fr: "Plongée de nuit", label_en: "Night dive", amount_cents: 1000, prefix_fr: "+", prefix_en: "+", booking_link_key: "main_booking", display_order: 600 }),
  price({ ...standard, content_key: "supplement-night-lamp", section_code: "supplements", label_fr: "Lampe de nuit", label_en: "Night lamp", amount_cents: 1000, prefix_fr: "+", prefix_en: "+", booking_link_key: "main_booking", display_order: 610 }),
  price({ ...standard, content_key: "supplement-guidance", section_code: "supplements", label_fr: "Encadrement", label_en: "Instructor guidance", amount_cents: 1000, prefix_fr: "+", prefix_en: "+", booking_link_key: "main_booking", display_order: 620 }),
  price({ ...standard, content_key: "supplement-equipment", section_code: "supplements", label_fr: "Matériel", label_en: "Equipment", amount_cents: 1000, prefix_fr: "+", prefix_en: "+", booking_link_key: "main_booking", display_order: 630 }),
  price({ ...standard, content_key: "supplement-nitrox", section_code: "supplements", label_fr: "Nitrox", label_en: "Nitrox", amount_cents: 500, prefix_fr: "+", prefix_en: "+", booking_link_key: "main_booking", display_order: 640 }),
];
