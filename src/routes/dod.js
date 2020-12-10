const express = require('express');
const router = express.Router();
const dodService = require('../services/dodService');
const projectService = require('../services/projectService');

router.get('/', (req, res) => {
    const projectId = req.cookies['project'];
    projectService.getProject(projectId)
        .then(project => {
            renderDod(200, req, res, project, null);
        });
});

router.post('/', (req, res) => {
    const projectId = req.body.projectId;
    const name = req.body.name;
    const rules = req.body.rules;

    projectService.getProject(projectId)
        .then(project => {
            dodService.addDod(project, name, rules)
                .then(() => renderDod(201, req, res, project, null))
                .catch(() => renderDod(400, req, res, project, 'Paramètre manquant ou incompatible'));
        })
        .catch(() => res.status(400).json({error:"Le projet n'a pas été trouvé"}));
});

function renderDod(status, req, res, project, error){
    dodService.getDods(project.dods)
        .then(dods => {
            res.status(status).render('dod', {project:project, dods:dods, error:error});
        })
        .catch(err => res.status(400).send(err));
}

router.put('/update', (req, res) => {
    const _dodId = req.body._id;
    const name = req.body.name;
    const rules = req.body.rules;
    dodService.updateDod(_dodId, name, rules)
        .then(() => res.status(200).json({valid:'La Dod a bien été mis à jour'}) )
        .catch(() => res.status(400).json({error:'Paramètre manquant ou incompatible'}));
});

router.delete('/delete', (req, res) => {
    const projectId = req.query.projectId;
    const _id = req.query.id;
    projectService.getProject(projectId)
        .then(project => {
            dodService.deleteDod(_id, project)
                .then(() => res.status(200).json({valid:'La DoD a bien été supprimé'}))
                .catch(() => res.status(400).json({error:"La Dod n'a pas été supprimer"}));
        });
});


module.exports = router;
