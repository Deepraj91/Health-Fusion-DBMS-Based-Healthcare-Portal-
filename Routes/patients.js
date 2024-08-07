// backend/routes/patients.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // assuming db connection is in a separate file

// Get all patients
router.get('/', (req, res) => {
    const query = 'SELECT * FROM patients';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get a specific patient by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM patients WHERE patient_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    });
});

// Add a new patient
router.post('/', (req, res) => {
    const { user_id, name, dob, contact, email } = req.body;
    const query = 'INSERT INTO patients (user_id, name, dob, contact, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user_id, name, dob, contact, email], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Patient added', patient_id: result.insertId });
    });
});

// Update patient details
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, name, dob, contact, email } = req.body;
    const query = 'UPDATE patients SET user_id = ?, name = ?, dob = ?, contact = ?, email = ? WHERE patient_id = ?';
    db.query(query, [user_id, name, dob, contact, email, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Patient updated' });
    });
});

// Delete a patient
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM patients WHERE patient_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Patient deleted' });
    });
});

module.exports = router;
