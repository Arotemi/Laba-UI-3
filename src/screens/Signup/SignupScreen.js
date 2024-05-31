import { View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'

import SignupInput from '../../components/CustomInput.js'
import SignupHeader from '../../components/CustomHeader.js'
import SignupButton from '../../components/CustomButton.js'
import SignupFooter from '../../components/CustomFooter.js'
import BirthdatePicker from '../../components/DatePicker.js'
import SignupActivityIndicator from '../../components/CustomActivityIndicator.js'
import { getResponseError } from '../../utils/errorUtils.js'
import Config from 'react-native-config'
import GenderPicker from '../../components/GenderPicker.js'

const SignupScreen = ({ navigation }) => {
    const [data, setData] = useState('')
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false)
    const [error, setError] = useState(null);

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }
    
    const createUser = async () => {
        setShowLoadingIndicator(true)
        setError(null);

        try {
            const response = await fetch(Config.REGISTER_API_URL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const res = await response.json();
            if (res.error) {
                throw new Error(JSON.stringify(res.error.fields));
            }
            navigation.navigate('HomeNav')
        } catch (error) {
            setError(getResponseError(error.message))
        } finally {
            setShowLoadingIndicator(false)
        }
    }

    return (
        <View style={styles.root}>
            <Image source={require('../../assets/images/LoginBack.jpg')} style={styles.backgroundImage} />
            {showLoadingIndicator && (
                <SignupActivityIndicator />
            )}
            <View style={styles.loginPaper}>
                <SignupHeader
                    style={styles.header}
                    text='Registration'
                    onPress={() => navigation.replace('OnboardingNav')}
                    iconButtonTrue
                />
                <View style={styles.formContainer}>
                    <SignupInput
                        placeholder='Name'
                        name={'name'}
                        value={data.username}
                        onChange={handleChange}
                        editable={!showLoadingIndicator}
                        errorMessage={error?.firstName}
                    />
                    <SignupInput
                        name={'email'}
                        placeholder='Email'
                        value={data.email}
                        onChange={handleChange}
                        editable={!showLoadingIndicator}
                        errorMessage={error?.email}
                    />
                    <SignupInput
                        name={'password'}
                        placeholder='Password'
                        value={data.password}
                        onChange={handleChange}
                        secureTextEntry
                        editable={!showLoadingIndicator}
                        errorMessage={error?.password}
                    />
                    <BirthdatePicker
                        style={styles.picker}
                        onChange={handleChange}
                    />
                    <GenderPicker
                        style={styles.picker}
                        onChange={handleChange}
                    />
                    <SignupButton
                        text='Register'
                        page='SIGNUP'
                        style={styles.signupButton}
                        onPress={createUser}
                        disabled={showLoadingIndicator}
                    />
                </View>
                <SignupFooter
                    messageText='Already Have an Account?'
                    page='ONBOARDING'
                    type='TERTIARY'
                    buttonText='Log in'
                    navigationReplace='SigninNav'
                    navigation={navigation}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    loginPaper: {
        zIndex: 4,
        width: '100%',
        maxWidth: 520,
        borderRadius: 15,
        padding: 60,
        paddingHorizontal: 75,
        backgroundColor: 'rgba(154, 73, 6, 0.45)',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        boxShadow: '0px 4px 21px rgba(36, 37, 46, 0.05)',
        alignItems: 'center',
    },
    header: {
        marginBottom: 30,
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
    picker: {
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    signupButton: {
        marginVertical: 10,
    }
});

export default SignupScreen
