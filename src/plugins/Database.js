const sqlite = require('sqlite3').verbose();

class Database {
  constructor(...params) {
    this._params = params;
  }

  init() {
    this._db.run(`
      CREATE TABLE IF NOT EXISTS users (
        userID TEXT PRIMARY KEY NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
    this._db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        articleID TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        location TEXT NOT NULL,
        isImportant INTEGER NOT NULL, 
        userID TEXT,
        FOREIGN KEY (userID)
          REFERENCES users (userID)
            ON DELETE CASCADE
            ON UPDATE CASCADE
      );
    `);
    this._db.run(`
      CREATE TABLE IF NOT EXISTS titles (
        titleID TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        userID TEXT,
        FOREIGN KEY (userID)
          REFERENCES users (userID)
            ON DELETE CASCADE
            ON UPDATE CASCADE
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
      this._db.run(...sql, function(err) {
        if (err) rej(err);
        res(this);
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
