var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;
var bookRouter = require('./routes/bookRoutes')(Book);

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
app.use('/api/books', bookRouter)

app.get('/', function (req, res) {
    res.send('Welcome to any API');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});