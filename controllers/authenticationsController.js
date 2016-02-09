var passport = require('passport');
var jwt      = require('jsonwebtoken');
var User     = require('../models/user');
var secret   = require('../config/config').secret;

function register(req, res, next) {
  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).json({ message: 'Something went wrong! Please try again.' });
    if (info) return res.status(401).json({ message: info.message });
    if (!user) return res.status(401).json({ message: 'You have already registered. Please login.' });

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({ 
      success: true,
      message: "Thank you for authenticating.",
      token: token,
      user: user
    });
  });
}

function login(req, res, next) {
  User.findOne({
    "local.email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(403).json({ message: 'No user found with this email.' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: 'Password is incorrect.' });

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token,
      user: user
    });
  });
}

module.exports = {
  register: register,
  login: login
};