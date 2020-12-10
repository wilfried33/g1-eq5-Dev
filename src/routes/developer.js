const express = require('express');
const router = express.Router();
const developerService = require('../services/developerService');
const projectService = require('../services/projectService');

router.get('/create', (req, res) => {
    const projectId = req.cookies['project'];
    renderAddDeveloper(201, req, res, projectId, null)
});

function renderAddDeveloper(status, req, res, projectId, error){
    projectService.getProject(projectId)
        .then(project =>{
            developerService.getAllDevelopers()
            .then(developers =>
                res.status(status).render('addDeveloper', {project: project, developers: developers, error:error})
            )
            .catch(() => res.status(400).render('addDeveloper', {project: project, error:"Les dévelopeurs n'ont pas été trouvé"}))
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
    
}

router.post('/', (req, res) => {
    const projectId = req.cookies['project'];
    const type = req.body.type;
    const existName = req.body.existName;
    const username = req.body.username;

    if(existName === '-1'){
        developerService.addDeveloper(username)
        .then((developer) =>
            setDeveloper(req, res, projectId, type, developer)
        )
        .catch(() => renderAddDeveloper(400, req, res, projectId, "Le nom d'utilisateur existe déja"));
    }else{
        developerService.getDeveloper(existName)
        .then((developer) =>
                setDeveloper(req, res, projectId, type, developer)
            )
            .catch(() => renderAddDeveloper(400, req, res, projectId, "Le nom d'utilisateur existe déja"));
    }
});

function setDeveloper(req, res, projectId, type, developer){
    developerService.setDeveloperInProject(projectId, developer, type)
    .then(() => {
        return res.redirect(301, '/task');
    }).catch(() => renderAddDeveloper(400, req, res, projectId, "Le développeur n'a pas été ajouté au project"))
}


module.exports = router;
