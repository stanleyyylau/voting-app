var express = require('express')

var app = express();
var port = process.env.PORT || 5000;

app.set('view engine', 'pug');
app.use(express.static('views'));

app.get('/', function(req, res){
  res.render('home');
})

app.get('/:name', function(req, res){
  var name = req.params.name;
  res.render('home', {
    name,
    newPoll: true,
    title: 'Add new poll'
  });
})

app.get('/:name/all', function(req, res){
  var name = req.params.name;
  res.render('home', {
    name,
    allPolls: true,
    title: 'All your polls'
  })
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
