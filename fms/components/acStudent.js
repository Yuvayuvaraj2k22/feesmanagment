import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BaseUrl from '../ipconfig';

const StudentDetails2 = ({ route }) => {
  const [students, setStudents] = useState([]);
  const [filterRegisterNumber, setFilterRegisterNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/students/details`);
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching student details:', error.message);
    }
  };

  const handleEdit = (studentId) => {
    // Navigate to the update student page with the student ID
    navigation.navigate('updateamount', { studentId });
  };

  // Filter students based on entered register number
  const filteredStudents = students.filter(student => student.registerNumber.includes(filterRegisterNumber));

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentCard}>
      <Text style={styles.text}>Name: {item.firstName} {item.lastName}</Text>
      <Text style={styles.text}>Register Number: {item.registerNumber}</Text>
      <Text style={styles.text}>Department: {item.department}</Text>
      <Text style={styles.text}>Branch: {item.branch}</Text>
      <Text style={styles.text}>Email Id: {item.emailId}</Text>
      <Text style={styles.text}>Age: {item.age}</Text>
      <Text style={styles.text}>Date of Birth: {item.dob}</Text>
      <Text style={styles.text}>Address: {item.permanentAddress}</Text>
      <Text style={styles.text}>Fees Amount: {item.feesamount}</Text>
      <Text style={styles.text}>Fine Amount: {item.fineamount}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item._id)}>
          <Text style={styles.buttonText}>Edit Amount</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      {/* Input field for register number */}
      <TextInput
        style={styles.input}
        placeholder="Enter Register Number"
        value={filterRegisterNumber}
        onChangeText={text => setFilterRegisterNumber(text)}
      />

      {/* Render filtered students using FlatList */}
      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={item => item._id}
      />

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        color="#3498db" // Set button color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  studentCard: {
    marginBottom: 16,
    backgroundColor: '#ffe4c4',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 8,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StudentDetails2;
