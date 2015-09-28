var db = require('../models');
var mongoose = require('mongoose');

app.get('/search', function (req, res) {
  var request = require('request');
  var yourSearch = req.query.search.toString();
  db.Record.find({$or: [{"genre": {$regex: yourSearch, $options:'$i'}}, {"leadArtists": {$regex: yourSearch, $options:'$i'}}, {"tracks": {$regex: yourSearch, $options:'$i'}}]}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      databaseSearch = results;
      res.render('users/search', {data: results})
    }
  });
});