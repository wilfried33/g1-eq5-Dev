const express = require('express');
const router = express.Router();
const dodService = require('../services/dodService');
const projectService = require('../services/projectService');

router.post('/', (req, res) => {
    const projectId = req.query.projectId;
    const name = req.body.name;
    const rules = req.body.rules;
    projectService.getProject(projectId)
        .then(project => {
            dodService.addDod(project, name, rules)
                .then(dod =>
                    res.status(201).send(dod)
                )
                .catch(() => res.status(400).render('backlog', {error:'Paramètre manquant ou incompatible'}));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});


module.exports = router;