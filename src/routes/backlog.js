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
    res.render('addUserStory', {projectId:id, projectName:"project B"});
});

router.post('/', (req, res) => {
    const projectId = req.query.projectId;
    const name = req.body.name;
    const description = req.body.description;

    projectService.getProject(projectId)
    .then(project => {
        backlogService.addUserStory(project, name, description)
        .then((userStory) =>
            renderBacklog(201, req, res, projectId))
    })        
    .catch(() => res.status(400).send("Can't add userStory"))
})

function renderBacklog(status, req, res, projectId){
    projectService.getProject(projectId)
    .then(project => {
        backlogService.getUserStories(project.backlog.userStories)
        .then(userStories => {
            res.status(status).render('backlog', {projectId:project.id, projectName:project.name, backlog: project.backlog, userStories:userStories})
        })
    })
    .catch(() => res.status(400).send('Backlog not found'));
}

module.exports = router;