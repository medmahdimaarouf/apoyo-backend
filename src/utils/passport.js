const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const Config = require('config')
const User = require("../models/user.model")


module.exports = passport => {
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    User.authenticate())
  )

  let accessStrategyOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: Config.get('passport').secret_key }

  passport.use('access', new JwtStrategy(accessStrategyOptions, function (jwt_payload, done) {
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
  let confirmStrategyOptions = { jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'), secretOrKey: Config.get('passport').secret_key }

  passport.use('confirm', new JwtStrategy(confirmStrategyOptions, function (jwt_payload, done) {
    //console.log("jwt_payload ",jwt_payload)
    console.log(jwt_payload)
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
  //ExtractJwt.fromUrlQueryParameter('token');
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};

/*


 passport.authenticate('JWT', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({ err:true, msg:"error" }); }

        if (user.state == "inactive") { return res.json({ err:true, msg:"inactive" });  }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({ err:false, msg:"success" });
        });
    })(req, res, next);

    */