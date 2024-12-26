import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import BaseUrl from '../ipconfig';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const AdminProfileScreen = () => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        try {
            // Get the token for the admin from AsyncStorage
            const token = await AsyncStorage.getItem('adminToken');

            if (!token) {
                setError('Token not found for admin');
                return;
            }

            // Make a request to fetch the admin profile with the token in the headers
            const response = await axios.get(`${BaseUrl}/admins/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAdminProfile(response.data);
        } catch (error) {
            console.error('Error fetching admin profile:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Profile</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <View style={styles.profileText}>
                    {adminProfile ? (
                        <View>
                            <Text style={styles.profileText}>
                                <Icon name="user" size={18} color="#000" /> Name: {adminProfile.fullName}
                            </Text>
                            <Text style={styles.profileText}>
                                <Icon name="envelope" size={18} color="#000" /> Email: {adminProfile.email}
                            </Text>
                            <Text style={styles.profileText}>
                                <Icon name="phone" size={18} color="#000" /> Phone Number: {adminProfile.phoneNumber}
                            </Text>
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
            )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'left',
        backgroundColor:"#ffe4c4",
        fontWeight:'bold',
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center',
        marginTop:10,
        marginLeft:10,   
    },
});

export default AdminProfileScreen;
