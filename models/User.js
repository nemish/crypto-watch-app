import Currency from './Currency';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  userId: String,
  passwd: String,
  currencies: Array
});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('passwd')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.passwd, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.passwd = hash;
      next();
    });
  });
});


/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.passwd, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.methods.getSerialized = function () {
  const { name, _id } = this;
  return {
    name, _id
  };
};

UserSchema.methods.trackCurrency = function (currencyId) {
  if (!this.currencies) {
    this.currencies = [];
  }
  if (this.currencies.indexOf(currencyId) === -1) {
    this.currencies.push(currencyId);
  }
  return this.save().then(() => {
    return Currency.findById(currencyId, (err, cur) => {
      console.log('cur.trackingByUsersCount', cur.code, cur.trackingByUsersCount)
      if (!cur.trackingByUsersCount) {
        cur.trackingByUsersCount = 1
      } else {
        cur.trackingByUsersCount += 1;
      }
      return cur.save();
    });
  });
};

UserSchema.methods.untrackCurrency = function (currencyId) {
  this.currencies = this.currencies.filter(id => id.toString() !== currencyId);
  return this.save().then(() => {
    return Currency.findById(currencyId, (err, cur) => {
      --cur.trackingByUsersCount;
      if (cur.trackingByUsersCount <= 0) {
        cur.remove();
      } else {
        cur.save()
      }
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
