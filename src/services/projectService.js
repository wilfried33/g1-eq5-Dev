const Project = require('./../models/project');

function addProject(name, key) {
    let project = new Project({ name: name, key: key});
    return  project.save();
}

function updateProject(id, name, key){
    return new Promise((resolve, reject) => {
        if(!id) {
            reject(new Error('id parameter is required'));
        }
        if (!name || name === '') {
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
