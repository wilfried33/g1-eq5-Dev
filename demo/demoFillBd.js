/* eslint-disable no-unused-vars */
const db = require('../config/db');

const backlog = require('../src/services/backlogService');
const developer = require('../src/services/developerService');
const dod = require('../src/services/dodService');
const task = require('../src/services/taskService');
const project = require('../src/services/projectService');

const TDES = '0';
const TTES = '1';
const TDEV = '2';

require('../src/app');

async function fillBD(){
    await db.emptyCollections();

    const cdp = await project.addProject('Mise en abyme - conduite de projet', 'CDP');
    project.addProject('Projet web', 'WEB');

    const oldSprint = (await backlog.addSprint(cdp, 'Vieux sprint', '2020-11-30', '2020-12-11'))
        .backlog.sprints[0];

    const bigDone = await backlog.addUserStory(cdp, 'Navigation', descrUs[0]); //US28
    const smallDone1 = await backlog.addUserStory(cdp, 'Ajout Task', descrUs[1]); //US11
    const bigFailed = await backlog.addUserStory(cdp, 'Interface d\'estimation d\'US', descrUs[4]); //US37
    const smallDone2 = await backlog.addUserStory(cdp, 'Calcul de vélocité', descrUs[3]); //US46
    const smallToDo = await backlog.addUserStory(cdp, 'Burn-down chart', descrUs[5]); //US17
    const bigToDo = await backlog.addUserStory(cdp, '(Dé)cocher Dods', descrUs[4]); //US36

    await [bigDone, smallDone1, smallDone2, bigFailed].map(
        async (us) => await backlog.setUSSprint(cdp, us._id, oldSprint._id)
    );

    const dep = [];
    const tasksDone = [
        await task.addTask(cdp, TDEV, 'header.ejs', descrTask.bigDone[0], bigDone, 1, dep),
        await task.addTask(cdp, TDES, 'design e2e gherkin header', descrTask.bigDone[1], bigDone, 1, dep),
        await task.addTask(cdp, TTES, 'code e2e header', descrTask.bigDone[2], bigDone, 2, dep),
        await task.addTask(cdp, TDEV, 'service add task', descrTask.smallDone1[0], smallDone1, 1, dep),
        await task.addTask(cdp, TTES, 'test service add task', descrTask.smallDone1[1], smallDone1, 1, dep),
        await task.addTask(cdp, TDEV, 'velocity display', descrTask.smallDone1[0], smallDone2, 6, dep),
        // await task.addTask(cdp, TTES, 'velocity e2e test', descrTask.smallDone2[1], smallDone2, 2, dep),
    ];
    await tasksDone.map((v) => task.updateTaskStatus(v._id, 2));

    const tasksFailed = [
        await task.addTask(cdp, TDEV, 'service to compare us difficulties', descrTask.bigFailed[0], bigFailed, 1, dep),
        await task.addTask(cdp, TTES, 'test service to compare us difficulties', descrTask.bigFailed[1], bigFailed, 1, dep),
        await task.addTask(cdp, TDEV, 'route to compare us difficulties', descrTask.bigFailed[2], bigFailed, 1, dep),
    ];
    await task.updateTaskStatus(tasksFailed[0], 1);

    const tasksToDo = [
        await task.addTask(cdp, TDEV, 'service checkTaskDod', descrTask.bigToDo[0], bigToDo, 1, dep),
        await task.addTask(cdp, TTES, 'test service checkTaskDod', descrTask.bigToDo[1], bigToDo, 1, dep),
        await task.addTask(cdp, TDEV, 'ejs checkTaskDod', descrTask.bigToDo[2], bigToDo, 2, dep),
        await task.addTask(cdp, TDES, 'gherkin checkTaskDod', descrTask.bigToDo[3], bigToDo, 1, dep),
        await task.addTask(cdp, TTES, 'code e2e checkTaskDod', descrTask.bigToDo[4], bigToDo, 1, dep),
        await task.addTask(cdp, TDEV, 'ejs burndown', descrTask.smallToDo[0], smallToDo, 4, dep),
    ];

    const [alice, louis] = [
        await developer.addDeveloper('Alice ANDRES'),
        await developer.addDeveloper('Louis JOLLIET')
    ];

    await developer.setDeveloperInProject(cdp, louis, '0');
    await task.updateTaskDeveloper(tasksFailed[0]._id, louis.id);

    const devDod = await dod.addDod(cdp, 'DoD des tasks de développement (TDEV)', 
        [
            'La tâche a été implémentée',
            'Le déploiement fonctionne',
            'La tâche de test correspondante est close',
            'Le code a été push',
            'Le test est passé',
            'Le résultat du test a été archivé'
        ].join('\r\n'));
}

fillBD()
    .then(() => console.log('DB successfully filled'))
    .catch((e) => console.log('Error filling the DB : ' + e));

const descrUs = ['En tant que développeur, je dois pouvoir à partir de n\'importe quelle page, accéder aux pages "Projets" "Backlog", "Kanban", "Planning", "Releases", "Tests" afin de naviguer sur le site.',
    'En tant que maintainer, je dois pouvoir ajouter une task en remplissant les champs nom, description et indiquer l\'US liée dans un formulaire afin de l\'ajouter au backlog. Je souhaite également qu\'un id unique soit généré automatiquement.',
    'En tant que maintainer, je dois pouvoir afficher la vélocité correspondant aux tâches planifiées et aux tâches réalisées pour chaque sprint. Si un sprint a déjà été terminé et que la vélocité planifiée pour un sprint suivant est vraiment plus grande ou plus petite que pour le(s) sprint(s) terminé(s), je dois en être averti. Cela afin de pouvoir planifier le travail de développement de manière réaliste.',
    'En tant que maintainer, je souhaite pouvoir afficher les US dont la difficulté a déjà été estimée, regroupées par difficulté, ainsi que l\'US que je souhaite estimer, afin d\'estimer au mieux la difficulté de l\'US',
    'En tant que maintainer, je dois consulter le burn down chart en cliquant sur un bouton dédié afin de voir l\'avancement général du projet.',
    'En tant que developer, je dois pouvoir cocher et décocher différents items de la checklist "Definition of Done" d\'une task afin de pouvoir fermer une task si tous les items sont cochés.'
];

const descrTask = {
    bigDone : [
        'Créer le fichier "views/header.ejs" contenant la bar de navigation, avec des liens vers les pages "Projets", "Backlog", "Kanban", "Planning", "Releases" et "Tests".',
        'Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID28.feature"',
        'Implémenter le test E2E de l\'US décrit dans le fichier "test/e2e/ID28.feature"'
    ],
    smallDone1: [
        'Créer le fichier "services/taskService.js" contenant les fonctions addTask(name, description, userStory), permettant d\'ajouter une tâche via mongoDB. Cette fonction génère un id unique et l\'attribut à la tache.',
        'Implémenter le test de la fonction addTask du fichier "services/taskService.js", qui vérifie qu\'elle ajoute bien une tache en bd.'
    ],
    smallDone2:
    [
        'Dans le fichier "views/js/backlog.js", calculer et afficher dans "views/backlog.ejs", au niveau de chaque sprint la vélocité prévue et, si le sprint a commencé ou est terminé, la vélocité réelle. Si au moins un sprint a été terminé, afficher un bandeau d\'avertissement si la vélocité réelle de/des sprint(s) passé(s) est plus de 15% plus élevée ou plus basse que la vélocité moyenne des sprints précédents',
        'Implémenter le test E2E de l\'US décrit dans le fichier "test/e2e/ID46.feature"'
    ],
    bigFailed: [
        'Dans le fichier "services/backlogService.js", créer la fonction getUSByDifficulty() qui retourne un tableau de liste d\'US organisé par difficulté.',
        'Implémenter le test de la fonction getUSByDifficulty qui vérifie que la fonction renvoie bien les US par difficulté.',
        'Dans le fichier "routes/backlog.js", créer la routes GET "/backlog/byDifficulty" qui renvoie un tableau de liste d\'US trié par estimation de charge via le backlogService.'
    ],
    bigToDo: [
        'Créer le service checkTaskDod qui permet de cocher un item du dod d\'une task. Également créer une route PUT /dod/check appellant le service.',
        'Implémenter le test de la fonction checkTaskDod qui vérifie que la modification a bien lieu en BD. Également implémenter le test de la route PUT /dod/check qui vérifie que le code de retour est bien 200 ou 400 en fonction des paramètres.',
        'Modifier le fichier task.ejs en permettant de cocher les cases du dod et en appellant la route PUT "/dod/check" à chaque fois.',
        'Écrire le scénario du test E2E en Gherkin dans le fichier "test/e2e/ID36.feature"',
        'Implémenter le test E2E de l\'US décrit dans le fichier "test/e2e/ID36.feature"'
    ],
    smallToDo: ['Modifier le fichier backlog.ejs en ajoutant un burndown chart via la librairie charts.js et des appels aux routes existantes pour avoir les données des sprints.']
};