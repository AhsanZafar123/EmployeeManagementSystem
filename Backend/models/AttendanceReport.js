const mongoose = require('mongoose');

const attendanceReportSchema = new mongoose.Schema({
    employeeId: { type: Number, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    presentCount: { type: Number, required: true },
    absentCount: { type: Number, required: true },
    halfDayCount: { type: Number, required: true },
    holidayCount: { type: Number, required: true },
    attendanceRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
});

const AttendanceReport = mongoose.model('AttendanceReport', attendanceReportSchema);

module.exports = AttendanceReport;