var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var seller = require('./routes/seller');
var buyer = require('./routes/buyer');


var app = express();

app.use(bodyParser.json());

app.use('/', seller);
app.use('/buyer', buyer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.json({'error':'Invalid api call'});
});

var mongoDB = "mongodb://root:1234@ds135747.mlab.com:35747/mydbschema";

mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
