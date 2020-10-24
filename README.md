# CdP g1-eq5

## User Stories

### Génériques

1- En tant qu'utilisateur, je dois pouvoir créer un projet en entrant dans un formulaire le nom et le tag des issues afin de pouvoir créer des issues. (ex : XX pour XX-01)

29- En tant qu'utilisateur, je dois pouvoir modifier le titre d'un projet afin de rectifier une erreur (par exemple)

En tant qu'utilisateur, je dois pouvoir consulter la liste des projets (nom et date de création) afin d'accéder à un projet en particulier.
 
28- En tant qu'utilisateur, je dois pouvoir à partir de n'importe quelle page, accéder aux pages "Projets" "Backlog", "Kanban", "Planning", "Releases", "Tests" afin de naviguer sur le site.

En tant qu'utilisateur effectuant n'importe quelle modification ou suppression, je dois pouvoir annuler ma manipulation avant qu'elle ne soit validée, afin de prévenir des erreurs.

### Issues

En tant qu'utilisateur, je dois pouvoir créer des types d'issue défini par son nom et par un modèle de checklist "Definition of Done" afin de les attribuer aux issues.

En tant qu'utilisateur, je dois pouvoir modifier la checklist DOD d'un type d'issue afin de mettre à jour les étapes nécessaire à fermer une issue.

En tant qu'utilisateur, je dois pouvoir fermer une issue une fois que tout les items de la checklist DOD sont validé afin d'indiquer que l'issue est réalisée.

2- En tant qu'utilisateur, je dois pouvoir ajouter une issue en entrant les champs nom, description et en choisissant le type afin de l'ajouter au backlog.

En tant qu'utilisateur ajoutant une issue, je souhaite que son id soit généré automatiquement, afin d'avoir un id unique pour chaque issue.

3- En tant qu'utilisateur, je dois pouvoir modifier les champs présenté en #2 ainsi que la priorité et la difficulté afin de mettre à jour une issue.

4- En tant qu'utilisateur, je dois pouvoir supprimer une issue en cliquant sur "supprimer" en bas du détail d'une issue afin de la faire disparaitre de la liste. 

5- En tant qu'utilisateur je dois pouvoir glisser déposer une/des issues dans un sprint existant afin de planifier cette/ces issue(s). On doit pouvoir sélectionner plusieurs issue via CTRL + click ou SHIFT + click.

6- En tant qu'utilisateur, je dois pouvoir créer un sprint en remplissant les champs nom, description, date de début et date de fin dans un formulaire afin de l'ajouter à la liste des sprints.

7- En tant qu'utilisateur, je dois pouvoir modifier les champs d'un sprint (#6) en cliquant sur le bouton "modifier" afin de mettre à jour un sprint. 

8- En tant qu'utilisateur, je dois pouvoir supprimer un sprint en cliquant sur le bouton d'option, puis sur supprimer afin de le faire disparaitre de la liste. 

9- En tant qu'utilisateur, je dois pouvoir consulter les sprints ainsi que le backlog restant avec les issues qui les composent afin de sélectionner une issue.

10- En tant qu'utilisateur je dois pouvoir consulter une issue en cliquant sur cette dernière dans une liste d'issue afin d'accéder à toute les données de l'issue. S'afficheront les valeurs caractéristiques de l'issue (#2) et une instance de la checklist "Definition of Done" qui s'appliquent à cette issue (#29)

En tant qu'utilisateur, je dois pouvoir cocher et décocher différents items de la checklist "Definition of Done" qui concerne afin de pouvoir fermer une issue si tous les items sont cochés.

En tant qu'utilisateur, je souhaite pouvoir estimer la difficulté d'une issue par comparaison en visionnant les difficultés des issues déjà estimées 
TODO : afin de

### Tasks

11- En tant qu'utilisateur, je dois pouvoir ajouter une task en remplissant les champs nom, description et issue dans un formulaire afin de l'ajouter au backlog

En tant que développeur ajoutant une task, je souhaite que son id soit généré automatiquement afin d'avoir un id unique pour chaque task.

12- En tant qu'utilisateur, je dois pouvoir modifier une task en cliquant sur le bouton "modifier" afin de mettre à jour cette task. Les champs présent en #11 peuvent être modifié ainsi que les dépendances.

13- En tant qu'utilisateur, je dois pouvoir glisser déposer une tâche dans un kanban afin de modifier son état. Lekanban est composé d'une colonne "todo" composé de toute les tâches du sprint, "on going" et "done".

14- En tant qu'utilisateur, je dois pouvoir afficher le diagram de PERT en cliquant sur "générer les PERT" afin de pouvoir organiser mes équipes

15- En tant qu'utilisateur, je dois pouvoir afficher la feuille de route du projet afin de pouvoir donner le travail à mes équipes.

16- En tant qu'utilisateur, je dois pouvoir modifier la feuille de route du projet générer automatiquement afin de pouvoir organiser mes équipes.

17- En tant qu'utilisateur, je dois pouvoir générer un burn down chart en cliquant sur un bouton dédié afin de voir l'avancement général du projet

18- En tant qu'utilisateur, je dois pouvoir créer une équipe afin de pouvoir planifier mes équipes

19,20/modifier/supprimer

### Tests

21- En tant qu'utilisateur, je dois pouvoir afficher la liste des tests afin de voir ceux qui sont valides en fonction du temps

### Documentation

22- En tant qu'utilisateur, je dois pouvoir ajouter une documentation à une release sous forme d'un fichier HTML afin de documenter cette release

### Releases

23- En tant qu'utilisateur, je dois pouvoir créer une release constituée des champs nom, date/heure, description, ainsi que d'une archive zip afin de l'ajouter à la liste des releases.

24- En tant qu'utilisateur ajoutant une release, je souhaite que toute les issues réalisées dans la release soient automatiquement ajoutées à cette dernière afin de faire le lien entre release et issues.

25- En tant qu'utilisateur, je dois pouvoir consulter la listes des releases afin d'accéder à une release en particulier. La liste fait apparaitre les champs nom et date/heure, il est également possible de télécharger l'archive en cliquant sur un bouton.

26- En tant qu'utilisateur, je dois pouvoir consulter une release (nom, date/heure, description, ainsi qu'une archive zip) en cliquant dessus dans la liste des releases afin de prendre connaissance des détails de la release.

27- En tant qu'utilisateur, je dois pouvoir faire apparaitre les issues réalisées entre deux releases en cliquant sur le bouton "comparer" et en choisissant deux releases. Cela afin de comparer les deux versions.
 
## Idées
- Ajouter des membres aux équipes
- feature pour choisir la difficulté
- Tests & Doc

## Sprint 1
| ID  |  importance    |  difficulté |
|-----|:--------------:|------------:|
|  1  |       1        |      1      |