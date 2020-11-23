Feature: Consulter la liste des projets
  ID-01 : 	En tant que déveloper, je dois pouvoir consulter la liste des projets auxquels j'appartiens
  (nom et date de création) afin d'accéder à un projet en particulier.
  Background: Connexion
    Given l'utilisateur est identifié en tant que developer
  Scenario: Consultation des projets
    Given des projets on été ajouté en BD
    When l'utilisateur est sur la page "Projets"
    Then il peut consulter l'ensemble des projets

