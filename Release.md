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

### V0.2.0 
13/11 - 18:00  
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
