var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser")


var logger = require('morgan');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pageDEV", {useUnifiedTopology: true, useNewUrlParser: true,})

var indexRouter = require('./routes/index');
var minecraftRouter = require("./routes/minecraft")
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cookies


// app.use(session({
//   secret: "its a real secret for now :shush:",
//   cookie: {
//     maxAge: 600000 * 60 * 24 * 365.25
//   },
//   saveUninitialized: false,
//   name: "ProjectForums"
// }))


//random use stuff lol
app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/minecraft", minecraftRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
