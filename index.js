const express = require('express');
const authRouter = require('./src/controllers/auth/auth');
const calendarRouter = require('./src/controllers/calendar/calendar');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.set('trust proxy', 1)

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.use(cookieSession({
//   name: "firstSess",
//   keys: ['one', 'two']
// }));

app.use(authRouter);
app.use(calendarRouter);

app.listen(port, () => {
  console.log('server\'s workin\'');
});