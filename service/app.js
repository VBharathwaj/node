var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Connecting to database
var db = mongoose.connect('mongodb://localhost/bookDb');

var bookRouter = require('./Routes/bookRoutes')();
app.use('/api', bookRouter);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hey Buddy! You did it!');
});

app.listen(port, () => {
    console.log('Gulp is running on port ' + port);
});