import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import BaseUrl from '../ipconfig';

const AccountantHome = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('login');
  };

  const handleAccountantProfile = () => {
    navigation.navigate('AccountantProfile');
  };

  const handleAccountantRegistration = () => {
    navigation.navigate('Accountantregister');
  };

  const handleAddFeesAmount = () => {
    // Handle navigation to Add Fees Amount screen
  };

  const handleStudentDetails = () => {
    navigation.navigate('Acstudent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accountant Home</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleAccountantRegistration}>
        <FontAwesome5 name="user-plus" size={24} color="black" />
        <Text style={styles.buttonText}>Accountant Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleAccountantProfile}>
        <FontAwesome5 name="user-circle" size={24} color="black" />
        <Text style={styles.buttonText}>Accountant Profile</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.buttonContainer} onPress={handleAddFeesAmount}>
        <FontAwesome5 name="money-bill" size={24} color="black" />
        <Text style={styles.buttonText}>Add Fees Amount</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleStudentDetails}>
        <FontAwesome5 name="users" size={24} color="black" />
        <Text style={styles.buttonText}>Student Details</Text>
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
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '70%',
    height: 50,
    backgroundColor: '#ffe4c4',
    borderRadius: 8,
    paddingLeft: 10,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    height: 50,
    borderRadius: 8,
    paddingLeft: 10,
    marginTop: 8,
  },
});

export default AccountantHome;
