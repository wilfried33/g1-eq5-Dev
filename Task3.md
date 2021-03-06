# CdP g1-eq5

## Task2

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
    
DoD des tasks de Design (TDES) :
* La tâche a été implémenté
* Le code a été push

**Attention !** Ce fichier ne correspond pas à l'ensemble des tâches du sprint 3, uniquement les tâches ajoutée aux tâches restantes du sprint 2.
C'est le rôle de notre [trello](https://trello.com/b/QI9ZO4zD/sprint-3). S'il ne vous est pas accessible, une invitation est disponible sur slack.  
Le tableau ci-dessous constitue donc une **archive** de notre travail.

### Tasks

| ID      | Issue | Nom                                                                                                                                                                                                                                                       | Dépendances      | Charge estimée | Charge réelle  | Ressource    | Statut |
| ------- | :---: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------------: | :------------: | :------------: |:-----------: | :----: |
| TDEV-63 | ID12  | Créer les service updateTask et deleteTask dans le fichier taskService. Une task n'est modifiable ou supprimable que si aucun développeur n'est assigné. L'ensemble des champs de task sont modifiables, excepté son id.                                  | TTES-55          | 1              |                |              | TODO   |
| TTES-55 | ID12  | Implémenter le test des fonction updateTask et deleteTask qui vérifie que la modification/suppression a bien lieu en BD.                                                                                                                                  | /                | 1              |                |              | TODO   |
| TDEV-64 | ID12  | Créer les routes PUT "/task" et DELETE "/task" permettant la modification et la suppression via les taskService.                                                                                                                                          | TTES-56          | 0.5            |                |              | TODO   |
| TTES-56 | ID12  | Implémenter le test des routes PUT "/task" et DELETE "/task"  qui envoie une requête et vérifie que le code de retour est bon (200) excepté si des paramètres sont manquant ou invalide.                                                                  | /                | 1              |                |              | TODO   |
| TDEV-65 | ID12  | Modifier le fichier task.ejs en ajoutant la possibilité de supprimer et modifier une task (ensemble des champs excepté id). Ces boutons/formulaire appellerons les routes PUT et DELETE /task.                                                            | /                | 1.5            |                |              | TODO   |
| TDES-26 | ID12  | Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID12.feature"                                                                                                                                                                         | /                | 0.25           |                |              | TODO   |
| TTES-57 | ID12  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID12.feature"                                                                                                                                                                            | TDES-26          | 2              |                |              | TODO   |
| TDEV-66 | ID34  | Modifier le fichier task.ejs qui met une task à done lorsque les items de le checklist dod sont validé. Via la route /task/status.                                                                                                                        | TDEV-70          | 0.5            |                |              | TODO   |
| TDES-27 | ID34  | Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID34.feature"                                                                                                                                                                         | /                | 0.25           |                |              | TODO   |
| TTES-58 | ID34  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID34.feature"                                                                                                                                                                            | TDES-27          | 1              |                |              | TODO   |
| TDEV-67 | ID36  | Créer le service checkTaskDod qui permet de cocher un item du dod d'une task. Également créer une route PUT /dod/check appellant le service.                                                                                                              | TTES-59          | 0.5            |                |              | TODO   |
| TTES-59 | ID36  | Implémenter le test de la fonction checkTaskDod qui vérifie que la modification a bien lieu en BD. Également implémenter le test de la route PUT /dod/check qui vérifie que le code de retour est bien 200 ou 400 en fonction des paramètres.             | /                | 0.5            |                |              | TODO   |
| TDEV-68 | ID36  | Modifier le fichier task.ejs en permettant de cocher les cases du dod et en appellant la route PUT "/dod/check" à chaque fois.                                                                                                                            | /                | 1.5            |                |              | TODO   |
| TDES-28 | ID36  | Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID36.feature"                                                                                                                                                                         | /                | 0.25           |                |              | TODO   |
| TTES-60 | ID36  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID36.feature"                                                                                                                                                                            | TDES-28          | 1              |                |              | TODO   |
| TDEV-69 | ID18  | Créer le service addDeveloper qui permet la création d'un développeur. Également créer une route POST /developer appellant le service.                                                                                                                    | TTES-61          | 0.5            |                |              | TODO   |
| TTES-61 | ID18  | Implémenter le test de la fonction addDeveloper qui vérifie que l'ajout a bien lieu en BD. Également implémenter le test de la route POST /developer qui vérifie que le code de retour est bien 201 ou 400 en fonction des paramètres.                    | /                | 0.5            |                |              | TODO   |
| TDEV-70 | ID18  | Créer le fichier addDeveloper.ejs permettant la création d'un développeur via un formulaire et la route POST "/developer".                                                                                                                                | /                | 1              |                |              | TODO   |
| TDES-29 | ID18  | Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID18.feature"                                                                                                                                                                         | /                | 0.25           |                |              | TODO   |
| TTES-62 | ID18  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID18.feature"                                                                                                                                                                            | TDES-29          | 0.75           |                |              | TODO   |
| TDEV-71 | ID13  | Créer le service updateTaskStatus qui permet de modifier le status d'une task. Également créer une route PUT /task/status appellant le service.                                                                                                           | TTES-63          | 0.5            |                |              | TODO   |
| TTES-63 | ID13  | Implémenter le test de la fonction updateTaskStatus qui vérifie que la modification bien lieu en BD. Également implémenter le test de la route PUT /task/status qui vérifie que le code de retour est bien 200 ou 400 en fonction des paramètres.         | /                | 0.5            |                |              | TODO   |
| TDEV-72 | ID13  | Modifier le fichier task.ejs en ajoutant la possibilité de bouger le task via glissé-déposé. Ceci enverra une requête vers PUT /task/status.                                                                                                              | /                | 1              |                |              | TODO   |
| TDES-30 | ID13  | Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID13.feature"                                                                                                                                                                         | /                | 0.25           |                |              | TODO   |
| TTES-64 | ID13  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID13.feature"                                                                                                                                                                            | TDES-30          | 1              |                |              | TODO   |
| TDEV-73 | ID17  | Modifier le fichier backlog.ejs en ajoutant un burndown chart via la librairie charts.js et des appels aux routes existantes pour avoir les données des sprints.                                                                                          | /                | 4              |                |              | TODO   |
| TDES-31 | ID17  | Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID17.feature"                                                                                                                                                                         | /                | 0.25           |                |              | TODO   |
| TTES-55 | ID17  | Implémenter le test E2E de l'US décrit dans le fichier "test/e2e/ID17.feature"                                                                                                                                                                            | TDES-31          | 1              |                |              | TODO   |
