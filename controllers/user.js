const User = require('../models/User');
const passport = require('passport');
const utils = require('../utils');

exports.fetchCurrentUser = (req, res, next) => {
  res.json(req.user.getSerialized());
}


exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(403).send({
          errors: {
            _error: 'Login failed'
          }
      });
    }

    if (!user) {
      return res.status(403).send({
          errors: {
            passwd: info.msg
          }
      });
    }

    const token = utils.generateToken(user);

    res.json(Object.assign({}, user.getSerialized(), {token}));
  })(req, res, next);
}
