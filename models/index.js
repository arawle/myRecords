var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/my-records");
//require other models
module.exports.User = require('./user');

module.exports.Record = require('./record');
