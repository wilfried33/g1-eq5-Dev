const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const backlogService = require('../services/backlogService');
const taskService = require('../services/taskService');

router.get('/', (req, res) => {
    const id = req.query.projectId;
    renderTask(200, req, res, id, null);
});

router.get('/create', (req, res) => {
    const projectId = req.query.projectId;

    projectService.getProject(projectId)
        .then(project => {
            backlogService.getUserStories(project.backlog.userStories).then(userStories => {
                taskService.getTasks(project).then(tasks => {
                    res.status(200).render('addTask', {project: project, userStories:userStories, tasks:tasks});
                });
            });
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

router.post('/', (req, res) => {
    const projectId = req.query.projectId;
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const usId = req.body.userStory;
    const time = req.body.timeEstimation;
    const dependencies = req.body.dependencies;

    projectService.getProject(projectId)
        .then(project => {
            taskService.addTask(project, type, name, description, usId, time, dependencies)
                .then(() =>
                    renderTask(201, req, res, projectId, null))
                .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

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
        .catch(() => res.status(400).json({error:'Paramètre manquant ou imcompatible'}));
});

router.put('/update/status', (req, res) => {
    const _id = req.body._id;
    const status = req.body.status;

    taskService.updateTaskStatus(_id, status)
        .then(() =>
            res.status(200).json({valid:'Le statut de la tâche a bien été mis à jour'}))
        .catch(() => res.status(400).json({error:'Paramètre manquant ou imcompatible'}));
});

router.delete('/delete', (req, res) => {
    const projectId = req.query.projectId;
    const _id = req.query._id;

    projectService.getProject(projectId)
        .then(project => {
            taskService.deleteTask(project, _id)
                .then(() =>
                    res.status(200).json({valid:'La tâche a bien été suprimé'}))
                .catch(() => res.status(400).json({error:'Paramètre manquant ou imcompatible'}));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

function renderTask(status, req, res, projectId){
    projectService.getProject(projectId)
        .then(project => {
            backlogService.getUserStories(project.backlog.userStories).then(userStories => {
                taskService.getTasks(project).then(tasks => {
                    res.status(status).render('task', {project: project, userStories:userStories, tasks:tasks});
                })
                    .catch(() => res.status(400).render('task', {error:"Les tâches n'ont pas été trouvés"}));
            })
                .catch(() => res.status(400).render('task', {error:"Les UserStories n'ont pas été trouvés"}));
        })
        .catch(() => res.status(400).render('task', {error:"Le projet n'a pas été trouvé"}));
}

module.exports = router;
