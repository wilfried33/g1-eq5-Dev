const express = require('express');
const router = express.Router();
const developerService = require('../services/developerService');

router.post('/create', (req, res) => {
    const projectId = req.body.projectId;
    const type = req.body.type;
    const username = req.body.username;

    developerService.addDeveloper(username)
        .then(developer =>
            developerService.setDeveloperInProject(projectId, developer, type)
                .then(() => {
                    res.status(201).send(developer);
                }).catch(() => res.status(400).json({error:"Le développeur n'a pas été ajouté au project"}))
        )
        .catch(() => res.status(400).json({error:'Ce nom utilisateur existe déjà'}));
});


module.exports = router;
