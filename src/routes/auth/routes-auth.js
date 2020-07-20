const authRouter = require('express').Router();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
require(path.resolve('src/config/passport/config.passport'));

authRouter.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({userName: req.user.name});
    return;
  }
  res.sendStatus(401);
})

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  })(req, res, next);
})

authRouter.get('/logout', (req, res, next) => {
  req.logOut();
  res.sendStatus(200);
})

module.exports = authRouter;
