var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../server/models/user.js');
var Users = require('../../server/collections/users.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  new User({userId: id}).fetch().then(function(user) {
    if (!user) {
      console.log('User not found.');
    } else {
      done(null, user);
    }
  })
});