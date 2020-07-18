const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const users = require(path.resolve('src/models/users'));



const findUser = (username, password, done) => {
  return done(users.find(username, password));
}

passport.use(new LocalStrategy(findUser));
passport.serializeUser((user, done) => {
  console.log('hi');
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
      .then((user) => {
          done(null, user);
      })
      .catch(err => done(err))
});

// , (err, user) => {
//   console.log('here');
//   if (err) return done(err);
//   console.log(username, password);
//   if (!user) return done(null, false);
//   return done(null, user);
// }