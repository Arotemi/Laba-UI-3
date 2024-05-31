import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import CustomFormFieldError from './CustomFormFieldError'

const CustomInput = ({
    name,
    value,
    onChange,
    placeholder,
    secureTextEntry,
    errorMessage
}) => {
    const [hidePassword, setHidePassword] = useState(true)

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword)
    };

    return (
        <View style={[styles.container, errorMessage && styles.errorBorder]}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={(val) =>onChange(name, val)}
                secureTextEntry={secureTextEntry && hidePassword}
            />
            {secureTextEntry && (
                <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
                    <Icon name={hidePassword ? 'eye' : 'eye-off'} size={25} color='black' />
                </TouchableOpacity>
            )}
            {errorMessage && (
                <CustomFormFieldError errorMessage={errorMessage} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 2,
        borderRadius: 15,

        paddingHorizontal: 10,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorBorder: {
        borderColor: '#9e2626',
    },
    input: {
        flex: 1,
    },
    icon: {
        padding: 10,
    }
})

export default CustomInput