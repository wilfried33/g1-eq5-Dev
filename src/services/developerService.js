const Developer = require('./../models/developer');

function addDeveloper(username) {
    return new Promise((resolve, reject) => {
        if (!username)
            return reject(new Error('username parameter is required'));
        let developer = new Developer({username: username});
        resolve(developer.save());
    });
}

module.exports = {
    addDeveloper
};
