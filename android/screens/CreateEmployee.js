import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function CreateEmployee() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [salary, setSalary] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    const employeeData = {
      name,
      designation,
      employeeId,
      country,
      mobileNumber,
      dateOfBirth,
      joiningDate,
      salary,
      address,
    };

    console.log('Sending employee data:', employeeData);

    try {
      const response = await fetch('http://192.168.18.16:3000/employee/RegisterEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      const result = await response.json();
      console.log('Response from server:', result);

      if (response.ok) {
        Alert.alert('Success', 'Employee created successfully');
        // Clear input fields after successful submission
        setName('');
        setDesignation('');
        setEmployeeId('');
        setCountry('');
        setMobileNumber('');
        setDateOfBirth('');
        setJoiningDate('');
        setSalary('');
        setAddress('');
      } else {
        const errorMessage = result.message || 'Failed to create employee. Please try again later.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      Alert.alert('Error', 'Failed to create employee. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Input fields for employee details */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={designation}
        onChangeText={setDesignation}
        placeholder="Designation"
      />
      <TextInput
        style={styles.input}
        value={employeeId}
        onChangeText={setEmployeeId}
        placeholder="Employee ID"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Country"
      />
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder="Date of Birth"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={joiningDate}
        onChangeText={setJoiningDate}
        placeholder="Joining Date"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={setSalary}
        placeholder="Salary"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});