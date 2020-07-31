const path = require('path');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Database = require(path.resolve('src/plugins/Database'));

const Data = new Database(path.resolve('src/database/sqliteDb.db'));
const saltRounds = 10;

class Users {
  findOne({ username }, cb) {
    Data.connect()
      .then((db) => {
        db.get(`SELECT userID, username, password FROM users WHERE username = ?`, username)
          .then((user) => {
              return cb(null, user);
            })
            .catch((e) => cb(e))
            .finally(() => {
              db.close();
            });
      })
      .catch((e) => cb(e))  
  }

  findById(id) {
    return Data.connect()
      .then((db) => {
        return db.get(`SELECT userID, username, password FROM users WHERE userID = ?`, id)
          .then((user) => user)
          .catch(() => null)
          .finally(() => {
            db.close();
          });
      })    
      .catch(() => null)
  }

  createUser({ username, password }) {
    const userID = uuidv4();
    return Data.connect()
      .then((db) => {
        return bcrypt.hash(password, saltRounds)
          .catch(() => {
            throw new Error('');
          })
          .then((hash) => { 
            return db.run(`INSERT INTO users VALUES (?, ?, ?)`, userID, username, hash)
          })
          .then(() => userID)
          .finally(() => {
            db.close();
          });
      });
  }
};

const users = new Users

module.exports = users;
