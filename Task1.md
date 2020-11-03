# CdP g1-eq5

## Task1

DoD des tasks de développement (TDEV) :
* La tâche a été implémentée
* Le code a été revu par les pairs
* Le test correspondant est passé
* Le résultat du test a été archivé
* Le déploiement fonctionne
* Le code a été push

DoD des tasks de Test (TTES) :
* Le test a été implémenté
* Le code a été revu par les pairs
* Le test a été ajouté au fichier Test.md
* Le code a été push

Tasks générales : 
* Créer l'architecture de l'application
* Créer des templates
* BD ?


ID01 : 
* Créer le fichier projectService.js contenant les fonctions addProject(name, key) et updateProject(name, key), permettant d'ajouter et de modifier un projet via mongoDB.
* Implémenter les tests des fonctions addProject et updateProject du fichier projectService.js, qui verifie qu'elles ajoutent et modifient respectivement un projet en bd.
* Dans le fichier "routes/project.js", créer les routes POST "/project" et "/updateProject" qui reçoivent les données d'un projet (name et key) et ajoutent/modifient le projet en question à la base de donnée via le service projectService. 
* Implémenter les tests des routes POST "/project" et "/updateProject" en envoyant une requête et en vérifiant que le code de retour est bon (200).
* Créer le fichier addProject.ejs contenant un formulaire composé des champs "nom" et "key". Le formulaire envoie une requête POST avec ces deux champs à l'url "/projects".
* Implémenter le test E2E de l'US
  
ID30 :
* Créer dans le fichier projectService.js, la fonction getProjectList() qui renvoie la liste des projets présents en bd.
* Dans le fichier "routes/project.js", créer la route GET "/project" qui renvoie la liste des projets via le projectService.
* Implémenter les tests de la route "/project" en envoyant une requête GET et en vérifiant que le retour est bien un projet existant.
* Créer le fichier projects.ejs permettant d'afficher les projets renvoyés en GET.
* Implémenter le test E2E de l'US


ID28 : 
* Créer le fichier header.ejs contenant la bar de navigation, avec des liens vers les pages "Projets", "Backlog", "Kanban", "Planning", "Releases" et "Tests".
* Implémenter le test E2E de l'US


ID02 : 
* Créer le fichier backlogService.js contenant la fonction addUserStory(name, description) permettant d'ajouter une US en bd. Cette fonction génère un id unique et l'attribut à l'US.
* Implémenter le test de la fonction addUserStory du fichier backlogService.js, qui vérifie qu'elle ajoute bien une US en bd.
* Dans le fichier "routes/backlog.js", créer la routes POST "/userStories" qui reçoit les données d'une US (name et description) et ajoute l'US en question à la bd via le service backlogService. 
* Implémenter le test de la route "/userStories" en envoyant une requête POST et en vérifiant que le code de retour est bon (200).
* Créer le fichier addUserStory.ejs contenant un formulaire composé des champs "name" et "description". Le formulaire envoie une requête POST avec ces deux champs à l'url "/userStories".
* Implémenter le test E2E de l'US

  
ID03 :
* Dans le fichier backlogService.js, créer la fonction updateUserStory(id, name, description, priority, difficulty) permettant de modifier une US en BD. Ce service ne modifie l'US que si aucune task n'est liée à cette US.
* Implémenter le test de la fonction updateUserStory qui verifie que la modification de l'US a bien lieu en BD.
* Dans le fichier "routes/backlog.js", créer la routes POST "/updateUserStories" qui reçoit les données d'une US (id, name, description, priority, difficulty) et modifie l'US en question dans la bd via le service backlogService. 
* Implémenter le test de la route "/updateUserStories" en envoyant une requête POST et en vérifiant que le code de retour est bon (200).
* TODO ejs
* Implémenter le test E2E de l'US

ID05 :
* Dans le fichier backlogService.js, créer la fonction setUserStorySprint(id, sprintId) permettant d'attribuer un sprint à une US en BD. Si l'US ou le sprint n'existe pas, la fonction renvoie un erreur.
* Implémenter le test de la fonction setUserStorySprint qui verifie que l'attribution du sprint  d'une US a bien lieu en BD.
* Dans le fichier "routes/backlog.js", créer la routes POST "/updateUserStorySprint" qui reçoit les données l'id de l'US et l'id du sprint et ajoute l'US au sprint en question service backlogService. 
* Implémenter le test de la route "/updateSprint" qui envoie une requête POST et en vérifiant que le code de retour est bon (200).
* Dans le fichier backlog.js, implémenter la séléction de plusieurs US via CTRL + click ou SHIFT + click ainsi que le glisser-déposer une/des US dans un sprint.
* Implémenter le test E2E de l'US

ID06 : 
* Dans le fichier backlogService.js contenant la fonction addSprint(name) permettant d'ajouter un sprint en bd. Cette fonction ajoute également l'attribut "date" avec la date et l'heure actuelle. Un id unique est également attribué.
* Implémenter le test de la fonction addSprint du fichier backlogService.js, qui vérifie qu'elle ajoute bien un sprint en bd.
* Dans le fichier "routes/backlog.js", créer la routes POST "/sprint" qui reçoit les données d'un sprint (name et date) et ajoute le sprint en question à la bd via le service backlogService. 
* Implémenter le test de la route "/sprint" qui envoie une requête POST et en vérifiant que le code de retour est bon (200).
* Créer le fichier addSprint.ejs contenant un formulaire composé d'un champs 'name". Le formulaire envoie une requête POST avec ce champs à l'url "/sprint".
* Implémenter le test E2E de l'US

ID07 :
* Dans le fichier backlogService.js, créer la fonction updateSprint(id, name) permettant de modifier une US en BD. Ce service ne modifie le sprint que si aucune issue n'est plannifiée dans le sprint.
* Implémenter le test de la fonction updateSprint qui verifie que la modification du sprint a bien lieu en BD.
* Dans le fichier "routes/backlog.js", créer la routes POST "/updateSprint" qui reçoit les données d'un sprint (id, name) et modifie le sprint en question dans la bd via le service backlogService. 
* Implémenter le test de la route "/updateSprint" qui envoie une requête POST et en vérifiant que le code de retour est bon (200).
* TODO ejs
* Implémenter le test E2E de l'US

ID09 :
* Dans dans le fichier backlogService.js, créer la fonction getBacklog() qui renvoie la liste des sprints présent en bd avec les issues qu'ils contiennent, ainsi que les US n'appartenant à aucun sprint.
* Dans le fichier "routes/backlog.js", créer la route GET "/backlog" qui renvoie le backlog via le backlogService.
* Implémenter les tests de la route "/backlog" en envoyant une requête GET et en vérifiant que le retour est bien le backlog existant.
* Créer le fichier backlog.ejs permettant d'afficher l'ensemble du backlog (US composant les sprints et US restantes) renvoyés en GET.
* Implémenter le test E2E de l'US

ID10 : 
* Dans dans le fichier backlogService.js, créer la fonction getIssueById(id) qui renvoie l'issue ayant l'id passé en paramètre.
* Dans le fichier "routes/backlog.js", créer la route GET "/userStory/:id" qui renvoie l'US ayant l'id ":id" via le backlogService. Si l'id est inexistant un code d'erreur 400 est retourné.
* Implémenter les tests de la route "/userStory/:id" en envoyant une requête GET avec un id existant et en vérifiant que le retour est bien l'US concernée. Le test vérifie également que si l'id est eronné, l'erreur 400 est renvoyée.
* Créer le fichier userStory.ejs permettant d'afficher une US (id, name, description, priority, difficulty).
* Implémenter le test E2E de l'US
 
|    ID    |         Nom          |  Issue   |  Dépendance   |
|----------|:---------------------|:--------:|--------------:|



| ID    | Nom |  Importance   |  Difficulté   |
|-------|:----|:-------------:|--------------:|
| ID01  | En tant qu'owner, je dois pouvoir créer un projet en entrant dans un formulaire le nom du projet et une key qui sera utilisé comme préfix des US (ex : XX pour XX-01). Je dois également pouvoir modifier le nom du projet si besoin. Cela afin de pouvoir créer les US du projet. | 2 | 1 |
| ID30  | En tant qu'owner, je dois pouvoir consulter la liste des projets (nom et date de création) afin d'accéder à un projet en particulier. | 2 | 1 |
| ID28  | En tant que developer, je dois pouvoir à partir de n'importe quelle page, accéder aux pages "Projets" "Backlog", "Kanban", "Planning", "Releases", "Tests" afin de naviguer sur le site. | 2 | 1 |
| ID02  | En tant que maintainer, je dois pouvoir ajouter une US en entrant son nom et sa description afin de l'ajouter au backlog. Je souhaite également qu'un id unique soit généré automatiquement avec comme préfix la key du projet. | 3 | 1 |
| ID03  | En tant que maintainer, je dois pouvoir modifier les champs d'une US (présentés en #02) ainsi que la priorité et la difficulté si aucune task n'est lié à cet issue. Ceci afin de mettre à jour une US. | 3 | 1 |
| ID05  | En tant que maintainer je dois pouvoir glisser déposer une/des US dans un sprint existant afin de planifier cette/ces US(s). On doit pouvoir sélectionner plusieurs US via CTRL + click ou SHIFT + click. | 3 | 3 |
| ID06  | En tant que maintainer, je dois pouvoir créer un sprint en remplissant les champs nom, description, date de début et date de fin dans un formulaire afin de l'ajouter à la liste des sprints. | 3 | 1 |
| ID07  | En tant que maintainer, je dois pouvoir modifier les champs d'un sprint (#06), si celui-ci ne contient pas d'US, en cliquant sur le bouton "modifier" afin de mettre à jour un sprint.  | 1 | 1 |
| ID09  | En tant que developer, je dois pouvoir consulter les sprints ainsi que le backlog restant avec les US qui les composent afin de sélectionner une US. | 3 | 1 |
| ID10  | En tant que developer, je dois pouvoir consulter une US (#03) en cliquant sur cette dernière dans une liste d'US afin d'accéder à toute les données de l'US. | 3 | 1 |

| ID37  | En tant que maintainer, je souhaite pouvoir afficher les US dont la difficulté a déjà été estimée, regroupées par difficulté, ainsi que l'US que je souhaite estimer, afin d'estimer au mieux la difficulté de l'US | 3 | 3 |
| ID31  | En tant que developer effectuant n'importe quelle modification ou suppression, je dois pouvoir annuler ma manipulation avant qu'elle ne soit validée, afin de prévenir des erreurs. | 1 | 5 |
| ID11  | En tant que maintainer, je dois pouvoir ajouter une task en remplissant les champs nom, description et indiquer l'US liée dans un formulaire afin de l'ajouter au backlog. Je souhaite également qu'un id unique soit généré automatiquement. | 2 | 1 |
| ID32  | En tant que maintainer je dois pouvoir créer une checklist DOD composée d'un nom et d'un liste de consignes afin de les attribuer aux task. | 2 | 1 |
| ID33  | En tant que maintainer, je dois pouvoir modifier une checklist DOD afin de mettre à jour les étapes nécessaire à réaliser une task. | 2 | 1 |


