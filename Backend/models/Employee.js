const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    employeeId: { type: Number, required: true, unique: true },
    country: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    joiningDate: { type: Date, required: true },
    salary: { type: Number, required: true },
    address: { type: String, required: true },
    latitude: { type: Number }, // Add latitude field
    longitude: { type: Number } // Add longitude field
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;