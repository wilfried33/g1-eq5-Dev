const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    id: {type: String, index: true, unique: true, required: true},
    name: {type: String, required: true},
    description: String,
    userStoryID: {type: String, maxlength: 4},
    timeEstimation: {type: Number, min: 0},
    assignee: {type: mongoose.Schema.Types.ObjectId, ref: 'Developer'},
    dod: {type: mongoose.Schema.Types.ObjectId, ref: 'DoD'}
});
module.exports = mongoose.model('Task', taskSchema);
