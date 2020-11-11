const dbConfig = require('../config/db');

const express = require('express');
const app = express();
const path = require("path");
const ejs = require('ejs');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views', ''));
app.use(express.static(path.join(__dirname , '/views/css', '')));
app.use(bodyParser.urlencoded({extended: false}));
dbConfig.connectToDB();


app.get('/', (req, res) => {
    res.render('addProject');
});

const projects = require('./routes/projects');

app.use('/projects', projects);

app.listen(8080, () => console.log("App listening on port 8080"));

module.exports = app; // for testing
