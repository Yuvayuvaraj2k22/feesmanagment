import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import BaseUrl from '../ipconfig';
import { useNavigation } from '@react-navigation/native'; 

const FacultyProfileScreen = () => {
    const [facultyProfile, setFacultyProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigation = useNavigation(); 

    useEffect(() => {
        fetchFacultyProfile();
    }, []);

    const fetchFacultyProfile = async () => {
        try {
            // Get the token for the faculty from AsyncStorage
            const token = await AsyncStorage.getItem('facultyToken');

            if (!token) {
                setError('Token not found for faculty');
                return;
            }

            // Make a request to fetch the faculty profile with the token in the headers
            const response = await axios.get(`${BaseUrl}/faculties/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFacultyProfile(response.data);
        } catch (error) {
            console.error('Error fetching faculty profile:', error.message);
            setError(error.message);
        }
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            // Clear the faculty token from AsyncStorage
            await AsyncStorage.removeItem('facultyToken');
            // Navigate to the faculty home screen
            navigation.navigate('FacultyHome');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faculty Profile</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <View style={styles.profileText1} >
                    {facultyProfile ? (
                        <View>
                            <Text style={styles.profileText}>First Name: {facultyProfile.firstName}</Text>
                            <Text style={styles.profileText}>Last Name: {facultyProfile.lastName}</Text>
                            <Text style={styles.profileText}>Email: {facultyProfile.email}</Text>
                            <Text style={styles.profileText}>Age: {facultyProfile.age}</Text>
                            <Text style={styles.profileText}>Date of Birth: {facultyProfile.dob}</Text>
                            <Text style={styles.profileText}>Qualification: {facultyProfile.qualification}</Text>
                            <Text style={styles.profileText}>Department: {facultyProfile.department}</Text>
                            <Text style={styles.profileText}>Address: {facultyProfile.address}</Text> 
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
            )}
            {/* Logout button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
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
        fontWeight: 'bold',
        marginBottom: 16,
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
    profileText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    profileText1:{
        backgroundColor:'#ffe4c4',
        borderRadius:5,
        paddingBottom:20,   
    },
    logoutButton: {
        marginTop: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#008b8b',
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FacultyProfileScreen;
