var mongoose = require('mongoose');

var physicalSchema = new mongoose.Schema({
  condition: String,
  quantity: Number,
  size: Number,
  yearPressed: Number,
  dieCutShape: String,
  audiofileFeatures: String,
  rpmSpeed: Number,
  holeConfiguration: String,
  productionRun: String,
  wherePressed: String,
  whereReleased: String,
});

var Physical = mongoose.model('Physical', physicalSchema);

module.exports = Physical;