const express = require('express') // TODO: Use ESM? See pro and con about that
const app = express()
const port = 3000 // TODO: move this to config file or something
// Testing only, but try catch this next time to terminate self if db does not connect
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database', 'diary.db'); // Resolves to /src/database/diary.db

app.get('/', (req, res) => {
  // Move this to a database method or maybe a function? That accepts queries? See whats the best way of doing this later
  const db = new sqlite3.Database(dbPath);
  db.get('SELECT * FROM notes LIMIT 1', [], (err, row) => {
    // bad
    if (err) {
      console.error("Error querying the database:", err.message);
      return res.status(500).send("Error fetching data from the database");
    }
    // ok
    if (row) {
      res.json(row);
    // no row
    } else {
      res.send("No data found");
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
