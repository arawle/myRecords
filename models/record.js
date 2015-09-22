var mongoose = require('mongoose');

var Artist = require('./artist');
var Music = require('./music');
var Physical = require('./physical');
var Art = require('./albumArt');

var recordSchema = new mongoose.Schema({
  physical: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Physical',
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  },
  music: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music',
  },
  art: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Art',
  },
  genre: String,
  use: String,
  lastPrice: Number,
  notes: String,
  recordOfWeek: Boolean,
  recordOfMonth: Boolean,

});

recordSchema.pre('remove', function(callback) {
  Physical.remove({record: this_id}).exec();
  Artist.remove({record: this_id}).exec();
  Music.remove({record: this_id}).exec();
  Art.remove({record: this_id}).exec();
  callback();
});

var Record = mongoose.model('Record', recordSchema);

module.exports = Record;