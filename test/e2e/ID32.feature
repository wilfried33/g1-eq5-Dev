Feature: Ajouter un développeur
  En tant que maintainer, je dois pouvoir créer une checklist DOD composée d'un nom et d'une liste de consignes
  afin de les attribuer aux task.
  Background: Connexion
    Given l'utilisateur est identifié en tant que maintainer
    And l'utilisateur est sur la page "Task" d'un projet ayant des tâches
    And il clique sur le bouton "Définition of Done"
  Scenario: Ajout d'un DOD
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When l'utilisateur rempli le champs nom
    And l'utilisateur rempli le champs rules avec une règle par ligne
    And il clique sur "Valider"
    Then l'utilisateur reste sur la page DOD
    And le Dod est ajouté à la liste des dods existants
  Scenario: Annulation de l'ajout d'un DOD
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When il clique sur "Annuler"
    Then l'utilisateur reste sur la page DOD
    And la liste des dods existants est vide

