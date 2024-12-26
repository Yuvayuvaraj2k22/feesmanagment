import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseUrl from '../ipconfig';


const FacultyDetails = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchFacultyDetails();
  }, []);

  const fetchFacultyDetails = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/faculties/details`);
      setFaculties(response.data.data);
    } catch (error) {
      console.error('Error fetching faculty details:', error.message);
    }
  };

  const renderFacultyItem = ({ item }) => (
    <View style={styles.facultyCard}>
      <View style={styles.fieldContainer}>
        <Icon name="user" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Name: {item.firstName} {item.lastName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="calendar" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Age: {item.age}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="birthday-cake" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Dob: {item.dob}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="graduation-cap" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Qualification: {item.qualification}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="building" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Department: {item.department}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="envelope" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Email: {item.email}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Icon name="map-marker" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Address: {item.address}</Text>
      </View>
    </View>
  );
  
  

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Faculty Details</Text>

        <FlatList
          data={faculties}
          renderItem={renderFacultyItem}
          keyExtractor={item => item._id}
        />

        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0ffff', 
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black', 
  },
  facultyCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ffebcd', 
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Adjust the margin for spacing between fields
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
});


export default FacultyDetails;
