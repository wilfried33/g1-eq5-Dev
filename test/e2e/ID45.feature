Feature: Consulter le Kanban
  ID-21 : 	En tant que developer, je dois pouvoir afficher la liste des tâches afin de voir le travail à faire.
  Background: Connexion
    Given l'utilisateur est identifié en tant que developer
  Scenario: Consultation des projets
    Given des tâches ont étés ajouté à un projet en BD
    When l'utilisateur est sur la page "Kanban"
    Then il peut consulter l'ensemble des tâches dans les colonnes "todo", "on going" et "done"
    And il peut visualiser l'id de la tâche ainsi que son nom

