const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const storeConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 1000,
  expiration: Number(process.env.SESSION_AGE),
};

const sessionStore = new MySQLStore(storeConfig);
const sessionConfig = {
  key: process.env.COOKIE_NAME,
  secret: 'nana',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    //  Cookie.secure is only available in HTTPS only ( express-session doc )
    // secure: true,
    // The age of the cookie that is sent to client-side
    maxAge: Number(process.env.COOKIE_AGE),
  },
};
const sessionModules = session(sessionConfig);
module.exports = {
  sessionModules,
};
