# Problèmes et incohérences de contenu

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
- Un lien externe malformé `http://onclick=history.go(-1);/` est présent sur une page d’erreur.
- Deux liens Google Search pointent vers des URLs internes au lieu de liens directs.

## Contenu à faire confirmer

- Horaires : plusieurs pieds de page indiquent 7 h 30–16 h 30 et 12 h le dimanche, alors que certaines versions anglaises indiquent 7 h 30–17 h et 11 h 30 le dimanche.
- Orthographe commerciale : « Sortie Cétacé » au singulier et « Sorties cétacés » au pluriel alternent selon les pages.
- Les pages de planning datées de 2024–2026 sont indexées comme des articles ; elles seront conservées, mais leur caractère historique devra être explicite.
- La page /page-instagram/ et les routes WooCommerce techniques semblent peu utiles aux visiteurs ; leurs redirections finales devront être validées avant la bascule du domaine.
