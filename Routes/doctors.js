// backend/routes/doctors.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // assuming db connection is in a separate file

// Get all doctors
router.get('/', (req, res) => {
    const query = 'SELECT * FROM doctors';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get a specific doctor by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM doctors WHERE doctor_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    });
});

// Add a new doctor
router.post('/', (req, res) => {
    const { user_id, name, specialty, contact, email } = req.body;
    const query = 'INSERT INTO doctors (user_id, name, specialty, contact, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user_id, name, specialty, contact, email], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Doctor added', doctor_id: result.insertId });
    });
});

// Update doctor details
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, name, specialty, contact, email } = req.body;
    const query = 'UPDATE doctors SET user_id = ?, name = ?, specialty = ?, contact = ?, email = ? WHERE doctor_id = ?';
    db.query(query, [user_id, name, specialty, contact, email, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Doctor updated' });
    });
});

// Delete a doctor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM doctors WHERE doctor_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Doctor deleted' });
    });
});

module.exports = router;
