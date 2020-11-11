const mongoose = require('mongoose');
const sprintSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    userStories: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserStory'}]
});
module.exports = mongoose.model('Sprint', sprintSchema);
