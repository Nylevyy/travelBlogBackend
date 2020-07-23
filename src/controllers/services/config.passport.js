const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const Users = require(path.resolve('src/models/Users'));

const findUser = (username, password, done) => {
  Users.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}

passport.use(new LocalStrategy(findUser));

passport.serializeUser((user, done) => {
  done(null, user.userID);
});

passport.deserializeUser((userId, done) => {
  Users.findById(userId)
    .then((user) => {
      if (!user) done(new Error('error in deserialization'))
      done(null, user);
    })      

});
