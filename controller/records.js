var db = require('../models');
var mongoose = require('mongoose');
var routeMiddleware = require('../middleware/routeHelper');
//all records page
app.get('/records', function(req, res) {
  db.Record.find({}).exec(function(err, data) {
    db.User.findById(req.session.id).populate('records recordOfWeek recordOfMonth').exec(function(err, user) {
    if (err) {
          console.log(err);
        } else {
          res.render('records/home', {record: data, user: user});
        }
    });
  });
});
//add a new record page
app.get('/records/new', routeMiddleware.ensureLoggedIn, function(req, res) {
  db.User.findById(req.session.id).populate('records recordOfWeek recordOfMonth').exec(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('records/newRecord', {user: user});
    }
  });
});
//render individual record page
app.get('/records/:id', function(req, res) {
  db.Record.findById(req.params.id).exec(function(err, data) {
    db.User.findById(req.session.id).populate('records recordOfWeek recordOfMonth').exec(function(err, user) {
      if (err) {
        console.log(err);
        res.render('404');
      } else {
        res.render('records/record', {record: data, user: user});
      }
    });
  });
});
//create new record
app.post('/records', function(req, res) {
  db.Record.create(req.body, function(err, record) {
    if (err) {
      console.log(err);
    } else {
      if(req.body.photo == '') {
        record.photo = 'http://www.thatpetplace.com/c.1043140/site/img/photo_na.jpg';
      }
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
//edit or update record
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
//small edit form
app.put('/records', function(req, res) {
  var test = (req.body.id);
  db.Record.findByIdAndUpdate(test, req.body, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      data.save();
      res.send('success');
    }
  });
});
//delete record
app.delete('/records/:id', routeMiddleware.ensureLoggedIn, function(req, res) {
  db.Record.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      data.remove();
      res.send(data + 'was removed successfully');
    }
  });
});

