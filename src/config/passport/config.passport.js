const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const users = require(path.resolve('src/models/users'));



const findUser = (username, password, done) => {
  const result = users.find(username, password);
  if (!result) return done(null, false);
  return done(null, result);
}

passport.use(new LocalStrategy(findUser));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  const user = users.findById(userId);
  if (!user) done(new Error())
  done(null, user)
});

// , (err, user) => {
//   console.log('here');
//   if (err) return done(err);
//   console.log(username, password);
//   if (!user) return done(null, false);
//   return done(null, user);
// }