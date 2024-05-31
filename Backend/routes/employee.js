const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const AttendanceReport = require('../models/AttendanceReport');




// Get all employees
router.get('/GetEmployee', async (req, res) => {
    try {
        const employees = await Employee.find({}, 'name designation employeeId');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new employee
router.post('/RegisterEmployee', async (req, res) => {
    const { name, designation, employeeId, country, mobileNumber, dateOfBirth, joiningDate, salary, address, latitude, longitude } = req.body;

    const employeeData = {
        name,
        designation,
        employeeId,
        country,
        mobileNumber,
        dateOfBirth,
        joiningDate,
        salary,
        address
    };

    // Check if latitude and longitude are provided in the request body
    if (latitude !== undefined && longitude !== undefined) {
        employeeData.latitude = latitude;
        employeeData.longitude = longitude;
    }

    const employee = new Employee(employeeData);

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/MarkAttendance', async (req, res) => {
    const { employeeId, status } = req.body;

    try {
        // Fetch employee details from Employee collection
        const employee = await Employee.findOne({ employeeId: employeeId });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Create a new attendance record with employee details
        const attendance = new Attendance({
            employeeId: employee.employeeId,
            name: employee.name,
            designation: employee.designation,
            status: status
        });

        const newAttendance = await attendance.save();
        res.status(201).json(newAttendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/attendanceReport/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    
    try {
        // Find the employee
        const employee = await Employee.findOne({ employeeId: employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Get attendance records for the employee
        const attendanceRecords = await Attendance.find({ employeeId: employeeId });
        
        // Calculate attendance statistics
        let presentCount = 0;
        let absentCount = 0;
        let halfDayCount = 0;
        let holidayCount = 0;

        attendanceRecords.forEach(record => {
            switch (record.status) {
                case 'Present':
                    presentCount++;
                    break;
                case 'Absent':
                    absentCount++;
                    break;
                case 'Half Day':
                    halfDayCount++;
                    break;
                case 'Holiday':
                    holidayCount++;
                    break;
            }
        });

        // Construct the report
        const report = new AttendanceReport({
            employeeId: employee.employeeId,
            name: employee.name,
            designation: employee.designation,
            presentCount: presentCount,
            absentCount: absentCount,
            halfDayCount: halfDayCount,
            holidayCount: holidayCount,
            attendanceRecords: attendanceRecords.map(record => record._id)
        });

        // Save the report to the database
        const savedReport = await report.save();

        res.json(savedReport);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/allAttendanceRecords', async (req, res) => {
    try {
        // Fetch all attendance records
        const allAttendanceRecords = await Attendance.find();

        if (!allAttendanceRecords || allAttendanceRecords.length === 0) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        // Group attendance records by employeeId
        const reports = {};
        allAttendanceRecords.forEach(record => {
            if (!reports[record.employeeId]) {
                reports[record.employeeId] = {
                    employeeId: record.employeeId,
                    name: record.name,
                    designation: record.designation,
                    presentCount: 0,
                    absentCount: 0,
                    halfDayCount: 0,
                    holidayCount: 0
                };
            }

            switch (record.status) {
                case 'Present':
                    reports[record.employeeId].presentCount++;
                    break;
                case 'Absent':
                    reports[record.employeeId].absentCount++;
                    break;
                case 'Half Day':
                    reports[record.employeeId].halfDayCount++;
                    break;
                case 'Holiday':
                    reports[record.employeeId].holidayCount++;
                    break;
            }
        });

        // Convert reports object to an array
        const allReports = Object.values(reports);

        // Send the response
        res.json(allReports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all employees with their GPS coordinates
router.get('/employeeLocations', async (req, res) => {
    try {
        // Fetch all employees with their GPS coordinates
        const employees = await Employee.find({}, 'employeeId name designation latitude longitude');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

