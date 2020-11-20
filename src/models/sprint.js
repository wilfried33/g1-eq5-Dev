const mongoose = require('mongoose');
const UserStory = require('./userStory');
const sprintSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    userStories: [{type: UserStory.schema}],
});
module.exports = mongoose.model('Sprint', sprintSchema);
