import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import BaseUrl from '../ipconfig';
import { Pressable } from 'react-native';


const AccountantRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      if (!fullName || !dateOfBirth || !gender || !address || !phoneNumber || !email || !password) {
        Alert.alert('All fields are required', 'Please fill in all the fields.');
        return;
      }

      if (!email.endsWith('@gmail.com')) {
        Alert.alert('Invalid Email', 'Please enter a valid Gmail email address.');
        return;
      }

      if (phoneNumber.length !== 10) {
        Alert.alert('Invalid Phone Number', 'Please enter a 10-digit phone number.');
        return;
      }

      const backendUrl = `${BaseUrl}/accountants/register`;

      const data = {
        fullName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        password,
      };

      const response = await axios.post(backendUrl, data);
      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error.message);
      Alert.alert('Registration Failed', 'There was an error during registration. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
        role="textbox"
      />

      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD-MM-YYYY"
        onChangeText={(text) => setDateOfBirth(text)}
        role="textbox"
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
        role="combobox"
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Transgender" value="transgender" />
      </Picker>

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
        role="textbox"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        inputMode="numeric"
        role="textbox"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="xyz@gmail.com"
        onChangeText={(text) => setEmail(text)}
        inputMode="email"
        role="textbox"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        role="textbox"
      />

      <Pressable onPress={handleRegistration} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
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
    color: 'black', 
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
  button: {
    backgroundColor: '#008b8b',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountantRegistrationForm;
