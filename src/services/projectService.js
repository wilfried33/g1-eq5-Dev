const Project = require('./../models/project');
const Backlog = require('./../models/backlog');

function addProject(name, key) {
    let project = new Project({ name: name, key: key, backlog: new Backlog(), tasks: []});
    return  project.save();
}

module.exports = {
    addProject,
};
