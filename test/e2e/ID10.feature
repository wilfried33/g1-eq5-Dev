Feature: Consulter une user story
  ID-10 : En tant que developer, je dois pouvoir consulter une US (#03) en cliquant sur cette dernière
  dans une liste d'US afin d'accéder à toute les données de l'US.
  Background: Connexion
    Given l'utilisateur est identifié en tant que developer
  Scenario: Consultation d'un us depuis le backlog
    Given une us a été ajoutée dans le backlog d'un projet
    And l'utilisateur est sur la page "Backlog" du projet
    When clique sur l'us
    Then il peut consulter l'ensemble des champs de l'us
  Scenario: Consultation d'un us depuis un sprint
    Given une us a été ajoutée dans le sprint d'un projet
    And l'utilisateur est sur la page "Backlog" du projet
    When clique sur l'us dans le sprint en question
    Then il peut consulter l'ensemble des champs de l'us



