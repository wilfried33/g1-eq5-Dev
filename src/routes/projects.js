const express = require('express');
const router = express.Router();
const projectService = require("../services/projectService");

router.post('/', (req, res) => {
    const name = req.body.name;
    const key = req.body.key;
    projectService.addProject(name, key)
        .then((err, project) =>
            res.status(201).json({message: "Project successfully added!", project }))
        .catch(() => res.status(400).send('Projet similaire existant ou paramètre manquant'));
});

module.exports = router;

