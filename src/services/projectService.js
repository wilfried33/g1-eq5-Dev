const Project = require('./../models/project');
const Backlog = require('./../models/backlog');

function addProject(name, key) {
    let project = new Project({ name: name, key: key, backlog: new Backlog(), tasks: []});
    return  project.save();
}

function updateProject(id, name, key){
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error('name parameter is required'));
        }
        if(!key) {
            reject(new Error('key parameter is required'));
        }
        if(!id) {
            reject(new Error('id parameter is required'));
        }
        resolve(Project.findOneAndUpdate({_id: id}, {name:name, key: key}, {
            new: true,
            useFindAndModify: false
        }));
    });
}

module.exports = {
    addProject,
    updateProject
};
