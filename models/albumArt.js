var mongoose = require('mongoose');

var artSchema = new mongoose.Schema({
  photo: String,
  colorBW: Boolean,
  artTheme: String,
  artists: Array,
  size: String,
  dieCut: Boolean,
  shape: String,
  objectsInside: String,
  mistakes: String,
  colorTheme: String,
  coverCondition: String,
});

var Art = mongoose.model('Art', artSchema);

module.exports = Art;