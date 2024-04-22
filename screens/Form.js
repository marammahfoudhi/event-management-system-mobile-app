import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../constants';

const { height } = Dimensions.get('window');

const Form = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [attendees, setAttendees] = useState([]);
  const [emailTouched, setEmailTouched] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const toggleModal = (attendee) => {
    setSelectedAttendee(attendee);
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = () => {
    const validEmail = emailPattern.test(email);
    setIsValidEmail(validEmail);
    setEmailTouched(true);

    if (validEmail && firstName && lastName) {
      const newAttendee = {
        id: Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        email,
      };
      setAttendees([...attendees, newAttendee]);
      setFirstName('');
      setLastName('');
      setEmail('');
      setEmailTouched(false);
    }
  };

  const handleDeleteAttendee = (id) => {
    const updatedAttendees = attendees.filter((attendee) => attendee.id !== id);
    setAttendees(updatedAttendees);
  };

  const handleSaveChanges = () => {
    const updatedAttendees = attendees.map((attendee) => {
      if (attendee.id === selectedAttendee.id) {
        return {
          ...attendee,
          firstName: selectedAttendee.firstName,
          lastName: selectedAttendee.lastName,
          email: selectedAttendee.email,
        };
      }
      return attendee;
    });
    setAttendees(updatedAttendees);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Attendee</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {backgroundColor: 'rgba(255, 255, 255, 0.5)'}]}
          placeholder="First Name"
          placeholderTextColor="#CCC"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, {backgroundColor: 'rgba(255, 255, 255, 0.5)'}]}
          placeholder="Last Name"
          placeholderTextColor="#CCC"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={[styles.input, !isValidEmail && styles.invalidInput, {backgroundColor: 'rgba(255, 255, 255, 0.5)'}]}
          placeholder="Email"
          placeholderTextColor="#CCC"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      {!isValidEmail && emailTouched && <Text style={styles.errorText}>Please enter a valid email address</Text>}
      <TouchableOpacity style={[styles.button, {backgroundColor: COLORS.primary}]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={[styles.attendeesTitle, { color: COLORS.white }]}>Manually Added Attendees:</Text>
      <View style={styles.attendeesContainer}>
        {attendees.map((attendee) => (
          <View key={attendee.id} style={styles.attendee}>
            <Text style={{ color: COLORS.white }}>{attendee.firstName} {attendee.lastName}</Text>
            <Text style={{ color: COLORS.white }}>{attendee.email}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => toggleModal(attendee)}>
                <FontAwesome name="edit" size={24} color={COLORS.gray} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteAttendee(attendee.id)}>
                <FontAwesome name="trash" size={24} color={COLORS.gray} style={[styles.icon, { marginLeft: 10 }]} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Attendee</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {backgroundColor: 'rgba(255, 255, 255, 0.5)'}]}
              placeholder="First Name"
              placeholderTextColor="#CCC"
              value={selectedAttendee?.firstName}
              onChangeText={(text) => setSelectedAttendee({ ...selectedAttendee, firstName: text })}
            />
            <TextInput
              style={[styles.input, {backgroundColor: 'rgba(255, 255, 255, 0.5)'}]}
              placeholder="Last Name"
              placeholderTextColor="#CCC"
              value={selectedAttendee?.lastName}
              onChangeText={(text) => setSelectedAttendee({ ...selectedAttendee, lastName: text })}
            />
            <TextInput
              style={[styles.input, !isValidEmail && styles.invalidInput, {backgroundColor: 'rgba(255, 255, 255, 0.5)'}]}
              placeholder="Email"
              placeholderTextColor="#CCC"
              value={selectedAttendee?.email}
              onChangeText={(text) => setSelectedAttendee({ ...selectedAttendee, email: text })}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {!isValidEmail && <Text style={styles.errorText}>Please enter a valid email address</Text>}
          <TouchableOpacity style={[styles.button, {backgroundColor: COLORS.primary}]} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingBottom: height * 0.2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
    ...FONTS.body2,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.white,
    ...FONTS.body3,
  },
  invalidInput: {
    borderColor: COLORS.red,
  },
  errorText: {
    color: 'white',
    marginBottom: 10,
    ...FONTS.body3,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: SIZES.radius,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  attendeesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.primary,
    ...FONTS.body3,
  },
  attendeesContainer: {
    width: '100%',
  },
  attendee: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
    ...FONTS.body2,
  },
});

export default Form;
