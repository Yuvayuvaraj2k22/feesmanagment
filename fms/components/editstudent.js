import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import BaseUrl from '../ipconfig';


const EditStudent = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    registerNumber: '',
    department: '',
    branch: '',
    fatherName: '',
    emailId: '',
    age: '',
    dob: '',
    permanentAddress: '',
    feesamount: '',
    fineamount: '',
  });

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/students/${studentId}`);
      setStudent(response.data.data);
    } catch (error) {
      console.error('Error fetching student details:', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BaseUrl}/students/${studentId}`, student);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating student:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Student</Text>
      <TextInput
        style={styles.input}
        value={student.firstName}
        onChangeText={(text) => setStudent({ ...student, firstName: text })}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={student.lastName}
        onChangeText={(text) => setStudent({ ...student, lastName: text })}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={student.registerNumber}
        onChangeText={(text) => setStudent({ ...student, registerNumber: text })}
        placeholder="Register Number"
      />
      <TextInput
        style={styles.input}
        value={student.department}
        onChangeText={(text) => setStudent({ ...student, department: text })}
        placeholder="Department"
      />
      <TextInput
        style={styles.input}
        value={student.branch}
        onChangeText={(text) => setStudent({ ...student, branch: text })}
        placeholder="Branch"
      />
      <TextInput
        style={styles.input}
        value={student.fatherName}
        onChangeText={(text) => setStudent({ ...student, fatherName: text })}
        placeholder="Father's Name"
      />
      <TextInput
        style={styles.input}
        value={student.emailId}
        onChangeText={(text) => setStudent({ ...student, emailId: text })}
        placeholder="Email Id"
      />
      <TextInput
        style={styles.input}
        value={student.age}
        onChangeText={(text) => setStudent({ ...student, age: text })}
        placeholder="Age"
      />
      <TextInput
        style={styles.input}
        value={student.dob}
        onChangeText={(text) => setStudent({ ...student, dob: text })}
        placeholder="Date of Birth"
      />
      <TextInput
        style={styles.input}
        value={student.permanentAddress}
        onChangeText={(text) => setStudent({ ...student, permanentAddress: text })}
        placeholder="Permanent Address"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <FontAwesome5 name="edit" size={24} color="#0000ff" />
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffe4c4',
    paddingVertical: 8,
    borderRadius: 8,
    width:150,
    marginLeft:120,
  },
  buttonText: {
    color: '#0000ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default EditStudent;
