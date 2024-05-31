import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const AttendanceReport = ({ route }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (route.params && route.params.allReports) {
      setReports(route.params.allReports);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Reports</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item._id ? item._id.toString() : item.employeeId.toString()} // Ensure the key is a string
        renderItem={({ item }) => (
          <View style={styles.reportContainer} key={item._id ? item._id.toString() : item.employeeId.toString()}>
            <Text>{`Employee ID: ${item.employeeId}`}</Text>
            <Text>{`Name: ${item.name}`}</Text>
            <Text>{`Designation: ${item.designation}`}</Text>
            <Text>{`Present Count: ${item.presentCount}`}</Text>
            <Text>{`Absent Count: ${item.absentCount}`}</Text>
            <Text>{`Half Day Count: ${item.halfDayCount}`}</Text>
            <Text>{`Holiday Count: ${item.holidayCount}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default AttendanceReport;