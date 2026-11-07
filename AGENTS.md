# AGENTS.md

## Principes
- Solution la plus simple et élégante. Aucune abstraction, lib ou pattern « au cas où ».
- Ne rien ajouter qui n'est pas demandé. Chaque dépendance est justifiée en une phrase.
- **Consigne ambiguë : poser la question avant de coder.**
- Vérifier les vrais champs de l'API Merkl dans leur doc. Ne pas inventer.

## Structure
Monorepo pnpm : `apps/api` (proxy + cache devant Merkl) et `apps/web` (SSR). `pnpm dev` lance les deux.
- Le front parle uniquement à notre API, jamais à Merkl.
- Les filtres sont des query params (`?chain=&protocol=&status=`), nommés pareil partout. **L'URL est la source de vérité des filtres.**
- Réponse Merkl normalisée vers un format interne minimal (seulement les champs utilisés).
- Types TypeScript `strict`, pas de `any`.

## Composants
- Un seul composant par fichier, d'un seul tenant.
- Styles dans un `.module.css` à côté du composant. Pas de style inline.
- Valeurs de design (couleurs, espacements) en variables CSS.

## Naming
- Un nom dit ce que c'est ou ce que ça fait. Éviter `data`, `item`, `info`, `helper`, `util`.
- Même concept = même mot partout (`opportunity`, `chain`...), de l'API à l'UI.
- Booléens : `isLoading`, `hasError`. Handlers : `handleXxx` ; props callback : `onXxx`.
- Fichier = nom du composant exporté.

## UX / UI
- Chaque écran gère chargement, vide, erreur et succès. Liste vide : bouton de réinitialisation des filtres.
- Pas de saut de mise en page (skeletons). Retour visible à chaque action.
- Messages d'erreur humains. Accessibilité de base (balises sémantiques, clavier, focus visible).
- Cohérence avant originalité. Responsive. Animations discrètes, seulement si demandées.
- Toute donnée affichée indique de quand elle date (ex. « Mis à jour il y a 2 min »), avec la date exacte au survol. Si la donnée est périmée car Merkl est indisponible, le dire clairement.

## Cache
- Côté API : cache mémoire avec TTL (constante nommée), dédoublonnage des requêtes en vol, clé incluant tous les paramètres (ordre normalisé), servir la donnée périmée si Merkl est indisponible.
- Côté front : pas de duplication des données serveur dans un état local ; si une lib de cache est utilisée, définir `staleTime` et hydrater depuis le SSR.
- Avant tout fetch : où est la donnée cachée, et quand devient-elle périmée ? Signaler l'impact cache de chaque modification.
- Fraîcheur visible : l'API renvoie la date de récupération de la donnée chez Merkl (`fetchedAt`, ISO 8601) avec chaque réponse, y compris quand elle sert une donnée périmée du cache. Cette date vient du moment où Merkl a été appelé, pas de la date de la requête.

## Workflow
- Tâche non triviale : plan court d'abord. Étapes : API liste → page liste → filtres → détail → cache → finitions.
- Avant de conclure : `pnpm typecheck` + `pnpm lint`, et dire ce qui a été vérifié.
- Expliquer brièvement ce qui change et pourquoi.