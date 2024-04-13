import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome Icon
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';

const iconSize = 36; // Adjust icon size
const navBarHeight = 60; // Adjust Tab bar height

export default function TabBar() {
    const navigation = useNavigation();
    const [iconColors, setIconColors] = useState({
        user: 'white',
        home: 'white',
        location: 'white'
    });

    const handleIconPressIn = (iconName) => {
        // Update the color of the pressed icon to orange
        setIconColors(prevColors => ({
            ...prevColors,
            [iconName]: COLORS.primary
        }));
    };

    const handleIconPressOut = (iconName) => {
        // Reset the color of the icon to white when releasing the tap
        setIconColors(prevColors => ({
            ...prevColors,
            [iconName]: 'white'
        }));
    };

    return (
        <View style={styles.NavContainer}>
            <View style={styles.NavBar}>
                <Pressable
                    onPressIn={() => handleIconPressIn('location')}
                    onPressOut={() => handleIconPressOut('location')}
                    onPress={() => navigation.navigate('Verification')}
                    style={styles.IconBehave}
                    android_ripple={{ borderless: true, radius: 50 }}>
                    <Icon name="location-arrow" size={iconSize} color={iconColors.location} />
                </Pressable>
                <Pressable
                    onPressIn={() => handleIconPressIn('home')}
                    onPressOut={() => handleIconPressOut('home')}
                    onPress={() => navigation.navigate('WelcomeScreen')}
                    style={styles.IconBehave}
                    android_ripple={{ borderless: false, radius: 50 }}>
                    <Icon name="home" size={iconSize} color={iconColors.home} />
                </Pressable>
                <Pressable
                    onPressIn={() => handleIconPressIn('user')}
                    onPressOut={() => handleIconPressOut('user')}
                    onPress={() => navigation.navigate('WelcomeScreen')}
                    style={styles.IconBehave}
                    android_ripple={{ borderless: true, radius: 50 }}>
                    <Icon name="user" size={iconSize} color={iconColors.user} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    NavContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 20,
        width: '100%', // Ensure the Tab bar spans the entire width
    },
    NavBar: {
        flexDirection: 'row',
        backgroundColor: "black", // Set Tab bar background color to black
        width: '90%', // Set the width of the Tab bar
        height: navBarHeight, // Set the height of the Tab bar
        alignItems: 'center', // Align items vertically
        justifyContent: 'space-between', // Justify items evenly
        paddingHorizontal: 20, // Adjust horizontal padding
        borderRadius: 40,
    },
    IconBehave: {
        padding: 10, // Adjust padding around each icon
    },
});
