import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions } from 'react-native'; 
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseUrl from '../ipconfig';


const AccountantDetails = () => {
  const [accountants, setAccountants] = useState([]);
  const [sortBy, setSortBy] = useState('fullName');
  const navigation = useNavigation();

  useEffect(() => {
    fetchAccountantDetails();
  }, [sortBy]);

  const fetchAccountantDetails = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/accountants/details?sortBy=${sortBy}`);
      setAccountants(response.data.data);
    } catch (error) {
      console.error('Error fetching accountant details:', error.message);
    }
  };

  const renderAccountantItem = ({ item }) => (
    <View style={styles.accountantCard}>
      <View style={styles.fieldContainer}>
        <Icon name="user" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Full Name: {item.fullName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="envelope" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Email: {item.email}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="transgender" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Gender: {item.gender}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="calendar" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Date Of Birth: {item.dateOfBirth}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="address-card" size={20} color="#2980b9" style={styles.icon} />
        <Text style={[styles.text, styles.addressText]}>Address: {item.address}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="phone" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Phone Number: {item.phoneNumber}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accountant Details</Text>

      <Picker
        selectedValue={sortBy}
        onValueChange={(itemValue) => setSortBy(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Full Name" value="fullName" />
        <Picker.Item label="Email" value="email" />
      </Picker>

      <FlatList
        data={accountants}
        renderItem={renderAccountantItem}
        keyExtractor={(item) => item._id}
        style={styles.flatList} 
      />

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        icon={() => <Icon name="sign-out-alt" size={20} color="white" />} 
        buttonStyle={styles.button} 
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  picker: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#ffe4c4',
    fontWeight:'bold',
  },
  accountantCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ffe4c4',
    alignSelf: 'center', 
    width: windowWidth - 40, // Adjusted width to fit the screen
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    color:'black',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight:'bold',
  },
  addressText: {
    flex: 1, 
  },
  button: {
    borderRadius: 8,
    height: 40,
    backgroundColor: '#3498db',
    width: 150,
    alignSelf: 'center', 
    marginTop: 20, 
  },
  flatList: {
    flexGrow: 1, // Added flexGrow to allow FlatList to take full height
  },
});

export default AccountantDetails;
