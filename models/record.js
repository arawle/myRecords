var mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
  //physical
  condition: String,
  quantity: Number,
  sizeDia: Number,
  yearPressed: Number,
  dieCutShape: String,
  audiofileFeatures: String,
  rpmSpeed: Number,
  holeConfiguration: String,
  productionRun: String,
  wherePressed: String,
  whereReleased: String,
  //artists
  leadArtists: String,
  bandMembers: String,
  studioMusicians: String,
  songwriters: String,
  movieCast: String,
  //music
  tracks: String,
  yearRecorded: Number,
  language: String,
  copyrightHolder: String,
  yearOfCopyright: Number,
  studio: String,
  producer: String,
  //album art
  photo: String,
  colorBW: Boolean,
  artTheme: String,
  artists: String,
  size: String,
  dieCut: Boolean,
  shape: String,
  objectsInside: Boolean,
  mistakes: String,
  colorTheme: String,
  coverCondition: String,
  //other
  genre: String,
  use: String,
  lastPrice: Number,
  notes: String,
  owner: String,
  available: Boolean,
  forSale: Boolean,
});

recordSchema.pre('remove', function(callback) {
  callback();
});

var Record = mongoose.model('Record', recordSchema);

module.exports = Record;