import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, TextInput, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Next() {
    const navigation = useNavigation();
    const [loadingEmployeeList, setLoadingEmployeeList] = useState(false);
    const [loadingMarkAttendance, setLoadingMarkAttendance] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [employeeId, setEmployeeId] = useState('');
    const [reportVisible, setReportVisible] = useState(false);
    const [attendanceReport, setAttendanceReport] = useState(null);

    const buttons = [
        { title: 'Employee List', onPress: () => fetchEmployeeList(), loading: loadingEmployeeList },
        { title: 'Mark Attendance', onPress: () => markAttendance(), loading: loadingMarkAttendance },
        { title: 'Attendance Reports', onPress: () => setModalVisible(true), loading: false },
        { title: 'All Reports', onPress: () => fetchAllReports(), loading: false }
    ];

    const renderButton = ({ item }) => (
        <Animatable.View animation="fadeInUp" duration={800}>
            <TouchableOpacity style={styles.button} onPress={item.onPress} disabled={item.loading}>
                <Text style={styles.buttonText}>{item.loading ? 'Loading...' : item.title}</Text>
            </TouchableOpacity>
        </Animatable.View>
    );

    const fetchEmployeeList = async () => {
        try {
            setLoadingEmployeeList(true);
            const response = await fetch('http://192.168.18.16:3000/employee/GetEmployee');
            const data = await response.json();
            setLoadingEmployeeList(false);
            navigation.navigate('EmployeeList', { employeeList: data });
        } catch (error) {
            setLoadingEmployeeList(false);
            Alert.alert('Error', 'Failed to fetch employee list. Please try again later.');
            console.error('Failed to fetch employee list:', error);
        }
    };

    const markAttendance = async () => {
        try {
            setLoadingMarkAttendance(true);
            const response = await fetch('http://192.168.18.16:3000/employee/GetEmployee');
            const data = await response.json();
            setLoadingMarkAttendance(false);
            navigation.navigate('MarkAttendance', { employeeList: data });
        } catch (error) {
            setLoadingMarkAttendance(false);
            Alert.alert('Error', 'Failed to fetch employee list. Please try again later.');
            console.error('Failed to fetch employee list:', error);
        }
    };

    const getAttendanceReport = async () => {
        try {
            console.log('Employee ID:', employeeId);
            const response = await fetch(`http://192.168.18.16:3000/employee/attendanceReport/${employeeId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch attendance report: Network response was not ok.');
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Failed to fetch attendance report: Response is not in JSON format.');
            }
            const data = await response.json();

            // Filter out unwanted fields
            const filteredData = {
                employeeId: data.employeeId,
                name: data.name,
                designation: data.designation,
                presentCount: data.presentCount,
                absentCount: data.absentCount,
                halfDayCount: data.halfDayCount,
                holidayCount: data.holidayCount,
            };

            setAttendanceReport(filteredData);
            setReportVisible(true);
        } catch (error) {
            Alert.alert('Error', error.message);
            console.error('Failed to fetch attendance report:', error);
        }
    };

    const fetchAllReports = async () => {
        try {
            const response = await fetch('http://192.168.18.16:3000/employee/allAttendanceRecords');
            if (!response.ok) {
                throw new Error('Failed to fetch all reports: Network response was not ok.');
            }

            const data = await response.json();
            const allReports = data; // Extracting the reports array directly from the response data

            navigation.navigate('AttendanceReport', { allReports }); // Passing the extracted reports to the AttendanceReport screen
        } catch (error) {
            Alert.alert('Error', error.message);
            console.error('Failed to fetch all reports:', error);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/736x/1b/af/67/1baf67d9c5836c18da89fff77b7348cf.jpg' }}
            style={styles.backgroundImage}
        >
            <Animatable.View animation="fadeIn" duration={1500} style={styles.container}>
                <Animatable.View animation="slideInDown" duration={1500} style={styles.topBar}>
                    <Text style={styles.topBarText}>Employee Management</Text>
                </Animatable.View>
                <FlatList
                    data={buttons}
                    renderItem={renderButton}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.buttonContainer}
                />

                {/* Modal for entering Employee ID */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Animatable.View animation="zoomIn" duration={500} style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enter Employee ID</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Employee ID"
                                value={employeeId}
                                onChangeText={setEmployeeId}
                            />
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    getAttendanceReport();
                                }}
                            >
                                <Text style={styles.modalButtonText}>Get Report</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </Modal>

                {/* Modal for displaying attendance report */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={reportVisible}
                    onRequestClose={() => setReportVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Animatable.View animation="zoomIn" duration={500} style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Attendance Report</Text>
                            {attendanceReport ? (
                                <View>
                                    <Text>Name: {attendanceReport.name}</Text>
                                    <Text>Employee ID: {attendanceReport.employeeId}</Text>
                                    <Text>Designation: {attendanceReport.designation}</Text>
                                    <Text>Present Count: {attendanceReport.presentCount}</Text>
                                    <Text>Absent Count: {attendanceReport.absentCount}</Text>
                                    <Text>Half Day Count: {attendanceReport.halfDayCount}</Text>
                                    <Text>Holiday Count: {attendanceReport.holidayCount}</Text>
                                </View>
                            ) : (
                                <Text style={styles.reportText}>No report available.</Text>
                            )}
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setReportVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </Modal>
            </Animatable.View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBar: {
        backgroundColor: '#2979FF',
        width: '100%',
        paddingVertical: 20,
        paddingBottom: 50,
        alignItems: 'center',
        marginBottom: 20,
    },
    topBarText: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop:50,
    },
    button: {
        backgroundColor: '#2979FF',
        width: 150, // Adjusted width for square shape
        height: 150, // Adjusted height for square shape
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        margin: 12,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#2979FF',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 25,
        marginTop: 10,
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    reportText: {
        marginVertical: 20,
        textAlign: 'center',
        color: '#555',
    },
});