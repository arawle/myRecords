var db = require('../models/index');
var routeMiddleware = require('../middleware/routeHelper');

app.get('/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/signup');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/users/:id', function(req, res) {
  db.User.findById(req.params.id).populate('records').exec(function(err, user) {
    res.render('users/userProfile', {user: user});
  });
});

app.post('/signup', function(req, res) {
  var newUser = req.body.user;
  db.User.create(newUser, function(err, user) {
    console.log('here')
    if (user) {
      console.log('user', user)
      req.login(user);
      res.redirect('/records');
    } else {
      console.log('else', user)
      res.redirect('/records');
    }
  });
});

app.post('/login', function(req, res) {
  db.User.authenticate(req.body.user, function(err, user) {
    if (!err && user !== null) {
      req.login(user);
      res.render('homePage')
    } else {
      res.redirect('/signup');
    }
  });
});