// backend/routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Using bcryptjs
const db = require('../db'); // Add this line

// Registration route
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, role], (err, result) => {
        if (err) throw err;
        res.send({ message: 'User registered' });
    });
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0 && bcrypt.compareSync(password, result[0].password)) {
            res.send({ message: 'Login successful', user: result[0] });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
