// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../model/User');

// expose this function to our app using module.exports
module.exports = function (passport) {

  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
      cb(err, user);
    });
  });


  /* Passport local*/
  const LocalStrategy = require('passport-local').Strategy;


  var verifyUser = async function (req, email, password, done) {
    console.log(email + "  - " + password);
    try {
      var user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false);
      }
      console.log("user"+ user);
      console.log(user.password);
      console.log(password);
      if (user.validPassword(password)) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }

  passport.use(new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    verifyUser
  ));
}

