const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const backlogService = require('../services/backlogService');

router.get('/create', (req, res) => {
    const id = req.cookies['project'];
    projectService.getProject(id)
        .then(project => {
            res.status(200).render('addUserStory', {project: project});
        })
        .catch(() => res.status(400).render('backlog', {project: null, backlog: null, error:"Le projet n'a pas été trouvé"}));
});

router.get('/', (req, res) => {
    const projectId = req.cookies['project'];
    renderBacklog(200, req, res, projectId, null);
});

router.put('/update', (req, res) => {
    const _id = req.body._id;
    const name = req.body.name;
    const description = req.body.description;
    const priority = req.body.priority;
    const difficulty = req.body.difficulty;
    backlogService.updateUserStory(_id, name, description, difficulty, priority)
        .then(value => {
            if (!value)
                res.status(400).json({error:'UserStory non trouvée'});
            res.status(200).json({valid:"L'UserStory a bien été mise à jour"});
        })
        .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
});

router.post('/', (req, res) => {
    const projectId = req.cookies['project'];
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

router.get('/userstory', (req, res) => {
    const projectId = req.cookies['project'];
    const id = req.query.id;
    projectService.getProject(projectId)
        .then(project => {
            backlogService.getUserStory(id)
                .then(userStory => res.status(200).render('userStoryInfo.ejs', {project:project, userStory:userStory}))
                .catch(() => res.status(400).json({error:"L'UserStory' n'a pas été trouvé"}));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

router.delete('/delete', (req, res) => {
    const projectId = req.cookies['project'];
    const id = req.query.id;
    if (!id || !projectId)
        return res.status(400).json({error: 'Paramètre manquant'});
    projectService.getProject(projectId)
        .then(project => backlogService.deleteUserStory(id, project)
            .then(() => res.status(200).json({valid: "L'UserStory a bien été supprimée"})))
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
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

router.post('/sprint', (req, res) => {
    const projectId = req.cookies['project'];
    const name = req.body.name;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    projectService.getProject(projectId)
        .then(project => {
            backlogService.addSprint(project, name, startDate, endDate)
                .then(() => {
                    renderBacklog(201, req, res, projectId, null);
                })
                .catch(() => renderBacklog(400, req, res, projectId, 'Paramètre manquant ou incompatible'));
        })
        .catch(() => renderBacklog(400, req, res, null, null));
});

router.put('/sprint/update', (req, res) => {
    const _id = req.body._id;
    const name = req.body.name;
    backlogService.updateSprint(_id, name)
        .then(value => {
            if (!value)
                res.status(400).json({error:'Sprint non trouvé'});
            res.status(200).json({valid:'Le sprint a bien été mis à jour'});
        })
        .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
});

router.delete('/sprint/delete', (req, res) => {
    const projectId = req.cookies['project'];
    const id = req.query.id;
    if (!id || !projectId)
        return res.status(400).json({error: 'Paramètre manquant'});
    projectService.getProject(projectId).then(project => {
        backlogService.deleteSprint(id, project)
            .then(() => res.status(200).json({valid: 'Le sprint a bien été supprimé'}))
            .catch(() => res.status(400).json({error: "Le sprint n'a pas été supprimé"}));
    }).catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
    
});

router.put('/userStorySprint', (req, res) => {
    const projectId = req.cookies['project'];
    const _id = req.query._id;
    const sprintId = req.query.sprintId;

    if (!_id || !projectId)
        return res.status(400).json({error: 'Paramètre manquant'});

    projectService.getProject(projectId)
        .then(project => {
            backlogService.setUSSprint(project, _id, sprintId)
                .then(() =>
                    res.status(200).json({valid: "L'UserStory a bien été déplacé"}))
                .catch(() => res.status(400).json({error:'Paramètre incompatible'}));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

module.exports = router;
