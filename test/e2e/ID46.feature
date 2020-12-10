Feature: Consulter la vélocité d'un sprint
  ID-46 : 	En tant que maintainer, je dois pouvoir afficher la vélocité correspondant aux tâches planifiées et
  aux tâches réalisées pour chaque sprint. Si un sprint a déjà été terminé et que la vélocité planifiée pour un
  sprint suivant est vraiment plus grande ou plus petite que pour le(s) sprint(s) terminé(s), je dois en être averti.
  Cela afin de pouvoir planifier le travail de développement de manière réaliste.
  Background: Connexion
    Given l'utilisateur est identifié en tant que maintainer
    And un sprint a été ajouté a un projet existant
    And une US a été ajoutée à ce sprint
  Scenario: Consultation de la vélocité
    Given des tâches ont étés liée à l'US
    When l'utilisateur est sur la page "Backlog"
    Then il peut consulter la vélocité du sprint via une indicateur qui indique le nombre de task réalisées/prévues
  Scenario: Message de prévention
    Given un autre sprint futur a été ajouté
    And une US a été ajouté a cet autre sprint
    And beaucoup de tasks on été ajoutées à cette US
    When l'utilisateur est sur la page "Backlog"
    Then un message le prévient que ce second sprint est trop chargé

