const express = require('express');
const project = require('../models/project');
const router = express.Router();
const projectService = require("../services/projectService");

router.get('/create', (req, res) => {
    res.status(201).render("addProject");
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const key = req.body.key;
    projectService.addProject(name, key)
        .then((err, project) =>
            //res.status(201).json({message: "Project successfully added!", project }))
            renderProjectList(req, res))
        .catch(() => res.status(400).send('Projet similaire existant ou paramètre manquant'));
});

function renderProjectList(req, res){
    projectService.getProjectList()
    .then(projects => {
        res.status(201).render("projects", {projects: projects})
    })
    .catch(() => res.status(400).send('Projets List Error'));
}

module.exports = router;

