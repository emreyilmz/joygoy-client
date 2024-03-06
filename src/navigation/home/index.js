import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Post from "../../components/words/Post";
import Home from "../../components/words/Home";
import WordList from "../../components/words/WordList";
import Words from "../../components/words/Words";
import WordOverlay from "../../components/words/WordOverlay";
import WordPass from "../../components/words/WordPass";
import Premium from "../../components/me/Premium";

//https://stackoverflow.com/questions/65671074/error-looks-like-you-have-nested-a-navigationcontainer-inside-another-for-2
/*
the masculine urge to fly to alaska and work a seasonal fishing job and 
never get attached to anyone or anything
*/

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            options={{ headerShown: false }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "Welcome" }}
            />

            <Stack.Screen name="Words" component={Words} />
            <Stack.Screen name="WordList" component={WordList} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="WordOverlay" component={WordOverlay} />
            <Stack.Screen name="WordPass" component={WordPass} />
            <Stack.Screen name="Premium" component={Premium} />

        </Stack.Navigator>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
