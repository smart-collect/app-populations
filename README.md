# Smart-Collect - App Populations

Application web mobile-first destinée aux citoyens de Douala. Elle permet de se connecter, créer un compte, signaler des dépôts sauvages et consulter les services Smart-Collect.

## Stack

- Next.js 14 avec App Router
- TypeScript strict
- Tailwind CSS 3
- shadcn/ui et Radix UI
- Zustand pour l'authentification
- TanStack Query pour les requêtes
- React Hook Form + Zod pour les formulaires
- Vitest + Testing Library pour les tests

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

L'application démarre sur `http://localhost:3000`.

## Variables d'environnement

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Remplacer l'URL par celle du backend de l'équipe 1 si elle est différente.

## Fonctionnalités réalisées - Phases 1 et 2

- Structure Next.js mobile-first
- Layout global en français
- Page d'accueil non connectée
- Layout connecté avec header et bottom navigation
- Pages connexion et inscription
- Validation des formulaires avec Zod
- Gestion du token avec localStorage et cookie côté client
- Store Zustand pour l'utilisateur connecté
- Client API centralisé avec injection du token
- Middleware de protection des routes connectées

## Routes principales

- `/` : accueil non connecté
- `/login` : connexion
- `/register` : inscription
- `/home` : accueil connecté
- `/map` : placeholder phase 3
- `/reports` : placeholder phase 5
- `/reports/new` : placeholder phase 4
- `/profile` : profil simple et déconnexion
- `/notifications` : placeholder phase 6

## Avant livraison

Ne pas inclure ces dossiers dans l'archive :

- `node_modules`
- `.next`
- `.git`

Ces dossiers sont générés automatiquement et rendent le rendu trop lourd.
