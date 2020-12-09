const Task = require('./../models/task');
const backlogService = require('./backlogService');
const TypeValue = {
    0: 'TDES',
    1: 'TTES',
    2: 'TDEV',
    3: 'TOPT',
    4: 'TBUG'
};


function addTask(project, type, name, description, usId, time, dependencies) {
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
        if (!dependencies)
            dependencies = [];

        const index = TypeValue[type] + '-' + (project.tasks.length+1);
        let task = new Task({id:index, type:type, name:name, description:description, userStoryID:usId, timeEstimation:time, dependencies:dependencies});
        addTaskInUserStory(task, usId)
            .then(() => {
                project.tasks.push(task);
                task.save().then((savedTask) => {
                    project.save().then(() => resolve(savedTask));
                });
            });
    });

}

function updateTask(_id, name, description, userStory, time, dependencies) {
    return new Promise((resolve, reject) => {
        if (!_id) {
            return reject(new Error('_id parameter is required'));
        }
        if (!name) {
            return reject(new Error('name parameter is required'));
        }
        findTasks(dependencies)
            .then(tasks => {
                Task.findOneAndUpdate(
                    { _id: _id, assignee:undefined },
                    { name:name, description: description, userStoryID: userStory, timeEstimation: time, dependencies: tasks},
                    { new: true, useFindAndModify: false })
                    .then((task) => {
                        if (!task)
                            return reject(new Error('_id undefined or task assigned'));
                        resolve(task);
                    })
                    .catch((err) => { reject(err); });
            }).catch((err) => { reject(err); });

    });
}

function findTasks(array){
    return Task.find({_id:array});
}

function updateTaskStatus(_id, status) {
    return new Promise((resolve, reject) => {
        if (!_id) {
            return reject(new Error('_id parameter is required'));
        }
        if (!status || status < 0 || status > 2) {
            return reject(new Error('status parameter is required and should be between 0 and 2'));
        }
        Task.findOneAndUpdate({ _id: _id}, { status:status}, { new: true, useFindAndModify: false })
            .then((task) => {
                if (!task)
                    return reject(new Error('wrong _id'));
                resolve(task);
            })
            .catch((err) => reject(err));
    });
}


function deleteTask(project, _id){
    return new Promise((resolve, reject) => {
        if (!_id){
            return reject(new Error('_id parameter is required'));
        }
        if (!project){
            return reject(new Error('project parameter is required'));
        }
        Task.find({dependencies:{ '$in' : [_id]} })
            .then(value => {
                if (value.length > 0)
                    return reject(new Error('task is in dependencies'));
                Task.deleteOne({_id:_id, assignee:undefined}).then(value => {
                    if (value.deletedCount === 0)
                        return reject(new Error("UserStory don't delete"));
                    resolve(project.tasks.pull(_id));
                })
                    .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
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

function getTasks(array){
    return new Promise((resolve, reject) => {
        if (!array)
            return reject(new Error('array parameter is required'));
        Task.find({_id:array}).then(tasks => {
            resolve(tasks);
        });
    });
}

function getAllTasks(project){
    return new Promise((resolve, reject) => {
        if (!project)
            return reject(new Error('project parameter is required'));
        Task.find({_id:project.tasks}).then(tasks => {
            resolve(tasks);
        });
    });
}

function getVelocity(tasks){
    return new Promise((resolve) => {
        Task.find({_id:tasks, status:2})
            .then(result => {
                resolve(result.count);
            });
    });
}

module.exports = {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getVelocity,
    getTasks
};
