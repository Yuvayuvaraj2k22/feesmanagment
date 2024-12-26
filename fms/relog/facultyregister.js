import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseUrl from '../ipconfig';

const FacultyRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      if (
        !firstName ||
        !lastName ||
        !age ||
        !dob ||
        !qualification ||
        !department ||
        !email ||
        !address ||
        !password
      ) {
        alert('All fields are required', 'Please fill in all the fields.');
        return;
      }

      if (!email.endsWith('@gmail.com')) {
        alert('Invalid Email', 'Please enter a valid email address ending with @gmail.com.');
        return;
      }

      const backendUrl = `${BaseUrl}/faculties/register`;

      const data = {
        firstName,
        lastName,
        age,
        dob,
        qualification,
        department,
        email,
        address,
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
      <Text style={styles.title}>Faculty Registration Form</Text> {/* Add the title */}
   
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="calendar" size={15} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="calendar" size={15} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD/MM/YY)"
          onChangeText={(text) => setDob(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="graduation-cap" size={11} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Qualification"
          onChangeText={(text) => setQualification(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="building" size={17} color="#4b0082" style={styles.icon} />
        <Picker
          style={styles.input}
          selectedValue={department}
          onValueChange={(value) => setDepartment(value)}
        >
          <Picker.Item label="Select Department" />
          <Picker.Item label="Computer Science" />
          <Picker.Item label="Life Science" />
          <Picker.Item label="Commerce" />
          <Picker.Item label="Business Analytics" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={15} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="home" size={16} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(text) => setAddress(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={22} color="#4b0082" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <Button 
  onPress={handleRegistration} 
  title="Register" 
  icon={<Icon name="check" size={20} color="#008b8b" />} 
  style={styles.registerButton}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f0f8ff',
    alignItems: 'center', 
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 2, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    color: '#4b0082',
    backgroundColor: '#ffe4c4',
    borderRadius: 2, 
    width:250,
    fontSize:15,
    fontWeight:'bold',
  },
  registerButton:{
    backgroundColor:"#008b8b",
  }
  
});

export default FacultyRegistrationForm;
