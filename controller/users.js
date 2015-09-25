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
  db.User.findById(req.params.id).populate('records recordOfWeek recordOfMonth').exec(function(err, data) {
    if (err) {
      console.log(err);
      res.render('404');
    } else {
      res.render('users/userProfile', {user: data});
    }
  });
});

app.get('/admin', function(req, res) {
  db.User.findById(req.params.id, function(err, data) {
    if (err) {
      console.log(err);
      res.render('404');
    } else {
      res.render('users/admin', {user: data});
    }
  });
});

app.put('/users', function(req, res) {
  db.User.findByIdAndUpdate(req.session.id, req.body, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user.save();
      res.send('done');
    }
  });
});

app.put('/admins', function(req, res) {
  db.User.findByIdAndUpdate(req.session.id, req.body, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      if (req.body.adminPass === 'c0ngr@t5@dm!n') {
        user.admin = true;
        user.save;
      }
        res.redirect('/users/' + req.session.id)
    }
  })
})

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