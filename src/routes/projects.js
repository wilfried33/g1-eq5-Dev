const express = require('express');
const project = require('../models/project');
const router = express.Router();
const projectService = require("../services/projectService");

router.get('/create', (req, res) => {
    res.status(200).render("addProject");
});

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const key = req.body.key;
    projectService.updateProject(id, name, key)
        .then(() => 
            renderProjectList(200, req, res))
        .catch(() => res.status(400).send('Wrong id or missing parameter'));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const key = req.body.key;
    projectService.addProject(name, key)
        .then((err, project) =>
            renderProjectList(201, req, res))
        .catch(() => res.status(400).send('Projet similaire existant ou paramètre manquant'));
});

function renderProjectList(status, req, res){
    res.status(status).render("projects", {projects: []})
    /*projectService.getProjectList()
    .then(projects => {
        res.status(201).render("projects", {projects: projects})
    })
    .catch(() => res.status(400).send('Projets List Error'));*/
}

module.exports = router;

