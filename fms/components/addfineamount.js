import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import BaseUrl from '../ipconfig';

const AddFineAmount = () => {
  const [students, setStudents] = useState([]);
  const [filterRegisterNumber, setFilterRegisterNumber] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [fineAmount, setFineAmount] = useState('');

  useEffect(() => {
    fetchRegisteredStudents();
  }, []);

  const fetchRegisteredStudents = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/students/details`);
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching registered students:', error.message);
    }
  };

  const filteredStudents = students.filter(student => student.registerNumber.includes(filterRegisterNumber));

  const updateFineAmount = async (studentId) => {
    try {
      if (!studentId) {
        Alert.alert('Error', 'No student selected.');
        return;
      }
    
      await axios.put(`${BaseUrl}/students/${studentId}/fineamount`, { fineamount: fineAmount });
      Alert.alert('Success', 'Fine amount updated successfully.');
    
      // After updating, fetch the updated student details
      fetchRegisteredStudents();
    } catch (error) {
      console.error('Error updating fine amount:', error.message);
      Alert.alert('Error', 'Failed to update fine amount.');
    }
  };
  
  

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.text}>Name: {item.firstName} {item.lastName}</Text>
      <Text style={styles.text}>Register Number: {item.registerNumber}</Text>
      <Text style={styles.text}>Email: {item.emailId}</Text>
      <Text style={styles.text}>Department: {item.department}</Text>
      <Text style={styles.text}>Branch: {item.branch}</Text>
      <Text style={styles.text}>Father's Name: {item.fatherName}</Text>
      <Text style={styles.text}>Age: {item.age}</Text>
      <Text style={styles.text}>Date of Birth: {item.dob}</Text>
      <Text style={styles.text}>Permanent Address: {item.permanentAddress}</Text>
      <Text style={styles.text}>Fine Amount: {item.fineamount}</Text>
      <TextInput
        style={styles.fineInput}
        placeholder="Enter Fine Amount"
        keyboardType="numeric"
        value={fineAmount}
        onChangeText={setFineAmount}
      />
      <Button
        title="Update Fine"
        onPress={() => updateFineAmount(item._id)}
        style={styles.updateFineButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Students</Text>
      <View style={styles.filterContainer}>
       {/* Input field for register number */}
      <TextInput
        style={styles.input}
        placeholder="Enter Register Number"
        value={filterRegisterNumber}
        onChangeText={text => setFilterRegisterNumber(text)}
      />
      </View>
      <FlatList
  data={filteredStudents}
  // Use filteredStudents here
  renderItem={renderStudentItem}
  keyExtractor={(item) => item._id}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  studentItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingLeft: 8,
  },
  updateFineButton: {
    marginTop: 8,
  },
  fineInput: {
    marginTop: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default AddFineAmount;
