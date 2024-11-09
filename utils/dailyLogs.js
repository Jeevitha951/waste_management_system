// /utils/dailyLogs.js

const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../daily_logs.csv');

// Function to log resolved complaints to a CSV file
const logResolvedComplaint = (complaint) => {
    const logData = `${complaint.id},${complaint.description},${complaint.priority},${complaint.timestamp}\n`;

    fs.appendFile(logFilePath, logData, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        } else {
            console.log("Logged resolved complaint:", complaint.id);
        }
    });
};

module.exports = { logResolvedComplaint };
