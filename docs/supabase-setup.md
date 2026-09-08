# Configuration Supabase

## Projet cible

- Projet : `Sitewebcorailoplongee`
- Référence : `cdlbxuxwkrqukbjeedok`
- Organisation : `Corailplongee67`

Aucune clé secrète ne doit être ajoutée au dépôt. Le navigateur n’utilise que l’URL publique et la clé **publishable** du projet.

## Schéma

La migration `supabase/migrations/20260907112457_initial_content_admin.sql` crée :

- `events` : contenu français/anglais, dates, statut de publication et chemins des photos ;
- `prices` : tarifs bilingues, ordre d’affichage et lien de réservation associé ;
- `booking_links` : destinations Zuurit centralisées ;
- le bucket public `event-images`, limité aux images JPEG, PNG et WebP de 8 Mo maximum ;
- les politiques RLS pour la lecture publique limitée et l’écriture réservée au rôle `admin`.

La migration `supabase/migrations/20260908054519_full_editable_price_catalog.sql` complète ensuite le catalogue :

- `price_sections` : les six rubriques tarifaires, leurs textes bilingues, notes, boutons et ordre d’affichage ;
- `prices` : les 50 montants du site de référence, avec sous-rubriques, précisions, préfixes/suffixes et colonnes de comparaison ;
- les droits Data API et les politiques RLS nécessaires à la lecture publique et à l’administration.

## Application de la migration

Les deux migrations ont été appliquées avec succès au projet cible depuis l’éditeur SQL les 7 et 8 septembre 2026. Le catalogue contient 50 lignes. Lors de la première liaison de la CLI, marquer ces versions comme déjà appliquées avant de pousser les migrations suivantes :

```bash
npx supabase link --project-ref cdlbxuxwkrqukbjeedok
npx supabase migration repair --status applied 20260907112457
npx supabase migration repair --status applied 20260908054519
```

Vérifier ensuite dans le tableau de bord que les quatre tables et le bucket existent. Les futures migrations pourront être appliquées normalement avec `npx supabase db push`.

## Administrateur unique

1. Dans Supabase Authentication, désactiver les inscriptions publiques.
2. Créer manuellement l’utilisatrice administratrice avec son adresse e-mail.
3. Ajouter le rôle dans les métadonnées applicatives du compte :

```json
{ "role": "admin" }
```

Cette donnée doit être placée dans `app_metadata`, jamais dans `user_metadata`. Les politiques RLS vérifient explicitement ce rôle. Le site ne contient aucune page d’inscription publique.

## Variables publiques

```text
NEXT_PUBLIC_SUPABASE_URL=https://cdlbxuxwkrqukbjeedok.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=à_récupérer_dans_les_paramètres_API
```

La clé `service_role` ne doit jamais être copiée dans Vercel, dans une variable préfixée `NEXT_PUBLIC_`, ni dans le dépôt.

## Vérifications

- Un visiteur non connecté peut lire les tarifs, liens et évènements publiés.
- Un visiteur ne peut ni créer ni modifier de contenu.
- Un compte connecté sans `app_metadata.role = admin` ne peut rien administrer.
- L’administratrice peut créer un évènement bilingue, téléverser plusieurs photos, modifier les rubriques, textes et 50 tarifs, et changer un lien Zuurit.
