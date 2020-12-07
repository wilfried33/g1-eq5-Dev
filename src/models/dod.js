const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    check: {type: Boolean, default: false}
});

const dodSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    rules: {type: [ruleSchema], default: []}
});
module.exports = mongoose.model('DoD', dodSchema);
