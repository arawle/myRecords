var mongoose = require('mongoose');
var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  records: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
  },],
  admin: Boolean,
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')){
    return next();
  }
  return bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        console.log(err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  });
});

userSchema.statics.authenticate = function(formData, callback) {
  this.findOne({
    email: formData.email,
  },
  function(err, user) {
    if (user === null) {
      callback('invalid username or password', null);
    } else {
      user.checkPassword(formData.password, callback);
    }
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  var user = this;
  bcrypt.compare(password, user.password, function(err, isMatch) {
    if (isMatch) {
      callback(null, user);
    } else {
      callback(err, null);
    }
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;