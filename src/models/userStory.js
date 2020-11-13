const mongoose = require('mongoose');
const userStorySchema = new mongoose.Schema({
    id: {type: String, index: true, unique: true, required: true},
    name: {type: String, required: true},
    description: String,
    priority: {type: Number, min: 1, max: 3, default: 1},
    difficulty: {type: Number, min: 0, default: 0}
});
module.exports = mongoose.model('UserStory', userStorySchema);
