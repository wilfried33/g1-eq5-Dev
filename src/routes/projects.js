const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');

router.get('/create', (req, res) => {
    res.status(200).render('addProject');
});

router.get('/', (req, res) => {
    renderProjectList(200, req, res);
});

router.get('/update', (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    const key = req.query.key;
    projectService.updateProject(id, name, key)
        .then(() =>
            renderProjectList(200, req, res))
        .catch(() => res.status(400).send('Wrong id or missing parameter'));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const key = req.body.key;
    projectService.addProject(name, key)
        .then(() =>
            renderProjectList(201, req, res))
        .catch(() => res.status(400).send('Projet similaire existant ou paramètre manquant'));
});

function renderProjectList(status, req, res){
    projectService.getProjectList()
        .then(projects =>
            res.status(status).render('projects', {projects: projects}))
        .catch(() => res.status(400).send('Projet similaire existant ou paramètre manquant'));
}

module.exports = router;

