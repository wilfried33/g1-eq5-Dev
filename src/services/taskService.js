const Task = require('./../models/task');
const backlogService = require('./backlogService');
const TypeValue = {
    0: 'TDES',
    1: 'TTES',
    2: 'TDEV',
    3: 'TOPT',
    4: 'TBUG'
};


function addTask(project, type, name, description, usId, time, dependency) {
    return new Promise((resolve, reject) => {
        if (!type)
            return reject(new Error('type parameter is required'));
        if (!project)
            return reject(new Error('project parameter is required'));
        if (!name)
            return reject(new Error('name parameter is required'));
        if (!description)
            description = '';
        if (!usId)
            return reject(new Error('userStory parameter is required'));
        if (!time)
            time = 0;

        const index = TypeValue[type] + '-' + (project.tasks.length+1);
        let task = new Task({id:index, name:name, description:description, userStoryID:usId, timeEstimation:time, dependency:dependency});
        addTaskInUserStory(task, usId)
            .then(() => {
                project.tasks.push(task);
                project.save();
            })
            .then(() => {
                resolve(task.save());
            });
    });

}

function updateTask(project, _id, name, description, userStory, time, dependency) {
    return new Promise((resolve, reject) => {
        if (!_id) {
            return reject(new Error('_id parameter is required'));
        }
        if (!name) {
            return reject(new Error('name parameter is required'));
        }
        resolve(Task.findOneAndUpdate(
            { _id: _id },
            { name:name, description: description, userStory: userStory, timeEstimation: time, dependency: dependency},
            { new: true, useFindAndModify: false }));
    });
}


function addTaskInUserStory(task, userStoryId){
    return new Promise((resolve) => {
        backlogService.getUserStory(userStoryId).then(userStory => {
            userStory.taskCount += 1;
            resolve(userStory.save());
        });
    });
}

function getTasks(project){
    return new Promise((resolve, reject) => {
        if (!project)
            return reject(new Error('project parameter is required'));
        Task.find({_id:project.tasks}).then(tasks => {
            resolve(tasks);
        });
    });
}

module.exports = {
    addTask,
    getTasks,
    updateTask
};
