const UserStory = require('./../models/userStory');
const Backlog = require('./../models/backlog');
const Project = require('../models/project');
const ProjectService = require('./projectService');

function addUserStory(id, name, description) {
    let userStory = new UserStory({id:id, name:name, description:description});
    return userStory.save();
}

function pushUserStory(project, userStory){
    project.backlog.userStories.push(userStory);
    return  project.save();
}

module.exports = {
    addUserStory,
    pushUserStory
};