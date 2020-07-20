const sqlite = require('sqlite3').verbose();

class Database {
  constructor(...params) {
    this._params = params;
  }

  init() {
    this._db.run("CREATE TABLE IF NOT EXISTS users (userID INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, password TEXT")
    this._db.run(`CREATE TABLE IF NOT EXISTS articles (
      articleID INTEGER AUTOINCREMENT PRIMARY KEY, title TEXT, description TEXT, date TEXT, location TEXT, FOREIGN KEY (userID) REFERENCES users (userID)`)
    this._db.run("CREATE TABLE IF NOT EXISTS titles (titleID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, FOREIGN KEY (userID) REFERENCES users (userID)")
    this._db.run("CREATE TABLE IF NOT EXISTS test (textfield TEXT)")
  }

  connect(mode) {
    if (!mode) mode = sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE;
    return new Promise((res, rej) => {
      this._db = new sqlite.Database(...this._params, mode, (err) => {
        rej(err)
      });
      this.init();
      res(this._db);
    })
  }

  run(...sql) {
    return new Promise((res, rej) => {
      this._db.run(...sql, (err) => {
        console.log('err');
        if (err) rej(err);
        res();
      })
    })
  }

  all(...sql) {
    return new Promise((res, rej) => {
      this._db.all(...sql, (err, rows) => {
        if (err) rej(err);
        res(rows);
      })
    })
  }

  get(...sql) {
    return new Promise((res, rej) => {
      this._db.get(...sql, (err, row) => {
        if (err) rej(err);
        res(row);
      })
    })   
  }
 
  each(...sql) {
    return new Promise((res, rej) => {
      this._db.each(...sql, (err, row) => {
        if (err) rej(err);
        res(row);
      })
    })   
  }
 
  close() {
    return new Promise((res, rej) => {
      this._db.close((err) => {
        if (err) rej(err);
      });
      delete this._db;
      res();
    })
  }
}


const db = new Database('./db.db');

db.connect()
  .then(async () => {
    const stmt = db._db.prepare("INSERT INTO test VALUES (?)")
    await stmt.run(1);
    stmt.finalize();
    console.log('here');
    
    const reslt = await db.get('SELECT * FROM users');

    console.log('res: ', reslt);
    return reslt;
  })
  .catch((e) => {
    console.log('err  ', e);
  })

module.exports = Database;
