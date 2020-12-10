

const Developer = require('./../models/developer');
const projectService = require('./projectService');

function addDeveloper(username) {
    return new Promise((resolve, reject) => {
        if (!username)
            return reject(new Error('username parameter is required'));
        let developer = new Developer({username: username});
        resolve(developer.save());
    });
}

function setDeveloperInProject(projectId, developer, type){
    return new Promise((resolve, reject) => {
        if (!projectId)
            return reject(new Error('projectId parameter is required'));
        if (!developer)
            return reject(new Error('developer parameter is required'));
        if (type !== '0' && type !== '1')
            return reject(new Error('type parameter is invalid'));
        projectService.getProject(projectId)
            .then(project => {
                if (type === '0'){
                    project.developers.push(developer);
                    return resolve(project.save());
                } else {
                    project.maintainers.push(developer);
                    return resolve(project.save());
                }
            })
            .catch(err => reject(err));

    });
}

function getDeveloper(developerId){
    return Developer.findById({_id:developerId});
}

function getDevelopers(array){
    return Developer.find({_id:array})
}

function getAllDevelopers() {
    return Developer.find({})
}

module.exports = {
    addDeveloper,
    getDeveloper,
    getDevelopers,
     getAllDevelopers,
    setDeveloperInProject,
};
