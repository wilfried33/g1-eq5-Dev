const express = require('express');
const router = express.Router();
const projectService = require("../services/projectService");

/*router.get('/create', (req, res) => {
    res.render('addProject');
});*/

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const key = req.body.key;
    projectService.updateProject(id, name, key)
        .then(() => res.status(200).send("Project successfully updated!" ))
        .catch(() => res.status(400).send('Wrong id or missing parameter'));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const key = req.body.key;
    projectService.addProject(name, key)
        .then(() => res.status(201).send("Project successfully added!" ))
        .catch(() => res.status(400).send('Existing project or missing parameter'));
});



module.exports = router;

