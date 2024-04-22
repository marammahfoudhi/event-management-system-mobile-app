import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FONTS, COLORS, SIZES, icons } from '../constants';
import { validateEmail } from '../utils/ValidationConstraints';
import { validatePassword } from '../utils/ValidationConstraints';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleLogin = () => {
    // Validate email
    const emailError = validateEmail('email', email);
    if (emailError) {
      setEmailError(emailError);
      return;
    } else {
      setEmailError(null);
    }

    // Validate password
    const passwordError = validatePassword('password', password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    } else {
      setPasswordError(null);
    }

    // Implement your login logic here
    navigation.navigate('Choose');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["rgba(230, 81, 0, 1)", "rgba(230, 81, 0, .8)"]} style={{ flex: 1 }}>
        <StatusBar />
        <View style={styles.headerContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Welcome Dear Desk Agent</Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sign In</Text>
          <Text style={styles.subHeaderTitle}>Please sign in to your existing account.</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="example@gmail.com"
            placeholderTextColor={COLORS.black}
          />
          <Text style={styles.errorText}>{emailError}</Text>
          <Text style={styles.inputHeader}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="*************"
            placeholderTextColor={COLORS.black}
          />
          <Text style={styles.errorText}>{passwordError}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("choose")}>
            <Text style={{ ...FONTS.body4, color: COLORS.primary, textAlign: 'right' }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Or</Text>
            <View style={styles.line} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerText: {
    ...FONTS.body2,
    color: COLORS.white,
  },
  logo: {
    width: 60,
    height: 60,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 4
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white
  },
  subHeaderTitle: {
    ...FONTS.body4,
    color: COLORS.white,
    marginVertical: SIZES.padding,
    textAlign: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 30
  },
  inputHeader: {
    textTransform: 'uppercase',
    ...FONTS.body4,
    marginVertical: 4
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10, // Added border radius
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  errorText: {
    color: COLORS.red,
    marginBottom: 5,
  },
});



export default Login;
