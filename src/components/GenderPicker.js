import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
const GenderPicker = ({ onChange, style }) => {
  const [gender, setGender] = useState('');

  const onGenderChange = (value) => {
    setGender(value);
    onChange('gender', value);
  };

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>Gender</Text>
            <Picker
                style={styles.picker}
                selectedValue={gender}
                onValueChange={onGenderChange}
            >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
            </Picker>
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
    picker: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
});


export default GenderPicker;
