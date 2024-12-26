import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import BaseUrl from '../ipconfig';

const AddFees = () => {
  const [feeAmount, setFeeAmount] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');

  const handleAddFees = async () => {
    try {
      if (!department || !feeAmount) {
        setMessage('Please fill in all fields');
        return;
      }
  
      const response = await axios.post(`${BaseUrl}/students/add-fees`, { feeAmount: feeAmount, branch: department });
  
      if (response.status === 200) {
        // Display success message from the backend
        alert(response.data.message)
      } else {
        // Display error message if status code is not 200
        setMessage('Error adding fees'); 
      }
    } catch (error) {
      // setMessage('Error adding fees');
      // console.error('Error:', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Fees</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={feeAmount}
          onChangeText={(text) => setFeeAmount(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Department:</Text>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Department" value="" />
          <Picker.Item label="BCA" value="BCA" />
          <Picker.Item label="MCA" value="MCA" />
          <Picker.Item label="BSC CS" value="BSC CS" />
          <Picker.Item label="MSC CS" value="MSC CS" />
          <Picker.Item label="BSC IT" value="BSC IT" />
          <Picker.Item label="MSC IT" value="MSC IT" />
          <Picker.Item label="Cell Biology" value="Cell Biology" />
          <Picker.Item label="Microbiology" value="Microbiology" />
          <Picker.Item label="BSC Biochemistry" value="BSC Biochemistry" />
          <Picker.Item label="MSC Biochemistry" value="MSC Biochemistry" />
          <Picker.Item label="Pharmacology" value="Pharmacology" />
          <Picker.Item label="B.Com" value="B.Com" />
          <Picker.Item label="M.Com" value="M.Com" />
          <Picker.Item label="Law" value="Law" />
          <Picker.Item label="Marketing" value="Marketing" />
          <Picker.Item label="BBA" value="BBA" />
          <Picker.Item label="MBA" value="MBA" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddFees}>
        <Text style={styles.buttonText}>Add Fees</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0ffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
    marginBottom: 10, 
   },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#f8f8ff',
    borderWidth: 1,
    paddingLeft: 8,
    backgroundColor: '#ffdead',
    borderRadius: 5,
    width: '100%',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: 'green',
    fontSize: 16,
  },
});

export default AddFees;
