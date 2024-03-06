import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function WordOverlay({ item }) {
    const navigation = useNavigation();
    //console.log("deneme", item);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={28} color="white" />
                </TouchableOpacity>
                <View style={styles.subtitle}>
                    <Text style={styles.text2}>{item.video_text}</Text>
                </View>
            </View>
        </View>
    );
}

export default WordOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        zIndex: 999 /* 
        bottom: 0,
        left: 0, */,
        paddingHorizontal: 15,
        paddingVertical: 10,

        flexDirection: "column",
        justifyContent: "space-between",
    },
    header: {
        marginTop: Constants.statusBarHeight,
        marginRight: 80,
        /* flex: 1,
        position: "absolute",
        bottom: 0, */
    },
    text2: {
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
