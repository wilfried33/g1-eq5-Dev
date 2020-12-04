const express = require('express');
const router = express.Router();
const developerService = require('../services/developerService');

router.post('/', (req, res) => {
    const username = req.body.username;

    developerService.addDeveloper(username)
        .then(developer =>
            res.status(201).send(developer)
        )
        .catch(() => res.status(400).render('backlog', {error:'Ce nom utilisateur existe déjà'}));
});


module.exports = router;
