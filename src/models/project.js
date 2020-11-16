const Backlog = require('./backlog');

const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    key: { type: String, required: true, unique: true, maxlength: 4},
    backlog: {type: Backlog.schema, required: true, default: new Backlog()},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true}]
});
module.exports = mongoose.model('Project', projectSchema);
