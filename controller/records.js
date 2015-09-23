var db = require('../models');
var mongoose = require('mongoose');
var routeMiddleware = require('../middleware/routeHelper');

app.get('/records', function(req, res) {
  db.Record.find({}).exec(function(err, data) {
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
  db.Record.findById(req.params.id).exec(function(err, data) {
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
      res.redirect('/records/' + record._id);
    }
  });
});

app.put('/records/:id', routeMiddleware.ensureCorrectUser, function(req, res) {
  db.Record.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    if (err) {
      console.log(err);
    } else {
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

