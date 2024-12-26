import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../ipconfig';


const StudentHomeScreen = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student data from AsyncStorage
    const fetchStudentData = async () => {
      try {
        const token = await AsyncStorage.getItem('studentToken');
        // Send token to backend to get student profile information
        const response = await fetch(`${BaseUrl}/students/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStudent(data.student);
        } else {
          console.error('Failed to fetch student profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = async () => {
    // Remove token from AsyncStorage
    await AsyncStorage.removeItem('studentToken');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {student ? (
          <>
            <Text style={styles.title}>Welcome, {student.firstName}!</Text>
            <Text style={styles.text}>Email: {student.emailId}</Text>
            <Text style={styles.text}>registerNumber: {student.registerNumber}</Text>
            <Text style={styles.text}>Department: {student.department}</Text>
            <Text style={styles.text}>branch: {student.branch}</Text>
            <Text style={styles.text}>fatherName: {student.fatherName}</Text>
            <Text style={styles.text}>Age: {student.age}</Text>
            <Text style={styles.text}>dob: {student.dob}</Text>
            <Text style={styles.text}>Permanent Address: {student.permanentAddress}</Text>
            <Text style={styles.text}>Fees Amount: {student.feesamount}</Text>
            <Text style={styles.text}>Fine Amount: {student.fineamount}</Text>
            {/* Add more profile information here */}
            <Button title="Logout" onPress={handleLogout} color="#20b2aa" />
          </>
        ) : (
          <Text style={styles.title}>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  box: {
    borderWidth: 1,
    borderColor: '#8b4513',
    borderRadius: 5,
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    color: '#008b8b',
    fontWeight: 'bold',
    textAlign:'center'
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    fontWeight:'bold',
  },
});

export default StudentHomeScreen;
