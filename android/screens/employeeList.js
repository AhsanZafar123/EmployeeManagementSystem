import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function EmployeeList() {
  const route = useRoute();
  const { employeeList } = route.params;
  const navigation = useNavigation();

  if (!employeeList || employeeList.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No employee data available.</Text>
      </View>
    );
  }

  const handleAddEmployee = () => {
    navigation.navigate('CreateEmployee');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee List</Text>
      <FlatList
        data={employeeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>Name: <Text style={styles.value}>{item.name}</Text></Text>
            <Text style={styles.label}>Position: <Text style={styles.value}>{item.designation}</Text></Text>
            <Text style={styles.label}>Employee ID: <Text style={styles.value}>{item.employeeId}</Text></Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
        <Text style={styles.addButtonText}>Add an Employee</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20, // Left padding to align content
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left', // Left-align text
  },
  item: {
    paddingVertical: 10, // Adjust padding for list items
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f8f8', // Light gray background color
  },
  label: {
    fontSize: 16,
    color: '#555', // Dark gray label color
    marginBottom: 5,
    textAlign: 'left', // Left-align text
  },
  value: {
    fontWeight: 'bold',
    color: '#007bff', // Blue value color
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-start', // Align button to the start of the screen
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});