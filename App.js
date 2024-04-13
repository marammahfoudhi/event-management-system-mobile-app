// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabBar from "./components/TabBar";
import Choose from "./screens/Choose";
import WelcomeScreen from "./screens/WelcomeScreen";
import SplashScreen from "./screens/SplashScreen";
import Login from "./screens/Login";
import Verification from "./screens/Verification";
import Scanner from "./screens/Scanner";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Choose"
            component={Choose}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <TabBar /> 
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
