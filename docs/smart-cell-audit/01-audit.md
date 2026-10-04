# Audit préalable de la référence fournie

## Conclusion

**Référence Smart Cell Management manquante.** Le dossier reçu est `smartsell-invoice-hotfix`, application **Smartsell Management** pour agence commerciale et communication. Aucun fichier, table, type ou service ne décrit une cellule organisationnelle, une hiérarchie de cellules ou une adhésion à une cellule. Il serait dangereux d’inventer la structure de Smart Cell Management et de la présenter comme auditée.

Le dépôt source a été analysé en lecture seule. Il présentait déjà des modifications non validées (`src/ProductionAppV2.tsx`, repository, modèles, configuration Supabase, distribution et migrations v58/v59). La démo JESS CARE 360 a donc été créée séparément ; aucune donnée ni aucun fichier source n’a été modifié.

## Inventaire et stack

- Vite 7, React 19, TypeScript 5.8, Tailwind 3, React Router 7.
- Supabase JS 2.57, PostgreSQL/Supabase, Edge Functions Deno.
- React Query, React Hook Form, Zod, Recharts, Framer Motion, jsPDF.
- Application principale très concentrée : `ProductionAppV2.tsx` dépasse 3 400 lignes.
- 59 migrations/évolutions SQL numérotées de façon non strictement linéaire ; `setup.sql` et `production_upgrade.sql` servent de points d’entrée.
- Tests Vitest ciblés, tests navigateur Playwright manuels et un test d’intégration PGlite.

## Modèle existant observé

Environ 90 tables couvrent : profils et départements, organisations/workspaces multi-tenant, clients/prospects, projets/tâches, éditorial, devis/factures/paiements, dépenses, fournisseurs, achats, équipements, communications, portails clients, support, audit, automatisations et intégrations sociales.

Relations structurantes :

- `profiles → departments` et contexte tenant par `tenant_owner_id` / organisations / workspaces ;
- `clients → projects → tasks` avec tables de liaison `project_members` et `task_assignees` ;
- `quotes → quote_items`, conversion vers `invoices → invoice_items → payments` ;
- `projects → expenses`, `purchase_requests`, `documents`, `contracts` ;
- `profiles → user_access_controls`, sessions, notifications et activité ;
- `campaigns → recipients → communication_jobs/logs` ;
- `suppliers → service_catalog`.

## Rôles et permissions

Le code combine rôles globaux (`SUPER_ADMIN`, `ADMIN`, `COMMUNITY_MANAGER`, `COLLABORATEUR`, `CLIENT`) et contrôles granulaires (`allowed_modules`, `denied_permissions`, plafonds d’actions). Des fonctions SQL telles que `has_role`, `is_admin`, `can_access_workspace`, `current_tenant_owner_id` et `portal_*_allowed` sont réutilisables conceptuellement. Les politiques RLS ne sont toutefois pas uniformes dans toutes les migrations et plusieurs fonctions Edge ont `verify_jwt=false`; chacune doit vérifier explicitement l’identité dans son corps avant réutilisation.

## Workflows réutilisables

1. Projet → membres → tâches → rappels → notifications.
2. Devis → facture → paiement avec numéros uniques et fonctions transactionnelles.
3. Demande d’achat → validation (à étendre fortement).
4. Affectation multi-utilisateur et notification.
5. Validation créative avec retour client.
6. Journal `activity_logs` et sessions.
7. Portail à accès limité et signed URLs.
8. Fournisseurs, catalogue de services et documents.

## Limites et risques

- Aucun bénéficiaire, consentement, parcours de soins, incident de protection, cellule ni adhésion temporelle.
- Schéma cumulatif vaste, parfois redondant (`organizations`, `workspaces`, tenants) ; ordre de migration à normaliser.
- Monolithe front-end difficile à tester et à faire évoluer.
- Permissions hybrides rôle/tableau de chaînes ; pas d’ABAC complet par bénéficiaire, programme et confidentialité.
- Pas de séparation démontrée identité / médical / protection / finance.
- Fonctions externes et communications nécessitent une revue d’authentification, de consentement et de secrets.
- Les tests existants ne couvrent pas systématiquement RLS, restauration, migration descendante ou permissions sensibles.

## Fonctions conservables

Modèles projet/tâche, tables de liaison, notifications, audit, numérotation documentaire, devis/factures/paiements, fournisseur/catalogue, validations créatives, signed URLs, rappels, contrôle tenant et conventions TypeScript strictes. Tout est à reprendre via adaptateurs, jamais par import direct de données personnelles.
