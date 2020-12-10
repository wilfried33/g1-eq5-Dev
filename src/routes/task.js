const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const backlogService = require('../services/backlogService');
const taskService = require('../services/taskService');
const developerService = require('../services/developerService');


router.get('/', (req, res) => {
    const projectId = req.cookies['project'];
    renderTask(200, req, res, projectId);
});

router.get('/create', (req, res) => {
    const projectId = req.cookies['project'];

    projectService.getProject(projectId)
        .then(project => {
            renderAddTask(200, req, res, project, null);
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

router.post('/', (req, res) => {
    const projectId = req.cookies['project'];
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const usId = req.body.userStory;
    const time = req.body.timeEstimation;
    const dependencies = req.body.dependencies;

    projectService.getProject(projectId)
        .then(project => {
            if (usId)
                backlogService.getUserStory(usId)
                    .then(userStory => {
                        taskService.addTask(project, type, name, description, userStory, time, dependencies)
                            .then(() =>
                                renderTask(201, req, res, projectId))
                            .catch(() => renderAddTask(400, req, res, project, 'Paramètre manquant ou incompatible'));
                    });
            else {
                taskService.addTask(project, type, name, description, null, time, dependencies)
                    .then(() =>
                        renderTask(201, req, res, projectId))
                    .catch(() => renderAddTask(400, req, res, project, 'Paramètre manquant ou incompatible'));
            }
        })
        .catch(() => res.status(400).render('addTask', {error:"Le projet n'a pas été trouvé"}));
});

function renderAddTask(status, req, res, project, error){
    backlogService.getUserStories(project.backlog.userStories)
        .then(userStories => {
            taskService.getAllTasks(project)
                .then(tasks => {
                    res.status(200).render('addTask', {project: project, userStories:userStories, tasks:tasks, error:error});
                })
                .catch(() => res.status(400).render('addTask', {project: project, error:"Les tâches n'ont pas été trouvé"}));
        })
        .catch(() => res.status(400).render('addTask', {project:project, error:"Les userStories n'ont pas été trouvé"}));
}

router.put('/update', (req, res) => {
    const _id = req.body._id;
    const name = req.body.name;
    const description = req.body.description;
    const userStoryId = req.body.userStory;
    const time = req.body.timeEstimation;
    const dependencies = req.body.dependencies;

    taskService.updateTask(_id, name, description, userStoryId, time, dependencies)
        .then(() =>
            res.status(200).json({valid:'La tâche a bien été mis à jour'}))
        .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
});

router.put('/update/developer', (req, res) => {
    const _id = req.body._id;
    const developerId = req.body.developer;

    developerService.getDeveloper(developerId)
    .then(developer => {
        taskService.updateTaskDeveloper(_id, developer)
        .then(() =>
            res.status(200).json({valid:'Le statut de la tâche a bien été mis à jour'}))
        .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
    })
    .catch(() => {
        taskService.updateTaskDeveloper(_id, null)
        .then(() =>
            res.status(200).json({valid:'Le statut de la tâche a bien été mis à jour'}))
        .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}))
    });
    
});

router.put('/update/status', (req, res) => {
    const _id = req.query._id;
    const status = req.query.status;

    taskService.updateTaskStatus(_id, status)
        .then(() =>
            res.status(200).json({valid:'Le statut de la tâche a bien été mis à jour'}))
        .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
});

router.delete('/delete', (req, res) => {
    const projectId = req.cookies['project'];
    const _id = req.query._id;

    projectService.getProject(projectId)
        .then(project => {
            taskService.deleteTask(project, _id)
                .then(() =>
                    res.status(200).json({valid:'La tâche a bien été supprimé'}))
                .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

function renderTask(status, req, res, projectId){
    projectService.getProject(projectId)
        .then(project => {
            backlogService.getUserStories(project.backlog.userStories).then(userStories => {
                taskService.getAllTasks(project).then(tasks => {
                    developerService.getDevelopers(project.developers)
                        .then(developers => {
                            res.status(status).render('tasks', {project: project, userStories:userStories, tasks:tasks, developers:developers});
                        })
                        .catch(() => res.status(400).render('task', {error:"Les développeurs n'ont été trouvés"}));
                })
                    .catch(() => res.status(400).render('tasks', {error:"Les tâches n'ont pas été trouvés"}));
            })
                .catch(() => res.status(400).render('tasks', {error:"Les UserStories n'ont pas été trouvés"}));
        })
        .catch(() => res.status(400).render('tasks', {error:"Le projet n'a pas été trouvé"}));
}

module.exports = router;
