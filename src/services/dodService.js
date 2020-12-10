const DoDTemplate = require('../models/dodTemplate');
const DoD = require('../models/dod');

function addDod(project, name, rules){
    return new Promise((resolve, reject) => {
        if (!project)
            return reject(new Error('project parameter is required'));
        if (!name)
            return reject(new Error('name parameter is required'));

        let dod = new DoDTemplate({name:name, rules:rules});
        /*const ruleNames = rules.split('\r\n');
        let ruleList = []
        for(const index in ruleNames){
            let rule = new Rule ruleNames[index]
        }*/
        dod.save()
            .then(() => {
                project.dods.push(dod);
                project.save().then(() => resolve(dod));
            });
    });
}

function updateDod(_id, name, rules){
    return new Promise((resolve, reject) => {
        if (!_id)
            return reject(new Error('_id parameter is required'));
        if (!name)
            return reject(new Error('name parameter is required'));
        if (!rules)
            return reject(new Error('ruleNames parameter is required'));

            DoDTemplate.findById(_id).then((dod) => {
            dod.name = name;
            dod.rules = rules;
            resolve(dod.save());
        }).catch(() => reject(new Error('dod not found')));
    });
}

function checkTaskDod(_dodId, ruleId, value = true){
    return new Promise((resolve, reject) => {
        if (!_dodId)
            return reject(new Error('_id parameter is required'));
        if (!ruleId)
            return reject(new Error('ruleId parameter is required'));
            DoD.findById(_dodId).then((dod) => {
            dod.rules[ruleId] = value;
            resolve(dod.save());
        }).catch(() => reject(new Error('dod not found')));
    });
}

function getDods(array){
    return DoDTemplate.find({_id:array});
}

function deleteDod(dodId, project){
    return new Promise((resolve, reject) => {
        if (!dodId)
            return reject(new Error('id parameter is required'));
        if (!project)
            return reject(new Error('project parameter is required'));
            DoDTemplate.deleteOne({_id:dodId})
        .then(() =>{
            project.dods.pull(dodId);
            resolve(project.save())
        })
        .catch(err => reject(err))})
}

module.exports = {
    addDod,
    updateDod,
    checkTaskDod,
    getDods,
    deleteDod
};
