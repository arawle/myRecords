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
  db.User.findById(req.params.id).populate('records').exec(req.params, function(err, data) {
   console.log(data)
    if (err) {
      console.log(err);
      res.render('404');
    } else {
      res.render('users/userProfile', {user: data});
    }
  });
});


app.post('/signup', function(req, res) {
  var newUser = req.body.user;
  db.User.create(newUser, function(err, user) {
    if (user) {
      req.login(user);
      res.redirect('/records');
    } else {
      res.redirect('/records');
    }
  });
});

app.post('/login', function(req, res) {
  db.User.authenticate(req.body.user, function(err, user) {
    if (!err && user !== null) {
      req.login(user);
      res.redirect('users/' + user._id)
    } else {
      res.redirect('/signup');
    }
  });
});