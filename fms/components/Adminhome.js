
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import BaseUrl from '../ipconfig';

const AdminHome = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('login');
  };

  const handleAdminRegistration = () => {
    navigation.navigate('adminregister');
  };

  const handleAdminprofile = () => {
    navigation.navigate('adminprofile');
  };

  const handleStudentDetails = () => {
    navigation.navigate('Studentlist');
  };

  const handleFacultyDetails = () => {
    navigation.navigate('facultydetails');
  };

  const handleAccountantDetails = () => {
    navigation.navigate('accountantdetails');
  };

  const handleAddFees = () => {
    navigation.navigate('AddFees');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home</Text>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleAdminRegistration}>
        <FontAwesome5 name="user-plus" size={24} color="black" />
        <Text style={styles.buttonText}>Admin Registration</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleAdminprofile}>
        <FontAwesome5 name="user" size={24} color="black" />
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleStudentDetails}>
        <FontAwesome5 name="user-graduate" size={24} color="black" />
        <Text style={styles.buttonText}>Student List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleFacultyDetails}>
        <FontAwesome5 name="chalkboard-teacher" size={24} color="black" />
        <Text style={styles.buttonText}>Faculty Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleAccountantDetails}>
        <FontAwesome5 name="money-bill" size={24} color="black" />
        <Text style={styles.buttonText}>Accountant Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleAddFees}>
        <FontAwesome5 name="dollar-sign" size={24} color="black" />
        <Text style={styles.buttonText}>Add Fees</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer1} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={24} color="#0000ff" />
        <Text style={[styles.buttonText, { color: '#0000ff' }]}>Logout</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#ffe4c4',
    borderRadius: 8,
    padding: 10,
    
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
    fontWeight:'bold',
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 20,
  },
});

export default AdminHome;
