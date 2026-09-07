# Corail Plongée — refonte du site

Préproduction du site bilingue de Corail Plongée, centre de plongée à Saint-Gilles-les-Bains, La Réunion.

## Fonctionnalités V1

- accueil immersif et responsive en français et en anglais ;
- conservation des 179 routes inventoriées sur le site WordPress actuel ;
- métadonnées SEO, sitemap, canonicals et règles d’indexation de préproduction ;
- CTA Zuurit centralisés dans Supabase ;
- espace `/admin` privé pour les évènements bilingues, tarifs et liens de réservation ;
- photos d’évènements dans Supabase Storage ;
- aucun formulaire public d’inscription et aucune administration du blog.

## Développement local

1. Copier `.env.example` vers `.env.local` et renseigner les deux valeurs publiques Supabase.
2. Installer les dépendances avec `npm install`.
3. Lancer `npm run dev`.
4. Ouvrir `http://localhost:3000` et `http://localhost:3000/admin`.

Commandes de vérification :

```bash
npm run lint
npm run typecheck
npm run build
```

## Documentation

- `docs/current-site-audit.md` — synthèse de l’audit des 179 URLs.
- `docs/seo-migration.md` — correspondance URL par URL.
- `docs/content-issues.md` — incohérences à faire confirmer.
- `docs/zuurit-links.md` — inventaire des destinations de réservation.
- `docs/supabase-setup.md` — création de la base et de l’administrateur.
- `docs/deployment.md` — préproduction GitHub/Vercel sans modification du domaine.
- `docs/newsletter-migration.md` — fonctionnement actuel et décision V1.

Le domaine `corail-plongee.com`, ses DNS OVH et le WordPress actuel restent hors périmètre de cette préproduction.
