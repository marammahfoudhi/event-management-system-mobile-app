import React from 'react';
import { View, Pressable, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants';

const { height, width } = Dimensions.get('window');

export default function Choose() {
    const navigation = useNavigation();
    const opacity = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(opacity, {
            toValue: 0.5,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.pressable,
                        { backgroundColor: pressed ? COLORS.primary : COLORS.secondary },
                    ]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => navigation.navigate('Scanner')}
                >
                    <FontAwesome name="camera" size={24} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                </Pressable>
            </View>

            {/* Plus Button */}
            <Pressable
                style={styles.plusButton}
                
                onPress={() => navigation.navigate('Form')}
            >
                <FontAwesome name="plus" size={36} color="white" />
            </Pressable>

            {/* Message */}
            <Text style={styles.message}>Tap the plus button to manually add attendees</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Update background color to black
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 20,
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRadius: 10,
        elevation: 5,
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
    plusButton: {
        position: 'absolute',
        bottom: height * 0.1,
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    message: {
        position: 'absolute',
        bottom: height * 0.05,
        width: width * 0.8,
        textAlign: 'center',
        color: 'white', // Update text color to white
    },
});
