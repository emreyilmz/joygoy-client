import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import SplashScreen from "../../components/login/SplashScreen";
import SignInScreen from "../../components/login/SignInScreen";
import SignUpScreen from "../../components/login/SignUpScreen";
const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                options={{ headerShown: true }}
            >
                <RootStack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                />
                <RootStack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                />
                <RootStack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackScreen;
