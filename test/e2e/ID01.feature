Feature: Créer un atelier
  ID-01 : En tant que developer je dois pouvoir créer un projet en entrant dans un formulaire le nom du projet et
  une key qui sera utilisé comme préfixe des US (ex : XX pour XX-01). Je dois également pouvoir modifier le nom du projet
  si besoin. Je serai owner pour ce projet. Cela afin de pouvoir créer les US du projet.
  Background: Connexion
    Given l'utilisateur est identifié en tant qu'owner
    And l'utilisateur est sur la page "Projets"
  Scenario: Ajout d'un Projet
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When l'utilisateur rempli les champs nom et clé
    And il clique sur "Valider"
    Then l'utilisateur est redirigé vers la page "Projets"
    And le projet est ajouté à la liste des projets
  Scenario: Annulation de l'ajout d'un atelier
    Given l'utilisateur a cliqué sur le bouton "Ajouter"
    When il clique sur "Annuler"
    Then l'utilisateur est redirigé vers la page principale
    And le projet n'est pas ajouté à la liste des projets
  Scenario: Ajout d'un atelier incomplet
    Given l'utilisateur a cliqué sur le bouton "Créer un atelier"
    When l'utilisateur remplit uniquement le champs nom
    And il clique sur "Valider"
    Then le message "Veuillez renseigner ce champs" s'affiche près du champs manquant
  Scenario: Ajout d'un atelier ayant des données similaires
    Given l'utilisateur a cliqué sur le bouton "Créer un atelier"
    When l'utilisateur rempli les champs nom et clé
    And il clique sur "Valider"
    Then le message "Un projet contenant le même nom ou la même clé existe déjà" s'affiche
