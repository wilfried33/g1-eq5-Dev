Feature: Modifier/Supprimer une tâche
  ID12 : En tant que maintainer, je dois pouvoir modifier une task ou la supprimer afin d'ajouter de nouveaux éléments
  à cette task, tant qu'aucun développeur n'y a été assigné. Les champs présents en #11 peuvent être modifiés ainsi
  que sa charge et les dépendances entre les tasks. Il est également possible d'attribuer la task à un developer.

  Background: Connexion
    Given l'utilisateur est connecté en tant que maintainer
    And l'utilisateur est sur la page "Kanban" d'un projet
    And une tâche a été ajoutée
  Scenario: Supprimer une tâche
    Given Aucun développeur n'a été assigné à la tâche
    When l'utilisateur clique sur "Supprimer"
    Then l'utilisateur reste sur la page "Kanban"
    And la tâche n'est plus dans le kanban
  Scenario: Supprimer une tâche ayant un développeur
    Given Un développeur n'a été assigné à la tâche
    When l'utilisateur clique sur "Supprimer"
    Then l'utilisateur reste sur la page "Kanban"
    And la tâche est toujours dans le kanban
    And un message d'erreur est affiché
  Scenario: Modifier une tâche
    Given Aucun développeur n'a été assigné à la tâche
    And l'utilisateur clique sur "Modifier"
    When l'utilisateur modifie des valeurs de la task
    And il clique sur le bouton "Valider"
    Then l'utilisateur reste sur la page "Kanban"
    And la tâche est mise à jour dans le Kanban
  Scenario: Annuler la modification d'une tâche
    Given Aucun développeur n'a été assigné à la tâche
    And l'utilisateur clique sur "Modifier"
    When il clique sur le bouton "Annuler"
    Then l'utilisateur reste sur la page "Kanban"
    And la tâche est inchangée
  Scenario: Modifier une tâche avec des données incomplètes
    Given Aucun développeur n'a été assigné à la tâche
    And l'utilisateur clique sur "Modifier"
    When l'utilisateur laisse le champs "nom" vide
    And il clique sur le bouton "Valider"
    Then l'utilisateur reste sur la page "Kanban"
    And un message d'erreur est affiché
    And la tâche est inchangée



