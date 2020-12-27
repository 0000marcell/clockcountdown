const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

const schema = () => {
  const createTables = () => {
    const db = new sqlite3.Database('./data.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });

    try {
      db.run('CREATE TABLE tasks(title text, time text, date text)')
    }catch(err) {
      console.error(err) 
      return false
    }
    db.close()
    return true
  } 

  if(!fs.existsSync('./data.db')) {
    return createTables()
  }
  return true
} 

module.exports = schema
