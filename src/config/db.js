const mongoose = require('mongoose');
const PORT = '27017';
const URL = 'mongodb://localhost';
const DB_NAME = 'CDP';
const TEST_DB_NAME = "CDP-TEST";

function connectToTestDB(){
    connect(TEST_DB_NAME);
}

function connectToDB(){
    connect(DB_NAME);
}

function connect(dbName){
    const url = URL + ':' + PORT + '/' + dbName;
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("MongoDB database connection established successfully");
    });
}
module.exports = {
    connectToDB,
    connectToTestDB
};
