const sqlite3 = require('sqlite3').verbose();

class DB {
  constructor() {
    this.db = new sqlite3.Database('./data.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });
  }

  save(title, time) { 
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO tasks(title1, time) VALUES(?, ?)`, [title, time], function(err) {
        if (err) {
          reject(err.message)
        }
        resolve()
      });  
    });
    
  }
}

module.exports = DB
