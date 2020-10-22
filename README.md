# CdP g1-eq5

## User Stories

1- En tant que développeur, je dois pouvoir créer un projet en entrant dans un formulaire le nom et le tag des issues 
afin de pouvoir créer des issues. (ex : XX pour XX-14)

29- En tant que développeur, je dois pouvoir modifier le titre d'un projet et ajouter des items à la checklist "Definition of Done"
  
28- En tant que développeur, je dois pouvoir à partir de n'importe quelle page, accéder aux pages "Backlog", "Kanban",
 "Planning", "Releases", "Tests" afin de naviguer sur le site. 

### Issues

En tant que développeur, je dois pouvoir créer des types d'issue défini par son nom et par un modèle de checklist 
"Definition of Done" afin de les attribuer aux issues.

2- En tant que développeur, je dois pouvoir ajouter une issue en entrant les champs nom, description et en
 choisissant le type afin de l'ajouter au backlog. Un id est généré automatiquement.

3- En tant que développeur, je dois pouvoir modifier les champs présenté en #2 ainsi que la priorité et la difficulté
afin de mettre à jour une issue. Des boutons "Enregistrer" et "Annuler" en bas de la page permettrons d'enregistrer
 les modifications ou non.

4- En tant que développeur, je dois pouvoir supprimer une issue en cliquant sur "supprimer" en bas du détail d'une issue
 afin de la faire disparaitre de la liste. Une fenêtre de confirmation avec des boutons "supprimer" et "annuler"
 apparaitrons avant la suppression.

5- En tant que développeur je dois pouvoir glisser déposer une/des issues dans un sprint existant afin de planifier
 cette/ces issue(s). On doit pouvoir sélectionner plusieurs issue en faisant CTRL + click ou SHIFT + click.

6- En tant que développeur, je dois pouvoir créer un sprint afin de l'ajouter à la liste des sprints
- name
- description
- date de début
- date de fin

7- En tant que développeur, je dois pouvoir modifier les champs d'un sprint (#6) en cliquant sur le bouton "modifier
" afin de mettre à jour un sprint. Des boutons "Enregistrer" et "Annuler" en bas de la page permettrons d'enregistrer
 les modifications ou non.Accessibilité de dépôt des fiches "laboratoires"
 
8- En tant que développeur, je dois pouvoir supprimer un sprint en cliquant sur le bouton d'option, puis sur
 supprimer afin de le faire disparaitre de la liste. Une fenêtre de confirmation avec des boutons "supprimer" et
  "annuler" apparaitrons avant la suppression.

9- En tant que développeur, je dois pouvoir consulter les sprints ainsi que le backlog restant avec les issues qui
 les compose afin de sélectionner une issue.
 
10- En tant que développeur je dois pouvoir consulter une issue en cliquant sur cette dernière dans une liste d'issue
 afin d'accéder à toute les données de l'issue. S'afficheront les valeurs caractéristiques de l'issue (#2) et une instance
 de la checklist "Definition of Done" qui s'appliquent à cette issue (#29)

En tant que développeur, je dois pouvoir cocher et décocher différents items de son instance de la checklist "Definition
 of Done" qui le concerne afin de pouvoir fermer une issue si tous les items sont cochés.

En tant que développeur, je souhaite pouvoir estimer la difficulté d'une issue par comparaison en visionnant les difficultés
 des issues déjà estimées



### Tasks

11- En tant que développeur, je dois pouvoir ajouter une task afin de l'ajouter au backlog
- name
- description
- issue
Un id est généré automatiquement

12- En tant que développeur, je dois pouvoir modifier une task en cliquant sur le bouton "modifier" afin de mettre
 à jour cette task. Les champs présent en #11 peuvent être modifié ainsi que les dépendances.

13- En tant que développeur, je dois pouvoir glisser déposer une tâche dans un kanban afin de modifier son état. Le
kanban est composé d'une colonne "todo" composé de toute les tâches du sprint, "on going" et "done".

14- En tant que développeur, je dois pouvoir afficher le diagram de PERT en cliquant sur "générer les PERT" afin de
 pouvoir organiser mes équipes

15- En tant que développeur, je dois pouvoir afficher la feuille de route du projet afin de pouvoir donner le travail
 à mes équipes.

16- En tant que développeur, je dois pouvoir modifier la feuille de route du projet générer automatiquement afin de
 pouvoir organiser mes équipes.

17- En tant que développeur, je dois pouvoir générer un burn down chart en cliquant sur un bouton dédié afin de voir
 l'avancement général du projet

18- En tant que développeur, je dois pouvoir créer une équipe afin de pouvoir plannifier mes équipes

19,20
/modifier/supprimer


### Tests

21- En tant que développeur, je dois pouvoir afficher la liste des tests afin de voir ceux qui sont valides en
 fonction du temps

### Documentation
22- En tant que développeur, je dois pouvoir ajouter une documentation à une release sous forme d'un fichier HTML afin
 de la documenter

### Releases
23- En tant que développeur, je dois pouvoir créer une release en cliquant sur un bouton "+" afin de l'ajouter à la
 liste des releases puis en remplissant les champs nom, date/heure, description,ainsi qu'une archive zip.
 
24- En tant que développeur ajoutant une release, je souhaite que toute les issues réalisées dans la release soient
 automatiquement ajoutées à cette dernière afin de faire le lien entre release et issues.

25- En tant que développeur, je dois pouvoir consulter la listes des releases afin d'accéder à une release en
 particulier. La liste fait apparaitre les champs : nom et date/heure, il est également possible de télécharger
 l'archive en cliquant sur un bouton.
 
26- En tant que développeur, je dois pouvoir consulter une release (nom, date/heure, description, ainsi qu'une archive
 zip) en cliquant dessus dans la liste des releases afin de prendre connaissance des détails de la release.

27- En tant que développeur, je dois pouvoir faire apparaitre les issues réalisées entre deux releases en
cliquant sur le bouton "comparer" et en choisissant deux releases. Cela afin de comparer les deux
 versions. 
  
## Idées
- DOD -> fermer une issue
- Ajouter des membres aux équipes
- feature pour choisir la difficulté
- plusieurs projet

## Sprint 1
| ID  |  importance    |  difficulté |
|-----|:--------------:|------------:|
|  1  |       1        |      1      |
