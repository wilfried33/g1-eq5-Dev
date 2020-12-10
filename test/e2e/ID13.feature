Feature: Déplacer une tâche dans un status
  ID-13 : En tant que maintainer, je dois pouvoir glisser déposer une task dans un kanban afin de modifier l'état d'une task.
  Le kanban est composé de colonnes "todo", "on going" et "done".
  Il y a un kanban par sprint et lorsqu'un sprint se termine, le kanban du sprint suivant affiche les tasks non terminées du précédent
  Background: Connexion
    Given l'utilisateur est identifié en tant qu'owner
    And l'utilisateur est sur la page "Task" d'un projet ayant des tâches
  Scenario: Déplacer une tâche de "todo" vers "on going"
    When l'utilisateur clique sur une tâche dans "todo"
    And l'utilisateur drag la tâche sur "on going"
    And l'utilisateur drop la tâche sur "on going"
    Then la tâche est déplacer de "todo" vers "on going"
  Scenario: Déplacer une tâche de "todo" vers "done"
    When l'utilisateur clique sur une tâche dans "todo"
    And l'utilisateur drag la tâche sur "done"
    And l'utilisateur drop la tâche sur "done"
    Then la tâche est déplacer de "todo" vers "done"
  Scenario: Déplacer une tâche de "on going" vers "done"
    When l'utilisateur clique sur une tâche dans "on going"
    And l'utilisateur drag la tâche sur "done"
    And l'utilisateur drop la tâche sur "done"
    Then la tâche est déplacer de "on going" vers "done"
  Scenario: Déplacer une tâche de "on going" vers "todo"
    When l'utilisateur clique sur une tâche dans "on going"
    And l'utilisateur drag la tâche sur "todo"
    And l'utilisateur drop la tâche sur "todo"
    Then la tâche est déplacer de "on going" vers "todo"
  Scenario: Déplacer une tâche de "done" vers "on going"
    When l'utilisateur clique sur une tâche dans "done"
    And l'utilisateur drag la tâche sur "on going"
    And l'utilisateur drop la tâche sur "on going"
    Then la tâche est déplacer de "done" vers "on going"
  Scenario: Déplacer une tâche de "done" vers "todo"
    When l'utilisateur clique sur une tâche dans "done"
    And l'utilisateur drag la tâche sur "todo"
    And l'utilisateur drop la tâche sur "todo"
    Then la tâche est déplacer de "done" vers "todo"
