# Audit du site actuel

## Périmètre

L’audit a parcouru 179 URLs issues des quatre sitemaps Yoast le 07/09/2026 14:53:47 : pages, articles/événements, anciennes fiches boutique et archive d’étiquette.

## Résultats principaux

- 176 URLs accessibles et 3 erreurs 404.
- 90 articles ou événements historiques à préserver.
- 31 anciennes fiches boutique anglaises indexées.
- 4 destinations Zuurit distinctes seulement.
- Architecture bilingue existante hétérogène : certaines routes anglaises sont sous /en/, tandis que les articles récents sont majoritairement français.
- Les coordonnées récurrentes sont : Port de plaisance, 97434 Saint-Gilles-les-Bains, La Réunion ; +262 262 24 37 25 ; info@corail-plongee.com.
- Partenaires/certifications visibles : FFESSM, SSI, ANMP, Qualité Tourisme, Observation responsable des cétacés, SCUBAPRO/UWATEC et Nitrox.

## Fichiers sources

- `docs/audit/current-site-pages.json` : métadonnées, titres, H1/H2/H3, liens, images, textes alternatifs et texte visible page par page.
- `docs/audit/current-site-summary.json` : synthèse et anomalies automatiques.
- `scripts/audit-current-site.mjs` : audit reproductible avant la future mise en production.
