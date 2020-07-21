const sqlite = require('sqlite3').verbose();

class Database {
  constructor(...params) {
    this._params = params;
  }

  init() {
    this._db.run(`
      CREATE TABLE IF NOT EXISTS users (
        userID INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
    this._db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        articleID INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        location TEXT NOT NULL,
        userID INT,
        FOREIGN KEY (userID)
          REFERENCES users (userID)
      );
    `);
    this._db.run(`
      CREATE TABLE IF NOT EXISTS titles (
        titleID INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        userID INT,
        FOREIGN KEY (userID)
          REFERENCES users (userID)
      );
    `);
  }

  connect(mode) {
    return new Promise((res, rej) => {
      if (!mode) mode = sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE;
      this._db = new sqlite.Database(...this._params, mode, (err) => {
        rej(err);
      });
      this.init();
      res(this);
    });
  }

  run(...sql) {
    return new Promise((res, rej) => {
      this._db.run(...sql, (err) => {
        console.log('err');
        if (err) rej(err);
        res();
      });
    });
  }

  all(...sql) {
    return new Promise((res, rej) => {
      this._db.all(...sql, (err, rows) => {
        if (err) rej(err);
        res(rows);
      });
    });
  }

  get(...sql) {
    return new Promise((res, rej) => {
      this._db.get(...sql, (err, row) => {
        if (err) rej(err);
        res(row);
      });
    });
  }
 
  each(...sql) {
    return new Promise((res, rej) => {
      this._db.each(...sql, (err, row) => {
        if (err) rej(err);
        res(row);
      });
    });  
  }
 
  close() {
    return new Promise((res, rej) => {
      this._db.close((err) => {
        if (err) rej(err);
      });
      delete this._db;
      res();
    });
  };
}

module.exports = Database;
