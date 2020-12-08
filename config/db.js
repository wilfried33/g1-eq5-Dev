const mongoose = require('mongoose');
let config = require('config'); //we load the db location from the JSON files

function connectToDB(){
    const url = config.DBUrl + ':' + config.DBPort + '/' + config.DBHost;
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('MongoDB database connection established successfully'));
}

async function dropDB(){
    const db = mongoose.connection;
    await db.dropDatabase();
}
module.exports = {
    connectToDB,
    dropDB
};
