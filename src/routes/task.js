const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const backlogService = require('../services/backlogService');
const taskService = require('../services/taskService');

router.get('/', (req, res) => {
    const id = req.query.projectId;
    renderTask(200, req, res, id, null);
});

function renderTask(status, req, res, projectId, error){
    projectService.getProject(projectId)
        .then(project => {
            taskService.getTasks(project)
                .then(tasks => {
                    res.status(status).render('task', {project: project, tasks: tasks, error:error});
                })
                .catch(() => res.status(400).render('task', {project: project, error: "Les tâches n'ont pas été trouvées"}));
        })
        .catch(() => res.status(400).render('task', {error:"Le projet n'a pas été trouvé"}));
}

module.exports = router;