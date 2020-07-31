const authRouter = require('express').Router();
const path = require('path');
const passport = require('passport');
const auth = require(path.resolve('src/controllers/services/servicesAuth'))
require(path.resolve('src/controllers/services/config.passport'));

authRouter.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({username: req.user.username});
    return;
  }
  res.sendStatus(401);
})

authRouter.post('/join', (req,res, next) => {
  auth.createUser(req.body)
    .then(() => res.sendStatus(200))
    .catch((e) => {
      if (!e.message) {
        res.sendStatus(500);
        return;  
      }
      res.sendStatus(400)
    })
})

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.status(401).send(info.message);
    }
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
