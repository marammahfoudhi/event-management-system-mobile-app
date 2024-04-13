import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, View ,Text} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Logo....
import Logo from '../assets/logo.png';
import WelcomeScreen from './WelcomeScreen';

const BGColor = 'black'

const SplashScreen= () => {

    // SafeArea Value...
    const edges = useSafeAreaInsets();

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;
    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    // Animation Done....
    useEffect(() => {
        // Starting Animation after 5000ms (5 seconds)....
        setTimeout(() => {
            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        duration: 2000, // Longer duration for smoother animation
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        // Scaling to 0.35
                        toValue: 0.3,
                        duration: 2000, // Longer duration for smoother animation
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        // Scaling to 0.8
                        toValue: 0.8,
                        duration: 2000, // Longer duration for smoother animation
                        useNativeDriver: true
                        
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: (Dimensions.get("window").width / 2) - 35,
                            y: (Dimensions.get('window').height / 2) - 5
                        },
                        duration: 2000, // Longer duration for smoother animation
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: 0,
                            // Since image size is 100...
                            y: (Dimensions.get('window').height / 2) - 90
                        },
                        duration: 2000, // Longer duration for smoother animation
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        duration: 2000, // Longer duration for smoother animation
                        useNativeDriver: true
                    }
                )
            ])
            .start();
        }, 5000); // Change the timeout duration to 5000 milliseconds (5 seconds)
    }, []); 
    console.log("SplashScreen rendered");

    // Going to Move Up like Nav Bar...
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Animated.View style={{
                flex: 1,
                backgroundColor: BGColor,
                zIndex: 2,
                borderRadius: startAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 20], // Apply border radius when transitioning
                }),
                overflow: 'hidden', // Ensure that border radius is applied
                transform: [
                    { translateY: startAnimation }
                ]
            }}>
                <Animated.View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Animated.Image source={Logo} style={{
                        width: 100,
                        height: 100,
                        marginBottom: 20,
                        borderRadius:8,
                        transform: [
                            { translateX: moveLogo.x },
                            { translateY: moveLogo.y },
                            { scale: scaleLogo },
                        ]
                    }}></Animated.Image>
                    <Animated.Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        right:10,
                        
                        transform: [
                            { translateY: moveTitle.y },
                            { scale: scaleTitle }
                        ]
                    }}>Welcome Dear Desk Agent </Animated.Text>
                </Animated.View>
            </Animated.View>
            <Animated.View style={{
                position: 'absolute',
                top: 30,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.04)',
                zIndex: 0,
                borderRadius: 30, // Apply border radius to the welcome screen
                transform: [
                    { translateY: contentTransition }
                ]
            }}>
                <WelcomeScreen></WelcomeScreen>
            </Animated.View>
        </View>
    );
}

export default SplashScreen;
