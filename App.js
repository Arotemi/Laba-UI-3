import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './src/screens/Onboarding/OnboardingScreen';
import Signup from './src/screens/Signup/SignupScreen';
import Signin from './src/screens/Signin/SigninScreen';
import HomeAccount from './src/screens/HomeAccount/HomeAccountScreen';

function OnboardingNav() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Group>
                <Stack.Screen name='Onboarding' component={Onboarding} />
                <Stack.Screen name="SignupNav" component={SignupNav} />
                <Stack.Screen name="SigninNav" component={SigninNav} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

function SignupNav() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Group>
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="SigninNav" component={SigninNav} />
                <Stack.Screen name="OnboardingNav" component={OnboardingNav} />
            </Stack.Group>
        </Stack.Navigator>
    );
};


function SigninNav() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Group>
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="SignupNav" component={SignupNav} />
                <Stack.Screen name="HomeNav" component={HomeNav} />
                <Stack.Screen name="OnboardingNav" component={OnboardingNav} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

function HomeNav() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="HomeAccount" component={HomeAccount} />
        </Stack.Navigator>
    )
}

const App = () => {
    AsyncStorage.setItem('isLoggedIn', 'false');
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const isAppFirstLaunched = await AsyncStorage.getItem('isAppFirstLaunched');
            setIsAppFirstLaunched(isAppFirstLaunched === null);
            if (isAppFirstLaunched === null) {
                await AsyncStorage.setItem('isAppFirstLaunched', 'false');
            }
        };

        const loggedStateUpdate = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(isLoggedIn === 'true');
        };

        checkFirstLaunch();
        loggedStateUpdate();
        SplashScreen.hide();
    }, []);

    return (
        <NavigationContainer>
            {
                isAppFirstLaunched ? <OnboardingNav /> :
                    isLoggedIn ? <HomeNav /> : <SigninNav />
            }
        </NavigationContainer>
    );
};

export default App;
