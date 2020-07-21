const authRouter = require('express').Router();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
require(path.resolve('src/controllers/routes/auth/config/config.passport'));

authRouter.get('/', (req, res, next) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.json({username: req.user.username});
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
  req.session.destroy();
  res.sendStatus(200);
})

module.exports = authRouter;
