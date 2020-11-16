/*
res.render('backlog', {projectId: id du projet, projectName: nom du projet, backlog: le backlog du project sélecioner avec toutes les us et les sprints})
res.render('addUserStory', {projectId: id du projet, projectName: nom du projet});
*/
const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const backlogService = require('../services/backlogService');

router.get('/create', (req, res) => {
    const id = req.query.projectId;
    projectService.getProject(id)
        .then(project => {
            res.render('addUserStory', {project: project});
        })
        .catch(() => res.status(400).send('Project not found'));
});

router.get('/', (req, res) => {
    const id = req.query.projectId;
    renderBacklog(200, req, res, id);
});

router.get('/update', (req, res) => {
    res.status(400).send("Not implemented")
});

router.post('/', (req, res) => {
    const projectId = req.query.projectId;
    const name = req.body.name;
    const description = req.body.description;

    projectService.getProject(projectId)
        .then(project => {
            backlogService.addUserStory(project, name, description)
                .then(() =>
                    renderBacklog(201, req, res, projectId));
        })
        .catch(() => res.status(400).send("Can't add userStory"));
});

function renderBacklog(status, req, res, projectId){
    projectService.getProject(projectId)
        .then(project => {
            backlogService.getBacklog(project)
                .then(backlog => {
                    res.status(status).render('backlog', {project: project, backlog: backlog});
                });
        })
        .catch(() => res.status(400).send('Project not found'));
}

module.exports = router;
