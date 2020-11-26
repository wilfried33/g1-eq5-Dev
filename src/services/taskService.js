const Task = require('./../models/task');

function addTask(project, name, description, usId, time, dependency) {
    return new Promise((resolve, reject) => {
        if(!project)
            return reject(new Error('project parameter is required'));
        if(!name)
            return reject(new Error('name parameter is required'));
        if(!description)
            description = ""
        if(!usId)
            return reject(new Error('userStory parameter is required'));
        if(!time)
            time = 0

        const index = "TDEV-51";
        let task = new Task({id:index, name:name, description:description, userStoryID:usId, timeEstimation:time, dependency:dependency})
        task.save()
            .then(() => {
                project.tasks.push(task);
                resolve(project.save());
            });
    });

}

function getTasks(project){
    return new Promise((resolve, reject) => {
        if(!project)
            return reject(new Error('project parameter is required'));
        Task.find({_id:project.tasks}).then(tasks => {
            resolve(tasks)
        })
    });
}

module.exports = {
    addTask,
    getTasks
}