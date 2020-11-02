# CdP g1-eq5

## Task1

-Création de la table "Project" dans la base de données
-Création du fichier "createProject.ejs"
-Création du fichier "listProjects.ejs"
-Création du fichier "header.ejs"
-Création de la table "UserStory" dans la base de données
-Création du fichier "createUS.ejs"
-Création du fichier "listUS.ejs"


DoD :
* Le code a été écrit
* Le deploiement fonctionne
* Le test correspondant est passé.


ID01 : 
* Créer le fichier projectService.js contenant les méthodes addProject(name, key) et updateProject(name, key), permettant d'ajouter et de modifier un projet via mongoDB.
* Tester les méthodes addProject et updateProject du fichier projectService.js, en vérifiant qu'elles ajoutent et modifie respectivement un projet en bd.
* Dans le fichier "routes/project.js" créer les route post "/project" et "/updateProject" qui reçoivent les données d'un projet (nom et key) et ajoute/modifie le proejt en question à la base de donnée via le service projectService. 
* Test de la route
* Création du fichier addProject.ejs contenant un formulaire composé des champs "nom" et "key". Le formulaire envoie un requête post avec ces deux champs à l'url "/projects".
* Test du fichier addProject.ejs, lorsque l'on remplie le formulaire, une requête post doit être envoyé à l'url "/projects" avec les champs "nom" et "key"
* 
|    ID    |         Nom          |  Issue   |  Dépendance   |
|----------|:---------------------|:--------:|--------------:|
|  TDEV01  | Création du fichier addProject.ejs contenant un formulaire composé des champs "nom" et "key". Le formulaire envoie un requête post avec ces deux champs à l'url "/projects". | ID01 | / |
|  TTES01  | Test du fichier addProject.ejs, lorsque l'on remplie le formulaire, une requête post doit être envoyé à l'url "/projects" avec les champs "nom" et "key". | ID01 | TTDEV01 |
