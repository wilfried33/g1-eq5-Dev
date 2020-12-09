const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');

router.get('/create', (req, res) => {
    res.status(200).render('addProject');
});

router.get('/', (req, res) => {
    renderProjectList(200, req, res, null);
});

router.get('/select', (req, res) => {
    const projectId = req.query.projectId;
    res.cookie("project", projectId);
    res.status(200).json({valid:'Projet bien sélectioné'})
})

router.put('/update', (req, res) => {
    const _id = req.body._id;
    const name = req.body.name;
    if (!name)
        return res.status(400).json({error:'Champs manquant'});
    projectService.updateProject(_id, name)
        .then(() =>
            res.status(200).json({valid:'Projet bien mis à jour'}))
        .catch(() => res.status(400).json({error:'Projet similaire existant'}));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const key = req.body.key;
    if (!name || !key)
        return res.status(400).render('addProject', {error:'Champs manquant'});
    projectService.addProject(name, key)
        .then(() =>
            renderProjectList(201, req, res, null))
        .catch(() => res.status(400).render('addProject', {error:'Projet similaire existant'}));
});

function renderProjectList(status, req, res, error){
    projectService.getProjectList()
        .then(projects =>
            res.status(status).render('projects', {projects: projects, error:error}))
        .catch(() => res.status(400).render('projects', {projects: [], error:'Impossible de charger la liste des projects'}));
}

module.exports = router;

