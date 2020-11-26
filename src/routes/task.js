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
                })
            })
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
})

router.post('/', (req, res) => {
    const projectId = req.query.projectId;
    const name = req.body.name;
    const description = req.body.description;
    const usId = req.body.userStory;
    const time = req.body.timeEstimation;
    const dependency = req.body.dependency;

    projectService.getProject(projectId)
        .then(project => {
            taskService.addTask(project, name, description, usId, time, dependency)
                .then(() =>
                    renderTask(201, req, res, projectId, null))
                .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

function renderTask(status, req, res, projectId, error){
    projectService.getProject(projectId)
        .then(project => {
            taskService.getTasks(project)
                .then(tasks => {
                    res.status(status).render('task', {project: project, tasks: tasks, error:error});
                })
                .catch(() => res.status(400).render('task', {project: project, error: "Les tâches n'ont pas été trouvées"}));
        })
        .catch(() => res.status(400).render('task', {error:"Le projet n'a pas été trouvé"}));
}

module.exports = router;