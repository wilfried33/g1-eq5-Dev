Feature: Créer une tâche
  ID-11 : En tant que maintainer, je dois pouvoir ajouter une task en remplissant les champs nom, description et indiquer l'US liée dans un formulaire afin de l'ajouter au backlog. Je souhaite également qu'un id unique soit généré automatiquement.
  Background: Connexion
    Given l'utilisateur est connecté en tant que maintainer
    And l'utilisateur a choisi un projet sur la page "Projets"
    And l'utilisateur est sur la page "Kanban"
  Scenario: Ajout d'une tâche
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When l'utilisateur a rempli les champs nom, description
    And il a choisi l'US liée parmi un menu déroulant
    And il a cliqué sur "Valider"
    Then l'utilisateur est redirigé vers la page "Kanban"
    And la taĉhe est ajoutée à la liste des tâches de ce projet.
  Scenario: Annulation de l'ajout d'une tâche
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When il clique sur "Annuler"
    Then l'utilisateur est redirigé vers la page "Kanban"
    And la tâche n'est pas ajoutée à la liste des tâches de ce projet
  Scenario: Ajout d'une tâche incomplète
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When l'utilisateur a rempli le champ description
    And il a choisi l'US liée parmi un menu déroulant
    And il a cliqué sur "Valider"
    Then le message "Champ manquant" s'affiche