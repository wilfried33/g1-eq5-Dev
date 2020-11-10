const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    key: { type: String, required: true, unique: true, maxlength: 4}
});
module.exports = mongoose.model('Project', projectSchema);
