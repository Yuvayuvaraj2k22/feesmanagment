import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import BaseUrl from '../ipconfig';
BaseUrl

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/students/details`);
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <View style={styles.fieldContainer}>
        <Icon name="user" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Name: {item.firstName} {item.lastName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="list-alt" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Register Number: {item.registerNumber}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="university" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Department: {item.department}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="code-fork" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Branch: {item.branch}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="envelope" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Email Id: {item.emailId}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="user" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Age: {item.age}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="calendar" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Date of Birth: {item.dob}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="map-marker" size={20} color="#2980b9" style={styles.icon} />
        <Text style={styles.text}>Address: {item.permanentAddress}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Students</Text>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0ffff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  studentItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#ffe4c4',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
});

export default AllStudents;
