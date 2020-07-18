const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const FileStore = require('session-file-store')(session);
const authRouter = require(path.resolve('src/controllers/routes/auth/auth'));
const calendarRouter = require(path.resolve('src/controllers/routes/calendar/calendar'));

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const filestoreOptions = {};

app.use(session({
  store: new FileStore(filestoreOptions),
  secret: 'al jazair',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    secure: true,
    maxAge: 60 * 60 * 24 * 1000,
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  if (req.isAuthenticated()) next();
  res.sendStatus(401);
})
app.use('/api/calendarData', calendarRouter);

app.listen(port, () => {
  console.log('server\'s workin\'');
});