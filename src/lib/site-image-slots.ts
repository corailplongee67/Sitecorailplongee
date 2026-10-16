export type SiteImageSlot = {
  key: string;
  label: string;
  kind: "Bannière" | "Photo large" | "Carte" | "Photo carrée" | "Portrait" | "Décoration";
  width: number;
  height: number;
  usedOn?: string;
  transparent?: boolean;
};

export type SiteImageGroup = {
  id: string;
  title: string;
  description: string;
  slots: SiteImageSlot[];
};

const slot = (
  key: string,
  label: string,
  kind: SiteImageSlot["kind"],
  width: number,
  height: number,
  options: Pick<SiteImageSlot, "usedOn" | "transparent"> = {},
): SiteImageSlot => ({ key, label, kind, width, height, ...options });

export const siteImageGroups: SiteImageGroup[] = [
  {
    id: "home",
    title: "Accueil",
    description: "Héros, bandeau d’aventure, cartes de prestations et mise en avant Découverte.",
    slots: [
      slot("/images/hero/turtle-rays-corail-plongee.png", "Héros avec la tortue", "Bannière", 1920, 1080, { usedOn: "Accueil français et anglais" }),
      slot("/images/hero/diving-reunion.jpg", "Bandeau « Trouvez votre plongée »", "Bannière", 1600, 900, { usedOn: "Accueil, boutique et pages génériques" }),
      slot("/images/services/discovery.webp", "Carte Découverte", "Carte", 1000, 667, { usedOn: "Accueil et pages génériques" }),
      slot("/images/services/exploration.webp", "Carte Exploration", "Carte", 1000, 667),
      slot("/images/services/ssi.jpg", "Carte Formation SSI", "Carte", 1000, 667, { usedOn: "Accueil et pages génériques" }),
      slot("/images/services/french-training.webp", "Carte Formation française", "Carte", 1000, 667),
      slot("/images/services/cetaceans.webp", "Carte Sorties cétacés", "Carte", 1000, 667, { usedOn: "Accueil et pages génériques" }),
      slot("/images/hero/underwater-reunion.jpg", "Visuel marin secondaire", "Photo large", 1440, 960, { usedOn: "Accueil anglais et événements" }),
      slot("/images/about/team-center.jpg", "Photo du centre secondaire", "Photo large", 1024, 620, { usedOn: "Accueil anglais et pages génériques" }),
    ],
  },
  {
    id: "about",
    title: "Qui sommes-nous",
    description: "Photos du centre, des agréments, du matériel, des bateaux, du local et de l’équipe.",
    slots: [
      slot("/images/hero/corail-reef.jpg", "Bannière récif", "Bannière", 1440, 960, { usedOn: "Qui sommes-nous, tarifs, mentions légales et images de secours" }),
      slot("/images/about/original/centre.jpg", "Le centre de plongée", "Photo large", 1024, 620),
      slot("/images/about/original/agrements.jpg", "Les agréments", "Photo large", 1440, 960),
      slot("/images/about/original/materiel.jpg", "Le matériel", "Photo large", 1440, 960, { usedOn: "Qui sommes-nous et Exploration" }),
      slot("/images/about/original/bateaux.jpg", "Nos bateaux", "Photo large", 1920, 1280),
      slot("/images/about/original/local.jpg", "Le local", "Photo large", 1920, 1280),
      slot("/images/about/original/equipe-chris.jpg", "Portrait Chris", "Portrait", 800, 800),
      slot("/images/about/original/equipe-jennifer.jpg", "Portrait Jennifer", "Portrait", 800, 800),
      slot("/images/about/original/equipe-christophe.jpg", "Portrait Christophe", "Portrait", 800, 800),
      slot("/images/about/original/equipe-popote.jpg", "Portrait Popote", "Portrait", 800, 800),
      slot("/images/about/original-en/centre.jpg", "Centre — version anglaise", "Photo large", 1024, 620),
      slot("/images/about/original-en/agrements.jpg", "Agréments — version anglaise", "Photo large", 1440, 960),
      slot("/images/about/original-en/materiel.jpg", "Matériel — version anglaise", "Photo large", 900, 600),
      slot("/images/about/original-en/bateaux.jpg", "Bateaux — version anglaise", "Photo large", 900, 600),
      slot("/images/about/original-en/local.png", "Local — version anglaise", "Photo large", 1200, 900),
    ],
  },
  {
    id: "services",
    title: "Nos prestations",
    description: "Bannière et six cartes de la page catalogue.",
    slots: [
      slot("/images/services/original/hero.jpg", "Bannière des prestations", "Bannière", 1600, 900),
      slot("/images/services/original/discovery.jpg", "Carte Découverte", "Carte", 900, 600),
      slot("/images/services/original/ssi-training.jpg", "Carte Formation SSI", "Carte", 900, 600),
      slot("/images/services/original/french-training.jpg", "Carte Formation française", "Carte", 900, 600),
      slot("/images/services/original/exploration.jpg", "Carte Exploration", "Carte", 900, 600),
      slot("/images/services/original/crossover.jpg", "Carte Passerelles", "Carte", 900, 600),
      slot("/images/services/original/cetaceans.jpg", "Carte Sorties cétacés", "Carte", 900, 600),
    ],
  },
  {
    id: "discovery",
    title: "Découverte",
    description: "Bannière et photos qui illustrent le déroulement d’un baptême.",
    slots: [
      slot("/images/discovery/original/hero.jpg", "Bannière Découverte", "Bannière", 1600, 900),
      slot("/images/discovery/original/equipes.jpg", "Déroulement du baptême", "Photo large", 1200, 800),
      slot("/images/discovery/original/bapteme.jpg", "Et après le baptême", "Photo carrée", 900, 900),
    ],
  },
  {
    id: "initiation",
    title: "Initiation",
    description: "Bannière, visuel principal et fond du cartouche tarif.",
    slots: [
      slot("/images/initiation/original/hero.jpg", "Bannière Initiation", "Bannière", 1600, 900),
      slot("/images/initiation/original/plongeur.jpg", "Photo de l’initiation", "Photo large", 1200, 975),
      slot("/images/initiation/original/fond-prix.png", "Fond du prix", "Décoration", 350, 125, { transparent: true }),
    ],
  },
  {
    id: "ssi",
    title: "Formation SSI",
    description: "Bannière, programmes, spécialités et décorations SSI.",
    slots: [
      slot("/images/ssi/original/hero.jpg", "Bannière Formation SSI", "Bannière", 1600, 780),
      slot("/images/ssi/original/dolphin.jpg", "Décoration dauphin", "Décoration", 600, 850),
      slot("/images/ssi/original/program-specialized.jpg", "Programme spécialisé 1", "Photo carrée", 900, 900),
      slot("/images/ssi/original/program-specialized-alt.jpg", "Programme spécialisé 2", "Photo carrée", 900, 900),
      slot("/images/ssi/original/orientation.jpg", "Spécialité navigation", "Photo large", 1400, 620),
      slot("/images/ssi/original/perfect-buoyancy.jpg", "Flottabilité parfaite", "Photo large", 1200, 900),
      slot("/images/ssi/original/video-deep.jpg", "Fond des vidéos SSI", "Bannière", 1400, 780),
    ],
  },
  {
    id: "french-training",
    title: "Formation française",
    description: "Bannière et décoration de la page des niveaux français.",
    slots: [
      slot("/images/french-training/original/hero.jpg", "Bannière Formation française", "Bannière", 1600, 900),
      slot("/images/french-training/original/decoration.png", "Décoration marine", "Décoration", 535, 775, { transparent: true }),
    ],
  },
  {
    id: "exploration",
    title: "Exploration",
    description: "Bannière, photo du matériel et visuels des forfaits.",
    slots: [
      slot("/images/exploration/original/hero.jpg", "Bannière Exploration", "Bannière", 1600, 900),
    ],
  },
  {
    id: "crossover",
    title: "Passerelles",
    description: "Bannière et cartes des équivalences SSI / diplômes français.",
    slots: [
      slot("/images/crossover/original/hero.jpg", "Bannière Passerelles", "Bannière", 1600, 1000),
      slot("/images/crossover/original/ssi-level-2.jpg", "SSI vers Niveau 2", "Carte", 900, 1200),
      slot("/images/crossover/original/ssi-pa40.jpg", "SSI vers PA40", "Carte", 900, 1200),
      slot("/images/crossover/original/ssi-level-3.jpg", "SSI vers Niveau 3", "Carte", 900, 1200),
      slot("/images/crossover/original/french-open-water.jpg", "Niveau 1 vers Open Water", "Carte", 1000, 800),
      slot("/images/crossover/original/french-advanced.jpg", "Niveau 2 vers Advanced", "Carte", 1200, 750),
      slot("/images/crossover/original/french-master.jpg", "Niveau 3 vers Master", "Carte", 1200, 800),
    ],
  },
  {
    id: "cetaceans",
    title: "Sorties cétacés",
    description: "Bannière, baleines, dauphins et éléments décoratifs.",
    slots: [
      slot("/images/cetaceans/original/hero.jpg", "Bannière Sorties cétacés", "Bannière", 1600, 570),
      slot("/images/cetaceans/original/whale.webp", "Baleine / Safari", "Photo large", 1100, 810),
      slot("/images/cetaceans/original/dolphins.webp", "Dauphins", "Photo carrée", 1100, 1100),
      slot("/images/cetaceans/original/cetacean-decoration.png", "Décoration cétacé", "Décoration", 400, 640, { transparent: true }),
      slot("/images/cetaceans/original/floral-corner.png", "Décoration florale", "Décoration", 600, 930, { transparent: true }),
    ],
  },
  {
    id: "reunion",
    title: "Plonger à La Réunion",
    description: "Bannière, environnements de plongée et décorations.",
    slots: [
      slot("/images/reunion/original/hero.jpg", "Bannière La Réunion", "Bannière", 1600, 900),
      slot("/images/reunion/original/tombants.webp", "Les tombants", "Carte", 1000, 720),
      slot("/images/reunion/original/epaves.webp", "Les épaves", "Carte", 1000, 720),
      slot("/images/reunion/original/grottes.webp", "Les grottes", "Carte", 1000, 720),
      slot("/images/reunion/original/recifs.webp", "Les récifs", "Carte", 1000, 720),
      slot("/images/reunion/original/pelagiques.webp", "Les pélagiques", "Photo large", 1200, 800),
      slot("/images/reunion/original/turtle-decoration.png", "Décoration tortue", "Décoration", 500, 830, { transparent: true }),
      slot("/images/reunion/original/coral-decoration.png", "Décoration corail", "Décoration", 370, 740, { transparent: true }),
    ],
  },
  {
    id: "blog",
    title: "Blog",
    description: "Bannière, vignettes des articles et images intégrées dans les articles.",
    slots: [
      slot("/images/blog/original/hero.jpg", "Bannière du blog", "Bannière", 1600, 900),
      slot("/images/blog/original/biodiversite.webp", "Article biodiversité", "Carte", 900, 600),
      slot("/images/blog/original/biodiversite-detail.jpg", "Détail article biodiversité", "Photo large", 1600, 900),
      slot("/images/blog/original/formation.webp", "Article formations", "Carte", 900, 600),
      slot("/images/blog/original/formation-detail.webp", "Détail article formations", "Photo large", 1600, 900),
      slot("/images/blog/original/nuit.webp", "Article plongée de nuit", "Carte", 900, 600),
      slot("/images/blog/original/nuit-detail.jpg", "Détail article plongée de nuit", "Photo large", 1600, 1000),
      slot("/images/blog/original/epaves.jpg", "Article épaves", "Carte", 900, 600),
      slot("/images/blog/original/epaves-detail.jpg", "Détail article épaves", "Photo large", 1600, 1000),
      slot("/images/blog/original/saint-gilles.webp", "Article Saint-Gilles", "Carte", 900, 675),
      slot("/images/blog/original/saint-gilles-detail.jpg", "Détail article Saint-Gilles", "Photo large", 1600, 1000),
      slot("/images/blog/original/sejour.webp", "Article séjour plongée", "Carte", 900, 600),
      slot("/images/blog/original/therapie.webp", "Article bien-être", "Carte", 900, 675),
      slot("/images/blog/original/ocean-indien.jpg", "Article récifs", "Carte", 900, 675),
      slot("/images/blog/original/team-building.webp", "Article team building", "Carte", 900, 675),
      slot("/images/blog/original/biodiversite-reunion.jpg", "Article biodiversité réunionnaise", "Carte", 900, 675),
    ],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Bannière et illustrations décoratives de la page contact.",
    slots: [
      slot("/images/contact/original/hero.jpg", "Bannière Contact", "Bannière", 1600, 1060),
      slot("/images/contact/original/turtle.png", "Décoration tortue", "Décoration", 500, 880, { transparent: true }),
      slot("/images/contact/original/seahorse.png", "Décoration hippocampe", "Décoration", 535, 880, { transparent: true }),
    ],
  },
  {
    id: "legacy-shop",
    title: "Boutique — anciennes fiches anglaises",
    description: "Visuels des anciennes fiches boutique encore accessibles par leur adresse directe.",
    slots: [
      slot("https://www.corail-plongee.com/wp-content/uploads/2021/06/VIGNETTES04_Plan-de-travail-1.png", "Discovery “First dive”", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2021/06/VIGNETTES07_Plan-de-travail-1.jpg", "Exploration diving level 2 autonomous and more / Rescue diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/2-1-scaled.jpg", "Initiation 40 min 2 persons minimum", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Diving-exploration-level-1-or-Open-water-diver.png", "Diving exploration level 1 or Open water diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Level-1-gateway-to-Open-Water-Diver-SSI.png", "Level 1 gateway to Open Water Diver SSI", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Level-2-gateway-to-adv-Open-Water-Diver.png", "Level 2 gateway to adv Open Water Diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Level-3-Gateway-to-Master-Diver.png", "Level 3 Gateway to Master Diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-10-dives-level-1-or-Open-water-diver.png", "Package 10 dives level 1 or Open water diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-10-level-2-autonomous-dives-and-more-or-Rescue-diver.png", "Package 10 level 2 autonomous dives and more or Rescue diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-20-dives-level-1-or-Open-water-diver.png", "Package 20 dives level 1 or Open water diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-20-level-2-autonomous-dives-and-more-or-Rescue-diver.png", "Package 20 level 2 autonomous dives and more or Rescue diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-32-dives-level-2-autonomous-and-more-or-Rescue-diver.png", "Package 32 dives level 2 autonomous dives and more or Rescue diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-4-dives-level-1-or-Open-water-diver.png", "Package 4 dives level 1 or Open water diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-4-dives-level-2-autonomous-and-more-or-Rescue-diver-1.png", "Package 4 dives level 2 autonomous dives and more or Rescue diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-6-dives-level-1-or-Open-water-diver.png", "Package 6 dives level 1 or Open water diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-6-dives-level-2-autonomous-and-more-or-Rescue-diver.png", "Package 6 dives level 2 autonomous dives and more or Rescue diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/Package-65-level-2-autonomous-dives-and-more-or-Rescue-diver.png", "Package 65 level 2 autonomous dives and more or Rescue diver", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/SSI-adv-gateway-to-PA-40-level-4-dives-certifications1.png", "SSI adv gateway to PA 40 level – 4 dives + certifications", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/SSI-adv-gateway-to-level-2-2-dives-certifications.png", "SSI adv gateway to level 2 – 2 dives + certifications", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/04/SSI-adv-gateway-to-level-3-8-dives-certifications.png", "SSI adv gateway to level 3 – 8 dives + certifications", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/baleines.jpg", "Cetacean excursions", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/deep-diving-speciality-deep_nitrox-kit-included_4-dives.png", "Deep Diving specialty “deep” + nitrox kit included – 4 dives", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/level-1-diving-training-min.png", "Level 1 diving training", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/level-2-diving-training-min.png", "Level 2 diving training", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/level-3-diving-training-min.png", "Level 3 diving training", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/scuba-diver-training-at-20m_PA20_6-dives-min.png", "Scuba diver training at 20m – PA20 – 6 dives", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/ssi-open-water-diver-training.png", "SSI Open Water Diver Training", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/stress-and-rescue-speciality_react-right-kit-included_5-dives_lessons.png", "Stress and Rescue specialty + React Right Kit included – 5 dives + lessons", "Carte", 1200, 1200),
      slot("https://www.corail-plongee.com/wp-content/uploads/2022/06/supervised-diver-trainingat-40m_PE40_4-dives-min.png", "Supervised diver training at 40m – PE40 – 4 dives", "Carte", 1200, 1200),
    ],
  },
];

export const siteImageSlots = siteImageGroups.flatMap((group) => group.slots);
export const siteImageSlotKeys = new Set(siteImageSlots.map((image) => image.key));

export function getSiteImageSlot(key: string) {
  return siteImageSlots.find((image) => image.key === key);
}
