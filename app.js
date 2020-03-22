const express = require('express');
require('dotenv').config();
var mysql = require('mysql');
const app = express();
var users = [{
  id: 1,
  fullname: 'Anh',
  username: 'Anh',
  email: 'vuthilyna304@email.com',
  password: '1'
}];

const path = require('path');
const cookieParser = require('cookie-parser');
//const logger = require('morgan');
const { sessionModules } = require('./config/session');

const adminRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setting up sessions
app.set('trust proxy', 1); // trust first proxy
app.use(sessionModules);

// Setting up routers
app.use('/', adminRouter);
 //app.use(app.router);
 //adminRouter.initialize(app);
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
app.set('view-engine', 'ejs')
app.use(express.urlencoded({
  extended: false
}))
app.use(session({
  secret: 'nana',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 24
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
const knex = require('./database/connection');

app.use(flash())

module.exports = app;