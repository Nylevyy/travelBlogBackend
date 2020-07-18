const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const users = require('../../model/users.js');

const authRouter = express.Router();
const authPath = '/api/auth';

passport.use(new LocalStrategy((userName, password, done) => {
  users.findOne({userName}, (err, user, ) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (!user.verifyPassword) return done(null, false);
    return done(null, user);
  })
}))

authRouter.post(authPath, (req, res, next) => {
  const { login, password } = req.body;
  if (!login || !password) res.sendStatus(400);
  const logged = users(login, password);
  logged ? res.sendStatus(200) : res.sendStatus(401);
  next();
})

module.exports = authRouter;
