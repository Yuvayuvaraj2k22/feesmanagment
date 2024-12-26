import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../ipconfig';

const LoginScreen = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const users = ["admins", "accountants","faculties"];
  
  const navigateToStudentLogin = () => {
    navigation.navigate('studentlogin');
  };

  const handleLogin = () => {
    let backendUrl = `${BaseUrl}`;
    let log = '';

    switch (role) {
      case 'admins':
        log = 'admins/login';
        break;
      case 'accountants':
        log = 'accountants/login';
        break;
      case 'faculties':
        log = 'faculties/login';
        break;
      default:
        console.error('Invalid role');
        return;
    }

    const endpoint = `${backendUrl}/${log}`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(async data => {
        console.log('Login Response:', data);

        const userType = data.userType;
        const token = data.token;

        if (userType && token) {
          await AsyncStorage.setItem(`${userType}Token`, token);

          switch (userType) {
            case 'admin':
              navigation.navigate('AdminHome');
              break;
            case 'accountant':
              navigation.navigate('AccountantHome');
              break;
            case 'faculty':
              navigation.navigate('FacultyHome');
              break;
            default:
              console.error('Invalid user type');
              break;
          }
        } else {
          console.error('Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      
      <View style={[styles.input, styles.pickerContainer]}>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
        <Picker.Item label="Select User" value="" />
        {users.map(user => (
          <Picker.Item label={user} value={user.toLowerCase()} key={user} />
        ))}
      </Picker>
</View>


      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>If you are a student, </Text>
        <TouchableOpacity onPress={navigateToStudentLogin}>
          <Text style={[styles.linkText, styles.link]}>click here</Text>
        </TouchableOpacity>
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
    backgroundColor: '#f0ffff',
  },
  title: {
    fontSize: 34,
    marginBottom: 16,
    color: 'black',
    fontWeight: 'bold',
    fontStyle:"italic",
  },
  pickerContainer: {
    backgroundColor: 'white',
    width: 200,
    height: 40,
    borderRadius: 8,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    color: 'black',
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#008b8b',
    width: '40%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  linkContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  linkText: {
    color: 'black',
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
