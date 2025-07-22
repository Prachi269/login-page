const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // This is required for reading JSON body from Postman

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cse104", // Or "" if blank
    database: "signup"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// Sample route to test server
app.get('/', (req, res) => {
    res.send("Server is working!");
});

// Example POST route to register user
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: "User registered successfully!", id: result.insertId });
    });
});
// ✅ NEW: GET route to fetch all users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length > 0) {
      res.json({ message: "Login successful", username: result[0].username });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
