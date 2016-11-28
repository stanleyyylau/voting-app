// require('./config/config');

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");

var setUpPassport = require("./config/setuppassport.js");
var routes = require("./routers/routes.js");

setUpPassport();

var app = express();
var port = process.env.PORT || 5000;

app.set('view engine', 'pug');
app.use(express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9subbjjnjc0+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);


app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
