Feature: Modifier un DOD
  ID33 : En tant que maintainer, je dois pouvoir modifier une checklist DOD afin de mettre à jour les étapes nécessaire à réaliser une task.

  Background: Connexion
    Given l'utilisateur est connecté en tant que maintainer
    And l'utilisateur est sur la page "Kanban" d'un projet
    And un DOD a été ajoutée
    And l'utilisateur clique sur le bouton "Definition of Done"

  Scenario: Modifier un DOD
    Given l'utilisateur a cliqué sur le bouton "Modifier"
    And il modifie le champs name et rules
    When il clique sur le bouton "valider"
    Then le dod est ajouté à la liste des dods
  Scenario: Annuler la modification d'une tâche
    Given l'utilisateur a cliqué sur le bouton "Modifier"
    When il clique sur le bouton "annuler"
    Then aucun dod n'est ajouté à la liste des dods




