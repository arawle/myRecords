var express = require('express');
var session = require('cookie-session');
var ejs = require('ejs');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = require('./models');

//for stripe
stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

loginMiddleware = require('./middleware/loginHelper');
routeMiddleware = require('./middleware/routeHelper');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(session({
  maxAge: 36000000,
  secret: 'somethinghere',
  name: 'oatmeal',
}));

app.use(loginMiddleware);

require('./controller');

// where to see my library
app.listen(3000, function () {
  console.log("Go to localhost:3000/");
});