const express = require('express');
const router = express.Router();
const developerService = require('../services/developerService');
const projectService = require('../services/projectService');

router.get('/create', (req, res) => {
    const projectId = req.cookies['project'];

    projectService.getProject(projectId)
        .then(project =>
            developerService.getDevelopers(project).then(developers =>
                res.status(200).render('addDeveloper', {project: project, developers: developers})
            )
        )
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

router.post('/', (req, res) => {
    const projectId = req.body.projectId;
    const type = req.body.type;
    const username = req.body.username;

    developerService.addDeveloper(username)
        .then((developer) =>
            developerService.setDeveloperInProject(projectId, developer, type)
                .then(() => {
                    return res.status(201).redirect('/task');
                }).catch(() => res.status(400).json({error:"Le développeur n'a pas été ajouté au project"}))
        )
        .catch(() => res.status(400).json({error:'Ce nom utilisateur existe déjà'}));
});


module.exports = router;
