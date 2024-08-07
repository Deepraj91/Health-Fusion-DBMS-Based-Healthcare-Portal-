// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // assuming db connection is in a separate file

// Get all appointments
router.get('/', (req, res) => {
    const query = 'SELECT * FROM appointments';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get a specific appointment by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM appointments WHERE appointment_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    });
});

// Add a new appointment
router.post('/', (req, res) => {
    const { patient_id, doctor_id, appointment_date, status } = req.body;
    const query = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)';
    db.query(query, [patient_id, doctor_id, appointment_date, status], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Appointment added', appointment_id: result.insertId });
    });
});

// Update appointment details
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { patient_id, doctor_id, appointment_date, status } = req.body;
    const query = 'UPDATE appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?, status = ? WHERE appointment_id = ?';
    db.query(query, [patient_id, doctor_id, appointment_date, status, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Appointment updated' });
    });
});

// Delete an appointment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM appointments WHERE appointment_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Appointment deleted' });
    });
});

module.exports = router;
