# CdP g1-eq5

## User Stories

### Issues

1- En tant que développeur, je dois pouvoir créer un projet afin de pouvoir créer des issues
- Nom
- Tag des issues
- Tag des tasks

2- En tant que développeur, je dois pouvoir ajouter/modifier/supprimer une issue afin de l'ajouter au backlog :
- name
- description
- priorité
- difficulté
- type
- sprint  
Un id est généré automatiquement

3- En tant que développeur je dois pouvoir glisser déposer une/des issues dans un sprint existant afin d'y ajouter ces issues.

4- En tant que développeur, je dois pouvoir créer/modifier/supprimer un sprint afin de l'ajouter à la liste des sprints
- name
- description

### Tasks
5- En tant que développeur, je dois pouvoir ajouter/modifier/supprimer une task afin de l'ajouter au backlog
- name
- description
- issue
- dépendances  
Un id est généré automatiquement

6- En tant que développeur, je dois pouvoir modifier une task afin de la mettre à jour
Doivent pouvoir être modifiés : les champs de l'US précédente ainsi que son état

7- En tant que développeur, je dois pouvoir glisser déposer une tâche dans un kanban afin de modifier son état

14- En tant que développeur, je dois pouvoir afficher le diagram de PERT afin de pouvoir organiser mes équipes

15- En tant que développeur, je dois pouvoir modifier la feuille de route du projet générer automatiquement afin de pouvoir organiser mes équipes

16- En tant que développeur, je dois pouvoir afficher la feuille de route du projet afin de pouvoir donner le travail à mes équipes

17- En tant que développeur, je dois pouvoir afficher un burn down chart afin de voir l'avancement général du projet

18- En tant que développeur, je dois pouvoir créer/modifier/supprimer une équipe afin de pouvoir plannifier mes équipes

### Tests

14- En tant que développeur, je dois pouvoir afficher la liste des tests afin de voir ceux qui sont valides en fontion du temps

### Documentation
8- En tant que développeur je dois pouvoir ajouter une documentation à une release afin de la documenter

### Releases
9- En tant que développeur, je dois pouvoir créer une release afin de l'ajouter à la liste des releases
- nom
- date/heure
- description
- archive  

Ajout automatique des issues

10- En tant que développeur, je dois pouvoir consulter la listes des releases afin d'accéder à une release en
 particulier.  
 La liste fait apparaitre les champs : nom, date/heure. 
 L'archive est téléchargeable en cliquant sur le nom de la release.
 
11- En tant que développeur, je dois pouvoir consulter une release en cliquant dessus dans la liste des releases afin
 de prendre connaissance des détails de la release.

12- En tant que développeur, je dois pouvoir télécharger l'archive de la release afin de l'installer sur mon
 ordinateur.

13- En tant que développeur, je dois pouvoir faire apparaitre les issues réalisées entre deux releases en
cliquant sur le bouton "comparer" et en choisissant deux releases. Cela afin de comparer les deux
 versions. 
  
## Idées
- OK Générer automatiquement le PERT
- PK Planning générer à, partir du PERT, glissé-déposer
- Fermer la dernière task d'une issue doit close une issue
- OK Burn down chart
