const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/model/db.db');

db.run("CREATE TABLE title(info TEXT)");
db.serialize(() => {

  db.run("INSERT INTO title(info) VALUES('TitleFromDb'),('TitleFrom')");
  db.each("SELECT info AS info FROM title", (err, row) => {
    return console.log(row.info);
  });
});

db.close();
