import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import LinearGradient from "react-native-linear-gradient";

function CreateContactModal({ isOpen, onOk, onClose }) {
    const [data, setData] = useState({});

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (

        <Modal isVisible={isOpen} onBackdropPress={onClose}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Create Contact</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>First name</Text>
                    <TextInput
                        style={styles.input}
                        value={data.firstName}
                        onChangeText={(value) => handleChange('firstName', value)}
                        placeholder="Enter First name"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Last name</Text>
                    <TextInput
                        style={styles.input}
                        value={data.lastName}
                        onChangeText={(value) => handleChange('lastName', value)}
                        placeholder="Enter Last name"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        value={data.phone}
                        onChangeText={(value) => handleChange('phone', value)}
                        placeholder="Enter Phone number"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <LinearGradient colors={['#FF8008', '#FFC837']} style={styles.button}>
                        <TouchableOpacity onPress={() => onOk(data)}>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.button}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={[styles.buttonText, { color: '#FF8008' }]}>Cancel</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
);
};

CreateContactModal.propTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    data: PropTypes.object,
    handleChange: PropTypes.func,
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#FFEBCC', // Light orange background color to match the theme
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#e37632',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#e37632',
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFA500', // Orange border color
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        color: '#333333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default CreateContactModal;
