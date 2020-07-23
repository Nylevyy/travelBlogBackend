const path = require('path');
const Database = require(path.resolve('src/plugins/Database'));

const Data = new Database(path.resolve('src/database/sqliteDb.db'));

class Users {
  findOne({ username }, cb) {
    Data.connect()
      .then((db) => {
        db.get(`SELECT userID, username, password FROM users WHERE username = ?`, username)
          .then((user) => {
              return cb(null, user);
            })
            .catch((e) => cb(e))
            .finally(() => db.close());
      })
      .catch((e) => cb(e))  
  }

  findById(id) {
    return Data.connect()
      .then((db) => {
        return db.get(`SELECT userID, username, password FROM users WHERE userID = ?`, id)
          .then((user) => user)
          .catch(() => null)
          .finally(() => db.close());
      })    
      .catch(() => null)
  }
};

const users = new Users

module.exports = users;
