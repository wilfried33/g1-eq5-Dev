Feature: Supprimer et modifier un sprint
  ID-07 : En tant que maintainer, je dois pouvoir modifier les champs d'un sprint (#06) ou le supprimer,
  si celui ci ne contient pas d'US, en cliquant sur le bouton "modifier" (resp. "supprimer") afin de mettre à jour un sprint.
  Background: Connexion
    Given l'utilisateur est identifié en tant qu'owner
    And l'utilisateur est sur la page "Backlog" d'un projet ayant des US
  Scenario: Supprimer un sprint
    Given aucune userStory n'est liée à ce sprint
    When l'utilisateur clique sur le bouton "supprimer"
    Then le sprint est supprimée du backlog
    And l'utilisateur est reste sur la page backlog
  Scenario: Modifier un sprint
    And l'utilisateur a cliqué sur "modifier"
    When l'utilisateur modifie un champ
    And il clique sur "Valider"
    Then l'utilisateur est reste sur la page backlog
    And le sprint est modifier dans le backlog
  Scenario: Annuler la modification d'un sprint
    And l'utilisateur a cliqué sur "modifier"
    When il clique sur "Annuler"
    Then le sprint est modifier dans le backlog
  Scenario: Modifier un sprint avec des données incomplètes
    And l'utilisateur a cliqué sur "modifier"
    When l'utilisateur vide le champs nom
    And il clique sur "Valider"
    Then le message "Paramètre manquant ou incompatible" s'affiche
    And le sprint n'est pas modifié
  Scenario: Supprimer un sprint ayant des userStorys
    Given une userStory est liée à ce sprint
    When l'utilisateur clique sur le bouton "supprimer"
    Then le sprint n'est pas supprimée du backlog
    And le message "Le sprint n'a pas été supprimé" s'affiche
