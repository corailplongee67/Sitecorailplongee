# Migration de la newsletter

## Fonctionnement actuel

La page d’accueil utilise un formulaire **Elementor Pro** nommé « New Form », avec l’identifiant `fba35d0` et le `post_id` WordPress `60`. Le formulaire ne déclare aucune URL `action` autonome : sa soumission dépend du JavaScript et du traitement interne WordPress/Elementor.

## Conséquence

Ce formulaire ne peut pas être copié tel quel dans l’application Next.js hébergée sur Vercel. Le faire dépendre durablement de l’ancien WordPress serait fragile et empêcherait sa future extinction.

## Décision V1

- Conserver la section newsletter visuellement.
- Ne pas envoyer d’adresse tant qu’un fournisseur ou un endpoint officiellement validé n’est pas défini.
- Afficher une mention temporaire claire en préproduction plutôt que de simuler une inscription réussie.
- Ne choisir aucun service payant sans validation du client.

## Validation client nécessaire

Demander si les adresses collectées actuellement sont envoyées par e-mail, stockées dans WordPress/Elementor Submissions ou synchronisées vers un service tiers. Après cette réponse, choisir soit une intégration directe au fournisseur existant, soit une solution dédiée validée séparément.
