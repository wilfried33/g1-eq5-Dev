# CdP g1-eq5

## Task1

DoD des tasks de développement (TDEV) :
* La tâche a été implémentée
* Le code a été push
* La tâche de test correspondante est close
* Le déploiement fonctionne

DoD des tasks de Test (TTES) :
* Le test a été implémenté
* Le code a été push
* Le test est passé
* Le résultat du test a été archivé
* Le test a été ajouté au fichier Test.md

Tasks générales : 
* Créer l'architecture de l'application
* Créer des templates
* BD ?


ID01 : 
* Créer le fichier projectService.js contenant les fonctions addProject(name, key) permettant d'ajouter un projet via mongoDB.
* Implémenter le tests de la fonction addProject du fichier projectService.js, qui verifie qu'elle ajoute un projet en bd.
* Dans le fichier "routes/project.js", créer la route GET "/project" qui renvoie le formulaire du fichier addProject.ejs.
* Dans le fichier "routes/project.js", créer la route POST "/project" qui reçoivent les données d'un projet (name et key) et ajoute le projet en question à la base de donnée via le service projectService. 
* Implémenter le test de la route POST "/project" en envoyant une requête et en vérifiant que le code de retour est bon (200).
* Créer le fichier addProject.ejs contenant un formulaire composé des champs "nom" et "key". Le formulaire envoie une requête POST avec ces deux champs à l'url "/project".

* Dans le fichier projectService.js, ajouter le fonction updateProject(name, key) permettant de modifier un projet via mongoDB.
* Implémenter le tests de la fonction updateProject du fichier projectService.js, qui verifie qu'elle modifie un projet en bd.
* Dans le fichier "routes/project.js", créer la route POST "/updateProject" qui reçoit les données d'un projet (name et key) et modifient le projet en question à la base de donnée via le service projectService. 
* Implémenter le test de la route POST "/updateProject" en envoyant une requête et en vérifiant que le code de retour est bon (200).
* Dans le fichier project.ejs, ajouter un bouton "Modifier" pour chaque projet qui afficher un formulaire composé des champs, avec valeur "nom" et "key". Le formulaire envoie une requête POST avec ces deux champs à l'url "/updateProject".
* Implémenter le test E2E de l'US

  
ID30 :
* Créer dans le fichier projectService.js, la fonction getProjectList() qui renvoie la liste des projets présents en bd.
* Dans le fichier "routes/project.js", créer la route GET "/project" qui renvoie la liste des projets via le projectService.
* Implémenter les tests de la route "/project" en envoyant une requête GET et en vérifiant que le retour est bien un projet existant.
* Créer le fichier projects.ejs permettant d'afficher les projets renvoyés en GET. Chaque projet est sélectionnable afin d'aller respectivement sur sa page du backlog.
* Implémenter le test E2E de l'US


ID28 : 
* Créer le fichier header.ejs contenant la bar de navigation, avec des liens vers les pages "Projets", "Backlog", "Kanban", "Planning", "Releases" et "Tests".
* Implémenter le test E2E de l'US


ID02 : 
* Créer le fichier backlogService.js contenant la fonction addUserStory(project, name, description) permettant d'ajouter une US en bd. Cette fonction génère un id unique et l'attribut à l'US.
* Implémenter le test de la fonction addUserStory du fichier backlogService.js, qui vérifie qu'elle ajoute bien une US en bd.
* Dans le fichier "routes/backlog.js", créer la route GET "/userStories" qui renvoie le formulaire du fichier addUserStory.ejs
* Dans le fichier "routes/backlog.js", créer la route POST "/userStories" qui reçoit les données d'une US (project, name et description) et ajoute l'US en question à la bd via le service backlogService. 
* Implémenter le test de la route "/userStories" en envoyant une requête POST et en vérifiant que le code de retour est bon (200).
* Créer le fichier addUserStory.ejs contenant un formulaire composé des champs "name", "description" et "project". Le formulaire envoie une requête POST avec ces deux champs à l'url "/userStories".
* Implémenter le test E2E de l'US

  
ID03 :
* Dans le fichier backlogService.js, créer la fonction updateUserStory(id, name, description, priority, difficulty) permettant de modifier une US en BD. Ce service ne modifie l'US que si aucune task n'est liée à cette US.
* Implémenter le test de la fonction updateUserStory qui verifie que la modification de l'US a bien lieu en BD.
* Dans le fichier "routes/backlog.js", créer la routes POST "/updateUserStory" qui reçoit les données d'une US (id, name, description, priority, difficulty) et modifie l'US en question dans la bd via le service backlogService. 
* Implémenter le test de la route "/updateUserStory" en envoyant une requête POST et en vérifiant que le code de retour est bon (200).
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
* Dans le fichier backlog.ejs, ajouter un bouton "Ajouter Sprint" qui permet d'afficher un formulaire composé d'un champ "name". Le formulaire envoie une requête POST avec ce champs à l'url "/sprint".
* Implémenter le test E2E de l'US

ID07 :
* Dans le fichier backlogService.js, créer la fonction updateSprint(id, name) permettant de modifier une US en BD. Ce service ne modifie le sprint que si aucune issue n'est plannifiée dans le sprint.
* Implémenter le test de la fonction updateSprint qui verifie que la modification du sprint a bien lieu en BD.
* Dans le fichier "routes/backlog.js", créer la routes POST "/updateSprint" qui reçoit les données d'un sprint (id, name) et modifie le sprint en question dans la bd via le service backlogService. 
* Implémenter le test de la route "/updateSprint" qui envoie une requête POST et en vérifiant que le code de retour est bon (200).
* Dans le fichier backlog.ejs, ajouter un bouton "Modifier" pour chaque Sprint qui permet d'afficher un formulaire composé d'un champ "name". Le formulaire envoie une requête POST avec ce champs et l'id du sprint à l'url "/updateSprint".
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
* Créer le fichier userStory.ejs permettant d'afficher une US (id, name, description, priority, difficulty). Le fichier contient un bouton "Modifier" qui permet d'afficher un formulaire avec les champs (name, description, priority, difficulty) qui envoie une requète POST à l'url "updateUserStories".
* Dans le fichier backlog.ejs, chaque US doit être selectionnable qui envoie une requête GET à l'url "/userStory/:id" où id est l'id de l'US.
* Implémenter le test E2E de l'US

ID11 :
* Créer le fichier taskService.js contenant les fonctions addTask(name, description, userStory), permettant d'ajouter une tache via mongoDB. Cette fonction génère un id unique et l'attribut à la tache.
* Implémenter le test de la fonction addTask du fichier taskService.js, qui vérifie qu'elle ajoute bien une tache en bd.
* Dans le fichier "routes/task.js", créer la route GET "/addTask" qui renvoie le formulaire du fichier addTask.ejs
* Dans le fichier "routes/task.js", créer la routes POST "/addTask" qui reçoit les données d'une tache (name, description, userStory) et ajoute la tache en question à la bd via le service taskService. 
* Implémenter le test de la route "/task" en envoyant une requête POST et en vérifiant que le code de retour est bon (200).
* Créer le fichier addTask.ejs contenant un formulaire composé des champs "name", "description" et d'un sélecteur de userStory. Le formulaire envoie une requête POST avec ces trois champs à l'url "/addTask".
* Implémenter le test E2E de l'US

* Dans le fichier taskService.js, ajouter la fonction updateTask(id, name, description, userStory), permettant de modifier une tache via mongoDB.
* Implémenter le test de la fonction updateTask qui verifie que la modification de la tache a bien lieu en BD.
* Dans le fichier "routes/task.js", créer la route POST "/updateTask" qui reçoit les données d'une tache (id, name, description, userStory) et modifie la tache en question dans la bd via le service taskService. 
* Implémenter le test de la route "/updateTask" en envoyant une requête POST et en vérifiant que le code de retour est bon (200).
* Dans le fichier tasks.ejs, ajouter un bouton "Modifier" pour chaque task qui affiche un formulaire composé des champs, avec valeur, "name", "description" et d'un sélecteur de userStory. Le formulaire envoie une requête POST avec ces trois champs à l'url "/updateTask"
* Implémenter le test E2E de l'US

ID45 : 
* Dans dans le fichier taskService.js, créer la fonction getTasks() qui renvoie la liste des tâches présent en bd.
* Dans le fichier "routes/tasks.js", créer la route GET "/tasks" qui renvoie la liste des tâches via le taskService.
* Implémenter les tests de la route "/tasks" en envoyant une requête GET et en vérifiant que le retour est bien la liste des tâches existant.
* Créer le fichier tasks.ejs permettant d'afficher l'ensemble des tâches renvoyés en GET.
* Implémenter le test E2E de l'US

ID32 :
* Créer le fichier dodService.js contenant la fonction addDOD(name, rules), permettant d'ajouter et de modifier une tache via mongoDB.
* Implémenter le test de la fonction addDOD du fichier dodService.js, qui vérifie qu'elle ajoute bien une DOD en bd.
* Dans le fichier "routes/dod.js", créer la route POST "/addDOD" qui reçoit les données d'une DOD (name, rules) et ajoute la DOD en question à la bd via le service dodService.
* Créer le fichier addTask.ejs contenant un formulaire composé des champs "name", "description" et "userStory". Le formulaire envoie une requête POST avec ces trois champs à l'url "/addTask".
* Implémenter le test E2E de l'US

ID37 : 
ID31 :
ID33 :
* Dans le fichier dodService.js, créer la fonction updateDOD(name, rules) permettant de modifier un DOD en BD.
* Implémenter le test de la fonction updateDOD qui verifie que la modification du DOD a bien lieu en BD.
* Dans le fichier "routes/dod.js", créer la routes PUT "/updateDOD" qui reçoit les données d'un DOD (name, rules) et modifie le DOD en question dans la bd via le service dodService. 
* Implémenter le test de la route "/updateDOD" qui envoie une requête PUT et en vérifiant que le code de retour est bon (200).
* TODO ejs
* Implémenter le test E2E de l'US

 
|    ID    |         Nom          |  Issue   |  Dépendance   |
|----------|:---------------------|:--------:|--------------:|


---------------------

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
| ID11  | En tant que maintainer, je dois pouvoir ajouter une task en remplissant les champs nom, description et indiquer l'US liée dans un formulaire afin de l'ajouter au backlog. Je souhaite également qu'un id unique soit généré automatiquement. | 2 | 1 |
| ID45  | En tant que developer, je dois pouvoir afficher la liste des tâches afin de voir le travail à faire. | 2 | 1 |
| ID32  | En tant que maintainer je dois pouvoir créer une checklist DOD composée d'un nom et d'un liste de consignes afin de les attribuer aux task. | 2 | 1 |
| ID37  | En tant que maintainer, je souhaite pouvoir afficher les US dont la difficulté a déjà été estimée, regroupées par difficulté, ainsi que l'US que je souhaite estimer, afin d'estimer au mieux la difficulté de l'US | 3 | 3 |
| ID31  | En tant que developer effectuant n'importe quelle modification ou suppression, je dois pouvoir annuler ma manipulation avant qu'elle ne soit validée, afin de prévenir des erreurs. | 1 | 5 |
| ID33  | En tant que maintainer, je dois pouvoir modifier une checklist DOD afin de mettre à jour les étapes nécessaire à réaliser une task. | 2 | 1 |


