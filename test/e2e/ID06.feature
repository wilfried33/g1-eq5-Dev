Feature: Créer un Sprint
  En tant que maintainer, je dois pouvoir créer un sprint en remplissant 
  les champs nom, description, date de début et date de fin dans un formulaire afin de l'ajouter à la liste des sprints.
  Background: Connexion
    Given l'utilisateur est identifié en tant que maintainer
    And l'utilisateur se trouve sur la page "Backlog" d'un projet
  Scenario: Ajout d'un Sprint
    Given l'utilisateur a cliqué sur le bouton "Ajouter un sprint"
    When l'utilisateur rempli les champs nom, début et fin
    And il clique sur "Valider"
    Then le sprint est ajoutée au backlog
  Scenario: Annulation de l'ajout d'un sprint
    Given l'utilisateur a cliqué sur le bouton "Ajouter un sprint"
    When il clique sur "Annuler"
    Then le sprint n'est pas ajoutée au backlog
  Scenario: Ajout d'un sprint incomplet
    Given l'utilisateur a cliqué sur le bouton "Ajouter un sprint"
    When l'utilisateur remplit uniquement le champs nom
    And il clique sur "Valider"
    Then le message "Paramètre manquant ou imcompatible" s'affiche