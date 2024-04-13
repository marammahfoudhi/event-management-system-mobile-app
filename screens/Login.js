  import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
  import React, { useState, useReducer, useCallback } from 'react'
  import { SafeAreaView } from 'react-native-safe-area-context'
  import { LinearGradient } from 'expo-linear-gradient'
  import * as Animatable from "react-native-animatable"
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { StatusBar } from 'expo-status-bar'
  import { FONTS, COLORS, SIZES, icons } from '../constants'
  import Input from '../components/Input'
  import { validateInput } from '../utils/actions/formActions'
  import { reducer } from '../utils/reducers/formReducers'
  import Button from "../components/Button"
  import Checkbox from 'expo-checkbox'
  import SocialButton from '../components/SocialButton'
 
  
  


  const isTestMode = true

  const initialState = {
    inputValues: {
      email: isTestMode ? 'example@gmail.com' : '',
      password: isTestMode ? '**********' : '',
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false,
  }

  const Login = ({ navigation }) => {
  
    
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isChecked, setChecked] = useState(false)
      const logo = require('../assets/logo.png');

    const inputChangedHandler = useCallback(
      (inputId, inputValue) => {
        const result = validateInput(inputId, inputValue)
        dispatchFormState({ inputId, validationResult: result, inputValue })
      },
      [dispatchFormState]
    )
    const facebookAuthHandler = () => {

    }

    const googleAuthHandler = () => {

    }

    const twitterAuthHandler = () => {

    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["rgba(230, 81, 0, 1)", "rgba(230, 81, 0, .8)"]}
          style={{ flex: 1 }}>
          <StatusBar  />
          <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Welcome Dear Desk Agent</Text>
        </View>
      </View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sign In</Text>
            <Text style={styles.subHeaderTitle}>Please signin to your existing account.</Text>
          </View>

          <Animatable.View
            animation="fadeInUpBig"
            style={styles.footer}>
            <KeyboardAwareScrollView>
              <Text style={styles.inputHeader}>Email</Text>
              <Input
                id="email"
                placeholder="example@gmail.com"
                placeholderTextColor={COLORS.black}
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['email']}
                keyboardType="email-address"
              />
              <Text style={styles.inputHeader}>Password</Text>
              <Input
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['password']}
                autoCapitalize="none"
                id="password"
                placeholder="*************"
                placeholderTextColor={COLORS.black}
                secureTextEntry={true}
              />

              <View style={styles.checkBoxContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    color={isChecked ? COLORS.primary : COLORS.black}
                    onValueChange={setChecked}
                  />
                  <Text style={{ ...FONTS.body4 }}>Remember me</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Verification")}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>

              <Button
              title="LOGIN"
              isLoading={isLoading}
              onPress={() => navigation.navigate('Choose')} 
                
                
              />

              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={{ ...FONTS.body4, color: COLORS.black, textAlign: 'center' }}> Or </Text>
                <View style={styles.line} />
              </View>

              <View style={{
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: SIZES.padding2
              }}>
                <SocialButton
                  onPress={facebookAuthHandler}
                  icon={icons.facebook}
                />
                <SocialButton
                  onPress={googleAuthHandler}
                  icon={icons.google}
                />
                <SocialButton
                  onPress={twitterAuthHandler}
                  icon={icons.twitter}
                />
              </View>
            </KeyboardAwareScrollView>
          </Animatable.View>
        </LinearGradient>
      </SafeAreaView>
    )
  }

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
    mainContainer: {
      flex: 1,
      backgroundColor: 'transparent',
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
    checkBoxContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 18
    },
    checkbox: {
      marginRight: 8,
      height: 16,
      width: 16,
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
    }
  });
  
  export default Login;
 
  