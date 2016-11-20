var express = require("express");
var passport = require("passport");

var {User} = require("../models/user");
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in to see this page. no style inofmratio????");
    res.redirect("/login");
  }
}

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


router.get('/', function(req, res){
  res.render('home',{
    pretty: true,
    title: 'Welcome to the voting app',
    showFeature: true
  });
})

router.get('/signup', function(req, res){
  var name = req.params.name;
  res.render('home', {
    pretty: true,
    name,
    signup: true,
    title: 'create a new account'
  });
})

router.post('/signup', function(req, res){
  console.log(req.body.email);
  console.log(req.body.password);
  var user = new User({
    username: req.body.email,
    password: req.body.password
  })

  user.save().then((doc) => {
    console.log('done!!!saveing to DB')
    console.log(doc);
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

})

router.get('/login', function(req, res){
  var name = req.params.name;
  res.render('home', {
    pretty: true,
    name,
    login: true,
    title: 'Login to crate a vote'
  });
})

router.get('/:name', function(req, res){
  // var name = req.params.name;
  // res.render('home', {
  //   pretty: true,
  //   name,
  //   newPoll: true,
  //   title: 'Add new poll'
  // });
})

router.get('/:name/all', function(req, res){
  // var name = req.params.name;
  // res.render('home', {
  //   pretty: true,
  //   name,
  //   allPolls: true,
  //   title: 'All your polls'
  // })
})

router.get('/:name/:vote', function(req, res){
  // var name = req.params.name;
  // var voteId = req.params.vote;
  // var showResult = req.query.r == 'true' ? true : false;
  // if(showResult){
  //   res.render('home', {
  //     pretty: true,
  //     name,
  //     title: 'This is the vote name',
  //     showResult
  //   })
  // }else{
  //   res.render('home', {
  //     pretty: true,
  //     name,
  //     title: 'This is the vote name',
  //     voteId
  //   })
  // }
})

module.exports = router;
