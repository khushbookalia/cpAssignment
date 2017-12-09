const User=require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('./../config');

exports.postDetails=function(req, res, next){
    const secret = config.tokenSecretKey;
    User.findOne({email: req.body.email}, function(err, user) { 
    console.log('user:: ',user);
    
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'User not found. Please enter valid emailId', code: 111 });//connection refused
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
          //console.log(isMatch,err);
        if (isMatch && !err) {
            var payload = {id:user._id};
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(payload, secret, {
            expiresIn: 10080 // in seconds
          });

          res.json({ success: true, token: 'JWT ' + token , message:user});//successful, data will send JSON format
        } else {
          res.send({ success: false, message: 'Passwords did not match. Plaese enter valid password', code: 112 });
        }
      });
    }
  });
   
}


