import { readFile, writeFile } from "node:fs/promises";

const pages = JSON.parse(await readFile("docs/audit/current-site-pages.json", "utf8"));
const summary = JSON.parse(await readFile("docs/audit/current-site-summary.json", "utf8"));
const origin = "https://www.corail-plongee.com";

const pathOf = (url) => {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return url;
  }
};

const cell = (value) => String(value ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ");

const explicitRedirects = new Map([
  ["/commander/", "/panier/"],
  ["/sample-page/", "/boutique/"],
  ["/en/boutique/appointment/", "/en/shop/"],
  ["/tag/evenement-a-venir/", "/evenements/"],
]);

const technicalRedirects = new Map([
  ["/mon-compte/", "https://public.zuurit.com/corailplongee/login?redirect=billing"],
  ["/panier/", "https://public.zuurit.com/corailplongee/shop"],
  ["/en/cart/", "https://public.zuurit.com/corailplongee/shop"],
  ["/en/my-account/", "https://public.zuurit.com/corailplongee/login?redirect=billing"],
  ["/en/order-validation/", "https://public.zuurit.com/corailplongee/shop"],
]);

const migrationRows = pages.map((page) => {
  const oldPath = pathOf(page.url);
  if (explicitRedirects.has(oldPath)) {
    return { oldPath, newPath: explicitRedirects.get(oldPath), action: "301", reason: "Redirection déjà observée sur le site actuel" };
  }
  if (technicalRedirects.has(oldPath)) {
    return { oldPath, newPath: technicalRedirects.get(oldPath), action: "301", reason: "Ancienne route WooCommerce remplacée par le service Zuurit" };
  }
  return {
    oldPath,
    newPath: oldPath,
    action: "KEEP",
    reason: page.kind === "posts" ? "Article/événement historique à conserver" : page.kind === "products" ? "Ancienne fiche indexée à conserver comme page informative" : "Route et contenu à préserver",
  };
});

const migration = `# Migration SEO — Corail Plongée

Audit réalisé le ${new Date(summary.auditedAt).toLocaleDateString("fr-FR")} depuis les sitemaps Yoast et les pages publiques de ${origin}.

## Règles de migration

- Le domaine, les DNS et le site WordPress actuel restent intacts pendant toute la préproduction.
- Les routes de contenu qui répondent actuellement en 200 sont conservées à l’identique.
- Les anciennes fiches boutique restent accessibles comme pages informatives et renvoient vers Zuurit ; aucun moteur WooCommerce n’est recréé.
- Les routes techniques de compte/panier sont redirigées vers leur destination Zuurit exacte.
- Les redirections ci-dessous seront activées uniquement lors de la future bascule du domaine, après validation du client.
- Les articles/événements historiques sont conservés afin d’éviter des 404 et de préserver leurs signaux SEO.

## Résumé

- ${summary.totalUrls} URLs présentes dans les sitemaps.
- ${summary.sitemapCounts.pages} pages, ${summary.sitemapCounts.posts} articles/événements, ${summary.sitemapCounts.products} anciennes fiches boutique et ${summary.sitemapCounts.tags} archive d’étiquette.
- ${summary.successful} URLs répondent en 2xx/3xx ; ${summary.errors.length} entrées du sitemap aboutissent actuellement à une 404.

## Plan URL par URL

| Ancienne URL | Nouvelle URL | Action | Motif |
|---|---|---|---|
${migrationRows.map((row) => `| ${cell(row.oldPath)} | ${cell(row.newPath)} | ${row.action} | ${cell(row.reason)} |`).join("\n")}

## Nouvelles routes

| Route | Action | Usage |
|---|---|---|
| /admin/ | NEW ROUTE | Connexion et administration des événements, tarifs et liens Zuurit |
| /admin/evenements/ | NEW ROUTE | Gestion des événements bilingues et de leurs images |
| /admin/tarifs/ | NEW ROUTE | Source unique des montants affichés sur le site |
| /admin/liens-reservation/ | NEW ROUTE | Gestion centralisée des destinations Zuurit |

## Points SEO constatés sur l’existant

- ${summary.missingDescription.length} pages sans méta-description.
- ${summary.missingH1.length} pages sans H1 détectable.
- ${summary.multipleH1.length} pages possèdent plusieurs H1.
- La racine et /en/home/ doivent conserver un couple hreflang FR/EN réciproque.
- Le robots.txt actuel interdit /page/ et /en/page/ mais ne déclare pas explicitement le sitemap.
`;

const zuuritUsage = new Map();
for (const page of pages) {
  for (const link of page.links || []) {
    if (!(link.url || "").includes("zuurit.com")) continue;
    const value = zuuritUsage.get(link.url) || { texts: new Set(), pages: new Set() };
    if (link.text) value.texts.add(link.text);
    value.pages.add(pathOf(page.url));
    zuuritUsage.set(link.url, value);
  }
}

const zuurit = `# Inventaire des liens Zuurit

L’audit complet n’a trouvé que quatre destinations Zuurit distinctes. Elles sont injectées dans toutes les pages par le menu et le pied de page, ce qui explique leur présence répétée.

| Clé initiale | Destination actuelle | Usage observé |
|---|---|---|
| customer_account | https://public.zuurit.com/corailplongee/login?redirect=billing | Icône de compte / espace facturation |
| agenda | https://public.zuurit.com/corailplongee/agenda | « Réserver une sortie », « Réserver une plongée » dans la navigation |
| main_booking | https://public.zuurit.com/corailplongee/booking | CTA « Je réserve », réservations de prestations |
| shop | https://public.zuurit.com/corailplongee/shop | Boutique, offrir une plongée et commandes de formations |

## Clés métier prévues dans Supabase

Pour permettre des évolutions indépendantes sans toucher au code, la V1 créera aussi les clés suivantes, initialement aliasées vers les quatre destinations observées :

| Clé | Valeur initiale |
|---|---|
| gift_dive | https://public.zuurit.com/corailplongee/shop |
| discovery_booking | https://public.zuurit.com/corailplongee/booking |
| ssi_booking | https://public.zuurit.com/corailplongee/shop |
| french_training_booking | https://public.zuurit.com/corailplongee/booking |
| cetacean_booking | https://public.zuurit.com/corailplongee/booking |
| exploration_booking | https://public.zuurit.com/corailplongee/booking |

## Libellés observés

${[...zuuritUsage.entries()].map(([url, usage]) => `### ${url}\n\n- Libellés : ${[...usage.texts].filter(Boolean).map((text) => `« ${text} »`).join(", ") || "lien sur icône"}\n- Présent sur ${usage.pages.size} pages auditées.`).join("\n\n")}

Tous les CTA de la nouvelle version liront une clé dans la table \`booking_links\`. Aucune de ces URLs ne sera codée directement dans un composant d’interface.
`;

const issues = `# Problèmes et incohérences de contenu

Ce document recense les conflits observés. La V1 utilisera la page officielle /nos-tarifs/ comme référence provisoire, conformément au cahier des charges, sans prétendre trancher la donnée commerciale.

## Tarifs contradictoires

| Prestation | URL | Prix de référence provisoire | Autre valeur observée | Observation |
|---|---|---:|---:|---|
| Passerelle Niveau 1 → Open Water Diver SSI | /nos-tarifs/ et /passerelle/ | 285 € | 90 € | /passerelle/ affiche 285 € dans le résumé puis 90 € dans une fiche plus bas. |
| Passerelle Niveau 2 → Advanced Open Water Diver | /nos-tarifs/ et /passerelle/ | 350 € | 220 € | Le résumé et la fiche de /passerelle/ affichent 220 €. |
| Passerelle Niveau 3 → Master Diver | /nos-tarifs/ et /passerelle/ | 400 € | 290 € | Le résumé et la fiche de /passerelle/ affichent 290 €. |
| Passerelle Advanced SSI → Niveau 2 | /nos-tarifs/ et /passerelle/ | 140 € | 150 € | /passerelle/ affiche 150 €. |
| Passerelle Advanced SSI → PA40 | /nos-tarifs/ et /passerelle/ | 350 € | 270 € | /passerelle/ affiche 350 € dans le résumé puis 270 € dans une fiche. |
| Passerelle Master Diver SSI → Niveau 3 | /nos-tarifs/ et /passerelle/ | 660 € | 615 € | /passerelle/ affiche 660 € dans le résumé puis 615 € dans une fiche. |
| Exploration autonome à l’unité | /nos-tarifs/ et /je-plonge-autonome/ | 45 € | 40 € | Deux grilles différentes sont rendues sur /je-plonge-autonome/. |
| Forfait autonome 4 plongées | /nos-tarifs/ et /je-plonge-autonome/ | 172 € | 150 € | Deux grilles différentes. |
| Forfait autonome 6 plongées | /nos-tarifs/ et /je-plonge-autonome/ | 249 € | 225 € | Deux grilles différentes. |
| Forfait autonome 10 plongées | /nos-tarifs/ et /je-plonge-autonome/ | 400 € | 360 € | Deux grilles différentes. |
| Forfait autonome 20 plongées | /nos-tarifs/ et /je-plonge-autonome/ | 700 € | 680 € | Deux grilles différentes. |
| Forfait autonome 32 plongées | /nos-tarifs/ et /je-plonge-autonome/ | 950 € | 800 € | Deux grilles différentes. |
| Forfait autonome 65 plongées | /nos-tarifs/ et /je-plonge-autonome/ | 1 560 € | 1 300 € | Deux grilles différentes. La même page contient aussi « 210 £ », probablement un résidu erroné. |
| Niveau 3 + RIFAP | /nos-tarifs/ et /en/rates/ | 900 € | 850 € | La version anglaise n’est pas alignée sur la grille française. |
| Plongée supplémentaire | /nos-tarifs/ et /en/rates/ | 80 € | 75 € | La version anglaise n’est pas alignée sur la grille française. |

## SEO et routes

- Trois entrées de sitemap renvoient déjà une 404 : /en/en-404/, /sample-page/ et /en/boutique/appointment/.
- Quatre pages produit n’ont pas de méta-description.
- Onze pages n’ont pas de H1 détectable et neuf pages en contiennent plusieurs.
- /blog/, /en/blog-about-diving-in-reunion-island/ et /en/our-blog/ présentent des contenus anglais possiblement dupliqués.
- L’archive /tag/evenement-a-venir/ redirige vers /evenements/ mais reste listée dans le sitemap.
- Un lien externe malformé \`http://onclick=history.go(-1);/\` est présent sur une page d’erreur.
- Deux liens Google Search pointent vers des URLs internes au lieu de liens directs.

## Contenu à faire confirmer

- Horaires : plusieurs pieds de page indiquent 7 h 30–16 h 30 et 12 h le dimanche, alors que certaines versions anglaises indiquent 7 h 30–17 h et 11 h 30 le dimanche.
- Orthographe commerciale : « Sortie Cétacé » au singulier et « Sorties cétacés » au pluriel alternent selon les pages.
- Les pages de planning datées de 2024–2026 sont indexées comme des articles ; elles seront conservées, mais leur caractère historique devra être explicite.
- La page /page-instagram/ et les routes WooCommerce techniques semblent peu utiles aux visiteurs ; leurs redirections finales devront être validées avant la bascule du domaine.
`;

const newsletter = `# Migration de la newsletter

## Fonctionnement actuel

La page d’accueil utilise un formulaire **Elementor Pro** nommé « New Form », avec l’identifiant \`fba35d0\` et le \`post_id\` WordPress \`60\`. Le formulaire ne déclare aucune URL \`action\` autonome : sa soumission dépend du JavaScript et du traitement interne WordPress/Elementor.

## Conséquence

Ce formulaire ne peut pas être copié tel quel dans l’application Next.js hébergée sur Vercel. Le faire dépendre durablement de l’ancien WordPress serait fragile et empêcherait sa future extinction.

## Décision V1

- Conserver la section newsletter visuellement.
- Ne pas envoyer d’adresse tant qu’un fournisseur ou un endpoint officiellement validé n’est pas défini.
- Afficher une mention temporaire claire en préproduction plutôt que de simuler une inscription réussie.
- Ne choisir aucun service payant sans validation du client.

## Validation client nécessaire

Demander si les adresses collectées actuellement sont envoyées par e-mail, stockées dans WordPress/Elementor Submissions ou synchronisées vers un service tiers. Après cette réponse, choisir soit une intégration directe au fournisseur existant, soit une solution dédiée validée séparément.
`;

const audit = `# Audit du site actuel

## Périmètre

L’audit a parcouru ${summary.totalUrls} URLs issues des quatre sitemaps Yoast le ${new Date(summary.auditedAt).toLocaleString("fr-FR")} : pages, articles/événements, anciennes fiches boutique et archive d’étiquette.

## Résultats principaux

- ${summary.successful} URLs accessibles et ${summary.errors.length} erreurs 404.
- ${summary.sitemapCounts.posts} articles ou événements historiques à préserver.
- ${summary.sitemapCounts.products} anciennes fiches boutique anglaises indexées.
- 4 destinations Zuurit distinctes seulement.
- Architecture bilingue existante hétérogène : certaines routes anglaises sont sous /en/, tandis que les articles récents sont majoritairement français.
- Les coordonnées récurrentes sont : Port de plaisance, 97434 Saint-Gilles-les-Bains, La Réunion ; +262 262 24 37 25 ; info@corail-plongee.com.
- Partenaires/certifications visibles : FFESSM, SSI, ANMP, Qualité Tourisme, Observation responsable des cétacés, SCUBAPRO/UWATEC et Nitrox.

## Fichiers sources

- \`docs/audit/current-site-pages.json\` : métadonnées, titres, H1/H2/H3, liens, images, textes alternatifs et texte visible page par page.
- \`docs/audit/current-site-summary.json\` : synthèse et anomalies automatiques.
- \`scripts/audit-current-site.mjs\` : audit reproductible avant la future mise en production.
`;

await Promise.all([
  writeFile("docs/seo-migration.md", migration),
  writeFile("docs/zuurit-links.md", zuurit),
  writeFile("docs/content-issues.md", issues),
  writeFile("docs/newsletter-migration.md", newsletter),
  writeFile("docs/current-site-audit.md", audit),
]);

console.log("Generated audit documentation.");
