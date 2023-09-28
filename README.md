# Tableau de contacts aHRtemis

Ce projet est une application de tableau de contacts avec des opérations de base (GET, POST, PUT et DELETE) pour gérer les contacts. Il se compose de trois parties principales : le backend, le frontend et la documentation Swagger.

## Structure du Projet

Le projet est organisé en trois dossiers principaux :

- `back`: Le backend de l'application, développé avec Express.js. Il gère la logique métier et l'API pour la gestion des contacts.

- `front`: Le frontend de l'application, développé en React avec TypeScript et mUI. Il fournit une interface utilisateur pour interagir avec les contacts.

- `swagger`: La documentation Swagger pour l'API du backend. Elle décrit en détail les endpoints de l'API, les modèles de données et comment les utiliser.

## Configuration et Installation

Pour configurer et exécuter le projet, il suffit de lancer le docker-compose avec la commande suivante :

```docker-compose up --build```

### Backend (Express.js)

L'API REST est accessible sur [http://localhost:4000](http://localhost:4000)

### Frontend (React avec TypeScript)

La site web est accessible sur [http://localhost:8000](http://localhost:8000)

### Documentation Swagger

La documentation Swagger est accessible sur [http://localhost:3001](http://localhost:3001)

## Utilisation

Une fois le backend et le frontend en cours d'exécution, vous pouvez accéder à l'interface utilisateur du frontend pour afficher, ajouter, mettre à jour et supprimer des contacts.

La documentation Swagger fournit des informations détaillées sur les endpoints de l'API backend et comment les utiliser.

## Licence

Ce projet est sous licence [MIT](LICENSE).
