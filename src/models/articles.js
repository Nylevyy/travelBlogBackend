const path = require('path');
const Database = require(path.resolve('src/plugins/Database'));
const uuidv4 = require(path.resolve('src/helpers/uuid'));

const Data = new Database(path.resolve('src/database/sqliteDb.db'));

class Articles {
  findAll(userID) {
     return Data.connect()
      .then((db) => (
        db.all(`SELECT articleID AS id, title, description, date, location, isImportant FROM articles WHERE userID = ?`, userID)
          .then((articles) => articles)
          .finally(() => {
            db.close();
          })
      ))
  }
 
  insert(article, userID) {
     return Data.connect()
      .then((db) => (
        db.run(`INSERT INTO articles VALUES (?, ?, ?, ?, ?, ?, ?)`, [
          uuidv4(),
          article.title,
          article.description,
          article.date,
          article.location,
          +article.isImportant,
          userID,
        ])
          .then(() => db.all(`SELECT articleID AS id, title, description, date, location, isImportant FROM articles WHERE userID = ?`, userID))
          .then((articles) => articles)
          .finally(() => {
            db.close();
          })
      ))
  }

  update(article, articleID, userID) {
    return Data.connect()
      .then((db) => (
        db.run(`
          UPDATE articles
          SET title = ?,
            description = ?,
            date = ?,
            location = ?,
            isImportant = ?
          WHERE (articleID = ? AND userID = ?);
        `, [
          article.title,
          article.description,
          article.date,
          article.location,
          +article.isImportant,
          articleID,
          userID,
        ])
          .then(() => db.all(`SELECT articleID AS id, title, description, date, location, isImportant FROM articles WHERE userID = ?`, userID))
          .then((articles) => articles)
          .finally(() => {
            db.close();
          })
      ))
  }

  delete(articleID, userID) {
    return Data.connect()
      .then((db) => (
        db.run(`
          DELETE FROM articles WHERE (articleID = ? AND userID = ?);
        `, [articleID, userID])
          .then(() => db.all(`SELECT articleID AS id, title, description, date, location, isImportant FROM articles WHERE userID = ?`, userID))
          .then((articles) => articles)
          .finally(() => {
            db.close();
          })
      ))
  }
};


const articles = new Articles;

module.exports = articles;