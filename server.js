var express = require('express')

var app = express();
var port = process.env.PORT || 5000;

app.set('view engine', 'pug');
app.use(express.static('views'));

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
  var name = req.params.name;
  res.render('home', {
    pretty: true,
    name,
    newPoll: true,
    title: 'Add new poll'
  });
})

app.get('/:name/all', function(req, res){
  var name = req.params.name;
  res.render('home', {
    pretty: true,
    name,
    allPolls: true,
    title: 'All your polls'
  })
})

app.get('/:name/:vote', function(req, res){
  var name = req.params.name;
  var voteId = req.params.vote;
  var showResult = req.query.r == 'true' ? true : false;
  if(showResult){
    res.render('home', {
      pretty: true,
      name,
      title: 'This is the vote name',
      showResult
    })
  }else{
    res.render('home', {
      pretty: true,
      name,
      title: 'This is the vote name',
      voteId
    })
  }
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
