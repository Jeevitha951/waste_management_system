// /utils/complaints.js

class Complaint {
    constructor(id, description, priority, timestamp) {
        this.id = id;
        this.description = description;
        this.priority = priority;
        this.timestamp = timestamp;
    }
}

module.exports = Complaint;
