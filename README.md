# Bibliothèque LearnyLib

Version 2410161134

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

### `components`

Composants côté client réutilisables basés sur la bibliothèque Material-UI.

### `dto`

Interfaces TypeScript définissant le format des Data Transfer Objects.

### `hooks`

Hooks côté client.

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

### `translations`

Fichiers de traduction des textes de la librairie.

Le système de traduction est indépendant de next-intl.

### `types`

Types et interfaces TypeScript utilisés dans la bibliothèque.

### `utils`

Utilitaires divers.

### `validation`

Fonctions de validation des données. Utilise la bibliothèque Zod.
