const db = require('../config/db');

const backlog = require('../src/services/backlogService');
const developper = require('../src/services/developerService');
const dod = require('../src/services/dodService');
const task = require('../src/services/taskService');
const project = require('../src/services/projectService');

require('../src/app');

async function fillBD(){
    await db.emptyCollections();

    project.addProject('Projet web', 'WEB');
    const cdp = await project.addProject('Mise en abyme - conduite de projet', 'CDP');

    const oldSprint = await backlog.addSprint(cdp, 'Vieux sprint', '2020-11-30', '2020-12-11');

    const [bigDone, smallDone1, bigFailed, smallDone2, bigToDo, smallToDo] = 
    await Promise.all([
        backlog.addUserStory(cdp, 'Navigation', descrUs[0]), //US28
        backlog.addUserStory(cdp, 'Ajout Task', descrUs[1]), //US11
        backlog.addUserStory(cdp, 'Interface d\'estimation d\'US', descrUs[4]), //US37
        backlog.addUserStory(cdp, 'Calcul de vélocité', descrUs[3]), //US46
        backlog.addUserStory(cdp, 'Burn-down chart', descrUs[5]), //US17
        backlog.addUserStory(cdp, '(Dé)cocher Dods', descrUs[4]) //US36
    ]);
    await [bigDone, smallDone1, smallDone2, bigFailed].map(
        (us) => backlog.setUSSprint(cdp, us._id, oldSprint._id)
    );
    
    const tasksDone = await Promise.all([
        task.addTask(cdp, 'DEV', name, descrTask.bigDone[0], bigDone, 1, []),
        task.addTask(cdp, type, name, descr, bigDone, time, dep),
        task.addTask(cdp, type, name, descr, bigDone, time, dep),
        task.addTask(cdp, type, name, descr, bigDone, time, dep),
        task.addTask(cdp, type, name, descr, smallDone1, time, dep),
        task.addTask(cdp, type, name, descr, smallDone1, time, dep),
        task.addTask(cdp, type, name, descr, smallDone2, time, dep),
    ]);
    await tasksDone.map((v) => task.updateTaskStatus(v._id, 1));

    const tasksFailed = await Promise.all([
        task.addTask(cdp, type, name, descr, bigFailed, time, dep),
        task.addTask(cdp, type, name, descr, bigFailed, time, dep),
        task.addTask(cdp, type, name, descr, bigFailed, time, dep),
    ]);

    const tasksToDo = await Promise.all([
        task.addTask(cdp, type, name, descr, bigToDo, time, dep),
        task.addTask(cdp, type, name, descr, bigToDo, time, dep),
        task.addTask(cdp, type, name, descr, bigToDo, time, dep),
        task.addTask(cdp, type, name, descr, bigToDo, time, dep),
        task.addTask(cdp, type, name, descr, bigToDo, time, dep),
        task.addTask(cdp, type, name, descr, smallToDo, time, dep),
    ]);

    //différents types
    //2 dev
    //1 dod TDEV

}

fillBD()
    .then(() => console.log('DB successfully filled'))
    .catch((e) => console.log('Error filling the DB : ' + e));

const descrUs = ['En tant que developer, je dois pouvoir à partir de n\'importe quelle page, accéder aux pages "Projets" "Backlog", "Kanban", "Planning", "Releases", "Tests" afin de naviguer sur le site.',
    'En tant que maintainer, je dois pouvoir ajouter une task en remplissant les champs nom, description et indiquer l\'US liée dans un formulaire afin de l\'ajouter au backlog. Je souhaite également qu\'un id unique soit généré automatiquement.',
    'En tant que maintainer, je dois pouvoir afficher la vélocité correspondant aux tâches planifiées et aux tâches réalisées pour chaque sprint. Si un sprint a déjà été terminé et que la vélocité planifiée pour un sprint suivant est vraiment plus grande ou plus petite que pour le(s) sprint(s) terminé(s), je dois en être averti. Cela afin de pouvoir planifier le travail de développement de manière réaliste.',
    'En tant que maintainer, je souhaite pouvoir afficher les US dont la difficulté a déjà été estimée, regroupées par difficulté, ainsi que l\'US que je souhaite estimer, afin d\'estimer au mieux la difficulté de l\'US',
    'En tant que maintainer, je dois consulter le burn down chart en cliquant sur un bouton dédié afin de voir l\'avancement général du projet.',
    'En tant que developer, je dois pouvoir cocher et décocher différents items de la checklist "Definition of Done" d\'une task afin de pouvoir fermer une task si tous les items sont cochés.'
];

const descrTask = {
    digDone : [
        'Créer le fichier "views/header.ejs" contenant la bar de navigation, avec des liens vers les pages "Projets", "Backlog", "Kanban", "Planning", "Releases" et "Tests".'
        
    ]
}