const dbConfig = require('../config/db');
const Project = require('./../models/project');

function addProject(name, key) {
    let project = new Project({ name: name, key: key});
    return  project.save();
}

module.exports = {
    addProject,
};
