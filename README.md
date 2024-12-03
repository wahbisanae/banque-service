# Banque Service Application

Ce projet est une application de gestion de comptes bancaires et de transactions basée sur **Spring Boot** avec une intégration GraphQL. Il permet de gérer les comptes et les transactions bancaires à travers des opérations CRUD exposées via une API GraphQL.

## Fonctionnalités

### Gestion des Comptes
- Récupérer tous les comptes bancaires.
- Rechercher un compte par son identifiant.
- Ajouter un nouveau compte bancaire.
- Supprimer un compte bancaire.
- Obtenir des statistiques globales sur les comptes (nombre total, somme des soldes, moyenne des soldes).
- Filtrer les comptes par type (COURANT ou EPARGNE).

### Gestion des Transactions
- Ajouter une transaction à un compte existant (dépôt ou retrait).
- Récupérer toutes les transactions.
- Obtenir les transactions associées à un compte spécifique.
- Obtenir des statistiques sur les transactions (nombre total, sommes des dépôts et des retraits).

## Architecture du Projet

### Modules principaux
1. **Entities**  
   - `Compte` : Représente un compte bancaire.
   - `Transaction` : Représente une transaction (dépôt ou retrait).
   - Énumérations :
     - `TypeCompte` : Types de comptes disponibles (COURANT, EPARGNE).
     - `TypeTransaction` : Types de transactions (DEPOT, RETRAIT).

2. **Repositories**  
   - `CompteRepository` : Interface pour accéder et manipuler les données des comptes.
   - `TransactionRepository` : Interface pour accéder et manipuler les données des transactions.

3. **Controllers**  
   - `CompteControllerGraphQL` : Contrôleur pour gérer les comptes via GraphQL.
   - `TransactionControllerGraphQL` : Contrôleur pour gérer les transactions via GraphQL.

4. **DTOs**  
   - `TransactionRequest` : Requête de création de transaction avec des validations.

5. **Exception Handling**  
   - `GraphQLExceptionHandler` : Gestionnaire d'erreurs personnalisé pour les exceptions GraphQL.

6. **Bootstrap**  
   - Classe principale `BanqueServiceApplication` : Initialise quelques données par défaut via un `CommandLineRunner`.

### Technologies utilisées
- **Spring Boot** : Cadre principal de l'application.
- **GraphQL** : API pour exposer les données et les opérations.
- **Jakarta Validation** : Validation des données des requêtes.
- **Lombok** : Génération automatique de code (Getters, Setters, etc.).
- **H2 Database** : Base de données embarquée pour l'exécution locale.

## vid2o démo 


https://github.com/user-attachments/assets/7ebdfc08-2063-4cb6-b992-2cfeb5d87e9f

