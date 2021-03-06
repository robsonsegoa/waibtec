var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('express-flash');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var load = require('express-load');

var app = express();

/*/////MongoDB Conn Projeto*/
mongoose.connect('mongodb://192.168.10.209:27017/waib');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Doesn't work flash in express4 in this case
//to use this https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423
/*app.use(express.cookieParser('waibtec'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());
*/

//load('models').then('controllers').then('routes').into(app);

//app.use('/', routes);
//app.use('/users', users);


load('models').then('controllers').then('routes').into(app);

/*/////MongoDB Conn Block*////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

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

app.listen(8080);