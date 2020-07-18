const express = require('express');
const cookieSession = require('cookie-session');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/model/db.db');



const users = (userName, Password) => {
  db.run("CREATE TABLE IF NOT EXISTS users(userName TEXT, Password TEXT)");
db.serialize(() => {

  db.run("INSERT INTO users(userName, Password) VALUES('second', 'firstpasssw')");
});

  let status;
  db.serialize(() => {
    status = db.get("SELECT userName FROM users WHERE userName = ?", userName/* , (err, usr) => {
      if (err) return false;
      console.log('usr' + usr);
      if (!usr) return false;
      return db.get("SELECT users WHERE Password = ?", Password, (err, user) => {
        if (err) return false;
        if (!user) return false;
        return true;
      });
    } */);
  });
  console.log(userName);
  console.log(status);
  return status;
}

module.exports = users;
