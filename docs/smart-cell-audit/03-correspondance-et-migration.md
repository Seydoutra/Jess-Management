# Correspondance et stratégie d’intégration

| Composant observé | Fonction actuelle | Relations | Cible JESS CARE 360 | Décision | Données / API / permissions | Migration et tests |
|---|---|---|---|---|---|---|
| profiles | Compte et rôle | department, tenant | User | Étendre | Ajouter rôles contextuels, MFA, expiration | Conserver UUID ; tests de visibilité |
| departments | Regroupement simple | profiles | Team | Renommer | Pas une cellule | Migration 1:1, test rattachement |
| organizations/workspaces | Isolation tenant | memberships | Organization/Site | Fusionner après audit | Clarifier source d’autorité | Backfill contrôlé, tests RLS |
| projects | Pilotage projet | client, membres | Project/Program/Campaign | Scinder | Ajouter type, sponsor, risques | Migration typée, non-régression tâches |
| tasks/assignees | Travail collaboratif | projet, profils | Task/Dependency | Étendre | Multi-cellules, preuve, validation | Préserver IDs, tests statut/dépendance |
| clients | Relation commerciale | projets, factures | Partner/Donor (jamais Beneficiary) | Scinder | Aucune conversion automatique | Reclassification humaine |
| invoices/payments | Facturation | client, projet | SupplierInvoice/IssuedInvoice/Receipt | Scinder | Séparation des responsabilités | Numéros conservés, tests annulation |
| purchase_requests | Demande simple | profils | PurchaseRequest/Approval | Étendre | Seuils et étapes | Tests rejet, modification et audit |
| suppliers/services | Fournisseurs | catalogue | Supplier/Capability/Review | Étendre | Notation par catégorie | Tests pondérations = 100 % |
| campaigns | Envoi SMS/e-mail | destinataires | Campaign + EditorialItem | Adapter | Consentement et anonymisation | Ne pas migrer destinataires sans base légale |
| activity_logs | Audit | profil/entité | AuditEvent | Conserver | Append-only, accès restreint | Test immutabilité/export |
| user_access_controls | Limites utilisateur | profil | Role/Permission/Scope | Adapter | RBAC + ABAC, refus prioritaire | Tests par rôle et contexte |
| Cellules | Absent | — | OrganizationalCell et liaisons | Créer provisoirement | Interfaces seulement jusqu’à audit Smart Cell | Interdire boucle, tester archivage/historique |

## Stratégie

1. Geler un export de schéma et sauvegarder avant toute transformation.
2. Obtenir la véritable référence Smart Cell Management ; comparer identifiants, cardinalités, contraintes et règles de succession.
3. Introduire une couche `SmartCellAdapter` sans dupliquer les concepts.
4. Ajouter les domaines JESS dans des schémas séparés (`identity`, `care`, `operations`, `finance`, `audit`).
5. Migrer par vagues idempotentes : identité → organisation → projets/tâches → finance/fournisseurs → nouveaux domaines.
6. Exécuter montée, contrôle de cardinalité, non-régression et retour arrière sur une copie anonymisée.
7. Ne jamais importer de données personnelles SmartSell ou réelles dans la démo.

## Cellules provisoires

Une cellule est une unité organisationnelle, pas une équipe, un programme, une campagne ni un rôle. Elle possède une parenté acyclique, des adhésions datées, des rôles locaux, un périmètre, une cellule pilote et des collaborations explicites. L’archivage conserve toutes les relations. Ces règles sont provisoires jusqu’à confrontation avec Smart Cell Management.
