const authRouter = require('express').Router();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
require(path.resolve('src/config/passport/config.passport'));

authRouter.post('/login', (req, res, next) => {
  debugger;
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    console.log(user); 
    if (!user) return res.redirect('/');
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/users/' + user.userName);
    });
  })(req, res, next);
})

console.log(passport.authenticate('local'));

authRouter.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/')
})

module.exports = authRouter;

// (req, res, next) => {
//   const { login, password } = req.body;
//   if (!login || !password) res.sendStatus(400);
//   const logged = users.find(login, password);
//   logged ? res.sendStatus(200) : res.sendStatus(401);