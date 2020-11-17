const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');

router.get('/create', (req, res) => {
    res.status(200).render('addProject');
});

router.get('/', (req, res) => {
    renderProjectList(200, req, res, null);
});

router.get('/update', (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    const key = req.query.key;
    if(!name || !key)
        renderProjectList(400, req, res, 'Champ manquant');
    projectService.updateProject(id, name, key)
        .then(() =>
            renderProjectList(200, req, res, null))
        .catch(() => renderProjectList(400, req, res, 'Projet similaire existant'));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const key = req.body.key;
    if(!name || !key)
        res.status(400).render('addProject', {error:'Champs manquant'});
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

