const mongoose = require('mongoose');
const Backlog = require('./backlog');
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, sparse: true},
    key: { type: String, required: true, unique: true, sparse: true, maxlength: 4},
    backlog: {type: Backlog.schema, required: true, default: new Backlog()},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true}],
    dods: [{type: mongoose.Schema.Types.ObjectId, ref:'DoDTemplate'}],
});
module.exports = mongoose.model('Project', projectSchema);
