const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');


const authPath = '/api/auth';

authRouter.post(authPath, (req, res, next) => {
  const { login, password } = req.body;
  if (!login || !password) res.sendStatus(400);
  
})