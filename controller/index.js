//home
app.get('/', function(req, res) {
  res.redirect('/signup');
});

//require other controllers
require('./users');
require('./records');

//404 render
app.get('*', function(req, res) {
  res.send('404');
});