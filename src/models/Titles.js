const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Database = require(path.resolve('src/plugins/Database'));

const Data = new Database(path.resolve('src/database/sqliteDb.db'));
const defaultTitle = 'Придумайте название';
const titleID = uuidv4();

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

  createTitle(userID) {
    const titleID = uuidv4();
    return Data.connect()
      .then((db) => (
        db.run(`INSERT INTO titles VALUES (?, ?, ?)`, titleID, defaultTitle, userID)
          .finally(() => {
            db.close();
          })
      ))
  }
};

const titles = new Titles;

module.exports = titles;

