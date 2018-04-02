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
  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});


module.exports = app;


