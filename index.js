const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const FileStore = require('session-file-store')(session);
const authRouter = require(path.resolve('src/routes/auth/routes-auth'));
const calendarRouter = require(path.resolve('src/routes/calendar/routes-calendar'));

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1)

const filestoreOptions = {};

app.use(session({
  store: new FileStore(filestoreOptions),
  secret: 'al jazair',
  resave: false,
  saveUninitialized: false,
  name: 'travelBlogAccess',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000,
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.sendStatus(401);
})

app.use('/api/calendarData', calendarRouter);

app.listen(port, () => {
  console.log('server\'s workin\'');
});