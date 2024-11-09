// /utils/complaintQueue.js

const Complaint = require('./complaints');

class ComplaintQueue {
    constructor() {
        this.queue = []; // Active complaints queue
    }

    // Method to add complaints to the queue
    addComplaint(complaint) {
        this.queue.push(complaint);
    }

    // Method to process (resolve) a complaint by removing it from the queue
    processComplaint() {
        return this.queue.shift(); // Removes the first complaint in the queue
    }

    // Method to view complaints in the queue (for GET requests)
    getComplaints() {
        return this.queue;
    }
}

class ComplaintHistory {
    constructor() {
        this.history = []; // Historical stack to store resolved complaints
    }

    // Method to add a complaint to history (when resolved)
    push(complaint) {
        this.history.push(complaint);
    }

    // Revert the last resolved complaint
    undoLastResolution() {
        return this.history.pop(); // Removes the last resolved complaint
    }
}

module.exports = { ComplaintQueue, ComplaintHistory };
