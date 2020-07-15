const express = require('express');
const router = require('./src/controller/Controller');

const app = express();
const port = 3000;

app.use(router);

app.listen(port, () => {
  console.log('server\'s workin\'');
});