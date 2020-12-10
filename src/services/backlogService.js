

const UserStory = require('./../models/userStory');
const Sprint = require('./../models/sprint');
const taskService = require('./taskService');

function addUserStory(project, name, description) {
    return new Promise((resolve, reject) => {
        if (!project)
            return reject(new Error('project parameter is required'));
        if (!name)
            return reject(new Error('name parameter is required'));
        const index = project.backlog.currentUSId+1;
        let userStory = new UserStory({id:project.key + '-' +index, name:name, description:description});
        project.backlog.userStories.push(userStory);
        project.backlog.currentUSId = index;
        userStory.save().then((us) => {
            project.save().then(() => {
                resolve(us);
            });
        });
    });

}

function getBacklog(project){
    return new Promise(async (resolve, reject) => {
        if (!project)
            return reject(new Error('project parameter is required'));
        const sprints = await getSprints(project.backlog.sprints);
        const userStories = await getUserStories(project.backlog.userStories);
        const tasks = await taskService.getAllTasks(project);

        let newSprints = [];
        for (const sprintKey in sprints){
            let taskCount = 0;
            let velocity = 0;
            const sprint = sprints[sprintKey];
            const sprintUserStories = await UserStory.find({_id:project.backlog.userStories, sprint:sprint._id});
            for (const USKey in sprintUserStories) {
                for (const taskKey in tasks){
                    const task = tasks[taskKey];
                    if (task.userStoryID.toString() === sprintUserStories[USKey]._id.toString()){
                        taskCount += 1;
                        if (task.status === 2)
                            velocity += 1;
                    }
                }
            }
            newSprints.push({
                _id:sprint._id,
                name:sprint.name,
                startDate:sprint.startDate,
                endDate:sprint.endDate,
                taskCount:taskCount,
                velocity: velocity
            });
        }
        resolve({
            sprints: newSprints,
            userStories: userStories
        });
    });
}

function getUSByDifficulty(project) {
    return new Promise((resolve, reject) => {
        if (!project)
            return reject(new Error('project parameter is required'));
        const usByDifficulty = [];
        getUserStories(project.backlog.userStories)
            .then(userStories => {
                for (const us of userStories) {
                    const key = us.difficulty;
                    if (usByDifficulty.find(list => list.difficulty === key))
                        usByDifficulty
                            .find( list => list.difficulty === key)
                            .userStories.push(us);
                    else
                        usByDifficulty.push({ difficulty: key, userStories: [us] });
                }
                usByDifficulty.sort((a, b) => a.difficulty - b.difficulty );
                resolve(usByDifficulty);
            });
    });
}

function updateUserStory(id, name, description, difficulty, priority){
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject(new Error('id parameter is required'));
        }
        if (!name || name === '') {
            return reject(new Error('name parameter is required'));
        }
        if (!description) {
            description = '';
        }
        if (!difficulty){
            return reject(new Error('difficulty parameter is required'));
        }
        if (!priority){
            return reject(new Error('priority parameter is required'));
        }
        if (priority < 0 || priority > 3){
            return reject(new Error('priority is clamp into 0 and 3'));
        }
        resolve(UserStory.findOneAndUpdate({_id: id, taskCount: 0}, {name:name, description: description, difficulty:difficulty, priority:priority}, {
            new: true,
            useFindAndModify: false
        }));
    });
}

function deleteUserStory(id, project){
    return new Promise((resolve, reject) => {
        if (!id){
            return reject(new Error('id parameter is required'));
        }
        UserStory.deleteOne({_id:id, taskCount:0}).then(value => {
            if (value.deletedCount === 0)
                return reject(new Error("UserStory don't delete"));
            resolve(project.backlog.userStories.pull(id));
        })
            .catch((err) =>
                reject(err));
    });
}

function getSprints(arrayId){
    return Sprint.find({_id:arrayId});
}

function getSprint(_id){
    return Sprint.findOne({_id:_id});
}
function getUserStories(arrayId){
    return UserStory.find({_id:arrayId});
}
function getUserStory(_id){
    return UserStory.findOne({_id:_id});
}

function addSprint(project, name, dateBegin, dateEnd){
    return new Promise((resolve, reject) => {
        if (!project){
            return reject(new Error('project parameter is required'));
        }
        if (!name){
            return reject(new Error('name parameter is required'));
        }
        if (!dateBegin){
            return reject(new Error('dateBegin parameter is required'));
        }
        if (!dateEnd){
            return reject(new Error('dateEnd parameter is required'));
        }
        let sprint = new Sprint({name: name, startDate:dateBegin, endDate:dateEnd});
        sprint.save()
            .then(sprint => {
                project.backlog.sprints.push(sprint);
                resolve(project.save());
            })
            .catch((err) => reject(err));
    });
}

function setUSSprint(project, _id, sprintId){
    return new Promise((resolve, reject) => {
        if (!_id){
            reject(new Error('id parameter is required'));
        }
        if (!project){
            reject(new Error('project parameter is required'));
        }
        getUserStory(_id).then((userStory) => {
            if (sprintId){
                getSprint(sprintId).then((sprint) => {
                    userStory.sprint = sprint._id;
                    resolve(userStory.save());
                }).catch(() => reject(new Error('sprintId parameter is incorrect')));
            } else {
                userStory.sprint = null;
                resolve(userStory.save());
            }
        }).catch(() => reject(new Error('_id parameter is incorrect')));
    });
}

function updateSprint(id, name){
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject(new Error('id parameter is required'));
        }
        if (!name || name === '') {
            return reject(new Error('name parameter is required'));
        }
        resolve(Sprint.findOneAndUpdate({_id: id}, {name:name}, {
            new: true,
            useFindAndModify: false
        }));
    });
}

function deleteSprint(id, project){
    return new Promise((resolve, reject) => {
        if (!id){
            return reject(new Error('id parameter is required'));
        }
        if (!project){
            reject(new Error('project parameter is required'));
        }
        UserStory.find({sprint:id}).then(value => {
            if (value.length > 0){
                return reject(new Error('Sprint is not empty'));
            }
            Sprint.deleteOne({_id:id}).then(() => {
                resolve(project.backlog.sprints.pull(id));
            });
        }).catch(err => reject(err));

    });
}


module.exports = {
    addUserStory,
    updateUserStory,
    deleteUserStory,
    getUserStories,
    getUSByDifficulty,
    getUserStory,
    getBacklog,
    addSprint,
    updateSprint,
    deleteSprint,
    setUSSprint
};
