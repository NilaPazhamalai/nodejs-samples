var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var db = require('./db');
require('./routes/z-passportApp')(passport); // pass passport for configuration

app.use(bodyParser.urlencoded({ urlencoded: false }));
app.use(bodyParser.json());

  /* Passport */
  app.use(passport.initialize());
  app.use(passport.session());

  //routes
var appRoutes = require('./routes/appRoutes');
var authRoutes = require('./routes/authRoutes')(passport);

app.use('/',authRoutes);
app.use('/app',appRoutes);
  

module.exports = app;


