var express = require('express')

var app = express();
var port = process.env.PORT || 5000;

var TWITTER_CONSUMER_KEY = 'K3ML414i0XGiS8vTJrZ5ZoN7W',
    TWITTER_CONSUMER_SECRET = 'iwwwBAdgu2ch53fpt7x4nHHkuoIOePoihm4vBSmpImxIoGIwry';

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "/success.html"
  },
  function(token, tokenSecret, profile, done) {
    console.log('token is ' + token);
    console.log('tokenSecret is ' + tokenSecret);
    console.log('profile is ' + profile);
    done();
  }
));



app.get('/', function(req, res){
  console.log('u getting a request...')
  res.send('hello you')
})



// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));


app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
