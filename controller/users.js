var db = require('../models/index');
var routeMiddleware = require('../middleware/routeHelper');
//signup page
app.get('/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/signup');
});
//logout page
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
//individule user profile
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
//display enter password page to add admin
app.get('/admins', function(req, res) {
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
//create admin
app.put('/admins', function(req, res) {
  db.User.findByIdAndUpdate(req.session.id, req.body, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      if (req.body.adminPass == '$2a$10$NhFuDxvOofDjVrJAq9eCe.n8KEOZPBEvjI7rBKpaMCwRO4E3bCrCCc') {
        user.admin = true;
        console.log('test worked')
      }
    }
    user.save();
    res.redirect('/users/' + req.session.id);
  });
});
// signup new user
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
//login user
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