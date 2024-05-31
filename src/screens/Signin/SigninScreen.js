import {View, StyleSheet, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import SigninHeader from '../../components/CustomHeader'
import SigninInput from '../../components/CustomInput'
import SigninButton from '../../components/CustomButton'
import SigninFooter from '../../components/CustomFooter'
import SigninActivityIndicator from '../../components/CustomActivityIndicator'
import { getResponseError } from '../../utils/errorUtils.js'
import Config from 'react-native-config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SignupActivityIndicator from "../../components/CustomActivityIndicator";

const SigninScreen = ({ navigation }) => {
    const [data, setData] = useState({ email: 'artemtest@gmail.com', password:'123456789'})
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false)
    const [error, setError] = useState(null);

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }
    
    const signin = async () => {
        setShowLoadingIndicator(true)
        setError(null);

        try {
            const response = await fetch(Config.SIGNIN_API_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const userContext = await response.json();
            if (userContext.error) {
                throw new Error(JSON.stringify(userContext.error.fields));
            }
            AsyncStorage.setItem('userContext', JSON.stringify(userContext));
            AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
            navigation.navigate('HomeNav')
        } catch (error) {
            console.error(error);
            setError(getResponseError(error.message))
        } finally {
            setShowLoadingIndicator(false)
        }
    }
    async function getData() {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const userContext = await AsyncStorage.getItem('userContext');
        console.log('isLoggedIn:', isLoggedIn);
        console.log('userContext', userContext);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <View style={styles.root}>
            <Image source={require('../../assets/images/LoginBack.jpg')} style={styles.backgroundImage} />
            {showLoadingIndicator && (
                <SignupActivityIndicator />
            )}
            <SigninHeader
                style={styles.header}
                text='Log in'
                onPress={() => navigation.replace('OnboardingNav')}
                iconButtonTrue
            />
            <SigninInput
                name={'email'}
                placeholder='Email'
                value={data.email}
                onChange={handleChange}
                editable={!showLoadingIndicator}
                errorMessage={error?.email}
            />
            <SigninInput
                name={'password'}
                placeholder='Password'
                value={data.password}
                onChange={handleChange}
                secureTextEntry
                editable={!showLoadingIndicator}
                errorMessage={error?.password}
            />
            <SigninButton
                text='Sign In'
                page='Log In'
                style={styles.signinButton}
                onPress={signin}
            />
            <SigninFooter
                messageText={`Don't have an account yet?`}
                page='ONBOARDING'
                type='TERTIARY'
                buttonText='Register'
                navigationReplace='SignupNav'
                navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',

        // justifyContent: 'center',
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
        resizeMode: 'cover', // Ensure the image covers the entire area
        opacity: 0.8,
    },
    loginPaper: {
        zIndex: 4,
        width: '80%',
        maxWidth: 520,
        borderRadius: 15,
        padding: 30,
        backgroundColor: 'rgba(154, 73, 6, 0.45)',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        shadowColor: '#24252E',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 21,
        elevation: 5,
        alignItems: 'center',
    },
    header: {
        marginTop: 30,
        marginBottom: 100,
        fontSize: 40,
        fontWeight: '700',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    formContainer: {
        width: '100%',
        marginTop: 20,
    },
    picker: {
        marginBottom: 20,
        width: '100%', // Ensure picker spans full width
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    signinButton: {
        width: 250, // Ensure button spans full width
        marginVertical: 10,
        height: 40,
    }
});
export default SigninScreen