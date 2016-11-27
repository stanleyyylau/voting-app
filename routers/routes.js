var express = require("express");
var passport = require("passport");

var {User} = require("../models/user");
var {Poll} = require("../models/poll");
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
  res.render('account', {
    pretty: true,
    name,
    signup: true,
    title: 'create a new account'
  });
})


router.post("/signup", function(req, res, next) {

  var username = req.body.email;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);

  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get('/login', function(req, res){
    res.render('account', {
        pretty: true,
        login: true,
        title: 'Login to crate a vote'
    });
})

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get('/new', ensureAuthenticated, function(req, res) {
  res.render('home', {
    pretty: true,
    name: true,
    newPoll: true,
    title: 'Add new poll'
  })
})

router.post('/new', ensureAuthenticated, function(req, res){
  // first make the options array
  var optionsArr =[];
  console.log(req.body);
  var optionss = req.body["options[]"];
  optionss.forEach(function(value, index){
    var newObj = {
      option: value,
      votes: 0
    }
    optionsArr.push(newObj);
  })
  var newPoll = new Poll({
    title: req.body.title,
    _creator: req.user._id,
    options: optionsArr
  })

  // save this shit to DB
  newPoll.save().then((poll) => {
    console.log(poll)
    res.json({
      redirect: '/all'
    })
  }, (e) => {
    res.status(400).send(e);
  })
})


router.get('/allpolls', function(req, res){

  Poll.find({}).then((all) => {
    console.log(all);
    res.render('all_polls', {
      pretty: true,
      title: 'All the polls',
      polls: all
    })
  }, (e) => {
    console.log(e);
  })


})




router.get('/all', ensureAuthenticated, function(req, res){

  Poll.find({_creator: req.user._id}).then((all) => {
    res.render('all_my_polls', {
      pretty: true,
      allPolls: true,
      title: 'All your polls',
      polls: all
    })
  }, (e) => {
    console.log(e);
  })


})

router.get('/poll/:id', function(req, res){
  var id = req.params.id;
  var doc;

  Poll.findOne({_id: id}).then((pdoc) => {
    console.log('the doc is ....')
    console.log(pdoc)
    doc = pdoc;
    return User.findOne({_id: doc._creator})

  }).then((auther) => {
    var isLogIn;
    if (req.user){
      isLogIn = true;
    }else{
      isLogIn = false;
    }
    res.render('poll_detail', {
      pretty: true,
      poll: doc,
      isLogIn,
      voteTitle: doc.title,
      voteAuthor: auther.username,
      voteOptions: doc.options
    })
  })
  .catch((e) => {
    console.log(e);
  })
})


router.post('/newoption', function(req, res){
  Poll.findOneAndUpdate(
    {_id: req.body.voteId},
    {$push: {"options": {option: req.body.newOption, votes: 0}}},
    {safe: true, upsert: true}
  ).then((poll) => {
    console.log(poll);
    res.json({
      redirect: '/poll/'+ poll._id
    })
  }).catch((e) => {
    console.log(e);
  })
})

router.post('/vote', function(req, res){
  // to do, check db and increment the vote by one
  var pollId = req.body.pollId;
  var option = req.body.option;
  Poll.findOneAndUpdate({ _id: pollId, "options.option": option}, {$inc: {"options.$.votes" : 1}})
  .then((doc) => {
    console.log(doc);
    return Poll.findOne({_id: doc._id})
  })
      .then((poll) => {
        res.json({
          title: poll.title,
          options: poll.options
        })
      })
  .catch( (e) => {
    console.log(e);
  });
})

router.get('/test', function(req, res){
    res.render('home', {
      pretty: true,
      name: true,
      title: 'This is the vote name',
      voteId: '583a4f65308c1e0df28923e5'
    })
})


router.delete('/poll', ensureAuthenticated, function(req, res){
  Poll.findOneAndRemove({_id: req.body.id}).then((doc) => {
    console.log('the remove doc is ....')
    console.log(doc)
    res.json({redirect: "/all"})
  }, (e) => {
    console.log(e);
  })
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
