const mongoose = require('mongoose');
const backlogSchema = new mongoose.Schema({
    sprints: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sprint'}],
    userStories: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserStory'}],
    currentUSId: {type: Number, min: 0, default: 0}
});
module.exports = mongoose.model('Backlog', backlogSchema);
