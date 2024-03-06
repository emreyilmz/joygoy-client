import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/logo6.png")}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>
                    Milyonlarca video ile ingilizce öğren!
                </Text>
                <Text style={styles.text}>Bir hesapla giriş yapın.</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignInScreen")}
                    >
                        <LinearGradient
                            colors={["#1DB954", "#01ab9d"]}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Başlayalım</Text>
                            <MaterialIcons
                                name="navigate-next"
                                size={20}
                                color="#fff"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1DB954",
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        backgroundColor: "#fff",
        color: "#05375a",
        fontSize: 30,
        fontWeight: "bold",
    },
    text: {
        color: "grey",
        marginTop: 5,
    },
    button: {
        alignItems: "flex-end",
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row",
    },
    textSign: {
        color: "white",
        fontWeight: "bold",
    },
});
