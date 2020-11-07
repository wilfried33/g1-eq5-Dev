# CdP g1-eq5

## Task1

### DoDs

DoD des tasks de développement (TDEV) :
* La tâche a été implémentée
* Le déploiement fonctionne
* La tâche de test correspondante est close
* Le code a été push
* Le test est passé
* Le résultat du test a été archivé

DoD des tasks de Test (TTES) :
* Le test a été implémenté
* Le code a été push
* Le test a été ajouté au fichier Test.md
* le statut de la tâche a été mis à jour dans Task.md

DoD des tasks de Design (TDES) :
* La tâche a été implémenté
* Le code a été push

Tasks générales (associées à l'ID00): 
* mettre en place outil automatisation tests : Jenkins ?

### Tasks

|    ID     | Issue | Nom                           | Dépendance                                                                                                             | Charge |
| --------- | :---: | :---------------------------- | ---------------------------------------------------------------------------------------------------------------------: | :----: |
|  TDES-01  | ALL   | Créer le fichier template.css contenant le CSS des éléments menu, progressBar, input(value, selector), button, list, tableau, hover, value, text, titre, sous titre | / |   4   |
|  TDES-02  | ALL   | Créer le fichier .gitignore | / |   4   |
|  TDES-03  | ALL   | Créer l'architecture de l'application en suivant la description présente dans le fichier Archi.md | / |   0.25   |
|  TDES-04  | ALL   | Créer le fichier app.js contenant le code de base pour lancer un serveur node, avec un appel à MongoDB | / |   0.5   
|  TDES-05  | ALL   | Créer le Dockerfile ainsi que le docker-compose.yml permettant de build l'application depuis n'importe quelle machine | TDES-04 |   2   |
|  TDES-06  | ALL   | Créer le linter dans le fichier .eslintrc.json | / |  1  |
|  TDES-07  | ALL   | Créer une template de l'interface utilisateur | / | 4 |
|  TDES-08  | ALL   | Mettre en place une intégration continue via Github Actions   | TDES-05 | 4
|  TDEV-01  | ID01  | Créer le fichier projectService.js contenant les fonctions addProject(name, key) permettant d'ajouter un projet via mongoDB si aucun fichier du même nom ou key n'existe pas déjà.                                                                                          | TTES-01| 0.5    |
|  TTES-01  | ID01  | Implémenter le tests de la fonction addProject du fichier projectService.js, qui vérifie qu'elle ajoute un projet en bd si aucun projet de même nom ou key n'existe pas, ou que cette fonction renvoie une erreur.                                                          | | 0.5    |
|  TDEV-02  | ID01  | Dans le fichier "routes/projects.js", créer la route GET "/projects/create" qui renvoie le formulaire du fichier addProject.ejs.                     | TTES-02 | 0.5    |
|  TTES-02  | ID01  | Implémenter le test de la route GET "/projects/create" qui envoie une requête et vérifie que le retour est bon. | |   0.5     |
|  TDEV-03  | ID01  | Dans le fichier "routes/projects.js", créer la route POST "/projects" qui reçoivent les données d'un projet (name et key) et ajoute le projet en question à la base de donnée via le service projectService. Si il existe déjà un projet avec le même nom ou la même key, le retour sera 400.                                                               | TTES-03 | 0.5     |
|  TTES-03  | ID01  | Implémenter le test de la route POST "/projects" qui envoie une requête qui et vérifie que le code de retour est bon (200). Le test s'assurera également que si un élément contenant la même key ou le même nom est ajouté, le code de retour soit 400.                        | |   0.5     |
|  TDEV-04  | ID01  | Créer le fichier addProject.ejs contenant un formulaire composé des champs "nom" et "key". Le formulaire envoie une requête POST avec ces deux champs à l'url "/projects".                                                                                                  |  | 1      |
|  TDEV-05  | ID01  | Dans le fichier projectService.js, ajouter le fonction updateProject(name, key) permettant de modifier le titre du projet de key "key" via mongoDB.  | TTES-04 |    0.5    |
|  TTES-04  | ID01  | Implémenter le tests de la fonction updateProject du fichier projectService.js, qui vérifie qu'elle modifie un projet en bd.                         | |    0.5    |
|  TDEV-06  | ID01  | Dans le fichier "routes/projects.js", créer la route PUT "/projects" qui reçoit les données d'un projet (name et key) et modifient le projet en question à la base de donnée via le service projectService. Le code 400 sera retourné si l'US à modifier n'existe pas.                                                                 | TTES-05 |    0.5    |
|  TTES-05  | ID01  | Implémenter le test de la route PUT "/projects" qui envoie une requête qui et vérifie que le code de retour est bon (200). Le test s'assurera également que si l'US à modifier n'existe pas, le code de retour soit 400.                         | |    0.5    |
|  TDEV-07  | ID01  | Dans le fichier project.ejs, ajouter un bouton "Modifier" pour chaque projet qui affiche un formulaire composé des champs, avec valeur "nom" et "key". Le formulaire envoie une requête PUT avec ces deux champs à l'url "/projects".                                      | | 1      |
|  TDES-09  | ID01  | Ecrire le scénario du test e2e en Gherkin dans le fichier "test/e2e/ID01.feature"             | | 0.25   |
|  TTES-06  | ID01  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID01.feature"                                                                                                              | TTES-09| 1.5    |
|  TDEV-08  | ID30  | Créer dans le fichier projectService.js, la fonction getProjectList() qui renvoie la liste des projets présents en bd.                               | TTES-07 |    0.5    |
|  TTES-07  | ID30  | Implémenter le test de la fonction getProjectList du fichier projectService.js, qui vérifie qu'elle renvoie la liste des projets présents en bd.                         | |    0.5    |
|  TDEV-09  | ID30  | Dans le fichier "routes/projects.js", créer la route GET "/projects" qui renvoie la liste des projets via le projectService.                         | TTES-08 |    0.5    |
|  TTES-08  | ID30  | Implémenter les tests de la route "/projects" qui envoie une requête GET et qui vérifie que le retour est bien un projet existant.                 | |    0.5    |
|  TDEV-10  | ID30  | Créer le fichier projects.ejs permettant d'afficher les projets renvoyés en GET. Chaque projet est sélectionnable afin d'aller respectivement sur sa page du backlog.                                                                                                       | |    1    |
|  TDES-10  | ID30  | Ecrire le scénario du test e2e en Gherkin dans le fichier "test/e2e/ID30.feature"             | |    0.25    |
|  TTES-09  | ID30  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID30.feature"                                                                                                                    | TDES-10 |   1    |
|  TDEV-11  | ID28  | Créer le fichier header.ejs contenant la bar de navigation, avec des liens vers les pages "Projets", "Backlog", "Kanban", "Planning", "Releases" et "Tests".                                                                                                                | |   1.5    |
|  TDES-11  | ID28  | Ecrire le scénario du test e2e en Gherkin dans le fichier "test/e2e/ID28.feature"             | |    0.25    |
|  TTES-10  | ID28  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID28.feature"                                                                                                                     | TDES-11 |    1.5    |
|  TDEV-12  | ID02  | Créer le fichier backlogService.js contenant la fonction addUserStory(project, name, description) permettant d'ajouter une US en bd. Cette fonction génère un id unique et l'attribut à l'US.                                                                               | TTES-11 |    0.5    |
|  TTES-11  | ID02  | Implémenter le test de la fonction addUserStory du fichier backlogService.js, qui vérifie qu'elle ajoute bien une US en bd.                          | |    0.5    |
|  TDEV-12  | ID02  | Dans le fichier "routes/backlog.js", créer la route GET "/userStories" qui renvoie le formulaire du fichier addUserStory.ejs                         | TTES-12 |    1    |
|  TDEV-13  | ID02  | Dans le fichier "routes/backlog.js", créer la route POST "/userStories" qui reçoit les données d'une US (project, name et description) et ajoute l'US en question à la bd via le service backlogService .                                                                    | TTES-12 |    0.5    |
|  TTES-12  | ID02  | Implémenter le test des routes "/userStories" qui envoie des requêtes GET et POST et qui vérifie que le code de retour est bon (200).                     | |    0.5    |
|  TDEV-14  | ID02  | Créer le fichier addUserStory.ejs contenant un formulaire composé des champs "name", "description" et "project". Le formulaire envoie une requête POST avec ces deux champs à l'url "/userStories".                                                                         | |    1    |
|  TDES-11  | ID02  | Ecrire le scénario du test e2e en Gherkin dans le fichier "test/e2e/ID02.feature"             | |    0.25    |
|  TTES-13  | ID02  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID02.feature"                                                                                                                 | TDES-11|    1.5    |
|     | ID03  | Dans le fichier backlogService.js, créer la fonction updateUserStory(id, name, description, priority, difficulty) permettant de modifier une US en BD. Ce service ne modifie l'US que si aucune task n'est liée à cette US. Sinon elle renvoie une erreur                   | |        |
|     | ID03  | Implémenter le test de la fonction updateUserStory qui vérifie que la modification de l'US a bien lieu en BD dans le cas où aucune tâche n'est liée à cette US                                                                                                              | |        |
|     | ID03  | Implémenter le test de la fonction updateUserStory qui vérifie que la fonction envoie une erreur si une tâche est associée à cette US.               | |        |
|     | ID03  | Dans le fichier "routes/backlog.js", créer la routes PUT "/userStories" qui reçoit les données d'une US (id, name, description, priority, difficulty) et modifie l'US en question dans la bd via le service backlogService.                                                 | |        |
|     | ID03  | Implémenter le test de la route "/userStories" qui envoie une requête PUT et qui vérifie que le code de retour est bon (200).                      | |        |
|     | ID03  | Dans le fichier backlogService.js, créer la fonction deleteUserStory(id) permettant de supprimer une US en BD. Ce service ne supprimer l'US que si aucune task n'est liée à cette US. Sinon elle renvoie une erreur                                                         | |        |
|     | ID03  | Implémenter le test de la fonction deleteUserStory qui vérifie que la modification de l'US a bien lieu en BD dans le cas où aucune tâche n'est liée à cette US                                                                                                              | |        |
|     | ID03  | Implémenter le test de la fonction deleteUserStory qui vérifie que la fonction envoie une erreur si une tâche est associée à cette US.               | |        |
|     | ID03  | Dans le fichier "routes/backlog.js", créer la routes DELETE "/userStories/:id" qui reçoit les données d'une US (id) et modifie l'US en question dans la bd via le service backlogService.                                                                                   | |        |
|     | ID03  | Implémenter le test de la route "/userStories/:id" qui envoie une requête DELEet TE qui vérifie que le code de retour est bon (200).               | |        |
|     | ID03  | TODO ejs                      | |        |
|     | ID03  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID03  | TODO scénario                 | |        |
|     | ID05  | Dans le fichier backlogService.js, créer la fonction setUserStorySprint(id, sprintId) permettant d'attribuer un sprint à une US en BD. Si l'US ou le sprint n'existe pas, la fonction renvoie un erreur.                                                                    | |        |
|     | ID05  | Implémenter le test de la fonction setUserStorySprint qui vérifie que l'attribution du sprint d'une US a bien lieu en BD lorsque l'US ou le sprint existent.                                                                                                                | |        |
|     | ID05  | Implémenter les tests de la fonction setUserStorySprint qui vérifient qu'une erreur est renvoyée si le sprint (resp. l'US) n'existe pas.             | |        |
|     | ID05  | Dans le fichier "routes/backlog.js", créer la routes PUT "/userStorySprint" qui reçoit les données l'id de l'US et l'id du sprint et ajoute l'US au sprint en question service backlogService.                                                                              | |        |
|     | ID05  | Implémenter le test de la route "/userStorySprint" qui envoie une requête PUT qui vérifie que le code de retour est bon (200).                   | |        |
|     | ID05  | Dans le fichier backlog.js, implémenter la séléction de plusieurs US via CTRL + click ou SHIFT + click ainsi que le glisser-déposer une/des US dans un sprint.                                                                                                              | |        |
|     | ID05  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID05  | TODO  scénario                | |        |
|     | ID46  | Dans le fichier backlog.js, calculer et afficher dans backlog.ejs, au niveau de chaque sprint la vélocité prévue et, si le sprint a commencé ou est terminé, la vélocité réelle. Si au moins un sprint a été terminé, afficher un bandeau d'avertissement si la vélocité réelle de/des sprint(s) passé(s) est plus de 15% plus élevée ou plus basse que la vélocité moyenne des sprints précédents | |        |
|     | ID46  | Implémenter le test E2E de l'US TODO scénario                                                                                                        | |        |
|     | ID06  | Dans le fichier backlogService.js contenant la fonction addSprint(name, dateBegin, dateEnd). Un id unique est également attribué.                    | |        |
|     | ID06  | Implémenter le test de la fonction addSprint du fichier backlogService.js, qui vérifie qu'elle ajoute bien un sprint en bd.                          | |        |
|     | ID06  | Dans le fichier "routes/backlog.js", créer la routes POST "/sprints" qui reçoit les données d'un sprint (name, date de début et date de fin) et ajoute le sprint en question à la bd via le service backlogService.                                                         | |        |
|     | ID06  | Implémenter le test de la route "/sprints" qui envoie une requête POST qui vérifie que le code de retour est bon (200).                          | |        |
|     | ID06  | Dans le fichier backlog.ejs, ajouter un bouton "Ajouter Sprint" qui permet d'afficher un formulaire composé des champs "name", "date de début" et "date de fin". Le formulaire envoie une requête POST avec ce champs à l'url "/sprints".                                   | |        |
|     | ID06  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID06  | TODO scénario                 | |        |
|     | ID07  | Dans le fichier backlogService.js, créer la fonction updateSprint(id, name) permettant de modifier une US en BD. Ce service ne modifie le sprint que si aucune issue n'est plannifiée dans le sprint.                                                                       | |        |
|     | ID07  | Implémenter le test de la fonction updateSprint qui vérifie que la modification du sprint a bien lieu en BD.                                         | |        |
|     | ID07  | Dans le fichier "routes/backlog.js", créer la routes PUT "/sprints/" qui reçoit les données d'un sprint (id, name) et modifie le sprint en question dans la bd via le service backlogService.                                                                               | |        |
|     | ID07  | Implémenter le test de la route "/sprints" qui envoie une requête PUT qui vérifie que le code de retour est bon (200).                           | |        |
|     | ID07  | Dans le fichier backlog.ejs, ajouter un bouton "Modifier" pour chaque Sprint qui permet d'afficher un formulaire composé d'un champ "name" Le formulaire envoie une requête PUT avec ce champs et l'id du sprint à l'url "/sprints". Ajouter aussi un bouton "supprimer" qui envoie une requête DELETE avec l'id du sprint à l'url "/sprints/:id"                                                  | |        |
|     | ID07  | Dans le fichier backlogService.js, créer la fonction deleteSprint(id) permettant de modifier une US en BD. Ce service ne modifie le sprint que si aucune issue n'est plannifiée dans le sprint.                                                                             | |        |
|     | ID07  | Implémenter le test de la fonction deleteSprint qui vérifie que la suppression du sprint a bien lieu en BD.                                          | |        |
|     | ID07  | Dans le fichier "routes/backlog.js", créer la routes DELETE "/sprints/:id" qui reçoit les données d'un sprint (id) et supprime le sprint en question dans la bd via le service backlogService.                                                                              | |        |
|     | ID07  | Implémenter le test de la route "/sprints/:id" qui envoie une requête DELETE qui vérifie que le code de retour est bon (200).                    | |        |
|     | ID07  | Implémenter le test E2E de l'US TODO scénario                                                                                                        | |        |
|     | ID09  | Dans dans le fichier backlogService.js, créer la fonction getBacklog() qui renvoie la liste des sprints présent en bd avec les issues qu'ils contiennent, ainsi que les US n'appartenant à aucun sprint.                                                                    | |   0.5  |
|     | ID09  | Dans le fichier "routes/backlog.js", créer la route GET "/backlog" qui renvoie le backlog via le backlogService.                                     | |   0.5  |
|     | ID09  | Implémenter les tests de la route "/backlog" qui envoie une requête GET et qui vérifie que le retour est bien le backlog existant.                 | |   0.5  |
|     | ID09  | Créer le fichier backlog.ejs permettant d'afficher l'ensemble du backlog (US composant les sprints et US restantes) renvoyés en GET.                 | |    2   |
|     | ID09  | Implémenter le test E2E de l'US TODO scénario                                                                                                        | |        |
|     | ID10  | Dans dans le fichier backlogService.js, créer la fonction getIssueById(id) qui renvoie l'issue ayant l'id passé en paramètre.                        | |   0.5  |
|     | ID10  | Dans le fichier "routes/backlog.js", créer la route GET "/userStories/:id" qui renvoie l'US ayant l'id ":id" via le backlogService. Si l'id est inexistant un code d'erreur 400 est retourné.                                                                               | |   0.5   |
|     | ID10  | Implémenter les tests de la route "/userStories/:id" qui envoie une requête GET et avec un id existant qui vérifie que le retour est bien l'US concernée. Le test vérifie également que si l'id est eronné, l'erreur 400 est renvoyée.                                    | |   0.5  |
|     | ID10  | Créer le fichier userStory.ejs permettant d'afficher une US (id, name, description, priority, difficulty). Le fichier contient un bouton "Modifier" qui permet d'afficher un formulaire avec les champs (name, description, priority, difficulty) qui envoie une requète PUT à l'url "uerStories".                                       | |   2    |
|     | ID10  | Dans le fichier backlog.ejs, chaque US doit être selectionnable qui envoie une requête GET à l'url "/userStories/:id" où id est l'id de l'US.        | |   1.5  |
|     | ID10  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID11  | Créer le fichier taskService.js contenant les fonctions addTask(name, description, userStory), permettant d'ajouter une tache via mongoDB. Cette fonction génère un id unique et l'attribut à la tache.                                                                     | |   0.5  |
|     | ID11  | Implémenter le test de la fonction addTask du fichier taskService.js, qui vérifie qu'elle ajoute bien une tache en bd.                               | |  0.5   |
|     | ID11  | Dans le fichier "routes/tasks.js", créer la route GET "/tasks/create" qui renvoie le formulaire du fichier addTask.ejs                               |  |  0.5   |
|     | ID11  | Dans le fichier "routes/tasks.js", créer la routes POST "/tasks" qui reçoit les données d'une tache (name, description, userStory) et ajoute la tache en question à la bd via le service taskService.                                                                       | |  0.5   |
|     | ID11  | Implémenter le test de la route "/tasks" qui envoie une requête POST et  qui vérifie que le code de retour est bon (200).                           | |  0.5   |
|     | ID11  | Créer le fichier addTask.ejs contenant un formulaire composé des champs "name", "description" et d'un sélecteur de userStory. Le formulaire envoie une requête POST avec ces trois champs à l'url "/tasks".                                                                 | |   1    |
|     | ID11  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID11  | TODO scénario                 | |        |
|     | ID11  | Dans le fichier taskService.js, ajouter la fonction updateTask(id, name, description, userStory), permettant de modifier une tache via mongoDB.      | |  0.5   |
|     | ID11  | Implémenter le test de la fonction updateTask qui vérifie que la modification de la tache a bien lieu en BD.                                         | |  0.5   |
|     | ID11  | Dans le fichier "routes/tasks.js", créer la route PUT "/tasks" qui reçoit les données d'une tache (id, name, description, userStory) et modifie la tache en question dans la bd via le service taskService.                                                                 | |   0.5  |
|     | ID11  | Implémenter le test de la route "/tasks" qui envoie une requête PUT et qui vérifie que le code de retour est bon (200).                            | |  0.5   |
|     | ID11  | Dans le fichier tasks.ejs, ajouter un bouton "Modifier" pour chaque task qui affiche un formulaire composé des champs, avec valeur, "name", "description" et d'un sélecteur de userStory. Le formulaire envoie une requête PUT avec ces trois champs à l'url "/tasks"       | |   1    |
|     | ID11  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID11  | TODO scénario                 | |        |
|     | ID45  | Dans dans le fichier taskService.js, créer la fonction getTasks() qui renvoie la liste des tâches présent en bd.                                     | |  0.5   |
|     | ID45  | Dans le fichier "routes/tasks.js", créer la route GET "/tasks" qui renvoie la liste des tâches via le taskService.                                   | |  0.5   |
|     | ID45  | Implémenter les tests de la route "/tasks" qui envoie une requête GET et qui vérifie que le retour est bien la liste des tâches existant.          | |  0.5   |
|     | ID45  | Créer le fichier tasks.ejs permettant d'afficher l'ensemble des tâches renvoyés en GET.                                                              | |   2    |
|     | ID45  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID45  | TODO scénario                 | |        |
|     | ID32  | Créer le fichier dodService.js contenant la fonction addDOD(name, rules), permettant d'ajouter une tache via mongoDB.                                | |  0.5   |
|     | ID32  | Implémenter le test de la fonction addDOD du fichier dodService.js, qui vérifie qu'elle ajoute bien une DOD en bd.                                   | |  0.5   |
|     | ID32  | Dans le fichier "routes/dods.js", créer la route POST "/dods" qui reçoit les données d'une DOD (name, rules) et ajoute la DOD en question à la bd via le service dodService.                                                                                                | |   0.5   |
|     | ID32  | Créer le fichier addDOD.ejs contenant un formulaire composé des champs "name", "rules". Le formulaire envoie une requête POST avec ces deux champs à l'url "/dods".                                                                                                         | |   1   |
|     | ID32  | TODO ejs                      | |        |
|     | ID32  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID32  | TODO scénario                 | |        |
|     | ID37  | Dans le fichier backlogService.js, créer la fonction getUSByDifficulty() qui retourne un tableau de liste d'US organisé par difficulté.                                         | |     |
|     | ID37  | Implémenter le test de la fonction getUSByDifficulty qui vérifie que la fonction renvoie bien les US par difficulté.                                               | |     |
|     | ID37  | Dans le fichier "routes/backlog.js", créer la routes GET "/backlog/byDifficulty" qui renvoie un tableau de liste d'US trié par estimation de charge via le backlogService.                                                                                             | |     |
|     | ID37  | Implémenter le test de la route "/backlog/byDifficulty" qui envoie une requête GET qui vérifie que le retour est bien le tableau attendu.                               | |  0.5   |
|     | ID37  | Créer le fichier difficulty.ejs permettant d'afficher l'ensemble des US en colonne. Une colonne correspond a un niveau de difficulté des US. Au dessus de cela il y aura l'US (id, nom) que l'on souhaite estimer. Un slider permettra d'estimer la difficulté de l'US. le slider fera ensuite un PUT userStories.                     | |        |
|     | ID37  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID37  | TODO scénario                 | |        |
|     | ID31  | TODO                              | |        |
|     | ID33  | Dans le fichier dodService.js, créer la fonction updateDOD(name, rules) permettant de modifier un DOD en BD.                                         | |  0.5   |
|     | ID33  | Implémenter le test de la fonction updateDOD qui vérifie que la modification du DOD a bien lieu en BD.                                               | |  0.5   |
|     | ID33  | Dans le fichier "routes/dod.js", créer la routes PUT "/dods" qui reçoit les données d'un DOD (name, rules) et modifie le DOD en question dans la bd via le service dodService.                                                                                              | |  0.5   |
|     | ID33  | Implémenter le test de la route "/dods" qui envoie une requête PUT qui vérifie que le code de retour est bon (200).                               | |  0.5   |
|     | ID33  | TODO ejs                      | |        |
|     | ID33  | Implémenter le test E2E de l'US                                                                                                                      | |        |
|     | ID33  | TODO scénario                 | |        |
