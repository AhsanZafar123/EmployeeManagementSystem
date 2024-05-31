import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './android/screens/Welcome';
import Next from './android/screens/next';
import EmployeeList from './android/screens/employeeList';
import CreateEmployee from './android/screens/CreateEmployee';
import MarkAttendance from './android/screens/MarkAttendance';
import AttendanceReport from './android/screens/AttendanceReport';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Next" component={Next} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="CreateEmployee" component={CreateEmployee} />
        <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
        <Stack.Screen name="AttendanceReport" component={AttendanceReport} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;