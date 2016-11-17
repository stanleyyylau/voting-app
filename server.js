require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/poll');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
var port = process.env.PORT || 5000;

app.set('view engine', 'pug');
app.use(express.static('static'));
// app.use(express.static(''))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', function(req, res){
  res.render('home',{
    pretty: true,
    title: 'Welcome to the voting app',
    showFeature: true
  });
})

app.get('/signup', function(req, res){
  var name = req.params.name;
  res.render('home', {
    pretty: true,
    name,
    signup: true,
    title: 'create a new account'
  });
})

app.post('/signup', function(req, res){
  console.log(req.body.email);
  console.log(req.body.password);
  var user = new User({
    email: req.body.email,
    password: req.body.password
  })

  user.save().then((doc) => {
    console.log(doc);
    res.json({
      email: doc.email,
      id: doc._id,
      pw: doc.password,
      tk: doc.tokens
    });
  }, (e) => {
    res.status(400).send(e);
  });

})

app.get('/login', function(req, res){
  var name = req.params.name;
  res.render('home', {
    pretty: true,
    name,
    login: true,
    title: 'Login to crate a vote'
  });
})

app.get('/:name', function(req, res){
  // var name = req.params.name;
  // res.render('home', {
  //   pretty: true,
  //   name,
  //   newPoll: true,
  //   title: 'Add new poll'
  // });
})

app.get('/:name/all', function(req, res){
  // var name = req.params.name;
  // res.render('home', {
  //   pretty: true,
  //   name,
  //   allPolls: true,
  //   title: 'All your polls'
  // })
})

app.get('/:name/:vote', function(req, res){
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

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
