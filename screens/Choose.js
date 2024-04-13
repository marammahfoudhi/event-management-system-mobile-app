import React from 'react';
import { View, Pressable, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants'; // Import the COLORS constant

export default function Choose() {
    const navigation = useNavigation();
    const opacity = React.useRef(new Animated.Value(1)).current; // Initial opacity value

    const handlePressIn = () => {
        // Animate to lower opacity when pressed
        Animated.timing(opacity, {
            toValue: 0.5,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        // Animate to restore opacity when released
        Animated.timing(opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Choose an Action</Text>
            </View>
            
            {/* Button Container */}
            <View style={styles.buttonContainer}>
                {/* Scan Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.pressable,
                        { backgroundColor: pressed ? COLORS.primary : COLORS.secondary }, // Use COLORS.primary
                    ]} 
                    onPressIn={handlePressIn} // Call handlePressIn when pressed
                    onPressOut={handlePressOut} // Call handlePressOut when released
                    onPress={() => navigation.navigate('Scanner')}
                >
                    <FontAwesome name="camera" size={24} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                </Pressable>
                
                {/* Divider */}
                <View style={styles.divider} />

                {/* Add Attendee Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.pressable,
                        { backgroundColor: pressed ? COLORS.primary : COLORS.secondary }, // Use COLORS.primary
                    ]}
                    onPressIn={handlePressIn} // Call handlePressIn when pressed
                    onPressOut={handlePressOut} // Call handlePressOut when released
                    onPress={() => navigation.navigate('WelcomeScreen')}
                >
                    <FontAwesome name="user-plus" size={24} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Add Attendee</Text>
                </Pressable>
            </View>
            
            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 YourApp. All rights reserved.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    buttonContainer: {
        width: '80%',
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 5,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
    },
    footerText: {
        fontSize: 12,
        color: 'gray',
    },
});
