const Project = require('./../models/project');
const Backlog = require('./../models/backlog');

function addProject(name, key) {
    let backlog = new Backlog({sprints:[], userstories:[]})
    let project = new Project({ name: name, key: key, backlog: backlog, tasks: []});
    return  project.save();
}

function updateProject(id, name, key){
    return new Promise((resolve, reject) => {
        if(!id) {
            reject(new Error('id parameter is required'));
        }
        if (!name) {
            reject(new Error('name parameter is required'));
        }
        if(!key) {
            reject(new Error('key parameter is required'));
        }
        resolve(Project.findOneAndUpdate({_id: id}, {name:name, key: key}, {
            new: true,
            useFindAndModify: false
        }));
    });
}

function getProjectList(){
    return Project.find();
}

function getProject(projectId){
    return Project.findById(projectId);
}

module.exports = {
    addProject,
    updateProject,
    getProjectList,
    getProject
};
