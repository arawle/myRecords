var db = require('../models');

var routeHelpers = {
  ensureLoggedIn: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      return next();
    } else {
      res.redirect('/signup');
    }
  },

  ensureCorrectUser: function(req, res, next) {
    db.Record.findById(req.params.id, function(err, record) {
      if (res.locals.user != req.session.id) {
        res.redirect('/records');
      } else {
        return next();
      }
    });
  },

  preventLoginSignup: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      res.redirect('/records');
    } else {
      return next();
    }
  },
};

module.exports = routeHelpers;