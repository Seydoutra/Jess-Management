# Vision, sécurité et MVP

## Vision et parcours

JESS CARE 360 relie bénéficiaires, prochaines actions, équipes, ressources et impact autour de la boucle **Identifier → planifier → agir → documenter → alerter → mesurer → améliorer**. Les parcours prioritaires sont : créer un dossier fictif et sa prochaine action ; planifier puis traiter un rendez-vous manqué ; transformer une décision validée en tâche ; piloter une campagne ; comparer des offres sans attribution automatique ; suivre les risques de Dubréka.

## Rôles et règle d’accès

Direction : agrégats et pilotage autorisé. Responsable médical : données médicales affectées. Responsable de cas : dossiers affectés et suivi social. Finance : budgets, pièces et paiements sans notes médicales. Communication : campagnes et contenus consentis sans dossiers médicaux. Bénévole : événements et tâches affectées. Le refus explicite prévaut toujours ; programme, affectation, cellule, niveau de confidentialité et durée complètent le rôle.

## Architecture cible

- Next.js App Router, TypeScript strict, composants accessibles et repository local/Supabase/API.
- PostgreSQL avec RLS, stockage privé et URLs signées ; audit append-only.
- Domaines séparés : identité, care, opérations, finance, documents, audit.
- Adaptateurs indépendants pour Smart Cell, notifications et fournisseurs IA.
- PWA : cache de coque et brouillons non médicaux, jamais de dossier médical complet par défaut.

## Sécurité

MFA privilégié, sessions courtes et révocables, validation serveur, minimisation, chiffrement, CSP, rate limiting, secrets côté serveur, seuil d’agrégation, exports justifiés et journalisés. L’accès exceptionnel exige motif, durée, alerte et revue. Aucun diagnostic, aucune prescription, aucune attribution fournisseur ni décision IA automatique. Audio, transcription et biométrie vocale restent désactivés en production sans analyse juridique et consentement révocable.

## Plan MVP

1. Démo locale : shell, rôles, tableau de bord, bénéficiaires fictifs, rendez-vous/relance, tâches, réunion IA simulée, cellules provisoires, Octobre Rose, fournisseurs, Dubréka et rapports.
2. Pilote : auth réelle, schéma sécurisé, RLS, stockage, audit, consentements et imports contrôlés.
3. Validation : tests permissions, accessibilité, performance réseau lent, sauvegarde/restauration, juridique Guinée et sécurité indépendante.
4. Déploiement : migration versionnée, formation, supervision respectueuse de la vie privée et gouvernance des accès.

La démo actuelle couvre l’étape 1 et ne doit recevoir aucune donnée réelle.
