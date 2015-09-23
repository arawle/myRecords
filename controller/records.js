var db = require('../models');
var mongoose = require('mongoose');
var routeMiddleware = require('../middleware/routeHelper');

app.get('/records', function(req, res) {
  db.Record.find({}).populate('physical artist music art').exec(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render('records/home', {record: data});
    }
  });
});

app.get('/records/new', routeMiddleware.ensureLoggedIn, function(req, res) {
  res.render('records/newRecord');
});

app.get('/records/:id', function(req, res) {
  db.Record.findById(req.params.id).populate('physical artist music art').exec(function(err, data) {
    if (err) {
      console.log(err);
      res.render('404');
    } else {
      res.render('records/record', {record: data});
    }
  });
});

app.post('/records', function(req, res) {

  db.Record.create(req.body.record, function(err, record) {
    if (err) {
      console.log(err);
    } else {
      db.User.findById(req.session.id, function(err, user) {
        //add record id to User records and save
        user.records.push(record._id);
        record.owner = (req.session.id);
        record.save();
        user.save();
      });

      db.Art.create(req.body.art, function(err, art) {
        if (err) {
          console.log(err);
        } else {
          record.art = art;
          record.save();
        }
      });

      db.Artist.create(req.body.artist, function(err, artist) {
        if (err) {
          console.log(err);
        } else {
          record.artist = artist;
          record.save();
        }
      });

      db.Physical.create(req.body.physical, function(err, physical) {
        if (err) {
          console.log(err);
        } else {
          record.physical = physical;
          record.save();
        }
      });

      db.Music.create(req.body.music, function(err, music) {
        if (err) {
          console.log(err);
        } else {
          record.music = music;
          record.save();
        }
      });
      res.redirect('/records/' + record._id);
    }
  });
});

app.put('/records/:id', routeMiddleware.ensureCorrectUser, function(req, res) {
  db.Record.findByIdAndUpdate(req.params.id).populate('physical artist music art').exec(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      data.art = req.body.art;
      data.art.save();

      data.music = req.body.music;
      data.music.save();

      data.physical = req.body.physical;
      data.physical.save();

      data.artist = req.body.artist;
      data.artist.save();

      data.genre = req.body.genre;
      data.use = req.body.use;
      data.lastPrice = req.body.lastPrice;
      data.available = req.body.available;
      data.forSale = req.body.forSale;
      data.notes = req.body.notes;
      data.save();

      res.redirect('/records/' + data._id);
    }
  });
});

app.delete('/posts/:id', routeMiddleware.ensureCorrectUser, function(req, res) {
  db.Record.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      data.remove();
      res.send(data + 'was removed successfully');
    }
  });
});

