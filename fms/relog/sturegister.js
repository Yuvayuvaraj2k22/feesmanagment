import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import BaseUrl from '../ipconfig';


const StudentRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [branch, setBranch] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [password, setPassword] = useState('');

  // Define branch options for each department
  const branchOptions = {
    computerScience: ['BCA', 'MCA', 'BSC CS', 'MSC CS', 'BSC IT', 'MSC IT'],
    lifeScience: ['Cell Biology', 'Microbiology', 'BSC Biochemistry', 'MSC Biochemistry', 'Pharmacology'],
    commerce: ['B.Com', 'M.Com', 'Law', 'Marketing'],
    businessAnalytics: ['BBA', 'MBA'],
  };

  const handleRegistration = async () => {
    try {
      // Validation checks
      if (
        !firstName ||
        !lastName ||
        !registerNumber ||
        !department ||
        !branch ||
        !fatherName ||
        !emailId ||
        !age ||
        !dob ||
        !permanentAddress ||
        !password
      ) {
        alert('All fields are required', 'Please fill in all the fields.');
        return;
      }

      const backendUrl = `${BaseUrl}/students/register`;

      const data = {
        firstName,
        lastName,
        registerNumber,
        department,
        branch,
        fatherName,
        emailId,
        age,
        dob,
        permanentAddress,
        password,
      };

      const response = await axios.post(backendUrl, data);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('Registration Failed', 'There was an error during registration. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
      />

      <Text style={styles.label}>Register Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Register Number"
        onChangeText={(text) => setRegisterNumber(text)}
      />

      <Text style={styles.label}>Department:</Text>
      <Picker
        style={styles.input}
        selectedValue={department}
        onValueChange={(value) => setDepartment(value)}
      >
        <Picker.Item label="Select Department" value="" />
        <Picker.Item label="Computer Science" value="computerScience" />
        <Picker.Item label="Life Science" value="lifeScience" />
        <Picker.Item label="Commerce" value="commerce" />
        <Picker.Item label="Business Analytics" value="businessAnalytics" />
      </Picker>

      <Text style={styles.label}>Branch:</Text>
      <Picker
        style={styles.input}
        selectedValue={branch}
        onValueChange={(value) => setBranch(value)}
      >
        <Picker.Item label="Select Branch" value="" />
        {branchOptions[department] &&
          branchOptions[department].map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
      </Picker>

      <Text style={styles.label}>Father's Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Father's Name"
        onChangeText={(text) => setFatherName(text)}
      />

      <Text style={styles.label}>Email ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        onChangeText={(text) => setEmailId(text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        onChangeText={(text) => setDob(text)}
      />

      <Text style={styles.label}>Permanent Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Permanent Address"
        onChangeText={(text) => setPermanentAddress(text)}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button
        title="Register"
        onPress={handleRegistration}
        color="#008b8b" // Set button background color
        buttonStyle={styles.registerButton} // Add custom style to the button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0ffff', 
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight:'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor:'#ffebcd',
  },    
  registerButton: {
    width: '10%', // Set the width of the button to 50%
    marginTop: 5, // Add some margin to the top of the button
  }
});

export default StudentRegistrationForm;
