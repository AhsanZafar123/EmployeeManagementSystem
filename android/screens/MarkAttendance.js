import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';

export default function MarkAttendance({ route }) {
  const { employeeList } = route.params;
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [presentSelected, setPresentSelected] = useState(false);
  const [absentSelected, setAbsentSelected] = useState(false);
  const [halfdaySelected, setHalfdaySelected] = useState(false);
  const [holidaySelected, setHolidaySelected] = useState(false);

  const handleAttendanceSubmit = () => {
    if (selectedEmployee && attendanceStatus) {
      // Send request to the server
      fetch('http://192.168.18.16:3000/employee/MarkAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: selectedEmployee.employeeId,
          status: attendanceStatus,
        }),
      })
        .then(response => {
          // Handle response as needed
          console.log('Attendance marked successfully');
          setModalVisible(false); // Close modal after submission
        })
        .catch(error => {
          console.error('Error marking attendance:', error);
          // Handle error
        });
    } else {
      // Handle case where employee or status is not selected
      console.error('Please select an employee and attendance status');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mark Attendance</Text>
      <FlatList
        data={employeeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setSelectedEmployee(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.label}>Name: <Text style={styles.value}>{item.name}</Text></Text>
            <Text style={styles.label}>Position: <Text style={styles.value}>{item.designation}</Text></Text>
            <Text style={styles.label}>Employee ID: <Text style={styles.value}>{item.employeeId}</Text></Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Select Attendance Status</Text>
            <TouchableOpacity
              style={[styles.statusButton, presentSelected && styles.selectedButton]}
              onPress={() => {
                setAttendanceStatus('Present');
                setPresentSelected(true);
                setAbsentSelected(false);
                setHalfdaySelected(false);
                setHolidaySelected(false);
              }}
              disabled={presentSelected}
            >
              <Text>Present</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, absentSelected && styles.selectedButton]}
              onPress={() => {
                setAttendanceStatus('Absent');
                setAbsentSelected(true);
                setPresentSelected(false);
                setHalfdaySelected(false);
                setHolidaySelected(false);
              }}
              disabled={absentSelected}
            >
              <Text>Absent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, halfdaySelected && styles.selectedButton]}
              onPress={() => {
                setAttendanceStatus('Halfday');
                setHalfdaySelected(true);
                setPresentSelected(false);
                setAbsentSelected(false);
                setHolidaySelected(false);
              }}
              disabled={halfdaySelected}
            >
              <Text>Halfday</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, holidaySelected && styles.selectedButton]}
              onPress={() => {
                setAttendanceStatus('Holiday');
                setHolidaySelected(true);
                setPresentSelected(false);
                setAbsentSelected(false);
                setHalfdaySelected(false);
              }}
              disabled={holidaySelected}
            >
              <Text>Holiday</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAttendanceSubmit}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});