Feature: Consulter les us d'un projet dans le backlog et dans un sprint
  ID-09 : En tant que developer, je dois pouvoir consulter les sprints ainsi que le backlog restant avec
  les US qui les composent afin de sélectionner une US.
  Background: Connexion
    Given l'utilisateur est identifié en tant que developer
  Scenario: Consultation des us dans le backlog
    Given une us a été ajoutée dans le backlog d'un projet
    When l'utilisateur est sur la page "Backlog" du projet
    Then il peut consulter l'ensemble les us (id, nom, etc..)
  Scenario: Consultation des us dans un sprint
    Given une us a été ajoutée dans un sprint d'un projet
    When l'utilisateur est sur la page "Backlog" du projet
    Then il peut consulter l'ensemble les us (id, nom, etc..)
