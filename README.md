# CdP g1-eq5

## Backlog

La difficulté est exprimée en suivant la suite de Fibonacci et l'importance est notée entre 1 et 3 (low, medium, high).
Il existe trois rôles : 
* Owner : Il a tout les droits.
* Maintainer : Il peut créer des issues, des tasks et gérer les sprints.
* Developer : Il ne peut que consulter les tâches et les issues. Il peut également mettre à jour le statut d'une task.  

Etant donné que les droits sont étendus, si une US concerne un developer, on sous-entend que cela concerne aussi le maintainer et l'owner.


| ID    | Nom |  Importance   |  Difficulté   |
|-------|:----|:-------------:|--------------:|
| ID43  | En tant qu'utilisateur anonyme, je dois pouvoir créer un profil avec un username afin d'avoir des accès spécifiques à différents projets. | 2 | 1 |
| ID44  | En tant qu'utilisateur anonmye, je dois pouvoir m'identifier à un profil par le biais d'un menu déroulant afin d'avoir mes permissions sur les différents projets auxquels je participe.   | 2 | 3 |
| ID01  | En tant que développeur, je dois pouvoir créer un projet en entrant dans un formulaire le nom du projet et une key qui sera utilisé comme préfix des US (ex : XX pour XX-01). Je dois également pouvoir modifier le nom du projet si besoin. Je serai owner pour ce projet. Cela afin de pouvoir créer les US du projet. | 2 | 1 |
| ID30  | En tant que développeur, je dois pouvoir consulter la liste des projets auxquels j'appartiens (nom et date de création) afin d'accéder à un projet en particulier. | 2 | 1 |
| ID28  | En tant que developer, je dois pouvoir à partir de n'importe quelle page, accéder aux pages "Projets" "Backlog", "Kanban", "Planning", "Releases", "Tests" afin de naviguer sur le site. | 2 | 1 |
| ID31  | En tant que developer effectuant n'importe quelle modification ou suppression, je dois pouvoir annuler ma manipulation avant qu'elle ne soit validée, afin de prévenir des erreurs. | 1 | 5 |
| ID02  | En tant que maintainer, je dois pouvoir ajouter une US en entrant son nom et sa description afin de l'ajouter au backlog Je souhaite également qu'un id unique soit généré automatiquement avec comme préfix la key du projet. | 3 | 1 |
| ID03  | En tant que maintainer, je dois pouvoir modifier les champs d'une US (présentés en #02) ainsi que la priorité et la difficulté si aucune task n'est lié à cet issue. Ceci afin de mettre à jour une US. | 3 | 1 |
| ID05  | En tant que maintainer je dois pouvoir glisser déposer une/des US dans un sprint existant afin de planifier cette/ces US(s). On doit pouvoir sélectionner plusieurs US via CTRL + click ou SHIFT + click. | 3 | 3 |
| ID06  | En tant que maintainer, je dois pouvoir créer un sprint en remplissant les champs nom, description, date de début et date de fin dans un formulaire afin de l'ajouter à la liste des sprints. | 3 | 1 |
| ID07  | En tant que maintainer, je dois pouvoir modifier les champs d'un sprint (#06), si celui ci ne contient pas d'US, en cliquant sur le bouton "modifier" afin de mettre à jour un sprint.  | 1 | 1 |
| ID09  | En tant que developer, je dois pouvoir consulter les sprints ainsi que le backlog restant avec les US qui les composent afin de sélectionner une US. | 3 | 1 |
| ID10  | En tant que developer, je dois pouvoir consulter une US (#03) en cliquant sur cette dernière dans une liste d'US afin d'accéder à toute les données de l'US. | 3 | 1 |
| ID37  | En tant que maintainer, je souhaite pouvoir afficher les US dont la difficulté a déjà été estimée, regroupées par difficulté, ainsi que l'US que je souhaite estimer, afin d'estimer au mieux la difficulté de l'US | 3 | 3 |
| ID32  | En tant que maintainer je dois pouvoir créer une checklist DOD composée d'un nom et d'un liste de consignes afin de les attribuer aux task. | 2 | 1 |
| ID33  | En tant que maintainer, je dois pouvoir modifier une checklist DOD afin de mettre à jour les étapes nécessaire à réaliser une task. | 2 | 1 |
| ID11  | En tant que maintainer, je dois pouvoir ajouter une task en remplissant les champs nom, description et indiquer l'US liée dans un formulaire afin de l'ajouter au backlog. Je souhaite également qu'un id unique soit généré automatiquement. | 2 | 1 |
| ID12  | En tant que maintainer, je dois pouvoir modifier une task afin de'ajouter de nouveaux éléments à cette task cette task. Les champs présent en #11 peuvent être modifiés ainsi que les dépendances entre les tasks. Il est également possible d'attribuer la task à un developer. | 2 | 1 |
| ID45  | En tant que developer, je dois pouvoir afficher la liste des tâches afin de voir le travail à faire. | 2 | 1 |
| ID34  | En tant que developer je dois pouvoir fermer une task une fois que tout les items de la checklist DOD sont validé afin d'indiquer que la task est réalisée. | 2 | 1 |
| ID36  | En tant que developer, je dois pouvoir cocher et décocher différents items de la checklist "Definition of Done" d'une task afin de pouvoir fermer une task si tous les items sont cochés. | 2 | 1 |
| ID13  | En tant que maintainer, je dois pouvoir glisser déposer une task dans un kanban afin de modifier l'état d'une task. Le kanban est composé de colonnes "todo", "on going" et "done". Il y a un kanban par sprint et lorsqu'un sprint se termine, le kanban du sprint suivant affiche les tasks non terminées du précédent | 2 | 3 |
| ID14  | En tant que maintainer, je dois pouvoir afficher le diagram de PERT afin de pouvoir organiser les tasks. | 2 | 5 |
| ID39  | En tant que maintainer, je dois pouvoir générer une feuille de route en cliquant sur un bouton une fois que toutes les difficultés de toutes les tasks ont été estimées, afin d'attribuer les tasks à des developer. | 2 | 8 |
| ID15  | En tant que maintainer, je dois pouvoir afficher la feuille de route du projet qui indique la répartition des tasks dans le temps et par développeur, ainsi que le nombre de jours-hommes planifiés et la vélocité prévue afin de pouvoir distribuer le travail entre les développeurs.  | 2 | 3 |
| ID16  | En tant que maintainer, je dois pouvoir modifier la feuille de route du projet générée automatiquement en assignant les tasks à d'autres personnes et à différents moments, sans changer de page web, afin de pouvoir organiser l'attribution des tasks. Je dois être empêché de faire des modifications qui contredisent les dépendances (prévoir une task B avant qu'une task A soit terminée si B dépend de A) | 2 | 3 |
| ID17  | En tant que maintainer, je dois consulter le burn down chart en cliquant sur un bouton dédié afin de voir l'avancement général du projet. | 2 | 3 |
| ID18  | En tant que maintainer, je dois pouvoir ajouter un utilisateur à un projet en mentionnant son rôle (développeur ou maintainer) dans le ce projet, afin de pouvoir l'assigner à des tâches et qu'il ait accès au projet. | 2 | 1 |
| ID19  | En tant que maintainer, je dois pouvoir ajouter un test caractérisé par un titre, une description, un type (unitaire, intégration, end-to-end), afin de pouvoir suivre son évolution par la suite. | 1 | 1 |
| ID20  | En tant que developer, je dois pouvoir afficher la liste des tests afin de voir ceux qui sont valides en fonction du temps afin de suivre leur évolution | 1 | 1 |
| ID42  | En tant que developer, je dois pouvoir renseigner l'état d'un test ou d'un groupe de tests (passe ou non) pour une date donnée afin de garder trace de cette information. | 1 | 3 |
| ID21  | En tant que maintainer, je dois pouvoir ajouter une documentation à une release sous forme d'un fichier HTML ou d'une archive contenant des documents HTML, ainsi que d'un type (administrateur, utilisateur ou code) afin de documenter cette release. | 1 | 3 |
| ID22  | En tant que developer, je dois pouvoir visionner une documentation et éventuellement naviguer dans les différentes pages qui la composent afin de pouvoir consulter son contenu. | 1 | 3 |
| ID23  | En tant que maintainer, je dois pouvoir créer une release constituée des champs nom, date/heure, description, ainsi que d'une archive zip afin de l'ajouter à la liste des releases. Je souhaite que toute les US réalisées depuis la dernière release soient automatiquement ajoutées à cette dernière afin de faire le lien entre release et US | 1 | 3 |
| ID25  | En tant que developer, je dois pouvoir consulter la listes des releases afin d'accéder à une release en particulier. La liste fait apparaitre les champs nom et date/heure, il est également possible de télécharger l'archive en cliquant sur un bouton. | 1 | 1 |
| ID26  | En tant que developer, je dois pouvoir consulter une release (nom, date/heure, description, ainsi qu'une archive zip, les US réalisées avec les nouveautés mises en évidence, l'état des tests à la date de la release et un lien vers la documentation liée à cette release) en cliquant dessus dans la liste des releases afin de prendre connaissance des détails de la release. | 1 | 1 |
| ID27  | En tant que developer, je dois pouvoir faire apparaitre le changelog de deux releases en cliquant sur le bouton "comparer les " et en choisissant deux releases. Cela afin de comparer les deux versions. | 1 | 3 |
| ID41  | En tant que developer, je dois pouvoir faire apparaitre les tests dont l'état a changé entre deux releases en cliquant sur le bouton "comparer les tests" et en choisissant deux releases. Cela afin de comparer les deux versions. | 1 | 3 |


Difficulté totale : 79
