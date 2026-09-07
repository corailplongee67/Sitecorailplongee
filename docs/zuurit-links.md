# Inventaire des liens Zuurit

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

### https://public.zuurit.com/corailplongee/login?redirect=billing

- Libellés : lien sur icône
- Présent sur 179 pages auditées.

### https://public.zuurit.com/corailplongee/agenda

- Libellés : « RESERVER UNE PLONGEE », « Réserver une sortie », « Reserve a Dive »
- Présent sur 179 pages auditées.

### https://public.zuurit.com/corailplongee/booking

- Libellés : « Je r&eacute;serve », « I book », « Je réserve », « Réserver », « RESERVER »
- Présent sur 96 pages auditées.

### https://public.zuurit.com/corailplongee/shop

- Libellés : « Exploration », « Offrir une plongée », « Offer a dive », « Commander une formation Open Water Diver », « Commander un package nitrox + deep », « Commander un package react right + stress and rescue », « I book », « Order an Open Water Diver course », « Order a nitrox + deep package », « Order a react right + stress and rescue package », « Shop », « Je r&eacute;serves », « Je réserve », « Boutique », « I BOOK », « Book », « SHOP », « I Book », « Diving »
- Présent sur 179 pages auditées.

Tous les CTA de la nouvelle version liront une clé dans la table `booking_links`. Aucune de ces URLs ne sera codée directement dans un composant d’interface.
