var db = require('../models');

var loginHelpers = function(req, res, next) {
  req.login = function(user) {
    req.session.id = user._id;
  };

  req.logout = function() {
    req.session.id = null;
  };

  if (req.session.id == null) {
    res.locals.user = null;
  } else {
    res.locals.user = req.session.id;
  }

  db.User.findById('56056d08c1f6e05654af18da').populate('records, recordOfWeek, recordOfMonth').exec(function(err, superUser) {
    if (err) {
      console.log(err);
    } else {
     res.locals.superUser= superUser;
    }
    next();
  });
};

module.exports = loginHelpers;