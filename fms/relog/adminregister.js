import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BaseUrl from '../ipconfig';

const AdminRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegistration = async () => {
    try {
      if (!fullName || !email || !phoneNumber || !password) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      // Send data to the backend
      const response = await axios.post(`${BaseUrl}/admins/register`, {
        fullName,
        email,
        phoneNumber,
        password,
      });

      // Log and inform user of success
      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Registration successful.');

      // Navigate to the next screen after successful registration
      navigation.navigate('Adminhome');

      // Clear the input fields
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
    } catch (error) {
      // Handle errors appropriately
      if (error.response) {
        console.error('Backend responded with an error:', error.response.data);
        Alert.alert('Error', error.response.data.message || 'Registration failed.');
      } else if (error.request) {
        console.error('No response from backend:', error.request);
        Alert.alert('Error', 'Unable to connect to the backend.');
      } else {
        console.error('Request setup error:', error.message);
        Alert.alert('Error', 'Something went wrong.');
      }
    }
  };

  return (
    <LinearGradient colors={['#f0f8ff']} style={styles.container}>
      <View>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="xyz@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
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
    borderRadius: 5,
    backgroundColor: '#fff5ee',
  },
  button: {
    backgroundColor: '#191970',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminRegistrationForm;
