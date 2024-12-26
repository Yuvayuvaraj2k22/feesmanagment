import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import BaseUrl from '../ipconfig';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const AccountantProfileScreen = () => {
    const [accountantProfile, setAccountantProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigation = useNavigation(); // Initialize useNavigation hook

    useEffect(() => {
        fetchAccountantProfile();
    }, []);

    const fetchAccountantProfile = async () => {
        try {
            // Get the token for the accountant from AsyncStorage
            const token = await AsyncStorage.getItem('accountantToken');

            if (!token) {
                setError('Token not found for accountant');
                return;
            }

            // Make a request to fetch the accountant profile with the token in the headers
            const response = await axios.get(`${BaseUrl}/accountants/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAccountantProfile(response.data);
        } catch (error) {
            console.error('Error fetching accountant profile:', error.message);
            setError(error.message);
        }
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            // Clear the accountant token from AsyncStorage
            await AsyncStorage.removeItem('accountantToken');
            // Navigate to the accountant home screen
            navigation.navigate('AccountantHome');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accountant Profile</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <>
                <View style={styles.profileItem}>           
                     <FlatList
                        data={[
                            { label: 'Name', value: accountantProfile?.fullName || '', iconName: 'user' },
                            { label: 'Email', value: accountantProfile?.email || '', iconName: 'envelope' },
                            { label: 'Date of Birth', value: accountantProfile?.dateOfBirth || '', iconName: 'calendar' },
                            { label: 'Gender', value: accountantProfile?.gender || '', iconName: 'venus-mars' },
                            { label: 'Address', value: accountantProfile?.address || '', iconName: 'map-marker' },
                            { label: 'Phone Number', value: accountantProfile?.phoneNumber || '', iconName: 'phone' },
                        ]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.profileItem}>
                                <Icon name={item.iconName} size={18} color="#000" />
                                <Text style={styles.profileText}>{item.label}: {item.value}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.flatListContent}
                    /></View>

                    {/* Logout button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
    profileItem: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#ffe4c4',
        marginBottom: 8,
        padding: 5,
        borderRadius: 5,
    },
    profileText: {
        fontSize: 18,
        marginLeft: 8, 
        fontWeight:'bold',
    },
    flatListContent: {
        alignItems: 'stretch', // Apply alignItems to the content container
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

export default AccountantProfileScreen;
