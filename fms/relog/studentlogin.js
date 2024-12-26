import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import BaseUrl from '../ipconfig';


const StudentLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BaseUrl}/students/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: email, 
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('studentToken', data.studentToken); 
        navigation.navigate('StudentHome');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <LinearGradient // Use LinearGradient as the background
      colors={['#3366ff', '#ff99cc']} // Set your desired gradient colors
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Student Login</Text>

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

        <Button title="Login" onPress={handleLogin} color="#20b2aa" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  },
  title: {
    fontSize: 25,
    marginBottom: 1,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default StudentLoginScreen;
