var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var db = mongoose.connect('mongodb://localhost/libmgmt');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./Routes/Book')();
app.use('/book', bookRouter);

app.get('/', (req,res) => {
    res.send('Howdy! You did it again');
});

app.listen(port, () => {
    console.log('Listening to Port Number: ' + port);
});