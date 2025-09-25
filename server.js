// In server.js

const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000; // You can use any port you like

// --- Middleware ---
// This allows your server to understand JSON data from the form
app.use(express.json());
// This allows the server to understand URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// This tells the server to make your project folder's files (like index.html, style.css) accessible
app.use(express.static(__dirname));

// --- Database Connection ---
// This creates a connection to your MySQL database.
// The default user is 'root' and the password is '' (empty).
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vanshAS@0608',
  database: 'vanshika_portfolio' // The database you just created
});

// Try to connect to the database
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

// --- API Route for Form Submission ---
// This is the endpoint your front-end will send the form data to.
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // The SQL query to insert the data into your 'contacts' table
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      // Send a failure response back to the front-end
      return res.status(500).json({ success: false, message: 'Database error.' });
    }
    console.log('Form data inserted successfully!');
    // Send a success response back to the front-end
    res.status(200).json({ success: true, message: 'Thank you for your message!' });
  });
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});