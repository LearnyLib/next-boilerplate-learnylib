# Bibliothèque LearnyLib

Version 2406031802

## Description

La bibliothèque LearnyLib est une dépendance du boilerplate NextJS de LearnyLib.

Elle fournit un ensemble de services, de templates et de composants qui encadrent le développement de l’application Next. Elle offre un système d’authentification complet basé sur la Core API de LearnyLib.

Pour l'utiliser, il faut encapsuler l'application dans le composant LearnyLibApp au niveau du Layout.

## Structure des fichiers

### `LearnyLibApp.tsx`

Composant côté serveur qui encapsule toute l'application au niveau du Layout.

Il intègre des providers tels que next-intl, MUI, Zustant, React Query pour offrir un large éventail de fonctionnalités destinées aux composants rendus côté client.

Il prend en paramètre la configuration de l'application et de l'internationalisation.

### `actions`

Actions côté serveur (server actions) pour la gestion des soumissions de formulaire ou des actions déclenchées côté client.

### `auth`

Fonctions côté serveur pour la gestion de l'authentification.

Le système d'authentification de la librairie fait appel à la Core API de LearnyLib. La Core API centralise la gestion des utilisateurs et l'authentification SSO (Single Sign-On) pour l'ensemble des applications LearnyLib.

Le système d'authentification suit le protocole standard OAuth 2.0. Il utilise des jeux d'access/refresh tokens JWT (JSON Web Tokens) enregistrés dans des cookies HttpOnly pour assurer la sécurité et la gestion des sessions

#### Fonctions utilisables dans l'application :

- getAuthUser : récupère les données de l'utilisateur authentifié côté serveur

### `components`

Composants côté client réutilisables basés sur la bibliothèque Material-UI.

### `dto`

Interfaces TypeScript définissant le format des Data Transfer Objects.

### `hooks`

Hooks côté client.

#### Fonctions utilisables dans l'application :

- useAuthUser : récupère les données de l'utilisateur authentifié côté client
- useToast : affiche un message toast en bas de l'écran

### `images`

Images utilisées par les templates.

### `models`

Interfaces TypeScript définissant les modèles de données provenant de la Core API.

### `services`

Fonctions côté serveur uniquement (server-only).

Les services intéragissent avec les cookies et la Core API.

### `store`

State management côté client. Utilise les stores Zustand.

### `styles`

Feuilles de style et modules CSS.

### `theme`

Configuration du thème MUI.

### `translation`

Fichiers de traduction des textes de la librairie.

Le système de traduction est indépendant de next-intl.

### `types`

Types et interfaces TypeScript utilisés dans la bibliothèque.

### `utils`

Utilitaires divers.

### `validation`

Fonctions de validation des données. Utilise la bibliothèque Zod.
