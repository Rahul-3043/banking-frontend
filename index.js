const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Initialize SQLite DB
const db = new sqlite3.Database('./banking.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    balance REAL
  )`);
});

// API routes
app.get('/accounts', (req, res) => {
  db.all("SELECT * FROM accounts", (err, rows) => {
    if(err) res.status(500).send(err);
    else res.json(rows);
  });
});

app.post('/accounts', (req, res) => {
  const { name, balance } = req.body;
  db.run("INSERT INTO accounts (name, balance) VALUES (?, ?)", [name, balance], function(err){
    if(err) res.status(500).send(err);
    else res.json({ id: this.lastID, name, balance });
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
