Feature: Déplacer une US dans un sprint
  ID-05 : En tant que maintainer je dois pouvoir glisser déposer une/des US dans un sprint existant afin de planifier cette/ces US(s).
  Background: Connexion
    Given l'utilisateur est identifié en tant qu'owner
    And l'utilisateur est sur la page "Backlog" d'un projet ayant des US
  Scenario: Déplacer une US du backlog vers un sprint
    When l'utilisateur clique sur une US dans le backlog
    And l'utilisateur drag l'US sur le sprint
    And l'utilisateur drop l'US sur le sprint 
    Then l'user story est déplacer du backlog vers le sprint
  Scenario: Déplacer une US d'un sprint vers un autre sprint
    When l'utilisateur clique sur une US dans un sprint
    And l'utilisateur drag l'US sur l'autre sprint
    And l'utilisateur drop l'US sur l'autre sprint 
    Then l'user story est déplacer du sprint vers l'autre sprint
  Scenario: Déplacer une US d'un sprint vers le backlog
    When l'utilisateur clique sur une US dans le sprint
    And l'utilisateur drag l'US sur le backlog
    And l'utilisateur drop l'US sur le backlog 
    Then l'user story est déplacer du sprint vers le backlog