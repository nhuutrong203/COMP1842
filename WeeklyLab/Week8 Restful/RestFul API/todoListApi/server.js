var express = require('express');
    app = express()
    port = process.env.port || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://coftivenist:coftivenist@cluster0.cyxvj.mongodb.net/');
app.use(express.urlencoded())
app.use(bodyParser.json());

const routes = require('./api/routes/todoListRoute');
routes(app);
app.listen(port)

console.log('todo list RESTfulAPI server started on: ' + port)