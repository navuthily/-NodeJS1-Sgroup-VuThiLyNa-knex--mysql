var express = require('express');
var router = express.Router();
const passport = require('passport')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const methodOverride = require('method-override')
const knex= require('../database/connection');
/* GET home page. */
router.get('/', checkAuthenticated, async function(req,res){
  const data= await knex('users').select('*');
  console.log(data);
  res.render('index.ejs', {
    username: req.user.username
  })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
router.get('/nana', function(req, res, next) {
  res.send('index');
});
module.exports = router;
