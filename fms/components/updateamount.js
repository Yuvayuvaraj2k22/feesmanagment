import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import BaseUrl from '../ipconfig';

const Updateamount = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [student, setStudent] = useState({
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
        value={student.feesamount}
        onChangeText={(text) => setStudent({ ...student, feesamount: text })}
        placeholder="Fees Amount"
      />
      
       <TextInput
        style={styles.input}
        value={student.fineamount}
        onChangeText={(text) => setStudent({ ...student, fineamount: text })}
        placeholder="Fine Amount"
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

export default Updateamount;
