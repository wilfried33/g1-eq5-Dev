# CdP g1-eq5

## Releases
Nos release sont également présente sur [Github](https://github.com/cartoonnerie/g1-eq5-Release/releases)
### Nomenclature
  `V<version>.<features update>.<bug>`
  - version : mise à jour majeure front ou back
  - features update : ajout de fonctionnalités
  - bug : correction d'un bug
En pratique, dans ce projet, la release n'avait lieu qu'à la fin du sprint, c'est pourquoi c'est
la `<feature-update>` que nous avons incrémenté. `<bug>` n'a pas été utilisé car notre solution n'est 
pas en production et la correction d'un bug ne nécessite pas une release.

### V0.3.0
11/12 - 16:00  
[Code Source](https://github.com/cartoonnerie/g1-eq5-Release/raw/main/releases/v0.3.0.zip)

#### Changelog :
- Navigation
- Tasks : 
  - ajouter, afficher
  - modifier, supprimer si aucun développeur assigné
  - glisser-déposer dans le kanban
- Sprint : afficher la vélocité
- DOD : créer, modifier
- Développeur : ajouter

User Stories réalisées :

| ID   | Nom                                                                                                                                                                                                                                                                                                                                                                                                                   | Importance | Difficulté |
| ---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: | ---------: |
| ID28 | En tant que developer, je dois pouvoir à partir de n'importe quelle page, accéder aux pages "Projets" "Backlog", "Kanban", "Planning", "Releases", "Tests" afin de naviguer sur le site.                                                                                                                                                                                                                              | 2          | 1          |
| ID11 | En tant que maintainer, je dois pouvoir ajouter une task en remplissant les champs nom, description et indiquer l'US liée dans un formulaire afin de l'ajouter au backlog. Je souhaite également qu'un id unique soit généré automatiquement.                                                                                                                                                                         | 2          | 1          |
| ID46 | En tant que maintainer, je dois pouvoir afficher la vélocité correspondant aux tâches planifiées et aux tâches réalisées pour chaque sprint. Si un sprint a déjà été terminé et que la vélocité planifiée pour un sprint suivant est vraiment plus grande ou plus petite que pour le(s) sprint(s) terminé(s), je dois en être averti. Cela afin de pouvoir planifier le travail de développement de manière réaliste. | 3          | 1          |
| ID45 | En tant que developer, je dois pouvoir afficher la liste des tâches afin de voir le travail à faire.                                                                                                                                                                                                                                                                                                                  | 2          | 1          |
| ID32 | En tant que maintainer je dois pouvoir créer une checklist DOD composée d'un nom et d'un liste de consignes afin de les attribuer aux task.                                                                                                                                                                                                                                                                           | 2          | 1          |
| ID33 | En tant que maintainer, je dois pouvoir modifier une checklist DOD afin de mettre à jour les étapes nécessaire à réaliser une task.                                                                                                                                                                                                                                                                                   | 2          | 1          |
| ID12 | En tant que maintainer, je dois pouvoir modifier une task ou la supprimer afin d'ajouter de nouveaux éléments à cette task, tant qu'aucun développeur n'y a été assigné. Les champs présents en #11 peuvent être modifiés ainsi que sa charge et les dépendances entre les tasks. Il est également possible d'attribuer la task à un developer.                                                                       | 2          | 1          |
| ID13 | En tant que maintainer, je dois pouvoir glisser déposer une task dans un kanban afin de modifier l'état d'une task. Le kanban est composé de colonnes "todo", "on going" et "done". Il y a un kanban par sprint et lorsqu'un sprint se termine, le kanban du sprint suivant affiche les tasks non terminées du précédent                                                                                              | 2          | 2          |
| ID18 | En tant que maintainer, je dois pouvoir créer un développeur afin de lui attribuer des tasks.                                                                                                                                                                                                                                                                                                                         | 2          | 1          |



### V0.2.0 
27/11 - 18:00  
[Code Source](https://github.com/cartoonnerie/g1-eq5-Release/raw/main/releases/v0.2.0.zip)  
#### Changelog : 
- Projets : création, modification
- Sprint : création, modification, suppression
- User Stories : 
    - création, modification, suppression
    - ajout dans un sprint via glissé-déposé
    - consultation des détails d'une us
- création des tasks (bug lors de la gestion d'erreur)

User Stories réalisées :

| ID   | Nom                                                                                                                                                                                                                                                                                                                                                                                                                   | Importance | Difficulté |
| ---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: | ---------: |
| ID01 | En tant que développeur, je dois pouvoir créer un projet en entrant dans un formulaire le nom du projet et une key qui sera utilisé comme préfix des US (ex : XX pour XX-01). Je dois également pouvoir modifier le nom du projet si besoin. Je serai owner pour ce projet. Cela afin de pouvoir créer les US du projet.                                                                                              | 2          | 1          |
| ID02 | En tant que maintainer, je dois pouvoir ajouter une US en entrant son nom et sa description afin de l'ajouter au backlog Je souhaite également qu'un id unique soit généré automatiquement avec comme préfix la key du projet.                                                                                                                                                                                        | 3          | 1          |
| ID03 | En tant que maintainer, je dois pouvoir supprimer une US ou modifier ses champs (présentés en #02) ainsi que la priorité et la difficulté si aucune task n'est lié à cet issue. Ceci afin de mettre à jour une US ou corriger des erreurs.                                                                                                                                                                            | 3          | 1          |
| ID06 | En tant que maintainer, je dois pouvoir créer un sprint en remplissant les champs nom, description, date de début et date de fin dans un formulaire afin de l'ajouter à la liste des sprints.                                                                                                                                                                                                                         | 3          | 1          |
| ID07 | En tant que maintainer, je dois pouvoir modifier les champs d'un sprint (#06) ou le supprimer, si celui ci ne contient pas d'US, en cliquant sur le bouton "modifier" (resp. "supprimer") afin de mettre à jour un sprint.                                                                                                                                                                                            | 1          | 1          |
| ID09 | En tant que developer, je dois pouvoir consulter les sprints ainsi que le backlog restant avec les US qui les composent afin de sélectionner une US.                                                                                                                                                                                                                                                                  | 3          | 1          |
| ID10 | En tant que developer, je dois pouvoir consulter une US (#03) en cliquant sur cette dernière dans une liste d'US afin d'accéder à toute les données de l'US.                                                                                                                                                                                                                                                          | 3          | 1          |

### V0.1.0 
13/11 - 18:00  
[Code Source](https://github.com/cartoonnerie/g1-eq5-Release/raw/main/releases/v0.1.0.zip)  
#### Changelog : 
- Création de l'application
- Consultation des User Stories  

User Stories réalisées : ID30
