const path = require('path');
const Database = require(path.resolve('src/plugins/Database'));

const Data = new Database(path.resolve('src/database/sqliteDb.db'));

class Users {
  findOne({ username }, cb) {
    Data.connect()
      .then((db) => {
        db.get(`SELECT * FROM users WHERE username = ?`, username)
          .then((user) => {
              for (let key in user) return cb(null, user);
              return cb(null, false);
            })
            .catch((e) => cb(e))
            .finally(() => db.close());
      })
      .catch((e) => cb(e))  
  }

  findById(id) {
    return Data.connect()
      .then((db) => {
        return db.get(`SELECT * FROM users WHERE userID = ?`, id)
          .then((user) => {
            for (let key in user) return user;
            return null;
          })
          .catch(() => null)
          .finally(() => db.close());
      })    
      .catch(() => null)
  }
};

const users = new Users

module.exports = users;
