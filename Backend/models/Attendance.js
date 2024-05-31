const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: Number, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, enum: ['Present', 'Absent', 'Half Day', 'Holiday'] }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;