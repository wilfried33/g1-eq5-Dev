Feature: Supprimer et modifier un US
  ID-03 : En tant que maintainer, je dois pouvoir supprimer une US ou modifier ses champs (présentés en #02) ainsi que
  la priorité et la difficulté si aucune task n'est lié à cet issue. Ceci afin de mettre à jour une US ou corriger des
  erreurs.
  Background: Connexion
    Given l'utilisateur est identifié en tant qu'owner
    And l'utilisateur est sur la page "Backlog" d'un projet ayant des US
  Scenario: Supprimer une US
    Given aucune task n'est liée à cette US
    When l'utilisateur clique sur le bouton "supprimer"
    Then l'user story est supprimée du backlog
  Scenario: Modifier une US
    Given aucune task n'est liée à cette US
    And l'utilisateur a cliqué sur "modifier"
    When l'utilisateur modifie un champ
    And il clique sur "Valider"
    Then l'utilisateur est reste sur la page backlog
    And l'US est toujours présente dans le backlog
  Scenario: Modifier une US avec des données incomplètes
    Given aucune task n'est liée à cette US
    And l'utilisateur a cliqué sur "modifier"
    When l'utilisateur vide le champs nom
    And il clique sur "Valider"
    Then le message "Champs manquant" s'affiche
    And l'us n'est pas modifiée
  Scenario: Supprimer une US ayant des tasks
    Given une task est liée à cette US
    When l'utilisateur clique sur le bouton "supprimer"
    Then l'user story n'est pas supprimée du backlog
    And le message "Cette user story ne peut être supprimée car elle possède des tasks" s'affiche
  Scenario: Modifier une US ayant des tasks
    Given aucune task n'est liée à cette US
    And l'utilisateur a cliqué sur "modifier"
    When l'utilisateur modifie un champ
    And il clique sur "Valider"
    Then l'user story n'est pas modifiée dans le backlog
    And le message "Cette user story ne peut être mdofiée car elle possède des tasks" s'affiche
