# Migration SEO — Corail Plongée

Audit réalisé le 07/09/2026 depuis les sitemaps Yoast et les pages publiques de https://www.corail-plongee.com.

## Règles de migration

- Le domaine, les DNS et le site WordPress actuel restent intacts pendant toute la préproduction.
- Les routes de contenu qui répondent actuellement en 200 sont conservées à l’identique.
- Les anciennes fiches boutique restent accessibles comme pages informatives et renvoient vers Zuurit ; aucun moteur WooCommerce n’est recréé.
- Les routes techniques de compte/panier sont redirigées vers leur destination Zuurit exacte.
- Les redirections ci-dessous seront activées uniquement lors de la future bascule du domaine, après validation du client.
- Les articles/événements historiques sont conservés afin d’éviter des 404 et de préserver leurs signaux SEO.

## Résumé

- 179 URLs présentes dans les sitemaps.
- 57 pages, 90 articles/événements, 31 anciennes fiches boutique et 1 archive d’étiquette.
- 176 URLs répondent en 2xx/3xx ; 3 entrées du sitemap aboutissent actuellement à une 404.

## Plan URL par URL

| Ancienne URL | Nouvelle URL | Action | Motif |
|---|---|---|---|
| / | / | KEEP | Route et contenu à préserver |
| /mon-compte/ | https://public.zuurit.com/corailplongee/login?redirect=billing | 301 | Ancienne route WooCommerce remplacée par le service Zuurit |
| /commander/ | /panier/ | 301 | Redirection déjà observée sur le site actuel |
| /panier/ | https://public.zuurit.com/corailplongee/shop | 301 | Ancienne route WooCommerce remplacée par le service Zuurit |
| /confidentialite/ | /confidentialite/ | KEEP | Route et contenu à préserver |
| /mention-legal/ | /mention-legal/ | KEEP | Route et contenu à préserver |
| /nos-prestations/ | /nos-prestations/ | KEEP | Route et contenu à préserver |
| /tutoriels-inscription-sur-divessi-com/ | /tutoriels-inscription-sur-divessi-com/ | KEEP | Route et contenu à préserver |
| /blog/ | /blog/ | KEEP | Route et contenu à préserver |
| /en/blog-about-diving-in-reunion-island/ | /en/blog-about-diving-in-reunion-island/ | KEEP | Route et contenu à préserver |
| /en/our-blog/ | /en/our-blog/ | KEEP | Route et contenu à préserver |
| /en/en-404/ | /en/en-404/ | KEEP | Route et contenu à préserver |
| /en/cart/ | https://public.zuurit.com/corailplongee/shop | 301 | Ancienne route WooCommerce remplacée par le service Zuurit |
| /en/event-calendar/ | /en/event-calendar/ | KEEP | Route et contenu à préserver |
| /en/continual-courses/ | /en/continual-courses/ | KEEP | Route et contenu à préserver |
| /en/french-to-american-american-to-french/ | /en/french-to-american-american-to-french/ | KEEP | Route et contenu à préserver |
| /en/gateway-adv-ssi-to-pa40/ | /en/gateway-adv-ssi-to-pa40/ | KEEP | Route et contenu à préserver |
| /en/order-validation/ | https://public.zuurit.com/corailplongee/shop | 301 | Ancienne route WooCommerce remplacée par le service Zuurit |
| /en/our-services/ | /en/our-services/ | KEEP | Route et contenu à préserver |
| /en/my-account/ | https://public.zuurit.com/corailplongee/login?redirect=billing | 301 | Ancienne route WooCommerce remplacée par le service Zuurit |
| /en/privacy-policies/ | /en/privacy-policies/ | KEEP | Route et contenu à préserver |
| /en/ssii-adv-training-course-to-ffessm-pad-40/ | /en/ssii-adv-training-course-to-ffessm-pad-40/ | KEEP | Route et contenu à préserver |
| /en/ssii-training-course-to-ffessm-level-3/ | /en/ssii-training-course-to-ffessm-level-3/ | KEEP | Route et contenu à préserver |
| /en/ssii-training-course-to-ffessm-level-2/ | /en/ssii-training-course-to-ffessm-level-2/ | KEEP | Route et contenu à préserver |
| /en/terms-and-conditions/ | /en/terms-and-conditions/ | KEEP | Route et contenu à préserver |
| /formation_ssi/ | /formation_ssi/ | KEEP | Route et contenu à préserver |
| /evenements/ | /evenements/ | KEEP | Route et contenu à préserver |
| /en/discover/ | /en/discover/ | KEEP | Route et contenu à préserver |
| /en/ssi_training-course/ | /en/ssi_training-course/ | KEEP | Route et contenu à préserver |
| /en/continual-course/ | /en/continual-course/ | KEEP | Route et contenu à préserver |
| /en/our-events/ | /en/our-events/ | KEEP | Route et contenu à préserver |
| /en/i-dive/ | /en/i-dive/ | KEEP | Route et contenu à préserver |
| /je-decouvre-bapteme/ | /je-decouvre-bapteme/ | KEEP | Route et contenu à préserver |
| /en/i-discover-baptism/ | /en/i-discover-baptism/ | KEEP | Route et contenu à préserver |
| /je-decouvre-initiation/ | /je-decouvre-initiation/ | KEEP | Route et contenu à préserver |
| /en/i-discover-initiation/ | /en/i-discover-initiation/ | KEEP | Route et contenu à préserver |
| /plonger-reunion/ | /plonger-reunion/ | KEEP | Route et contenu à préserver |
| /en/to-dive-in-reunion/ | /en/to-dive-in-reunion/ | KEEP | Route et contenu à préserver |
| /contactez-nous/ | /contactez-nous/ | KEEP | Route et contenu à préserver |
| /en/contact/ | /en/contact/ | KEEP | Route et contenu à préserver |
| /en/dive-cetacean-excursions/ | /en/dive-cetacean-excursions/ | KEEP | Route et contenu à préserver |
| /je-plonge-sorties-cetaces/ | /je-plonge-sorties-cetaces/ | KEEP | Route et contenu à préserver |
| /en/cetacean-excursions/ | /en/cetacean-excursions/ | KEEP | Route et contenu à préserver |
| /en/about-us/ | /en/about-us/ | KEEP | Route et contenu à préserver |
| /passerelle/ | /passerelle/ | KEEP | Route et contenu à préserver |
| /page-instagram/ | /page-instagram/ | KEEP | Route et contenu à préserver |
| /je-plonge-autonome/ | /je-plonge-autonome/ | KEEP | Route et contenu à préserver |
| /en/french-training/ | /en/french-training/ | KEEP | Route et contenu à préserver |
| /agenda/ | /agenda/ | KEEP | Route et contenu à préserver |
| /conditions-generales-de-vente/ | /conditions-generales-de-vente/ | KEEP | Route et contenu à préserver |
| /qui-sommes-nous/ | /qui-sommes-nous/ | KEEP | Route et contenu à préserver |
| /sorties-cetaces-2/ | /sorties-cetaces-2/ | KEEP | Route et contenu à préserver |
| /en/rates/ | /en/rates/ | KEEP | Route et contenu à préserver |
| /en/home/ | /en/home/ | KEEP | Route et contenu à préserver |
| /formation-francaise/ | /formation-francaise/ | KEEP | Route et contenu à préserver |
| /decouverte/ | /decouverte/ | KEEP | Route et contenu à préserver |
| /nos-tarifs/ | /nos-tarifs/ | KEEP | Route et contenu à préserver |
| /plongee-epave-hai-siang-samedi-27-avril-2024-a-10h30/ | /plongee-epave-hai-siang-samedi-27-avril-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-hai-siang-samedi-1-juin-2024-a-10h30/ | /plongee-epave-hai-siang-samedi-1-juin-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-06-06-rdv-17h45/ | /plongee-de-nuit-jeudi-06-06-rdv-17h45/ | KEEP | Article/événement historique à conserver |
| /plongee-petit-couloir-nord-samedi-8-juin-2024-a-10h30/ | /plongee-petit-couloir-nord-samedi-8-juin-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-samedi-15-06-rdv-17h45/ | /plongee-de-nuit-samedi-15-06-rdv-17h45/ | KEEP | Article/événement historique à conserver |
| /formation-niveau-4-avec-examen-fin-novembre-2024/ | /formation-niveau-4-avec-examen-fin-novembre-2024/ | KEEP | Article/événement historique à conserver |
| /sortie-2-plongees-matinee-du-dimanche-23-06-a-07h30/ | /sortie-2-plongees-matinee-du-dimanche-23-06-a-07h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-04-07-rdv-17h45/ | /plongee-de-nuit-jeudi-04-07-rdv-17h45/ | KEEP | Article/événement historique à conserver |
| /plongee-profonde-roches-merveilleuses-samedi-29-juin-2024-a-10h30/ | /plongee-profonde-roches-merveilleuses-samedi-29-juin-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-st-leu-antonio-lorenzo-samedi-06-juillet-2024-a-7h30/ | /plongee-epave-st-leu-antonio-lorenzo-samedi-06-juillet-2024-a-7h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-18-07-rdv-17h45/ | /plongee-de-nuit-jeudi-18-07-rdv-17h45/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-navarra-samedi-20-juillet-2024-a-10h30/ | /plongee-epave-navarra-samedi-20-juillet-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-2-tanks-st-leu-dimanche-21-juillet-2024-a-07h15/ | /plongee-2-tanks-st-leu-dimanche-21-juillet-2024-a-07h15/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-st-leu-antonio-lorenzo-dimanche-28-juillet-2024-a-7h30/ | /plongee-epave-st-leu-antonio-lorenzo-dimanche-28-juillet-2024-a-7h30/ | KEEP | Article/événement historique à conserver |
| /plongee-karysmile-samedi-27-juillet-2024-a-10h30/ | /plongee-karysmile-samedi-27-juillet-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-petit-couloir-nord-samedi-10-aout-2024-a-10h30/ | /plongee-petit-couloir-nord-samedi-10-aout-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-hai-siang-samedi-17-aout-2024-a-10h30/ | /plongee-epave-hai-siang-samedi-17-aout-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-hai-siang-samedi-07-septembre-2024-a-10h30/ | /plongee-epave-hai-siang-samedi-07-septembre-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-septembre/ | /plongee-epave-septembre/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-19-09-rdv-17h45/ | /plongee-de-nuit-jeudi-19-09-rdv-17h45/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-navarra-samedi-21-septembre-2024-a-10h30/ | /plongee-epave-navarra-samedi-21-septembre-2024-a-10h30/ | KEEP | Article/événement historique à conserver |
| /programme-du-16-septembre-2024/ | /programme-du-16-septembre-2024/ | KEEP | Article/événement historique à conserver |
| /vallee-aux-merous-samedi-28-septembre-2024-a-08h00/ | /vallee-aux-merous-samedi-28-septembre-2024-a-08h00/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-vendredi-04-10-rdv-18h00/ | /plongee-de-nuit-vendredi-04-10-rdv-18h00/ | KEEP | Article/événement historique à conserver |
| /programme-de-la-semaine-du-12-octobre-2024/ | /programme-de-la-semaine-du-12-octobre-2024/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-vendredi-18-10-rdv-18h00/ | /plongee-de-nuit-vendredi-18-10-rdv-18h00/ | KEEP | Article/événement historique à conserver |
| /plongees-profondes/ | /plongees-profondes/ | KEEP | Article/événement historique à conserver |
| /plongees-profondes-bo-caillou-le-09-11-2024/ | /plongees-profondes-bo-caillou-le-09-11-2024/ | KEEP | Article/événement historique à conserver |
| /tombant-de-la-souris-chaude-et-plongee-de-nuit/ | /tombant-de-la-souris-chaude-et-plongee-de-nuit/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-vendredi-08-11-rdv-18h30/ | /plongee-de-nuit-vendredi-08-11-rdv-18h30/ | KEEP | Article/événement historique à conserver |
| /plongee-karysmile-samedi-08-decembre-2024-a-08h30/ | /plongee-karysmile-samedi-08-decembre-2024-a-08h30/ | KEEP | Article/événement historique à conserver |
| /plongees-sur-epaves/ | /plongees-sur-epaves/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-19-12-rdv-18h30/ | /plongee-de-nuit-jeudi-19-12-rdv-18h30/ | KEEP | Article/événement historique à conserver |
| /deep-dives/ | /deep-dives/ | KEEP | Article/événement historique à conserver |
| /plongees-semaine-du-23-decembre-2024/ | /plongees-semaine-du-23-decembre-2024/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-09-01-rdv-18h30/ | /plongee-de-nuit-jeudi-09-01-rdv-18h30/ | KEEP | Article/événement historique à conserver |
| /plongees-sur-epaves-2/ | /plongees-sur-epaves-2/ | KEEP | Article/événement historique à conserver |
| /plongee-2-tanks-st-leu-samedi-25-janvier-2025-a-07h30/ | /plongee-2-tanks-st-leu-samedi-25-janvier-2025-a-07h30/ | KEEP | Article/événement historique à conserver |
| /plongee-sur-la-pointe-aux-sel-le-dimanche-26-janvier-2025-a-7h30/ | /plongee-sur-la-pointe-aux-sel-le-dimanche-26-janvier-2025-a-7h30/ | KEEP | Article/événement historique à conserver |
| /plongees-sur-epaves-navarra/ | /plongees-sur-epaves-navarra/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-06-02-rdv-18h30/ | /plongee-de-nuit-jeudi-06-02-rdv-18h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-vendredi-21-02-rdv-18h30/ | /plongee-de-nuit-vendredi-21-02-rdv-18h30/ | KEEP | Article/événement historique à conserver |
| /plongee-sur-la-barge-de-st-paul-samedi-08-mars-2025-a-10h30/ | /plongee-sur-la-barge-de-st-paul-samedi-08-mars-2025-a-10h30/ | KEEP | Article/événement historique à conserver |
| /reprise-de-lactivite-plongee/ | /reprise-de-lactivite-plongee/ | KEEP | Article/événement historique à conserver |
| /plongee-les-roches-merveilleuses-samedi-15-fevrier-2025-a-10h30/ | /plongee-les-roches-merveilleuses-samedi-15-fevrier-2025-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-vendredi-04-04-rdv-18h30/ | /plongee-de-nuit-vendredi-04-04-rdv-18h30/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-hai-siang-samedi-29-mars-2025-a-10h30/ | /plongee-epave-hai-siang-samedi-29-mars-2025-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-karysmile-dimanche-23-mars-a-08h00/ | /plongee-karysmile-dimanche-23-mars-a-08h00/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-st-leu-antonio-lorenzo-samedi-05-avril-2025/ | /plongee-epave-st-leu-antonio-lorenzo-samedi-05-avril-2025/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-vendredi-11-04-rdv-18h00/ | /plongee-de-nuit-vendredi-11-04-rdv-18h00/ | KEEP | Article/événement historique à conserver |
| /plongee-sur-saliba-samedi-12-avril-2025-a-10h30/ | /plongee-sur-saliba-samedi-12-avril-2025-a-10h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-vendredi-18-04-rdv-18h00-2/ | /plongee-de-nuit-vendredi-18-04-rdv-18h00-2/ | KEEP | Article/événement historique à conserver |
| /plongee-karys-smile-19-04-a-10h30/ | /plongee-karys-smile-19-04-a-10h30/ | KEEP | Article/événement historique à conserver |
| /dimanche-de-paques-20-04-2025/ | /dimanche-de-paques-20-04-2025/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-jeudi-24-04-rdv-18h00/ | /plongee-de-nuit-jeudi-24-04-rdv-18h00/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-jeudi-24-04-au-04-05/ | /plongee-a-theme-du-jeudi-24-04-au-04-05/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-hai-siang-dimanche-4-mai-2025-a-07h30/ | /plongee-epave-hai-siang-dimanche-4-mai-2025-a-07h30/ | KEEP | Article/événement historique à conserver |
| /plongee-2-tanks-st-leu-jeudi-1-mai-2025-a-07h30/ | /plongee-2-tanks-st-leu-jeudi-1-mai-2025-a-07h30/ | KEEP | Article/événement historique à conserver |
| /plongee-de-nuit-mardi-13-05-rdv-18h00/ | /plongee-de-nuit-mardi-13-05-rdv-18h00/ | KEEP | Article/événement historique à conserver |
| /plongee-epave-st-leu-antonio-lorenzo-dimanche-18-mai-2025-a-7h30/ | /plongee-epave-st-leu-antonio-lorenzo-dimanche-18-mai-2025-a-7h30/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-samedi-12-07-au-18-07/ | /plongee-a-theme-du-samedi-12-07-au-18-07/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-samedi-18-07-au-22-07-07/ | /plongee-a-theme-du-samedi-18-07-au-22-07-07/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-22-07-au-27-07-25/ | /plongee-a-theme-du-22-07-au-27-07-25/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-08-08-au-17-08-25/ | /plongee-a-theme-du-08-08-au-17-08-25/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-12-08-au-23-08-25/ | /plongee-a-theme-du-12-08-au-23-08-25/ | KEEP | Article/événement historique à conserver |
| /sorties-cetaces-reunion/ | /sorties-cetaces-reunion/ | KEEP | Article/événement historique à conserver |
| /plongee-epaves-reunion/ | /plongee-epaves-reunion/ | KEEP | Article/événement historique à conserver |
| /sorties-cetaces-observation-dauphins-baleines-reunion/ | /sorties-cetaces-observation-dauphins-baleines-reunion/ | KEEP | Article/événement historique à conserver |
| /plongee-initiation-reunion/ | /plongee-initiation-reunion/ | KEEP | Article/événement historique à conserver |
| /plongee-autonome-reunion/ | /plongee-autonome-reunion/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-06-02-au-08-02-2026/ | /plongee-a-theme-du-06-02-au-08-02-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-sous-marine-reunion-biodiversite/ | /plongee-sous-marine-reunion-biodiversite/ | KEEP | Article/événement historique à conserver |
| /organiser-voyage-plongee-reunion-checklist/ | /organiser-voyage-plongee-reunion-checklist/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-17-02-au-22-02-2026/ | /plongee-a-theme-du-17-02-au-22-02-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-24-02-au-01-03-2026/ | /plongee-a-theme-du-24-02-au-01-03-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-03-03-au-08-03-2026/ | /plongee-a-theme-du-03-03-au-08-03-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-31-03-au-05-04-2026/ | /plongee-a-theme-du-31-03-au-05-04-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-reunion-secrets-fonds-marins-saint-gilles/ | /plongee-reunion-secrets-fonds-marins-saint-gilles/ | KEEP | Article/événement historique à conserver |
| /plonger-epaves-mythiques-reunion-securite/ | /plonger-epaves-mythiques-reunion-securite/ | KEEP | Article/événement historique à conserver |
| /experience-sensorielle-plongee-nuit-reunion/ | /experience-sensorielle-plongee-nuit-reunion/ | KEEP | Article/événement historique à conserver |
| /guide-formation-niveaux-plongee-reunion/ | /guide-formation-niveaux-plongee-reunion/ | KEEP | Article/événement historique à conserver |
| /engagement-protection-biodiversite-marine-reunion/ | /engagement-protection-biodiversite-marine-reunion/ | KEEP | Article/événement historique à conserver |
| /seminaire-entreprise-plongee-reunion/ | /seminaire-entreprise-plongee-reunion/ | KEEP | Article/événement historique à conserver |
| /preservation-recifs-coralliens-plongee-reunion/ | /preservation-recifs-coralliens-plongee-reunion/ | KEEP | Article/événement historique à conserver |
| /la-plongee-comme-therapie-cultiver-son-bien-etre-sous-la-surface/ | /la-plongee-comme-therapie-cultiver-son-bien-etre-sous-la-surface/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-30-06-au-05-07-2026/ | /plongee-a-theme-du-30-06-au-05-07-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-07-07-au-11-07-2026/ | /plongee-a-theme-du-07-07-au-11-07-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-14-07-au-19-07-2026/ | /plongee-a-theme-du-14-07-au-19-07-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-21-07-au-26-07-2026/ | /plongee-a-theme-du-21-07-au-26-07-2026/ | KEEP | Article/événement historique à conserver |
| /plongee-a-theme-du-24-08-au-30-08-2026/ | /plongee-a-theme-du-24-08-au-30-08-2026/ | KEEP | Article/événement historique à conserver |
| /sample-page/ | /boutique/ | 301 | Redirection déjà observée sur le site actuel |
| /en/boutique/cetacean-excursions/ | /en/boutique/cetacean-excursions/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/deep-diving-specialty-deep-nitrox-kit-included-4-dives/ | /en/boutique/deep-diving-specialty-deep-nitrox-kit-included-4-dives/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/level-2-gateway-to-adv-open-water-diver/ | /en/boutique/level-2-gateway-to-adv-open-water-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/ssi-adv-gateway-to-level-3-8-dives-certifications/ | /en/boutique/ssi-adv-gateway-to-level-3-8-dives-certifications/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/level-1-gateway-to-open-water-diver-ssi/ | /en/boutique/level-1-gateway-to-open-water-diver-ssi/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-6-dives-level-1-or-open-water-diver/ | /en/boutique/package-6-dives-level-1-or-open-water-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/exploration-diving-level-2-autonomous-and-more-rescue-diver/ | /en/boutique/exploration-diving-level-2-autonomous-and-more-rescue-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-10-dives-level-1-or-open-water-diver/ | /en/boutique/package-10-dives-level-1-or-open-water-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-65-level-2-autonomous-dives-and-more-or-rescue-diver/ | /en/boutique/package-65-level-2-autonomous-dives-and-more-or-rescue-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-4-dives-level-2-autonomous-and-more-or-rescue-diver/ | /en/boutique/package-4-dives-level-2-autonomous-and-more-or-rescue-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-20-dives-level-1-or-open-water-diver/ | /en/boutique/package-20-dives-level-1-or-open-water-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-20-level-2-autonomous-dives-and-more-or-rescue-diver/ | /en/boutique/package-20-level-2-autonomous-dives-and-more-or-rescue-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-32-dives-level-2-autonomous-and-more-or-rescue-diver/ | /en/boutique/package-32-dives-level-2-autonomous-and-more-or-rescue-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-10-level-2-autonomous-dives-and-more-or-rescue-diver/ | /en/boutique/package-10-level-2-autonomous-dives-and-more-or-rescue-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-6-dives-level-2-autonomous-and-more-or-rescue-diver/ | /en/boutique/package-6-dives-level-2-autonomous-and-more-or-rescue-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/package-4-dives-level-1-or-open-water-diver/ | /en/boutique/package-4-dives-level-1-or-open-water-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/initiation-40-min-2-persons-minimum/ | /en/boutique/initiation-40-min-2-persons-minimum/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/appointment/ | /en/shop/ | 301 | Redirection déjà observée sur le site actuel |
| /en/boutique/discovery-first-dive/ | /en/boutique/discovery-first-dive/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/level-1-diving-training/ | /en/boutique/level-1-diving-training/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/level-2-diving-training/ | /en/boutique/level-2-diving-training/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/level-3-diving-training/ | /en/boutique/level-3-diving-training/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/supervised-diver-training-at-40m-pe40-4-dives/ | /en/boutique/supervised-diver-training-at-40m-pe40-4-dives/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/scuba-diver-training-at-20m-pa20-6-dives/ | /en/boutique/scuba-diver-training-at-20m-pa20-6-dives/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/ssi-adv-gateway-to-level-2-2-dives-certifications/ | /en/boutique/ssi-adv-gateway-to-level-2-2-dives-certifications/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/ssi-adv-gateway-to-pa-40-level-4-dives-certifications/ | /en/boutique/ssi-adv-gateway-to-pa-40-level-4-dives-certifications/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/level-3-gateway-to-master-diver/ | /en/boutique/level-3-gateway-to-master-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/ssi-open-water-diver-training/ | /en/boutique/ssi-open-water-diver-training/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/stress-and-rescue-specialty-react-right-kit-included-5-dives-lessons/ | /en/boutique/stress-and-rescue-specialty-react-right-kit-included-5-dives-lessons/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /en/boutique/diving-exploration-level-1-or-open-water-diver/ | /en/boutique/diving-exploration-level-1-or-open-water-diver/ | KEEP | Ancienne fiche indexée à conserver comme page informative |
| /tag/evenement-a-venir/ | /evenements/ | 301 | Redirection déjà observée sur le site actuel |

## Nouvelles routes

| Route | Action | Usage |
|---|---|---|
| /admin/ | NEW ROUTE | Connexion et administration des événements, tarifs et liens Zuurit |
| /admin/evenements/ | NEW ROUTE | Gestion des événements bilingues et de leurs images |
| /admin/tarifs/ | NEW ROUTE | Source unique des montants affichés sur le site |
| /admin/liens-reservation/ | NEW ROUTE | Gestion centralisée des destinations Zuurit |

## Points SEO constatés sur l’existant

- 4 pages sans méta-description.
- 11 pages sans H1 détectable.
- 9 pages possèdent plusieurs H1.
- La racine et /en/home/ doivent conserver un couple hreflang FR/EN réciproque.
- Le robots.txt actuel interdit /page/ et /en/page/ mais ne déclare pas explicitement le sitemap.
