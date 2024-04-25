import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";

const { height } = Dimensions.get('window');

const Form = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [attendees, setAttendees] = useState([]);
  const [emailTouched, setEmailTouched] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://orange-event-application.vercel.app/api/get-events');
      const data = await response.json();
      console.log('Fetched events:', data); // Log fetched events
      setEvents(data.body);
      if (data.body.length > 0) {
        setSelectedEventId(data.body[0].id); // Automatically select the first event
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleSubmit = () => {
    // Check if any field is empty
    if (!firstName || !lastName || !email || !selectedEventId) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please complete the form",
        text2: "All fields are required",
      });
      return;
    }

    const validEmail = emailPattern.test(email);
    setIsValidEmail(validEmail);
    setEmailTouched(true);

    if (!validEmail) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please enter a valid email address",
        text2: "Email format is incorrect",
      });
      return;
    }

    const newAttendee = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${firstName} ${lastName}`,
      email,
    };
    setAttendees([...attendees, newAttendee]);
    setFirstName('');
    setLastName('');
    setEmail('');
    setEmailTouched(false);
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
          name: `${selectedAttendee.firstName} ${selectedAttendee.lastName}`,
          email: selectedAttendee.email,
        };
      }
      return attendee;
    });
    setAttendees(updatedAttendees);
    setIsModalVisible(false);
  };

  const postAttendees = async () => {
    if (attendees.length === 0) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "No attendees to add",
        text2: "Please add attendees before proceeding",
      });
      return;
    }

    if (!selectedEventId) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Event not selected",
        text2: "Please select an event before adding attendees",
      });
      return;
    }

    try {
      const response = await fetch(`https://orange-event-application.vercel.app/api/add-attendee?eventId=${selectedEventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendees)
      });
      const result = await response.json();
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Attendees are added successfully",
        text2: result.message,
      });
      navigation.navigate('Choose');
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Failed to send attendees",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={[styles.title, {color: 'white'}]}>Select an Event</Text>
        <Picker
          selectedValue={selectedEventId}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedEventId(itemValue)}
          dropdownIconColor="white"
          mode="dropdown"
        >
          <Picker.Item label="Select an event..." value={null} color="white"/>
          {events.map((event) => (
            <Picker.Item key={event.id} label={event.title} value={event.id} color="white"/>
          ))}
        </Picker>
      </View>

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
      <TouchableOpacity style={[styles.button, {backgroundColor: COLORS.primary}]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <View style={styles.attendeesContainer}>
        {attendees.map((attendee) => (
          <View key={attendee.id} style={styles.attendee}>
            <Text style={{ color: COLORS.white }}>{attendee.name}</Text>
            <Text style={{ color: COLORS.white }}>{attendee.email}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
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

      <TouchableOpacity style={[styles.button, {backgroundColor: COLORS.primary}]} onPress={postAttendees}>
        <Text style={styles.buttonText}>Add to Event</Text>
      </TouchableOpacity>
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
  pickerContainer: {
    width: '100%',
    backgroundColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    width: '100%',
    height: 50,
    color: 'orange',
  },
});

export default Form;
