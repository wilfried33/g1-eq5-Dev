Feature: Créer un atelier
  En tant que maintainer, je dois pouvoir ajouter une US en entrant son nom et sa description afin de l'ajouter au
  backlog Je souhaite également qu'un id unique soit généré automatiquement avec comme préfix la key du projet.
  Background: Connexion
    Given l'utilisateur est identifié en tant que maintainer
    And l'utilisateur se trouve sur la page "Backlog" d'un projet
  Scenario: Ajout d'une US
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When l'utilisateur rempli les champs nom et description
    And il clique sur "Valider"
    Then l'utilisateur est redirigé vers la page "Backlog"
    And l'US est ajoutée au backlog
  Scenario: Annulation de l'ajout d'une US
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When il clique sur "Annuler"
    Then l'utilisateur est redirigé vers la page backlog du projet
    And l'US n'est pas ajoutée à la liste des US
  Scenario: Ajout d'un atelier incomplet
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When l'utilisateur remplit uniquement le champs nom
    And il clique sur "Valider"
    Then le message "Champs manquant" s'affiche

