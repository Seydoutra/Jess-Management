# JESS CARE 360 — démonstration

Application Next.js en français utilisant uniquement des données synthétiques. Elle couvre le tableau de bord, les bénéficiaires, les rendez-vous et relances, les réunions assistées, les tâches, les cellules, la campagne Octobre Rose, les achats/fournisseurs, Dubréka et les rapports.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`. Aucun compte ni service externe n’est nécessaire. Les actions restent locales à la session et les envois externes sont simulés.

## Vérifications

```bash
npm test
npm run build
```

## Sécurité

Cette démo n’est pas destinée à recevoir des données réelles. Une mise en production exige Supabase/PostgreSQL, RLS, MFA, chiffrement, politiques de conservation, audit de sécurité et validation juridique locale. Les modules médicaux, biométriques et d’enregistrement restent désactivés tant que leur gouvernance n’est pas validée.

Voir `docs/smart-cell-audit/` pour l’audit de la référence fournie, la correspondance et la stratégie de migration.
