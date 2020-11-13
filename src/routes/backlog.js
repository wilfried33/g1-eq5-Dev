/*
res.render('backlog', {projectId: id du projet, projectName: nom du projet, backlog: le backlog du project sélecioner avec toutes les us et les sprints})
res.render('addUserStory', {projectId: id du projet, projectName: nom du projet});
*/
const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const backlogService = require('../services/backlogService');

router.get('/create', (req, res) => {
    const id = req.query.projectId;
    res.render('addUserStory', {projectId:id, projectName:"project B"});
});

module.exports = router;