const mongoose = require('mongoose');
const UserStory = require('./userStory');
const Sprint = require('./sprint');
const backlogSchema = new mongoose.Schema({
    sprints: [{type: Sprint.schema}],
    userStories: [{type: UserStory.schema}],
    currentUSId: {type: Number, min: 0, default: 0}
});
module.exports =  mongoose.model('Backlog', backlogSchema);
