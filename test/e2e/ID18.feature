Feature: Ajouter un développeur
  En tant que maintainer, je dois pouvoir créer un développeur afin de lui attribuer des tasks.
  Background: Connexion
    Given l'utilisateur est identifié en tant que maintainer
    And l'utilisateur est sur la page "Task" d'un projet ayant des tâches
  Scenario: Ajout d'un développeur
    Given l'utilisateur a cliqué sur le bouton "Ajouter Développeur"
    When l'utilisateur rempli les champs nom
    And il clique sur "Valider"
    Then l'utilisateur est redirigé vers la page "Task"
  Scenario: Annulation de l'ajout d'un atelier
    Given l'utilisateur a cliqué sur le bouton "Ajouter Développeur"
    When il clique sur "Annuler"
    Then l'utilisateur est redirigé vers la page "Task"
  Scenario: Ajout d'un atelier incomplet
    Given l'utilisateur a cliqué sur le bouton "Ajouter Développeur"
    When il clique sur "Valider"
    Then le message "Champ manquant" s'affiche
