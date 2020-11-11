const mongoose = require('mongoose');
const dodSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    rules: [{type: String}]
});
module.exports = mongoose.model('DoD', dodSchema);
