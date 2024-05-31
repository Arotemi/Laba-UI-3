import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BirthdatePicker = ({ style, handleChange }) => {
  const [birthdate, setBirthdate] = useState(null); // State to store selected birthdate

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setBirthdate(currentDate.toISOString());
    handleChange('birthdate', currentDate.toISOString());
  };

  const showDatePicker = async () => {
    try {
       await DateTimePickerAndroid.open({
        onChange,
        value: new Date(), // Set default date to today's date
        mode: 'spinner', // Choose spinner mode for better UX
      });
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity title="Select Birthdate" onPress={showDatePicker}  style={[styles.input]} >
          <Text style={styles.buttonText}>BirthDate</Text>
      </TouchableOpacity>
      {birthdate !== '' && (
        <Text style={{ marginTop: 10 }}> {birthdate}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFA500', // Set background color to transparent
        borderWidth: 2, // Add border for better visibility
        borderColor: '#FFA500',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default BirthdatePicker;
