const UserStory = require('./../models/userStory');
const Sprint = require('./../models/sprint');

function addUserStory(project, name, description) {
    return new Promise((resolve, reject) => {
        if(!project)
            return reject(new Error('project parameter is required'));
        if(!name)
            return reject(new Error('name parameter is required'));

        const index = project.backlog.currentUSId+1;
        let userStory = new UserStory({id:project.key + '-' +index, name:name, description:description});
        userStory.save()
            .then(() => {
                project.backlog.userStories.push(userStory);
                project.backlog.currentUSId = index;
                resolve(project.save());
            });
    });

}

function getBacklog(project){
    return new Promise((resolve, reject) => {
        if(!project)
            return reject(new Error('project parameter is required'));
        getSpints(project.backlog.sprints)
            .then(sprints => {
                getUserStories(project.backlog.userStories)
                    .then(userStories =>
                        resolve({
                            sprints: sprints,
                            userStories: userStories
                        }));
            });
    });
}

function updateUserStory(id, name, description, difficulty, priority){
    return new Promise((resolve, reject) => {
        if(!id) {
            return reject(new Error('id parameter is required'));
        }
        if (!name || name == '') {
            return reject(new Error('name parameter is required'));
        }
        if(!description) {
            description = '';
        }
        if(!difficulty){
            return reject(new Error('difficulty parameter is required'));
        }
        if(!priority){
            return reject(new Error('priority parameter is required'));
        }
        if(priority < 0 || priority > 3){
            return reject(new Error('priority is clamp into 0 and 3'));
        }
        resolve(UserStory.findOneAndUpdate({_id: id}, {name:name, description: description, difficulty:difficulty, priority:priority}, {
            new: true,
            useFindAndModify: false
        }));
    });
}

function deleteUserStory(id, project){
    return new Promise((resolve, reject) => {
        if(!id){
            return reject(new Error('id parameter is required'));
        }
        UserStory.deleteOne({_id:id}).then(() => {
            resolve(project.backlog.userStories.pull(id));
        })
            .catch((err) => reject(err));
    });
}

function getSpints(arrayId){
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
        if(!project){
            return reject(new Error('project parameter is required'));
        }
        if(!name){
            return reject(new Error('name parameter is required'));
        }
        if(!dateBegin){
            return reject(new Error('dateBegin parameter is required'));
        }
        if(!dateEnd){
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
        if(!_id){
            reject(new Error('id parameter is required'));
        }
        if(!sprintId){
            reject(new Error('sprintId parameter is required'));
        }
        if(!project){
            reject(new Error('project parameter is required'));
        }
        getUserStory(_id).then((userStory) => {
            getSprint(sprintId).then((sprint) => {
                userStory.sprint = sprint._id;
                resolve(userStory.save());
            }).catch(() => reject(new Error('sprintId parameter is incorrect')));
        }).catch(() => reject(new Error('_id parameter is incorrect')));
    });
}

module.exports = {
    addUserStory,
    updateUserStory,
    deleteUserStory,
    getUserStories,
    getUserStory,
    getBacklog,
    addSprint,
    setUSSprint
};
