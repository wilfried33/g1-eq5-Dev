const mongoose = require('mongoose');
const developerSchema = new mongoose.Schema({
    username: {type: String, required: true}
});
module.exports = mongoose.model('Developer', developerSchema);
