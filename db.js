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

  save(title, time, date) { 
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO tasks(title, time, date) VALUES(?, ?, ?)`, [title, time, date], function(err) {
        if (err) {
          reject(err.message)
        }
        resolve()
      });  
    });
    
  }
}

module.exports = DB
