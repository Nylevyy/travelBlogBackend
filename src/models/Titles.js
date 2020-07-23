const path = require('path');
const Database = require(path.resolve('src/plugins/Database'));

const Data = new Database(path.resolve('src/database/sqliteDb.db'));

class Titles {
  findOne(userID) {
     return Data.connect()
      .then((db) => (
        db.get(`SELECT title FROM titles WHERE userID = ?`, userID)
          .then((title) => title.title)
          .finally(() => {
            db.close();
          })
      ))
  }

  update(title, userID) {
    return Data.connect()
      .then((db) => (
        db.run(`UPDATE titles SET title = ? WHERE userID = ?`, title, userID)
          .then(() => db.get(`SELECT title FROM titles WHERE userID = ?`, userID))
          .then((title) => title.title)
          .finally(() => {
            db.close();
          })
      ))
  }
};

const titles = new Titles;

module.exports = titles;

