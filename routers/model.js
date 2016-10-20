var CONSUMERKEY = 'K3ML414i0XGiS8vTJrZ5ZoN7W',
    CONSUMERSECRET = 'iwwwBAdgu2ch53fpt7x4nHHkuoIOePoihm4vBSmpImxIoGIwry';

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
