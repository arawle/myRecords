var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
  leadArtists: Array,
  bandMembers: Array,
  studioMusicians: Array,
  songwriters: Array,
  movieCast: Array,
});

var Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;