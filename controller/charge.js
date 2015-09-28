var db = require('../models');
var mongoose = require('mongoose');

app.post('/stripe', function(req, res, next) {
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  var userID = req.session.id;
  // Simple validation
  db.Record.findById(req.body.productID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      if (parseInt(req.body.productAmount) !== parseInt(data.lastPrice)) {
        return res.redirect('/records');
      } else {
        // Create Charge
        var charge = stripe.charges.create({
          amount: 1000, // amount in cents, again
          currency: "usd",
          source: stripeToken,
          description: "Example charge"
        },
        function(err, charge) {
          if (err && err.type === 'StripeCardError') {
            alert('Error processing payment, please try again!');
          }
        });
      }
    }
  });
  db.Record.findByIdAndUpdate(req.body.productID, req.body.available, function(err, record) {
    record.available = false;
    record.owner = userID;
    record.save();
  });
  db.User.findById(req.session.id, function(err, user) {
    user.records.push(req.body.productID);
    user.save();
  });
  res.redirect('/records');
});