Feature: Naviguer dans le site
  ID-28 : 	En tant que developer, je dois pouvoir à partir de n'importe quelle page, accéder aux pages "Projets",
  "Backlog", "Kanban", "Planning", "Releases", "Tests" afin de naviguer sur le site.
  Background: Connexion
    Given l'utilisateur est identifié en tant que developer
  Scenario: Arrivée sur le site
    Given l'utilisateur ne s'est jamais connecté sur le site
    When il va sur l'url du site
    Then il est redirigé sur la page /projects
  Scenario: Navigation sans projet
    Given l'utilisateur n'a pas sélectionné de projet
    When il cliques sur "Backlog" ou "Kanban"
    Then il reste sur la page /projects
    And un message affiche qu'il soit sélectionner un projet
  Scenario: Navigation depuis un projet vers le Backlog
    Given l'utilisateur a sélectionné un projet
    When il cliques sur "Backlog"
    Then il arrive sur la page /backlog du projet en question
  Scenario: Navigation depuis un projet vers le Kanban
    Given l'utilisateur a sélectionné un projet
    When il cliques sur "Kanban"
    Then il arrive sur la page /kanban du projet en question
  Scenario: Navigation dans les fonctionnalités non-implémentées
    Given l'utilisateur a sélectionné un projet
    When il cliques sur "Planning", "Releases" ou "Tests"
    Then il reste sur la page /projects
    And un message affiche que ces fonctionnalités ne sont pas encore disponibles

