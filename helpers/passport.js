const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const config = require('../config')

module.exports = function(passport) {
  var opts = {};//jwtOptions
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.tokenSecretKey;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      //console.log("payload received..",jwt_payload);
      let id = jwt_payload.id;
    User.findOne({_id: id}, function(err, user) {
      if (err) {
        return done(err, false);//401 unauthorized
      }
      if (user) {               
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));

};