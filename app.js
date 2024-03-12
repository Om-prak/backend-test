var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const expressSession = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

const passport  = require('passport');


//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userModel = require('./models/userModel');

var app = express();

const store = MongoStore.create({
  mongoUrl: 'mongodb+srv://prakashv124421:myQg3sisrpw6Grkv@cluster0.hfqi2tc.mongodb.net/',
  touchAfter: 24 * 3600 ,
  crypto: {
    secret: 'hello world'
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//---------------------------------------------------------------------------------

app.use(flash());

app.use(expressSession({
  store,
  secret: 'hello world',
  resave: false,
  saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


//---------------------------------------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/', usersRouter);

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
