var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/records");

//require other models
module.exports.User = require('./user');

module.exports.Record = require('./record');
