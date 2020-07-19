const authRouter = require('express').Router();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
require(path.resolve('src/config/passport/config.passport'));

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/api/calendarData/');
    });
  })(req, res, next);
})

authRouter.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/')
})

module.exports = authRouter;
