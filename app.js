const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
require('dotenv/config');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Passport config
require('./config/passport')(passport);

//importing routes
const advertiseRouter = require('./routes/advert');
const adoptionRouter = require('./routes/adoption');
const usersRouter = require('./routes/users');
const contactRouter = require('./routes/contact');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Vars (sucess and error message)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//GET homepage
app.get('/', function(req, res) {
  res.render('home', { page_name : 'home', accountName: !req.user ? null : req.user.name });
});

//attaching route files to app
app.use('/adoption', adoptionRouter);
app.use('/advertise', advertiseRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter)

//Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, bufferMaxEntries: 0 
  }).then(() => {
    console.log("Database connect successfully!");
}).catch((error) => {
    console.log(error);
})

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