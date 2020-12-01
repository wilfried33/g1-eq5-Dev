const DoD = require('./../models/dod');

function addDod(project, name, ruleNames){
    return new Promise((resolve, reject) => {
        if (!project)
            return reject(new Error('project parameter is required'));
        if (!name)
            return reject(new Error('name parameter is required'));

        let dod = new DoD({name:name, rules:ruleNames});
        dod.save()
            .then(() => {
                project.dods.push(dod);
                resolve(project.save());
            });
    });
}

module.exports = {
    addDod
};