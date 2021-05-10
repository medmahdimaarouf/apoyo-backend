const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const Config = require('config')
const User = require("../models/user.model")

var opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: Config.get('passport').secret_key }

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    User.authenticate())
  )

  /*,function(username, password, done) {
    console.log("AUTH DATA  : email->" +  username + "password : " + password);
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false,{message:"user is null"}); }
      if (!user.verifyPassword(password)) { return done(null, false,{message:"passwprd incorrect"}); }
      return done(null, user);
    });
  }));
*/
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    //console.log("jwt_payload ",jwt_payload)
    User.findOne({ email: jwt_payload.email }, function (err, user) {

      if (err) {
        console.log("JWT ERROR", err)
        return done(err, false);

      }
      if (!user) {
        console.log("JWT WTF", "Incorrect username.")
        return done(null, false);
        // or you could create a new account
      }

      if (user) {
        //console.log("JWT USER", user)
        return done(null, user);
      }
    });
  }));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};

