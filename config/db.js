const mongoose = require('mongoose');
let config = require('config'); //we load the db location from the JSON files

const Backlog = require('../src/models/backlog');
const Developer = require('../src/models/developer');
const Project = require('../src/models/project');
const Task = require('../src/models/task');
const UserStory = require('../src/models/userStory');
const DodTemplate = require('../src/models/dodTemplate');
const Dod = require('../src/models/dod');
const Sprint = require('../src/models/sprint');

function connectToDB(){
    const url = config.DBUrl + ':' + config.DBPort + '/' + config.DBHost;
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('MongoDB database connection established successfully'));
}

async function emptyCollection() {
    await Backlog.deleteMany({});
    await Developer.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await UserStory.deleteMany({});
    await DodTemplate.deleteMany({});
    await Dod.deleteMany({});
    await Sprint.deleteMany({});
}

module.exports = {
    connectToDB,
    emptyCollections: emptyCollection
};
