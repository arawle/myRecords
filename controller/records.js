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
        record.available = true;
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
  db.Record.findByIdAndUpdate(req.params.id, req.body.record, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      //does not render new set of data with change in value displayed, but does
      //update in database if adding notes. On a resubmit, the notes field is blank,
      //so it removes all the notes
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

