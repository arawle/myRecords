var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/records");

//require other models
module.exports.User = require('./user');
module.exports.Art = require('./albumArt');
module.exports.Artist = require('./artist');
module.exports.Music = require('./music');
module.exports.Physical = require('./physical');
module.exports.Record = require('./record');
