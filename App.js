import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Provider, useSelector } from "react-redux";
import store from "./src/store/store";
import Root from "./Root";
import Purchases from "react-native-purchases";
import i18n from './src/components/language/i18n'; 
const App = () => {
    const getPurch = async () => {
        Purchases.setDebugLogsEnabled(true);

        if (Platform.OS === "ios") {
            await Purchases.configure({ apiKey: "public_ios_sdk_key" });
        } else if (Platform.OS === "android") {
            await Purchases.configure({
                apiKey: "goog_XNPiXmmOyTEAdnyalmFOSqhgldS",
            });
        }
    };
    useEffect(() => {
        getPurch();
    }, []);

    return (
        <View style={styles.container}>
            <Provider store={store}>
                <Root />
            </Provider>
           
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
