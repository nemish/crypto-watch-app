const passport = require('passport');
const request = require('request');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({name: jwt_payload.name}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

passport.use(new LocalStrategy({ usernameField: 'name', passwordField: 'passwd' }, (name, passwd, done) => {
  User.findOne({ name: name.toLowerCase() }, (err, user) => {
    if (err) {
        return done(err);
    }

    // if no user let's create it! Why not?
    if (!user) {
      user = new User({
          name: name.toLowerCase(), passwd
      });
      user.save();
      return done(null, user);
    }

    user.comparePassword(passwd, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid password.' });
    });
  });
}));
