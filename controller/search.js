var db = require('../models');
var mongoose = require('mongoose');

app.get('/search', function (req, res) {
  var request = require('request');
  var yourSearch = req.query.search.toString();
  db.Record.find({"genre": yourSearch}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      databaseSearch = found;
      console.log(databaseSearch)
    }
  });


  // request.get(website, function (error, response, body) {
  //   if (error) {
  //     console.log("Error!  Request failed - " + error);
  //   } else if (!error && response.statusCode === 200) {
  //     console.log(body);
  //     var parseIt = JSON.parse(body);
  //      res.render('/search', {data: parseIt.items})
  //   }
  // });
})