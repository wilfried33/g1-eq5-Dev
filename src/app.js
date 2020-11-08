const dbConfig = require('./config/db');
const client = dbConfig.client;
let db;


const express = require('express');
const app = express();
const path = require("path");
const ejs = require('ejs');
let bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

init().then(() => {
    app.get('/', (req, res) => {
        res.send('Root');
    }).listen(8080,
        () => console.log("App listening on port 8080"));
});


function init() {
    return new Promise((resolve, reject) => {
        client.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) {
                    return reject(err);
                }
                console.log("Connected successfully to server");
                db = client.db(dbConfig.dbName);
                resolve();
            });
    });
}
