// server.js

const express = require('express');
const { ComplaintQueue, ComplaintHistory } = require('./utils/complaintQueue');
const { logResolvedComplaint } = require('./utils/dailyLogs');
const Complaint = require('./utils/complaints');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse incoming JSON requests

const complaintQueue = new ComplaintQueue();
const complaintHistory = new ComplaintHistory();

// Route to view all complaints in the queue (GET request)
app.get('/complaints', (req, res) => {
    res.json(complaintQueue.getComplaints()); // Send all active complaints as JSON
});

// Route to add a new complaint (POST request)
app.post('/complaints', (req, res) => {
    const { id, description } = req.body;
    const priority = 3; // Set default priority or calculate based on factors
    const timestamp = new Date().toISOString(); // Current timestamp

    // Create a new complaint object
    const newComplaint = new Complaint(id, description, priority, timestamp);

    // Add the complaint to the queue
    complaintQueue.addComplaint(newComplaint);

    res.status(201).json({
        message: "Complaint added successfully",
        complaint: newComplaint,
    });
});

// Route to resolve a complaint (POST request)
app.post('/resolve', (req, res) => {
    const resolvedComplaint = complaintQueue.processComplaint();
    if (resolvedComplaint) {
        // Add resolved complaint to history
        complaintHistory.push(resolvedComplaint);
        // Log the resolved complaint to the daily log CSV
        logResolvedComplaint(resolvedComplaint);
        res.json({
            message: "Complaint resolved",
            complaint: resolvedComplaint,
        });
    } else {
        res.status(404).json({ message: "No complaints to resolve" });
    }
});

// Route to undo the last resolved complaint (POST request)
app.post('/undo', (req, res) => {
    const undoneComplaint = complaintHistory.undoLastResolution();
    if (undoneComplaint) {
        // Add the undone complaint back to the queue
        complaintQueue.addComplaint(undoneComplaint);
        res.json({
            message: "Complaint resolution undone",
            undoneComplaint,
        });
    } else {
        res.status(404).json({ message: "No complaints to undo" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
