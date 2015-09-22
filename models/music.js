var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
  tracks: String,
  yearRecorded: Number,
  language: String,
  copyrightHolder: String,
  yearOfCopyright: Number,
  studio: String,
  producer: String,
});

var Music = mongoose.model('Music', musicSchema);

module.exports = Music;