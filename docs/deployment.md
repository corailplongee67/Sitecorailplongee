# Déploiement de préproduction

## Règle de sécurité

Cette V1 doit rester sur une URL Vercel de préproduction. Ne pas connecter `corail-plongee.com`, ne pas modifier les DNS OVH et ne pas désactiver le WordPress actuel.

## État des connexions au 7 septembre 2026

- GitHub cible : `corailplongee67/Sitecorailplongee`.
- Supabase cible : projet `Sitewebcorailoplongee` (`cdlbxuxwkrqukbjeedok`), migration initiale appliquée avec succès.
- La CLI Vercel locale est authentifiée comme `digitark428`, mais le navigateur propriétaire est connecté à l’équipe `corailplongee67-1157's projects`. Le projet doit être géré dans cette équipe uniquement.
- Projet Vercel créé : `sitecorailplongee`. Le préréglage initial incorrect « Other » a été remplacé par « Next.js » avant le second déploiement.
- Préproduction publique : `https://sitecorailplongee.vercel.app`.
- Le commit `b654cdd` a été promu avec succès dans l’environnement Production Vercel le 7 septembre 2026. Ici, « Production » désigne uniquement l’environnement Vercel associé à l’URL de préproduction : le domaine public historique n’a pas été modifié.

Aucun projet Corail Plongée ne doit être créé dans cet espace personnel par erreur.

## Chaîne cible

1. Se connecter dans Vercel avec le compte propriétaire du client.
2. Importer le dépôt GitHub `corailplongee67/Sitecorailplongee`.
3. Laisser Vercel détecter Next.js, sans domaine personnalisé.
4. Ajouter les variables suivantes dans Preview et Production :

```text
NEXT_PUBLIC_SUPABASE_URL=https://cdlbxuxwkrqukbjeedok.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=clé_publishable_du_projet
NEXT_PUBLIC_SITE_URL=https://URL-DE-PREPRODUCTION.vercel.app
NEXT_PUBLIC_ALLOW_INDEXING=false
```

5. Déployer et conserver l’URL `*.vercel.app` pour les validations client.
6. Vérifier `/`, `/en/home/`, `/nos-tarifs/`, un article historique, `/admin/`, `/robots.txt` et `/sitemap.xml`.

Les pages `/`, `/en/home/`, `/nos-tarifs/`, `/decouverte/` et `/admin/` ont été contrôlées avec succès sur l’URL publique après la promotion. La connexion de l’administration à Supabase reste conditionnée à l’ajout des variables publiques ci-dessus dans Vercel.

## GitHub

Une fois Vercel relié au dépôt, chaque push sur la branche de travail produit une preview. Le passage sur la branche principale ne doit pas être confondu avec la future bascule du domaine : celle-ci fera l’objet d’une validation séparée et d’un plan de retour arrière.

## Mise en ligne future

Avant toute bascule : résoudre les prix contradictoires listés dans `content-issues.md`, valider la newsletter, exporter une sauvegarde WordPress, contrôler les redirections, mesurer l’état SEO et préparer le retour arrière DNS. Cette étape n’est pas autorisée dans la V1 actuelle.
