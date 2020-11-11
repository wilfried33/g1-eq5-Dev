const dbConfig = require('./config/db');

const service = require("./services/projectService");
const express = require('express');
const app = express();
const path = require("path");
const ejs = require('ejs');
let bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

dbConfig.connectToDB();


app.get('/', (req, res) => {
    res.send('Root');
}).listen(8080,
    () => console.log("App listening on port 8080"));

