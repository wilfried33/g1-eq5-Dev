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

        const index = TypeValue[type] + '-' + (project.tasks.length+1);
        let task = new Task({id:index, name:name, description:description, userStoryID:usId, timeEstimation:time, dependencies:dependencies});
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
                    .catch((err) => { console.log(err); reject(err); });
            }).catch((err) => { console.log(err); reject(err); });
        
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
        Task.deleteOne({_id:_id, assignee:undefined}).then(value => {
            if (value.deletedCount === 0)
                return reject(new Error("UserStory don't delete"));
            resolve(project.tasks.pull(_id));
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
    updateTask,
    deleteTask,
    updateTaskStatus
};
