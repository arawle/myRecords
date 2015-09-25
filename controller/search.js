var db = require('../models');
var mongoose = require('mongoose');

app.get('/search', function (req, res) {
  var request = require('request');
  var yourSearch = req.query.search.toString();
  db.Record.find(({"genre": yourSearch}, {"leadArtists": yourSearch}, {"tracks": yourSearch}), function(err, found) {
    if (err) {
      console.log(err);
    } else {
      databaseSearch = found;
      console.log(databaseSearch)
      res.render('users/search', {data: found})
    }
  });
})