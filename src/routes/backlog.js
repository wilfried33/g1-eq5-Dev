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
            res.status(200).render('addUserStory', {project: project});
        })
        .catch(() => res.status(400).render('backlog', {project: null, backlog: null, error:"Le projet n'a pas été trouvé"}));
});

router.get('/', (req, res) => {
    const id = req.query.projectId;
    renderBacklog(200, req, res, id, null);
});

router.get('/update', (req, res) => {
    const projectId = req.query.projectId;
    const _id = req.query._id;
    const name = req.query.name;
    const description = req.query.description;
    const priority = req.query.priority;
    const difficulty = req.query.difficulty;
    backlogService.updateUserStory(_id, name, description, difficulty, priority)
        .then(value => {
            if(!value)
                renderBacklog(400, req, res, projectId, 'UserStory non trouvé');
            renderBacklog(200, req, res, projectId, null);
        })
        .catch(() => renderBacklog(400, req, res, projectId, 'Paramètre manquant ou incompatible'));
});

router.post('/', (req, res) => {
    const projectId = req.query.projectId;
    const name = req.body.name;
    const description = req.body.description;

    projectService.getProject(projectId)
        .then(project => {
            backlogService.addUserStory(project, name, description)
                .then(() =>
                    renderBacklog(201, req, res, projectId, null))
                .catch(() => res.status(400).render('addUserStory', {project: project, error:'Paramètre manquant ou incompatible'}));
        })
        .catch(() => res.status(400).render('backlog', {error:"Le projet n'a pas été trouvé"}));
});

router.delete('/delete', (req, res) => {
    const projectId = req.query.projectId;
    const id = req.query._id;
    if(!id || !projectId)
        renderBacklog(400, req, res, projectId, null);
    projectService.getProject(projectId)
        .then(project => backlogService.deleteUserStory(id, project)
            .then(() => renderBacklog(200, req, res, projectId, null)))
        .catch(() => res.status(400).render('deleteUserStory', {error:"Le projet n'a pas été trouvé"}));
});


function renderBacklog(status, req, res, projectId, error){
    projectService.getProject(projectId)
        .then(project => {
            backlogService.getBacklog(project)
                .then(backlog => {
                    res.status(status).render('backlog', {project: project, backlog: backlog, error:error});
                })
                .catch(() => res.status(400).render('backlog', {project: project, error: "Le backlog n'a pas été trouvé"}));
        })
        .catch(() => res.status(400).render('backlog', {error:"Le projet n'a pas été trouvé"}));
}

module.exports = router;
