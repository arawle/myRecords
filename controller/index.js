//home
app.get('/', function(req, res) {
  res.render('homePage')
});

//require other controllers
require('./users');
require('./records');

//404 render
app.get('*', function(req, res) {
  res.send('404');
});